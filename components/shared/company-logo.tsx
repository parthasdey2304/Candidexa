import { cn } from "@/lib/utils";

const gradients = [
  "from-violet-500 to-blue-500",
  "from-pink-500 to-violet-500",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-violet-500",
];

const sizes = {
  sm: "size-6 text-[10px] rounded-md",
  md: "size-9 text-sm rounded-lg",
  lg: "size-12 text-base rounded-lg",
};

export function CompanyLogo({
  name,
  logoUrl,
  size = "md",
  className,
}: {
  name: string;
  logoUrl?: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const initial = name?.trim()?.[0]?.toUpperCase() || "?";
  const gradient = gradients[(name?.charCodeAt(0) || 0) % gradients.length];

  if (logoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt={`${name} logo`}
        className={cn("shrink-0 bg-white/90 object-contain p-0.5", sizes[size], className)}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center bg-gradient-to-br font-bold text-white ring-1 ring-inset ring-white/10",
        gradient,
        sizes[size],
        className
      )}
    >
      {initial}
    </div>
  );
}