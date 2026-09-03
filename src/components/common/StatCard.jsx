const tones = {
  brand: {
    badge: "bg-brand-100 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300",
    value: "text-brand-600 dark:text-brand-300",
  },
  blush: {
    badge: "bg-blush-100 text-blush-600 dark:bg-blush-500/15 dark:text-blush-300",
    value: "text-blush-600 dark:text-blush-300",
  },
  mint: {
    badge: "bg-mint-100 text-mint-600 dark:bg-mint-500/15 dark:text-mint-300",
    value: "text-mint-600 dark:text-mint-300",
  },
  sky: {
    badge: "bg-sky-100 text-sky-500 dark:bg-sky-500/15 dark:text-sky-300",
    value: "text-sky-500 dark:text-sky-300",
  },
  neutral: {
    badge: "bg-ink-100 text-ink-500 dark:bg-white/5 dark:text-ink-300",
    value: "text-ink-700 dark:text-ink-100",
  },
};

/**
 * Küçük istatistik kartı: ikon rozeti + değer + etiket.
 * @param {{ icon?: React.ElementType, label: string, value: string|number, hint?: string, tone?: keyof tones }} props
 */
const StatCard = ({ icon: Icon, label, value, hint, tone = "brand" }) => {
  const palette = tones[tone] ?? tones.brand;

  return (
    <div className="surface-flat flex flex-col gap-2 p-4 transition-transform duration-300 hover:-translate-y-0.5">
      {Icon && (
        <span className={`grid h-9 w-9 place-items-center rounded-2xl ${palette.badge}`}>
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
        </span>
      )}

      <div>
        <p className={`font-display text-xl font-bold leading-tight ${palette.value}`}>
          {value}
        </p>
        <p className="mt-0.5 text-xs font-medium text-ink-400 dark:text-ink-400">
          {label}
        </p>
        {hint && (
          <p className="mt-1 text-[11px] text-ink-300 dark:text-ink-500">{hint}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
