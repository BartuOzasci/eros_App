/**
 * Sayfaların ortak başlık bloğu: ikon rozeti, başlık ve açıklama.
 * @param {{ icon: React.ElementType, title: string, subtitle?: string, accent?: 'brand'|'blush'|'mint'|'sky' }} props
 */
const accents = {
  brand: "bg-brand-gradient",
  blush: "bg-blush-gradient",
  mint: "bg-mint-gradient",
  sky: "bg-sky-gradient",
};

const PageHeader = ({ icon: Icon, title, subtitle, accent = "brand" }) => (
  <header className="mb-6 flex items-center gap-4 animate-fade-up">
    {Icon && (
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-3xl text-white shadow-soft ${accents[accent]}`}
      >
        <Icon className="h-6 w-6" strokeWidth={2.2} />
      </span>
    )}

    <div className="min-w-0">
      <h1 className="font-display text-2xl font-bold text-ink-800 dark:text-ink-50 sm:text-3xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-0.5 text-sm text-ink-400 dark:text-ink-400">{subtitle}</p>
      )}
    </div>
  </header>
);

export default PageHeader;
