"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
  persistent?: boolean;
}

interface ToastContextValue {
  toast: (input: Omit<ToastItem, "id">) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const variantStyles: Record<ToastVariant, string> = {
  success: "border-emerald-500/25 bg-emerald-500/10 text-emerald-50",
  error: "border-red-500/25 bg-red-500/10 text-red-50",
  warning: "border-amber-500/25 bg-amber-500/10 text-amber-50",
  info: "border-primary/25 bg-primary/10 text-primary-foreground",
};

const variantIcons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
} satisfies Record<ToastVariant, typeof Info>;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, number>>(new Map());

  const dismiss = useCallback((id: string) => {
    const timerId = timersRef.current.get(id);
    if (timerId) {
      window.clearTimeout(timerId);
      timersRef.current.delete(id);
    }

    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    (input: Omit<ToastItem, "id">) => {
      const id = crypto.randomUUID();
      const duration = input.duration ?? 4500;
      const item = { ...input, id, duration };

      setToasts((current) => [...current, item]);

      if (!input.persistent) {
        const timerId = window.setTimeout(() => dismiss(id), duration);
        timersRef.current.set(id, timerId);
      }

      return id;
    },
    [dismiss]
  );

  useEffect(() => {
    const rateLimitListener = (event: Event) => {
      const detail = (event as CustomEvent<{ retryAfter: number }>).detail;
      const retryAfter = Math.max(1, Math.round(detail?.retryAfter ?? 60));

      toast({
        title: "Rate limited",
        description: `Please retry in ${retryAfter} seconds.`,
        variant: "warning",
      });
    };

    const serviceUnavailableListener = () => {
      toast({
        title: "AI service temporarily unavailable",
        description: "Please try again in a little while.",
        variant: "error",
      });
    };

    window.addEventListener("candidexa:rate-limited", rateLimitListener as EventListener);
    window.addEventListener(
      "candidexa:service-unavailable",
      serviceUnavailableListener as EventListener
    );

    return () => {
      window.removeEventListener(
        "candidexa:rate-limited",
        rateLimitListener as EventListener
      );
      window.removeEventListener(
        "candidexa:service-unavailable",
        serviceUnavailableListener as EventListener
      );
    };
  }, [toast]);

  const value = useMemo(() => ({ dismiss, toast }), [dismiss, toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 bottom-4 z-[100] flex w-full max-w-sm flex-col gap-3">
        {toasts.map((item) => {
          const Icon = variantIcons[item.variant];

          return (
            <div
              key={item.id}
              className={cn(
                "pointer-events-auto rounded-2xl border p-4 shadow-2xl backdrop-blur",
                variantStyles[item.variant]
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className="mt-0.5 size-4 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{item.title}</p>
                  {item.description ? (
                    <p className="mt-1 text-sm text-current/80">{item.description}</p>
                  ) : null}
                </div>
                <Button
                  aria-label="Dismiss notification"
                  className="size-7 shrink-0 text-current hover:bg-white/10"
                  onClick={() => dismiss(item.id)}
                  size="icon-sm"
                  variant="ghost"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
