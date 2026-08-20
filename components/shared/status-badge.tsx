import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Variant = "default" | "secondary" | "destructive" | "outline" | "ghost";

const statusMap: Record<string, { label?: string; variant: Variant }> = {
  ready: { variant: "default" },
  live: { variant: "default" },
  applied: { variant: "default" },
  accepted: { variant: "default" },
  completed: { variant: "default" },
  published: { variant: "default" },
  connected: { variant: "default" },
  deploying: { variant: "outline" },
  in_progress: { variant: "outline" },
  queued: { variant: "outline" },
  processing: { variant: "outline" },
  rendering: { variant: "outline" },
  gap: { variant: "outline" },
  gap_detected: { variant: "outline", label: "Gap detected" },
  down: { variant: "destructive" },
  rejected: { variant: "destructive" },
  failed: { variant: "destructive" },
  error: { variant: "destructive" },
  expired: { variant: "destructive" },
  sleeping: { variant: "secondary" },
  draft: { variant: "secondary" },
  paused: { variant: "secondary" },
  saved: { variant: "secondary" },
  scheduled: { variant: "secondary" },
  screening: { variant: "secondary" },
  phone_screen: { variant: "secondary", label: "Phone screen" },
  interview: { variant: "outline" },
  technical: { variant: "outline" },
  hr: { variant: "secondary" },
  offer: { variant: "default" },
};

export function StatusBadge({
  status,
  className,
  map,
}: {
  status: string;
  className?: string;
  map?: Record<string, Variant>;
}) {
  const entry = map ? { variant: (map[status.toLowerCase()] ?? "secondary") as Variant } : (statusMap[status.toLowerCase()] ?? { variant: "secondary" as Variant });
  const label = entry.label ?? status.replace(/_/g, " ");
  return (
    <Badge variant={entry.variant} className={cn("capitalize", className)}>
      {label}
    </Badge>
  );
}