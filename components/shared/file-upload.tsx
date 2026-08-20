"use client";

import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileText, X, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type UploadState = "idle" | "dragging" | "uploading" | "done" | "error";

export function FileUpload({
  label,
  accept = ".pdf,.doc,.docx",
  maxSizeMB = 10,
  state,
  onStateChange,
  onFile,
  fileName,
  className,
}: {
  label: string;
  accept?: string;
  maxSizeMB?: number;
  state: UploadState;
  onStateChange: (s: UploadState) => void;
  onFile?: (file: File) => void;
  fileName?: string | null;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    (list: FileList | null) => {
      const file = list?.[0];
      if (!file) return;
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File must be under ${maxSizeMB}MB`);
        onStateChange("error");
        return;
      }
      setError(null);
      onStateChange("uploading");
      onFile?.(file);
    },
    [maxSizeMB, onFile, onStateChange]
  );

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors",
          drag ? "border-indigo-400 bg-indigo-500/10" : "border-[#2d3449] bg-[#0b1326] hover:border-indigo-500/60 hover:bg-[#101a30]"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
        {state === "uploading" ? (
          <Loader2 className="size-8 animate-spin text-indigo-400" />
        ) : state === "done" ? (
          <CheckCircle2 className="size-8 text-emerald-400" />
        ) : state === "error" ? (
          <X className="size-8 text-red-400" />
        ) : (
          <UploadCloud className="size-8 text-indigo-400" />
        )}
        <div>
          <p className="text-sm font-medium text-[#dae2fd]">
            {state === "done" && fileName ? fileName : label}
          </p>
          <p className="mt-0.5 text-xs text-[#908fa0]">
            {state === "error" ? error : `Drag & drop or click — PDF, DOC, DOCX · max ${maxSizeMB}MB`}
          </p>
        </div>
        {state !== "done" && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white">
            <FileText className="size-3.5" /> Browse files
          </span>
        )}
      </button>
    </div>
  );
}