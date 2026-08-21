"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { useAuth } from "@/components/providers/AuthProvider";
import { Logo } from "@/components/shared/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Bell, BookOpen, BrainCircuit, Briefcase, Code2, FileText, FolderKanban, Globe, KanbanSquare, LayoutDashboard, Map, Menu, Rocket, Route, Settings, Target, TrendingUp, Video, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const mobileNavGroups: { heading: string; items: { href: string; label: string; icon: LucideIcon }[] }[] = [
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

export function AppLayout({
  children,
  currentPath,
}: {
  children: React.ReactNode;
  currentPath?: string;
}) {
  const { isLoading, plan, user } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "CX";

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-40 flex h-14 items-center justify-between px-4 border-b bg-[#0b1326] border-[#2d3449]">
          <Logo className="text-[#dae2fd]" />
          <button
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-[#908fa0] hover:text-[#dae2fd] hover:bg-[#171f33]")}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>
        <header className="hidden md:flex h-16 items-center justify-between border-b border-[#2d3449] bg-[#0b1326] px-6">
          <div>
            <p className="text-sm text-[#908fa0]">
              Career workspace{currentPath ? ` / ${currentPath.replace(/^\//, "")}` : ""}
            </p>
            <h1 className="text-lg font-semibold text-white">
              {isLoading ? "Loading..." : `Welcome back, ${user?.name ?? "Candidate"}`}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-[#171f33] text-[#dae2fd] hover:bg-[#171f33]">
              {plan?.name ?? "Free plan"}
            </Badge>
            <Button
              aria-label="Notifications"
              className="border-[#2d3449] bg-[#131b2e] text-[#dae2fd] hover:bg-[#171f33]"
              size="icon"
              variant="outline"
            >
              <Bell className="size-4" />
            </Button>
            <div className="flex items-center gap-3 rounded-full border border-[#2d3449] bg-[#131b2e] px-3 py-1.5">
              <Avatar size="sm">
                <AvatarImage alt={user?.name ?? "User avatar"} src={user?.avatarUrl ?? ""} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="pr-1">
                <p className="text-sm font-medium text-white">{user?.name ?? "Guest"}</p>
                <p className="text-xs text-[#908fa0]">{user?.email ?? "Not signed in"}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
      </div>
      <MobileBottomNav />

      {/* Mobile slide-down drawer - like public Navbar but with app nav */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-[#0b1326] transition-all duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"
        )}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-[#2d3449] shrink-0">
          <Logo className="text-[#dae2fd]" />
          <button
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-[#908fa0] hover:text-[#dae2fd]")}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="rounded-2xl border border-[#2d3449] bg-[#131b2e] p-4 mb-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#dae2fd]">Current plan</p>
              <Bell className="size-4 text-[#908fa0]" />
            </div>
            <p className="mt-2 text-2xl font-semibold text-white">
              {plan?.name ?? "Free"}
            </p>
            <p className="mt-1 text-xs text-[#908fa0]">
              Upgrade to unlock batch tailoring and more AI runs.
            </p>
          </div>
          <nav className="space-y-6">
            {mobileNavGroups.map((group) => (
              <div key={group.heading}>
                <p className="mb-2 px-4 text-[11px] font-semibold uppercase tracking-wider text-[#5a627a]">
                  {group.heading}
                </p>
                <div className="space-y-1">
                  {group.items.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href || pathname.startsWith(`${href}/`);
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-4 rounded-xl px-4 py-3 text-[15px] font-medium transition-colors",
                          isActive
                            ? "bg-[#6366f1] text-white shadow-[0_4px_20px_-4px_rgba(99,102,241,0.5)]"
                            : "text-[#908fa0] hover:bg-[#171f33] hover:text-[#dae2fd]"
                        )}
                      >
                        <Icon className={cn("size-5 shrink-0", isActive ? "text-white" : "text-[#908fa0]")} />
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
