import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function EmptyState({
  action,
  description,
  icon,
  title,
  className,
}: {
  action?: ReactNode;
  description: string;
  icon?: ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-dashed border-border bg-card p-8 text-center",
        className
      )}
    >
      {icon ? (
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          {icon}
        </div>
      ) : null}
      <h2 className="text-xl font-semibold text-card-foreground">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
        {description}
      </p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
