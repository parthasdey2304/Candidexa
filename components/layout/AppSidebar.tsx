import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, User, FileText, Briefcase, Target, Layers, KanbanSquare, Settings
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/resume", label: "My Resume", icon: FileText },
  { href: "/jobs", label: "Find Jobs", icon: Briefcase },
  { href: "/match", label: "Match a Job", icon: Target },
  { href: "/applications/tailored", label: "Tailored Applications", icon: Layers },
  { href: "/applications", label: "Application Tracker", icon: KanbanSquare },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface AppSidebarProps {
  currentPath?: string;
}

export function AppSidebar({ currentPath }: AppSidebarProps) {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card min-h-screen shrink-0">
      <div className="h-16 flex items-center px-6 border-b">
        <Logo />
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              currentPath === href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
