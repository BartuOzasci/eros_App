import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Scissors,
  CalendarCheck,
  CalendarPlus,
  Sparkles,
  Lightbulb,
  Phone,
  History,
} from "lucide-react";
import { groomerData } from "../data/groomerData";
import PageHeader from "../components/common/PageHeader";
import ProgressRing from "../components/common/ProgressRing";
import StatCard from "../components/common/StatCard";
import {
  calculateDaysPassed,
  diffInDays,
  formatDateTR,
  formatIntervalAdjective,
  formatRelativeDays,
  formatWeekdayTR,
} from "../utils/dateHelpers";
import { HISTORY_YEARS, resolveSeries } from "../utils/schedule";

/** Kalan güne göre halka rengini ve mesajı belirler. */
const resolveStatus = (remaining) => {
  if (remaining < 0) {
    return {
      key: "due",
      title: "Randevu zamanı geldi",
      message: `Önerilen aralık ${Math.abs(remaining)} gün önce doldu. Kuaförü aramak için iyi bir zaman.`,
      from: "#FFA6B8",
      to: "#F05377",
      tone: "blush",
    };
  }

  if (remaining <= 14) {
    return {
      key: "soon",
      title: "Yaklaşıyor",
      message: `Önerilen tıraş tarihine ${remaining} gün kaldı. Randevu almak için erken sayılmaz.`,
      from: "#F6B87C",
      to: "#E9822F",
      tone: "brand",
    };
  }

  return {
    key: "ok",
    title: "Her şey yolunda",
    message: "Tüyler henüz yeni. Ara bakım için tarama yeterli.",
    from: "#B0E8CD",
    to: "#2BA372",
    tone: "mint",
  };
};

const Groomer = () => {
  const groomer = useMemo(
    () =>
      resolveSeries({
        id: "kuafor",
        name: "Kuaför",
        every: groomerData.every,
        records: groomerData.visits,
      }),
    [],
  );

  const lastVisit = groomer.lastDone?.date ?? null;
  const nextVisit = groomer.next?.date ?? null;
  const isAppointment = groomer.next?.source === "planned";
  const cycleLabel = formatIntervalAdjective(groomer.every);
  const daysPassed = lastVisit ? calculateDaysPassed(lastVisit) : 0;
  /* Randevu varsa döngü randevuya kadar sürer, yoksa önerilen aralık kadar */
  const interval = groomer.cycleDays || 1;
  const remaining = groomer.daysLeft ?? 0;
  const progress = lastVisit ? Math.min((daysPassed / interval) * 100, 100) : 0;
  const status = resolveStatus(remaining);

  /* Ziyaret geçmişi, en yeni başta; her satırda bir önceki ziyaretten bu yana geçen süre */
  const visits = groomer.history
    .map((visit) => {
      const previous = groomer.done[groomer.done.indexOf(visit) - 1];
      return { ...visit, gap: previous ? diffInDays(previous.date, visit.date) : null };
    })
    .reverse();
  const gaps = visits.map((visit) => visit.gap).filter((gap) => gap !== null);
  const averageGap = gaps.length
    ? Math.round(gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length)
    : null;

  return (
    <div className="app-container space-y-6">
      <PageHeader
        icon={Scissors}
        title="Kuaför Takibi"
        subtitle={`${cycleLabel} bakım döngüsü`}
        accent="blush"
      />

      {/* ---- İlerleme halkası ---- */}
      <section className="surface flex flex-col items-center px-6 py-8 animate-fade-up">
        <ProgressRing
          value={progress}
          size={216}
          stroke={16}
          from={status.from}
          to={status.to}
          gradientId="groomer-ring"
        >
          <div className="flex flex-col items-center">
            <span className="font-display text-5xl font-bold text-ink-800 dark:text-ink-50">
              {lastVisit ? daysPassed : "—"}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">
              gün geçti
            </span>
            <span className="mt-2 text-[11px] text-ink-300 dark:text-ink-500">
              {lastVisit ? `${interval} günlük döngü` : "Henüz ziyaret yok"}
            </span>
          </div>
        </ProgressRing>

        <div className="mt-6 max-w-sm text-center">
          <span
            className={`chip ${
              status.tone === "mint"
                ? "bg-mint-100 text-mint-600 dark:bg-mint-500/15 dark:text-mint-300"
                : status.tone === "brand"
                  ? "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                  : "bg-blush-100 text-blush-600 dark:bg-blush-500/15 dark:text-blush-300"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {status.title}
          </span>
          <p className="mt-3 text-sm leading-relaxed text-ink-500 dark:text-ink-300">
            {status.message}
          </p>
        </div>
      </section>

      {/* ---- Tarihler ---- */}
      <section
        className="grid grid-cols-2 gap-3 animate-fade-up"
        style={{ animationDelay: "80ms" }}
      >
        <StatCard
          icon={CalendarCheck}
          label="Son ziyaret"
          value={formatDateTR(lastVisit)}
          hint={lastVisit ? `${daysPassed} gün önce` : undefined}
          tone="neutral"
        />
        <StatCard
          icon={CalendarPlus}
          label={isAppointment ? "Randevu" : "Önerilen tarih"}
          value={formatDateTR(nextVisit)}
          hint={nextVisit ? formatRelativeDays(nextVisit) : undefined}
          tone={status.tone}
        />
      </section>

      {/* ---- Ziyaret geçmişi ---- */}
      <section
        className="surface p-5 animate-fade-up"
        style={{ animationDelay: "120ms" }}
        aria-labelledby="groomer-history-title"
      >
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2
            id="groomer-history-title"
            className="flex items-center gap-2 font-display text-base font-bold text-ink-800 dark:text-ink-50"
          >
            <History className="h-[18px] w-[18px] text-blush-500" />
            Ziyaret geçmişi
          </h2>
          {averageGap && (
            <p className="text-xs font-medium text-ink-400">Ortalama {averageGap} günde bir</p>
          )}
        </div>

        {visits.length === 0 ? (
          <p className="text-sm text-ink-400">Son {HISTORY_YEARS} yılda kayıtlı ziyaret yok.</p>
        ) : (
          <ol className="divide-y divide-ink-100 dark:divide-white/5">
            {visits.map((visit, index) => (
              <li key={visit.key} className="flex items-center gap-3 py-2.5">
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                    index === 0 ? "bg-blush-400" : "bg-ink-200 dark:bg-white/15"
                  }`}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink-700 dark:text-ink-100">
                    {formatDateTR(visit.date)}
                  </p>
                  <p className="text-xs capitalize text-ink-400">{formatWeekdayTR(visit.date)}</p>
                </div>
                <span className="chip shrink-0 bg-ink-100 text-ink-500 dark:bg-white/5 dark:text-ink-300">
                  {visit.gap === null ? "İlk kayıt" : `${visit.gap} gün ara`}
                </span>
              </li>
            ))}
          </ol>
        )}

        <p className="mt-3 text-[11px] text-ink-300 dark:text-ink-500">
          Son {HISTORY_YEARS} yılın ziyaretleri listelenir.
        </p>
      </section>

      {/* ---- Salon ve hizmetler ---- */}
      <section
        className="surface p-5 animate-fade-up"
        style={{ animationDelay: "160ms" }}
      >
        <h2 className="section-title mb-1">Salon</h2>
        <p className="font-display text-lg font-bold text-ink-800 dark:text-ink-50">
          {groomerData.salon}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {groomerData.services.map((service) => (
            <li
              key={service}
              className="chip bg-ink-100 text-ink-600 dark:bg-white/5 dark:text-ink-200"
            >
              {service}
            </li>
          ))}
        </ul>

        <Link to="/contact" className="btn-primary mt-5 w-full">
          <Phone className="h-4 w-4" />
          Randevu için ara
        </Link>
      </section>

      {/* ---- Bakım ipuçları ---- */}
      <section
        className="surface p-5 animate-fade-up"
        style={{ animationDelay: "240ms" }}
      >
        <h2 className="mb-3 flex items-center gap-2 font-display text-base font-bold text-ink-800 dark:text-ink-50">
          <Lightbulb className="h-[18px] w-[18px] text-brand-500" />
          Ara bakım ipuçları
        </h2>

        <ul className="space-y-2.5">
          {groomerData.tips.map((tip) => (
            <li
              key={tip}
              className="flex gap-3 text-sm leading-relaxed text-ink-500 dark:text-ink-300"
            >
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"
                aria-hidden="true"
              />
              {tip}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Groomer;
