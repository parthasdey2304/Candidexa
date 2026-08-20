import { cn } from "@/lib/utils";

export function UsageGauge({
  used,
  limit,
  period = "month",
  className,
}: {
  used: number;
  limit: number;
  period?: string;
  className?: string;
}) {
  const pct = Math.min(100, Math.round((used / Math.max(limit, 1)) * 100));
  const mid = pct >= 50 && pct < 85;
  const high = pct >= 85;
  const barColor = high ? "bg-red-500" : mid ? "bg-amber-500" : "bg-emerald-500";

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">AI credits this {period}</span>
        <span className="font-medium text-foreground">
          {used} / {limit}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`AI credits used: ${used} of ${limit}`}>
        <div className={cn("h-full rounded-full transition-all duration-500", barColor)} style={{ width: `${pct}%` }} />
      </div>
      {high && (
        <p className="text-xs text-amber-500">You are nearing your monthly limit. Upgrade to keep the AI engines running.</p>
      )}
    </div>
  );
}

export function PlanBadge({ plan, className }: { plan: string | null | undefined; className?: string }) {
  const isPro = plan === "pro" || plan === "paid" || plan === "candidate";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ring-inset",
        isPro
          ? "bg-indigo-500/20 text-indigo-300 ring-indigo-500/40"
          : "bg-muted text-muted-foreground ring-white/10",
        className
      )}
    >
      {isPro ? "PRO" : "FREE"}
    </span>
  );
}