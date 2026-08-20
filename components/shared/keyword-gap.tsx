"use client";

import { useMemo, useState } from "react";
import { Check, CircleAlert, CircleMinus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type KeywordState = "present" | "missing" | "weak";

export function KeywordGapTable({
  keywords,
  present,
  weak,
  onToggle,
  className,
  compact = false,
}: {
  keywords: string[];
  present: string[];
  weak: string[];
  onToggle?: (keyword: string) => void;
  className?: string;
  compact?: boolean;
}) {
  const [active, setActive] = useState<string | null>(null);

  const counts = useMemo(() => {
    const keep = keywords.filter((k) => present.includes(k));
    const missing = keywords.filter((k) => !present.includes(k) && !weak.includes(k));
    const weakies = keywords.filter((k) => weak.includes(k));
    return { keep, missing, weakies };
  }, [keywords, present, weak]);

  const stateFor = (k: string): KeywordState => {
    if (present.includes(k)) return "present";
    if (weak.includes(k)) return "weak";
    return "missing";
  };

  const rowClass = () => {
    if (onToggle) return "cursor-pointer transition-colors hover:bg-white/[0.03]";
    return "";
  };

  return (
    <div className={cn("overflow-hidden rounded-xl border border-[#2d3449] bg-[#0b1326]", className)}>
      <div className="flex items-center gap-3 border-b border-[#2d3449] px-3 py-2 text-xs text-[#908fa0]">
        <span className="inline-flex items-center gap-1 text-emerald-400">
          <Check className="size-3.5" /> {counts.keep.length}
        </span>
        <span className="inline-flex items-center gap-1 text-amber-400">
          <CircleAlert className="size-3.5" /> {counts.weakies.length}
        </span>
        <span className="inline-flex items-center gap-1 text-red-400">
          <CircleMinus className="size-3.5" /> {counts.missing.length}
        </span>
      </div>
      <div className="divide-y divide-[#1c2440]">
        {keywords.map((keyword) => {
          const state = stateFor(keyword);
          return (
            <button
              key={keyword}
              type="button"
              disabled={!onToggle}
              onClick={() => onToggle?.(keyword)}
              onMouseEnter={() => setActive(keyword)}
              onMouseLeave={() => setActive(null)}
              className={cn("flex w-full items-center justify-between gap-2 px-3 py-1.5 text-left text-sm", rowClass(), onToggle && active === keyword && "bg-white/[0.03]")}
            >
              <span className="truncate text-[#dae2fd]">{keyword}</span>
              {state === "present" && (
                <Badge className="shrink-0 bg-emerald-500/15 text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
                  <Check className="size-3" /> Present
                </Badge>
              )}
              {state === "weak" && (
                <Badge className="shrink-0 bg-amber-500/15 text-amber-400 ring-1 ring-inset ring-amber-500/30">
                  <CircleAlert className="size-3" /> Weak
                </Badge>
              )}
              {state === "missing" && (
                <Badge className="shrink-0 bg-red-500/15 text-red-400 ring-1 ring-inset ring-red-500/30">
                  <CircleMinus className="size-3" /> Missing
                </Badge>
              )}
            </button>
          );
        })}
      </div>
      {!compact && keywords.length === 0 && <p className="p-4 text-sm text-[#908fa0]">No keywords analyzed yet.</p>}
    </div>
  );
}