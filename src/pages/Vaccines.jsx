import { useMemo, useState } from "react";
import {
  Syringe,
  ShieldCheck,
  CalendarClock,
  AlertTriangle,
  Bug,
  CheckCheck,
  CalendarHeart,
} from "lucide-react";
import { vaccinesData } from "../data/vaccinesData";
import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/common/StatCard";
import {
  formatDateTR,
  formatRelativeDays,
  formatWeekdayTR,
  getCurrentYear,
  getNextRecord,
  getOverdueRecords,
  getVaccineStatus,
} from "../utils/dateHelpers";

const FILTERS = [
  { key: "all", label: "Tümü" },
  { key: "upcoming", label: "Yaklaşan" },
  { key: "completed", label: "Tamamlanan" },
];

/** Ay başlığı için "Nisan 2026" biçimli etiket üretir. */
const monthLabel = (dateString) =>
  new Date(dateString).toLocaleDateString("tr-TR", {
    month: "long",
    year: "numeric",
  });

const Vaccines = () => {
  const [filter, setFilter] = useState("all");

  const sorted = useMemo(
    () => [...vaccinesData].sort((a, b) => new Date(a.date) - new Date(b.date)),
    [],
  );

  const completedCount = sorted.filter((item) => item.isCompleted).length;
  const overdue = getOverdueRecords(sorted);
  const nextRecord = getNextRecord(sorted);
  const completionRate = sorted.length
    ? Math.round((completedCount / sorted.length) * 100)
    : 0;

  const visible = useMemo(() => {
    if (filter === "completed") return sorted.filter((i) => i.isCompleted);
    if (filter === "upcoming") return sorted.filter((i) => !i.isCompleted);
    return sorted;
  }, [filter, sorted]);

  /* Zaman çizelgesini aylara böler: [{ label, items }] */
  const grouped = useMemo(() => {
    const map = new Map();
    visible.forEach((item) => {
      const key = item.date.slice(0, 7);
      if (!map.has(key)) map.set(key, { label: monthLabel(item.date), items: [] });
      map.get(key).items.push(item);
    });
    return [...map.values()];
  }, [visible]);

  return (
    <div className="app-container space-y-6">
      <PageHeader
        icon={Syringe}
        title="Aşı Takvimi"
        subtitle={`${getCurrentYear()} yılı koruma ve aşı planı`}
        accent="mint"
      />

      {/* ---- Tamamlanma özeti ---- */}
      <section
        className="surface p-5 animate-fade-up"
        aria-label="Takvim ilerlemesi"
      >
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="section-title">Tamamlanma</p>
            <p className="font-display text-3xl font-bold text-ink-800 dark:text-ink-50">
              %{completionRate}
            </p>
          </div>
          <p className="text-sm text-ink-400 dark:text-ink-400">
            {completedCount} / {sorted.length} kayıt
          </p>
        </div>

        <div
          className="h-2.5 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-white/10"
          role="progressbar"
          aria-valuenow={completionRate}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Tamamlanan kayıt oranı"
        >
          <div
            className="h-full rounded-full bg-mint-gradient transition-[width] duration-1000 ease-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </section>

      {/* ---- Sayısal özet ---- */}
      <section className="grid grid-cols-3 gap-3 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <StatCard
          icon={ShieldCheck}
          label="Tamamlanan"
          value={completedCount}
          tone="mint"
        />
        <StatCard
          icon={CalendarClock}
          label="Planlanan"
          value={sorted.length - completedCount}
          tone="brand"
        />
        <StatCard
          icon={AlertTriangle}
          label="Geciken"
          value={overdue.length}
          tone={overdue.length ? "blush" : "neutral"}
        />
      </section>

      {/* ---- Sıradaki kayıt vurgusu ---- */}
      {nextRecord && (
        <section
          className="relative overflow-hidden rounded-4xl bg-brand-gradient p-5 text-white shadow-lift animate-fade-up"
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
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                Sıradaki
              </p>
              <p className="truncate font-display text-lg font-bold">
                {nextRecord.name}
              </p>
              <p className="text-sm text-white/90">
                {formatDateTR(nextRecord.date)} · {formatRelativeDays(nextRecord.date)}
              </p>
            </div>
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

      {/* ---- Zaman çizelgesi ---- */}
      <section aria-label="Aşı zaman çizelgesi" className="space-y-7">
        {grouped.length === 0 && (
          <div className="surface flex flex-col items-center gap-2 p-10 text-center">
            <CheckCheck className="h-8 w-8 text-ink-300" />
            <p className="text-sm text-ink-400">Bu filtrede kayıt bulunmuyor.</p>
          </div>
        )}

        {grouped.map((group, groupIndex) => (
          <div key={group.label} className="animate-fade-up" style={{ animationDelay: `${groupIndex * 60}ms` }}>
            <h2 className="section-title mb-3 capitalize">{group.label}</h2>

            <ol className="relative ml-3 space-y-3 border-l-2 border-dashed border-ink-200 pl-6 dark:border-white/10">
              {group.items.map((item) => {
                const status = getVaccineStatus(item.date, item.isCompleted);
                const Icon = item.type === "parasite" ? Bug : Syringe;

                return (
                  <li key={item.id} className="relative">
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
                          <h3 className="font-display text-base font-bold leading-snug text-ink-800 dark:text-ink-50">
                            {item.name}
                          </h3>
                          <span className={`chip shrink-0 ${status.chip}`}>
                            {status.label}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-ink-400 dark:text-ink-400">
                          {formatDateTR(item.date)}
                          <span className="hidden sm:inline">
                            {" · "}
                            <span className="capitalize">
                              {formatWeekdayTR(item.date)}
                            </span>
                          </span>
                        </p>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Vaccines;
