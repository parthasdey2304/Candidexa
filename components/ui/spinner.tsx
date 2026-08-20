import { cn } from "@/lib/utils";

export function Spinner({
  className,
  size = "default",
}: {
  className?: string;
  size?: "sm" | "default" | "lg";
}) {
  const sizes = {
    sm: "size-4 border-2",
    default: "size-6 border-2",
    lg: "size-10 border-4",
  };

  return (
    <div
      aria-label="Loading"
      className={cn(
        "animate-spin rounded-full border-border border-t-primary",
        sizes[size],
        className
      )}
      role="status"
    />
  );
}
