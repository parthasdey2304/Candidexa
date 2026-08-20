"use client";

import { useMemo } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

function renderLine(line: string, type: "add" | "remove") {
  return (
    <span className={cn("whitespace-pre-wrap", type === "add" ? "text-emerald-300" : "text-red-300")}>
      {line}
    </span>
  );
}

export function DiffPanel({
  before,
  after,
  filename,
  className,
}: {
  before: string;
  after: string;
  filename?: string;
  className?: string;
}) {
  const diff = useMemo(() => {
    const a = before.split("\n");
    const b = after.split("\n");
    const removed = a.filter((l, i) => b[i] !== l && !b.includes(l));
    const added = b.filter((l, i) => a[i] !== l && !a.includes(l));
    return { removed, added };
  }, [before, after]);

  return (
    <div className={cn("overflow-hidden rounded-xl border border-[#2d3449] bg-[#060e20]", className)}>
      <div className="flex items-center justify-between border-b border-[#2d3449] bg-[#0b1326] px-3 py-2">
        <span className="truncate font-mono text-xs text-[#908fa0]">{filename ?? "diff"}</span>
        <div className="flex shrink-0 items-center gap-2">
          <Badge variant="outline" className="gap-1 text-emerald-400">
            <Plus className="size-3" /> {diff.removed.length}
          </Badge>
          <Badge variant="outline" className="gap-1 text-red-400">
            <Minus className="size-3" /> {diff.added.length}
          </Badge>
        </div>
      </div>
      <div className="max-h-96 overflow-auto font-mono text-[12px] leading-relaxed">
        {diff.removed.map((line, i) => (
          <div key={`r-${i}`} className="flex gap-3 bg-red-500/10 px-3 py-0.5">
            <span className="w-8 shrink-0 select-none text-right text-red-400/60">-</span>
            {renderLine(line, "remove")}
          </div>
        ))}
        {diff.added.map((line, i) => (
          <div key={`a-${i}`} className="flex gap-3 bg-emerald-500/10 px-3 py-0.5">
            <span className="w-8 shrink-0 select-none text-right text-emerald-400/60">+</span>
            {renderLine(line, "add")}
          </div>
        ))}
        {diff.removed.length === 0 && diff.added.length === 0 && (
          <div className="flex gap-3 px-3 py-1.5 text-[#908fa0]">
            <span className="w-8 shrink-0 select-none text-right">~</span>
            <span>No changes between versions.</span>
          </div>
        )}
      </div>
    </div>
  );
}