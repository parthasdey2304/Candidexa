"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { useAuth } from "@/components/providers/AuthProvider";
import { Logo } from "@/components/shared/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Bell, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileLinks = [
  { label: "Dashboard", href: "/app" },
  { label: "Resume", href: "/app/resume" },
  { label: "Jobs", href: "/app/jobs" },
  { label: "JD Analyzer", href: "/app/jd-analyzer" },
  { label: "Tracker", href: "/app/tracker" },
  { label: "Analytics", href: "/app/tracker/analytics" },
  { label: "Tailor", href: "/app/tailor" },
  { label: "Code Generator", href: "/app/codegen" },
  { label: "Settings", href: "/app/settings" },
];

export function AppLayout({
  children,
  currentPath,
}: {
  children: React.ReactNode;
  currentPath?: string;
}) {
  const { isLoading, plan, user, isAuthenticated, logout } = useAuth();
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
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-40 flex h-14 items-center justify-between px-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
          <Logo className="text-foreground" />
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </header>
        <header className="hidden md:flex h-16 items-center justify-between border-b border-border bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-6 shrink-0">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground truncate">
              Career workspace{currentPath ? ` / ${currentPath.replace(/^\//, "")}` : ""}
            </p>
            <h1 className="text-lg font-semibold text-foreground truncate">
              {isLoading ? "Loading..." : `Welcome back, ${user?.name ?? "Candidate"}`}
            </h1>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <Badge variant="secondary" className="hidden lg:inline-flex">
              {plan?.name ?? "Free plan"}
            </Badge>
            <Button
              aria-label="Notifications"
              variant="outline"
              size="icon"
            >
              <Bell className="size-4" />
            </Button>
            <div className="flex items-center gap-3 rounded-full border border-border bg-muted/50 px-3 py-1.5">
              <Avatar size="sm">
                <AvatarImage alt={user?.name ?? "User avatar"} src={user?.avatarUrl ?? ""} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="pr-1 hidden xl:block">
                <p className="text-sm font-medium text-foreground leading-none">{user?.name ?? "Guest"}</p>
                <p className="text-xs text-muted-foreground leading-none mt-1">{user?.email ?? "Not signed in"}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 pb-20 md:pb-0 bg-background">
          {children}
        </main>
      </div>
      <MobileBottomNav />

      {/* Full-screen Mobile Menu - top to bottom as in image 3 */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-xl transition-all duration-300 ease-in-out flex flex-col",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"
        )}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-border shrink-0">
          <Logo className="text-foreground" />
          <button
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-6 overflow-y-auto">
          <nav className="flex flex-col items-center gap-5">
            {mobileLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold tracking-tight hover:text-primary transition-colors text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="w-full h-px bg-border my-2 max-w-[200px]" />

          <div className="flex flex-col w-full max-w-[260px] gap-3">
            {isAuthenticated ? (
              <>
                <div className="flex flex-col items-center gap-1 py-2 text-center">
                  <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                  <Badge variant="secondary" className="mt-1">{plan?.name ?? "Free plan"}</Badge>
                </div>
                <Button
                  className="w-full h-11 text-base"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    void logout();
                  }}
                >
                  Sign out
                </Button>
                <Link href="/app/settings" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                  <Button variant="outline" className="w-full h-11 text-base">
                    Settings
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                  <Button variant="outline" className="w-full h-11 text-base">
                    Log in
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                  <Button className="w-full h-11 text-base">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
