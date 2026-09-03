import { useState } from "react";
import {
  Stethoscope,
  Scissors,
  Phone,
  MapPin,
  Copy,
  Check,
  ShieldAlert,
} from "lucide-react";
import { contactData } from "../data/contactData";
import PageHeader from "../components/common/PageHeader";

/** tel: bağlantısı için numaradaki boşluk ve parantezleri temizler. */
const toDialable = (phone) => phone.replace(/[^\d+]/g, "");

const ContactCard = ({ icon: Icon, data, gradient, delay = 0 }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(toDialable(data.phone));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Pano izni yoksa sessizce geç — arama bağlantısı hâlâ çalışıyor */
    }
  };

  return (
    <article
      className="surface overflow-hidden animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4 p-5">
        <span
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-3xl text-white shadow-soft ${gradient}`}
        >
          <Icon className="h-7 w-7" strokeWidth={2.1} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">
            {data.role}
          </p>
          <h2 className="mt-0.5 font-display text-lg font-bold leading-snug text-ink-800 dark:text-ink-50">
            {data.name}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-400 dark:text-ink-400">
            {data.note}
          </p>
        </div>
      </div>

      <div className="space-y-2.5 px-5 pb-5">
        {/* Numara satırı: dokununca arar, sağdaki buton panoya kopyalar */}
        <div className="flex items-stretch gap-2">
          <a
            href={`tel:${toDialable(data.phone)}`}
            className="flex flex-1 items-center gap-3 rounded-2xl bg-ink-50 px-4 py-3 text-sm font-semibold
                       text-ink-700 transition-colors hover:bg-ink-100 dark:bg-white/5 dark:text-ink-100 dark:hover:bg-white/10"
          >
            <Phone className="h-4 w-4 shrink-0 text-mint-500" />
            <span className="truncate">{data.phone}</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            aria-label={`${data.name} numarasını kopyala`}
            className="grid w-12 shrink-0 place-items-center rounded-2xl bg-ink-50 text-ink-500
                       transition-colors hover:bg-ink-100 active:scale-95 dark:bg-white/5
                       dark:text-ink-300 dark:hover:bg-white/10"
          >
            {copied ? (
              <Check className="h-4 w-4 text-mint-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>

        <a
          href={data.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary w-full"
        >
          <MapPin className="h-4 w-4" />
          Haritada Aç
        </a>
      </div>
    </article>
  );
};

const Contact = () => (
  <div className="app-container space-y-5">
    <PageHeader
      icon={Phone}
      title="İletişim"
      subtitle="Veteriner ve kuaföre tek dokunuşla ulaşın"
      accent="sky"
    />

    <ContactCard
      icon={Stethoscope}
      data={contactData.vet}
      gradient="bg-sky-gradient"
    />

    <ContactCard
      icon={Scissors}
      data={contactData.groomer}
      gradient="bg-blush-gradient"
      delay={80}
    />

    {/* ---- Acil durum hatırlatması ---- */}
    <section
      className="flex items-start gap-3.5 rounded-3xl border border-blush-200 bg-blush-50 p-4
                 animate-fade-up dark:border-blush-500/20 dark:bg-blush-500/10"
      style={{ animationDelay: "160ms" }}
    >
      <ShieldAlert className="h-5 w-5 shrink-0 text-blush-500" strokeWidth={2.2} />
      <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-200">
        <strong className="font-semibold">Acil durumda</strong> önce veterineri
        arayın. Kliniğe gitmeden önce telefonla bilgi vermek, hazırlık yapılmasını
        sağlar.
      </p>
    </section>
  </div>
);

export default Contact;
