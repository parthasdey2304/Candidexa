import { cn } from "@/lib/utils";

export function ScoreGauge({
  value,
  size = 160,
  label = "ATS Score",
  sub,
  className,
}: {
  value: number;
  size?: number;
  label?: string;
  sub?: string;
  className?: string;
}) {
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - Math.min(Math.max(value, 0), 100) / 100);
  const color = value >= 80 ? "#22d3ee" : value >= 60 ? "#a78bfa" : "#f87171";

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }} role="img" aria-label={`${label}: ${value}%`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(148,163,184,0.2)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-foreground">{Math.round(value)}%</span>
        {label ? <span className="text-xs text-muted-foreground">{label}</span> : null}
        {sub ? <span className="text-xs text-muted-foreground">{sub}</span> : null}
      </div>
    </div>
  );
}