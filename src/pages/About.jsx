import { Link } from "react-router-dom";
import {
  Cake,
  Dog,
  Weight,
  Palette,
  Syringe,
  Scissors,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { aboutData } from "../data/aboutData";
import { vaccinesData } from "../data/vaccinesData";
import { groomerData } from "../data/groomerData";
import StatCard from "../components/common/StatCard";
import {
  calculateAge,
  calculateDaysPassed,
  daysUntilBirthday,
  formatDateTR,
  formatRelativeDays,
  getNextRecord,
} from "../utils/dateHelpers";

const FALLBACK_IMAGE =
  "https://placehold.co/400x400/F19B51/ffffff.png?text=Eros";

const About = () => {
  const age = calculateAge(aboutData.dob);
  const birthdayIn = daysUntilBirthday(aboutData.dob);
  const nextVaccine = getNextRecord(vaccinesData);
  const groomerDays = calculateDaysPassed(groomerData.lastVisit);

  return (
    <div className="app-container space-y-6">
      {/* ---- Profil kartı ---- */}
      <section className="surface relative overflow-hidden animate-fade-up">
        {/* Fotoğrafın bulanıklaştırılmış hali, kartın atmosferini oluşturur */}
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={aboutData.image}
            alt=""
            className="h-full w-full scale-125 object-cover opacity-40 blur-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/85 to-white dark:from-night-800/70 dark:via-night-800/90 dark:to-night-800" />
        </div>

        <div className="relative flex flex-col items-center px-6 pb-8 pt-10 text-center">
          <div className="relative">
            {/* Avatarın arkasında yumuşak sıcak ışık halesi */}
            <span
              className="absolute -inset-4 rounded-full bg-brand-300/40 blur-2xl dark:bg-brand-500/25"
              aria-hidden="true"
            />
            <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-white shadow-lift dark:ring-night-700 sm:h-36 sm:w-36">
              <img
                src={aboutData.image}
                alt={`${aboutData.name} profil fotoğrafı`}
                /* Hafif yakınlaştırma, karenin kenarındaki dağınık arka planı dışarıda bırakır */
                className="h-full w-full scale-[1.22] object-cover object-center"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
              />
            </div>
          </div>

          <h1 className="mt-5 font-display text-4xl font-bold text-ink-800 dark:text-ink-50">
            {aboutData.name}
          </h1>

          <p className="mt-1.5 text-sm font-medium text-brand-600 dark:text-brand-300">
            {aboutData.breed} · {aboutData.gender} · {age.label}
          </p>

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500 dark:text-ink-300">
            {aboutData.bio}
          </p>

          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {aboutData.traits.map((trait) => (
              <li
                key={trait}
                className="chip bg-white/80 text-ink-600 shadow-soft dark:bg-white/5 dark:text-ink-200"
              >
                <Sparkles className="h-3.5 w-3.5 text-brand-400" />
                {trait}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Künye ---- */}
      <section
        className="animate-fade-up"
        style={{ animationDelay: "80ms" }}
        aria-label="Eros'un künyesi"
      >
        <h2 className="section-title mb-3">Künye</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            icon={Cake}
            label="Yaş"
            value={age.label}
            hint={formatDateTR(aboutData.dob)}
            tone="blush"
          />
          <StatCard icon={Dog} label="Irk" value={aboutData.breed} tone="brand" />
          <StatCard
            icon={Weight}
            label="Ağırlık"
            value={aboutData.weight}
            tone="sky"
          />
          <StatCard
            icon={Palette}
            label="Tüy Rengi"
            value={aboutData.color}
            tone="mint"
          />
        </div>
      </section>

      {/* ---- Bakım özeti ---- */}
      <section className="animate-fade-up" style={{ animationDelay: "160ms" }}>
        <h2 className="section-title mb-3">Bir Bakışta</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            to="/vaccines"
            className="surface group flex items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mint-gradient text-white shadow-soft">
              <Syringe className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                Sıradaki aşı
              </p>
              <p className="truncate font-display text-base font-bold text-ink-800 dark:text-ink-50">
                {nextVaccine ? nextVaccine.name : "Planlanmış kayıt yok"}
              </p>
              {nextVaccine && (
                <p className="text-xs text-ink-400 dark:text-ink-400">
                  {formatDateTR(nextVaccine.date)} ·{" "}
                  <span className="font-semibold text-brand-600 dark:text-brand-300">
                    {formatRelativeDays(nextVaccine.date)}
                  </span>
                </p>
              )}
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-ink-300 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            to="/groomer"
            className="surface group flex items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blush-gradient text-white shadow-soft">
              <Scissors className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                Son kuaför
              </p>
              <p className="font-display text-base font-bold text-ink-800 dark:text-ink-50">
                {groomerDays} gün önce
              </p>
              <p className="text-xs text-ink-400 dark:text-ink-400">
                {formatDateTR(groomerData.lastVisit)}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-ink-300 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ---- Doğum günü sayacı ---- */}
      {birthdayIn !== null && (
        <section
          className="surface flex items-center gap-4 overflow-hidden p-5 animate-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white shadow-soft">
            <Cake className="h-6 w-6" strokeWidth={2.2} />
          </span>
          <div>
            <p className="font-display text-base font-bold text-ink-800 dark:text-ink-50">
              {birthdayIn === 0
                ? `Bugün ${aboutData.name}'un doğum günü! 🎉`
                : `Doğum gününe ${birthdayIn} gün kaldı`}
            </p>
            <p className="text-xs text-ink-400 dark:text-ink-400">
              {aboutData.tagline}
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default About;
