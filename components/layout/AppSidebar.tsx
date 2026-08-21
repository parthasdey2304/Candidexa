"use client";

import Link from "next/link";
import { Bell, BookOpen, BrainCircuit, Briefcase, Code2, FileText, FolderKanban, Globe, KanbanSquare, LayoutDashboard, Map, Rocket, Route, Settings, Target, TrendingUp, Video } from "lucide-react";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import { useAuth } from "@/components/providers/AuthProvider";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

const navGroups: { heading: string; items: { href: string; label: string; icon: LucideIcon }[] }[] = [
  {
    heading: "Workspace",
    items: [
      { href: "/app", label: "Dashboard", icon: LayoutDashboard },
      { href: "/app/resume", label: "Resume", icon: FileText },
      { href: "/app/jobs", label: "Jobs", icon: Briefcase },
      { href: "/app/jd-analyzer", label: "JD Analyzer", icon: Target },
      { href: "/app/tracker", label: "Tracker", icon: KanbanSquare },
      { href: "/app/tracker/analytics", label: "Analytics", icon: TrendingUp },
    ],
  },
  {
    heading: "AI Engines",
    items: [
      { href: "/app/tailor", label: "Tailor", icon: Route },
      { href: "/app/codegen", label: "Code Generator", icon: Code2 },
      { href: "/app/deployments", label: "Deployments", icon: Rocket },
      { href: "/app/videos", label: "Video Demos", icon: Video },
      { href: "/app/portfolio", label: "Portfolio", icon: Globe },
    ],
  },
  {
    heading: "Preparation",
    items: [
      { href: "/app/mock-interview", label: "Mock Interview", icon: BrainCircuit },
      { href: "/app/interview-questions", label: "Questions", icon: BookOpen },
      { href: "/app/roadmap", label: "Roadmap", icon: Map },
      { href: "/app/projects", label: "Projects", icon: FolderKanban },
    ],
  },
  {
    heading: "Account",
    items: [{ href: "/app/settings", label: "Settings", icon: Settings }],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { plan } = useAuth();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-sidebar-border bg-sidebar h-screen sticky top-0 shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border shrink-0">
        <Logo className="text-sidebar-foreground hover:text-primary" />
      </div>
      <div className="px-4 pt-5">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-card-foreground">Current plan</p>
            <Bell className="size-4 text-muted-foreground" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            {plan?.name ?? "Free"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Upgrade to unlock batch tailoring and more AI runs.
          </p>
        </div>
      </div>
      <nav className="flex-1 space-y-5 overflow-y-auto px-4 py-6">
        {navGroups.map((group) => (
          <div key={group.heading}>
            <p className="mb-1.5 px-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
              {group.heading}
            </p>
            <div className="space-y-1">
              {group.items.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-2.5 text-[14px] font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className={cn("size-5 shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
