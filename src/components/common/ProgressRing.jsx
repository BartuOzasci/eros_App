/**
 * SVG dairesel ilerleme göstergesi.
 * @param {{ value: number, size?: number, stroke?: number, from?: string, to?: string,
 *           label?: string, caption?: string, children?: React.ReactNode }} props
 * @param value 0-100 arası doluluk yüzdesi.
 */
const ProgressRing = ({
  value,
  size = 200,
  stroke = 14,
  from = "#F6B87C",
  to = "#E9822F",
  gradientId = "ring-gradient",
  children,
}) => {
  const safeValue = Math.min(Math.max(Number(value) || 0, 0), 100);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - safeValue / 100);

  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Doluluk: %${Math.round(safeValue)}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>

        {/* Arka plan halkası */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="stroke-ink-100 dark:stroke-white/10"
        />

        {/* Dolu kısım — mount olduğunda animasyonla dolar */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>

      <div className="absolute inset-0 grid place-items-center text-center">
        {children}
      </div>
    </div>
  );
};

export default ProgressRing;
