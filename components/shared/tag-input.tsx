"use client";

import { useState, KeyboardEvent } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function TagInput({
  tags,
  onChange,
  placeholder = "Type a tag and press Enter",
  suggestions,
  className,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  className?: string;
}) {
  const [input, setInput] = useState("");

  const add = (value: string) => {
    const v = value.trim().replace(/,$/, "");
    if (!v) return;
    if (tags.includes(v)) {
      setInput("");
      return;
    }
    onChange([...tags, v]);
    setInput("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(input);
    } else if (e.key === "Backspace" && !input && tags.length) {
      onChange(tags.slice(0, -1));
    }
  };

  const available = (suggestions ?? []).filter((s) => !tags.includes(s) && s.toLowerCase().includes(input.toLowerCase()));

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-lg border bg-transparent px-3 py-1.5 text-sm shadow-xs transition-colors",
          "border-[#2d3449] bg-[#0b1326] text-[#dae2fd] placeholder:text-[#908fa0] focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500/40"
        )}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-md bg-indigo-500/20 px-2 py-0.5 text-xs font-medium text-indigo-300 ring-1 ring-inset ring-indigo-500/30"
          >
            {tag}
            <button
              type="button"
              className="text-indigo-400 hover:text-white"
              onClick={() => onChange(tags.filter((t) => t !== tag))}
              aria-label={`Remove ${tag}`}
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => input.trim() && add(input)}
          placeholder={tags.length ? "" : placeholder}
          className="min-w-24 flex-1 bg-transparent text-sm text-[#dae2fd] outline-none placeholder:text-[#908fa0]"
        />
      </div>
      {available.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {available.slice(0, 6).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => add(s)}
              className="inline-flex items-center gap-1 rounded-full border border-[#2d3449] px-2 py-0.5 text-xs text-[#908fa0] transition-colors hover:border-indigo-500/60 hover:text-[#dae2fd]"
            >
              <Plus className="size-3" /> {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}