"use client";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { useAuth } from "@/components/providers/AuthProvider";
import { Logo } from "@/components/shared/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Menu } from "lucide-react";

export function AppLayout({
  children,
  currentPath,
}: {
  children: React.ReactNode;
  currentPath?: string;
}) {
  const { isLoading, plan, user } = useAuth();
  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "CX";

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-40 flex h-14 items-center justify-between px-4 border-b bg-[#0b1326] border-[#2d3449]">
          <Logo className="text-[#dae2fd]" />
          <Button variant="ghost" size="icon" className="text-[#908fa0] hover:text-[#dae2fd]">
            <Menu className="w-5 h-5" />
          </Button>
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
    </div>
  );
}
