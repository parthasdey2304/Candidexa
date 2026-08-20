import { cn } from "@/lib/utils";

const techColors: Record<string, string> = {
  Python: "bg-blue-500/15 text-blue-400",
  TypeScript: "bg-blue-500/15 text-blue-400",
  JavaScript: "bg-yellow-500/15 text-yellow-400",
  React: "bg-cyan-500/15 text-cyan-400",
  "Next.js": "bg-slate-500/20 text-slate-300",
  Docker: "bg-blue-500/15 text-blue-400",
  Kubernetes: "bg-indigo-500/15 text-indigo-300",
  PostgreSQL: "bg-blue-500/15 text-blue-400",
  Redis: "bg-red-500/15 text-red-400",
  Kafka: "bg-slate-500/20 text-slate-300",
  FastAPI: "bg-teal-500/15 text-teal-400",
  Go: "bg-cyan-500/15 text-cyan-400",
  AWS: "bg-orange-500/15 text-orange-400",
  GCP: "bg-red-500/15 text-red-400",
  Kotlin: "bg-orange-500/15 text-orange-400",
  Swift: "bg-orange-500/15 text-orange-400",
  Java: "bg-red-500/15 text-red-400",
  C: "bg-slate-500/20 text-slate-300",
  "C++": "bg-slate-500/20 text-slate-300",
  HTML: "bg-orange-500/15 text-orange-400",
  CSS: "bg-sky-500/15 text-sky-400",
  SQL: "bg-emerald-500/15 text-emerald-400",
  GraphQL: "bg-pink-500/15 text-pink-400",
};

export function TechStackBadges({
  stack,
  className,
  size = "sm",
}: {
  stack: string[];
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {stack.map((tech) => (
        <span
          key={tech}
          className={cn(
            "rounded-full px-2.5 py-0.5 font-medium ring-1 ring-inset ring-white/10",
            techColors[tech] ?? "bg-muted text-muted-foreground",
            size === "sm" ? "text-xs" : "text-sm"
          )}
        >
          {tech}
        </span>
      ))}
    </div>
  );
}