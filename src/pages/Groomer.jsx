import { Link } from "react-router-dom";
import {
  Scissors,
  CalendarCheck,
  CalendarPlus,
  Sparkles,
  Lightbulb,
  Phone,
} from "lucide-react";
import { groomerData } from "../data/groomerData";
import PageHeader from "../components/common/PageHeader";
import ProgressRing from "../components/common/ProgressRing";
import StatCard from "../components/common/StatCard";
import {
  addDays,
  calculateDaysPassed,
  daysUntil,
  formatDateTR,
  formatRelativeDays,
} from "../utils/dateHelpers";

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
  const daysPassed = calculateDaysPassed(groomerData.lastVisit);
  const interval = groomerData.intervalDays;
  const nextVisit = addDays(groomerData.lastVisit, interval);
  const remaining = daysUntil(nextVisit);
  const progress = Math.min((daysPassed / interval) * 100, 100);
  const status = resolveStatus(remaining);

  return (
    <div className="app-container space-y-6">
      <PageHeader
        icon={Scissors}
        title="Kuaför Takibi"
        subtitle={`${interval} günlük bakım döngüsü`}
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
              {daysPassed}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">
              gün geçti
            </span>
            <span className="mt-2 text-[11px] text-ink-300 dark:text-ink-500">
              {interval} günlük döngü
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
          value={formatDateTR(groomerData.lastVisit)}
          hint={`${daysPassed} gün önce`}
          tone="neutral"
        />
        <StatCard
          icon={CalendarPlus}
          label="Önerilen tarih"
          value={formatDateTR(nextVisit)}
          hint={formatRelativeDays(nextVisit)}
          tone={status.tone}
        />
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
