import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, User, FileText, Briefcase, Target, Layers, KanbanSquare, Settings, Link as LinkIcon
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/resume", label: "My Resume", icon: FileText },
  { href: "/jobs", label: "Find Jobs", icon: Briefcase },
  { href: "/match", label: "Match a Job", icon: Target },
  { href: "/applications/tailored", label: "Tailored Applications", icon: Layers },
  { href: "/applications", label: "Application Tracker", icon: KanbanSquare },
  { href: "/dashboard/integrations", label: "Integrations", icon: LinkIcon },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface AppSidebarProps {
  currentPath?: string;
}

export function AppSidebar({ currentPath }: AppSidebarProps) {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-[#2d3449] bg-[#0b1326] h-screen sticky top-0 shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-[#2d3449]">
        <Logo className="text-[#dae2fd] hover:text-[#6366f1]" />
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = currentPath === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200",
                isActive
                  ? "bg-[#6366f1] text-white shadow-[0_4px_20px_-4px_rgba(99,102,241,0.5)]"
                  : "text-[#908fa0] hover:bg-[#171f33] hover:text-[#dae2fd]"
              )}
            >
              <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-white" : "text-[#908fa0]")} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
