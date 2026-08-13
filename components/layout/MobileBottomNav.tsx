import Link from "next/link";
import { LayoutDashboard, Briefcase, KanbanSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/applications", label: "Applications", icon: KanbanSquare },
  { href: "/profile", label: "Profile", icon: User },
];

interface MobileBottomNavProps {
  currentPath?: string;
}

export function MobileBottomNav({ currentPath }: MobileBottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t flex">
      {mobileNavItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors",
            currentPath === href ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Icon className="w-5 h-5" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
