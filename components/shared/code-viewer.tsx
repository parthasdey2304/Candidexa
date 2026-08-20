"use client";

import { useState } from "react";
import { Check, Copy, Terminal, FileCode2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CodeViewer({
  code,
  language = "text",
  title,
  className,
}: {
  code: string;
  language?: string;
  title?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className={cn("overflow-hidden rounded-xl border border-[#2d3449] bg-[#060e20]", className)}>
      <div className="flex items-center justify-between border-b border-[#2d3449] bg-[#0b1326] px-3 py-2">
        <div className="flex items-center gap-2 text-xs text-[#908fa0]">
          <FileCode2 className="size-3.5" />
          <span>{title ?? language}</span>
        </div>
        <Button variant="ghost" size="sm" className="h-6 gap-1 text-xs text-[#908fa0] hover:bg-[#171f33] hover:text-white" onClick={() => void copy()}>
          {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="max-h-96 overflow-auto p-4 text-[13px] leading-relaxed text-[#dae2fd]">
        <code className="font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

export function SimpleCodeBlock({ code, className }: { code: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-lg border border-[#2d3449] bg-[#060e20]", className)}>
      <div className="flex items-center gap-1.5 border-b border-[#2d3449] bg-[#0b1326] px-3 py-2" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-red-500/70" />
        <span className="size-2.5 rounded-full bg-amber-500/70" />
        <span className="size-2.5 rounded-full bg-emerald-500/70" />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-[#dae2fd]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function TerminalBlock({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-[#2d3449] bg-[#060e20] font-mono text-[12px] leading-relaxed text-emerald-300", className)}>
      <div className="flex items-center gap-1.5 border-b border-[#2d3449] bg-[#0b1326] px-3 py-2">
        <Terminal className="size-3.5 text-[#908fa0]" />
        <span className="text-xs text-[#908fa0]">Terminal</span>
      </div>
      <div className="p-4">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">{line}</div>
        ))}
      </div>
    </div>
  );
}