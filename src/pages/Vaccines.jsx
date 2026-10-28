import { useMemo, useState } from "react";
import {
  Syringe,
  ShieldCheck,
  CalendarClock,
  AlertTriangle,
  Bug,
  CheckCheck,
  CalendarHeart,
  Check,
  FileWarning,
} from "lucide-react";
import { vaccinesData } from "../data/vaccinesData";
import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/common/StatCard";
import QuickRecordSheet from "../components/common/QuickRecordSheet";
import {
  diffInDays,
  formatDateTR,
  formatDueLabel,
  formatInterval,
  formatWeekdayTR,
  getVaccineStatus,
} from "../utils/dateHelpers";
import { buildVaccineOverview, HISTORY_YEARS } from "../utils/schedule";

const FILTERS = [
  { key: "all", label: "Tümü" },
  { key: "upcoming", label: "Yaklaşan" },
  { key: "completed", label: "Tamamlanan" },
];

const DATA_FILE = "src/data/vaccinesData.js";

/** Döngü çubuğunun rengi, durum rozetiyle aynı dili konuşur. */
const PROGRESS_TONE = {
  upcoming: "bg-mint-400",
  soon: "bg-brand-400",
  overdue: "bg-blush-500",
};

/** Ay başlığı için "Nisan 2026" biçimli etiket üretir. */
const monthLabel = (date) =>
  date.toLocaleDateString("tr-TR", { month: "long", year: "numeric" });

/** Listeyi sırasını bozmadan aylara böler: [{ key, label, items }] */
const groupByMonth = (items) => {
  const map = new Map();
  items.forEach((item) => {
    const key = item.date ? `${item.date.getFullYear()}-${item.date.getMonth()}` : "none";
    if (!map.has(key)) {
      map.set(key, {
        key,
        label: item.date ? monthLabel(item.date) : "Kayıt bekleniyor",
        items: [],
      });
    }
    map.get(key).items.push(item);
  });
  return [...map.values()];
};

/** Sıradaki doz kartının alt satırı: son doz, aralık ve randevu bilgisi. */
const describeCycle = (series) => {
  const parts = [];
  if (series.next?.source === "planned") parts.push("Randevu");
  parts.push(
    series.lastDone ? `Son doz ${formatDateTR(series.lastDone.date)}` : "Henüz kayıt yok",
  );
  const every = formatInterval(series.every);
  if (every) parts.push(every);
  return parts.join(" · ");
};

/** Son dozdan bu yana geçen sürenin döngüye oranı (0-100). */
const cycleProgress = (series) => {
  if (!series.lastDone || !series.cycleDays) return 100;
  const elapsed = diffInDays(series.lastDone.date, new Date());
  return Math.min(Math.max((elapsed / series.cycleDays) * 100, 0), 100);
};

const Vaccines = () => {
  const [filter, setFilter] = useState("all");
  const [recording, setRecording] = useState(null);

  const { series, pending, history, overdue, nextUp, upToDate, invalid } = useMemo(
    () => buildVaccineOverview(vaccinesData),
    [],
  );

  const protectionRate = series.length ? Math.round((upToDate / series.length) * 100) : 0;
  const nextUpStatus = nextUp ? getVaccineStatus(nextUp.date, false) : null;

  const sections = useMemo(() => {
    const list = [];
    if (filter !== "completed") {
      list.push({ key: "upcoming", title: "Sıradaki dozlar", groups: groupByMonth(pending) });
    }
    if (filter !== "upcoming") {
      list.push({
        key: "history",
        title: `Geçmiş · son ${HISTORY_YEARS} yıl`,
        groups: groupByMonth(history),
      });
    }
    return list;
  }, [filter, pending, history]);

  return (
    <div className="app-container space-y-6">
      <PageHeader
        icon={Syringe}
        title="Aşı Takvimi"
        subtitle={`Koruma planı ve son ${HISTORY_YEARS} yılın kayıtları`}
        accent="mint"
      />

      {/* ---- Veri dosyasında okunamayan tarih uyarısı ---- */}
      {invalid.length > 0 && (
        <section
          role="alert"
          className="flex items-start gap-3.5 rounded-3xl border border-blush-200 bg-blush-50 p-4
                     dark:border-blush-500/20 dark:bg-blush-500/10"
        >
          <FileWarning className="h-5 w-5 shrink-0 text-blush-500" strokeWidth={2.2} />
          <div className="text-sm leading-relaxed text-ink-600 dark:text-ink-200">
            <p className="font-semibold">Okunamayan tarih</p>
            <ul className="mt-1 space-y-0.5">
              {invalid.map((item) => (
                <li key={`${item.series}-${item.value}`}>
                  {item.series}: <code className="font-mono text-xs">"{item.value}"</code>
                </li>
              ))}
            </ul>
            <p className="mt-1 text-xs text-ink-400">
              Tarihi <code className="font-mono">2026-10-28</code> biçiminde yazın.
            </p>
          </div>
        </section>
      )}

      {/* ---- Koruma özeti ---- */}
      <section
        className="surface p-5 animate-fade-up"
        aria-label="Koruma durumu"
      >
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="section-title">Koruma durumu</p>
            <p className="font-display text-3xl font-bold text-ink-800 dark:text-ink-50">
              %{protectionRate}
            </p>
          </div>
          <p className="text-right text-sm text-ink-400 dark:text-ink-400">
            {upToDate} / {series.length} tür güncel
          </p>
        </div>

        <div
          className="h-2.5 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-white/10"
          role="progressbar"
          aria-valuenow={protectionRate}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Güncel koruma oranı"
        >
          <div
            className={`h-full rounded-full transition-[width] duration-1000 ease-out ${
              overdue.length ? "bg-brand-gradient" : "bg-mint-gradient"
            }`}
            style={{ width: `${protectionRate}%` }}
          />
        </div>
      </section>

      {/* ---- Sayısal özet ---- */}
      <section className="grid grid-cols-3 gap-3 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <StatCard
          icon={ShieldCheck}
          label="Tamamlanan"
          value={history.length}
          hint={`Son ${HISTORY_YEARS} yıl`}
          tone="mint"
        />
        <StatCard
          icon={CalendarClock}
          label="Yaklaşan"
          value={pending.length - overdue.length}
          tone="brand"
        />
        <StatCard
          icon={AlertTriangle}
          label="Geciken"
          value={overdue.length}
          tone={overdue.length ? "blush" : "neutral"}
        />
      </section>

      {/* ---- Sıradaki doz vurgusu ---- */}
      {nextUp && (
        <section
          className={`relative overflow-hidden rounded-4xl p-5 text-white shadow-lift animate-fade-up ${
            nextUpStatus.key === "overdue" ? "bg-blush-gradient" : "bg-brand-gradient"
          }`}
          style={{ animationDelay: "160ms" }}
        >
          {/* Dekoratif ışık lekesi */}
          <span
            className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/20 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur">
              <CalendarHeart className="h-6 w-6" strokeWidth={2.2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                Sıradaki
              </p>
              <p className="truncate font-display text-lg font-bold">{nextUp.name}</p>
              <p className="text-sm text-white/90">
                {nextUp.date ? `${formatDateTR(nextUp.date)} · ` : ""}
                <span className="whitespace-nowrap font-semibold">
                  {formatDueLabel(nextUp.daysLeft)}
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setRecording(nextUp)}
              aria-label={`${nextUp.name} yapıldı olarak kaydet`}
              className="inline-flex shrink-0 items-center gap-1.5 self-center rounded-2xl bg-white/20 px-3 py-2
                         text-xs font-semibold backdrop-blur transition-colors hover:bg-white/30 active:scale-95"
            >
              <Check className="h-4 w-4" strokeWidth={2.6} />
              Yapıldı
            </button>
          </div>
        </section>
      )}

      {/* ---- Filtreler ---- */}
      <div
        className="flex gap-2 overflow-x-auto no-scrollbar animate-fade-up"
        style={{ animationDelay: "200ms" }}
        role="tablist"
        aria-label="Kayıt filtresi"
      >
        {FILTERS.map((item) => {
          const isActive = filter === item.key;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(item.key)}
              className={`shrink-0 rounded-2xl px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95 ${
                isActive
                  ? "bg-ink-800 text-white shadow-soft dark:bg-white dark:text-ink-900"
                  : "border border-ink-200 bg-white/70 text-ink-500 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-ink-300"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* ---- Zaman çizelgesi: önce sıradaki dozlar, sonra geçmiş ---- */}
      {sections.map((section) => (
        <section key={section.key} aria-label={section.title} className="space-y-7">
          {/* Tek bölüm gösterilirken başlık yalnızca ekran okuyuculara kalır */}
          <h2
            className={
              filter === "all"
                ? "font-display text-lg font-bold text-ink-800 dark:text-ink-50"
                : "sr-only"
            }
          >
            {section.title}
          </h2>

          {section.groups.length === 0 && (
            <div className="surface flex flex-col items-center gap-2 p-10 text-center">
              <CheckCheck className="h-8 w-8 text-ink-300" />
              <p className="text-sm text-ink-400">Bu filtrede kayıt bulunmuyor.</p>
            </div>
          )}

          {section.groups.map((group, groupIndex) => (
            <div
              key={group.key}
              className="animate-fade-up"
              style={{ animationDelay: `${groupIndex * 60}ms` }}
            >
              <h3 className="section-title mb-3 capitalize">{group.label}</h3>

              <ol className="relative ml-3 space-y-3 border-l-2 border-dashed border-ink-200 pl-6 dark:border-white/10">
                {group.items.map((item) => {
                  const status = getVaccineStatus(item.date, item.isCompleted);
                  const Icon = item.type === "parasite" ? Bug : Syringe;

                  return (
                    <li key={item.key} className="relative">
                      {/* Çizgi üzerindeki durum noktası */}
                      <span
                        className={`absolute -left-[31px] top-5 h-4 w-4 rounded-full border-4 ${status.dot}`}
                        aria-hidden="true"
                      />

                      <article className="surface flex items-start gap-3.5 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                        <span
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${status.chip}`}
                        >
                          <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
                        </span>

                        {/* Başlık sarabilsin diye durum rozeti sağ üste sabitlenir */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-display text-base font-bold leading-snug text-ink-800 dark:text-ink-50">
                              {item.name}
                            </h4>
                            <span className={`chip shrink-0 ${status.chip}`}>
                              {status.label}
                            </span>
                          </div>

                          {item.date && (
                            <p className="mt-1 text-xs text-ink-400 dark:text-ink-400">
                              {formatDateTR(item.date)}
                              <span className="hidden sm:inline">
                                {" · "}
                                <span className="capitalize">
                                  {formatWeekdayTR(item.date)}
                                </span>
                              </span>
                            </p>
                          )}

                          {!item.isCompleted && (
                            <>
                              {/* Son dozdan bu yana döngünün ne kadarı doldu */}
                              <div
                                className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-white/10"
                                aria-hidden="true"
                              >
                                <div
                                  className={`h-full rounded-full ${PROGRESS_TONE[status.key] ?? "bg-brand-400"}`}
                                  style={{ width: `${cycleProgress(item.series)}%` }}
                                />
                              </div>

                              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                                <p className="text-[11px] text-ink-400 dark:text-ink-400">
                                  {describeCycle(item.series)}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => setRecording(item)}
                                  aria-label={`${item.name} yapıldı olarak kaydet`}
                                  className="btn-ghost ml-auto gap-1.5 rounded-xl px-3 py-1.5 text-xs"
                                >
                                  <Check className="h-3.5 w-3.5 text-mint-500" strokeWidth={2.6} />
                                  Yapıldı
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </section>
      ))}

      {recording && (
        <QuickRecordSheet
          title={recording.name}
          every={recording.series.every}
          plannedDate={
            recording.series.next?.source === "planned" ? recording.series.next.record.raw : null
          }
          filePath={DATA_FILE}
          onClose={() => setRecording(null)}
        />
      )}
    </div>
  );
};

export default Vaccines;
