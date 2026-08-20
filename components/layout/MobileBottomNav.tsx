"use client";

import Link from "next/link";
import { Briefcase, FileText, KanbanSquare, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const mobileNavItems = [
  { href: "/app", label: "Home", icon: LayoutDashboard },
  { href: "/app/jobs", label: "Jobs", icon: Briefcase },
  { href: "/app/tracker", label: "Tracker", icon: KanbanSquare },
  { href: "/app/resume", label: "Resume", icon: FileText },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t flex">
      {mobileNavItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors",
            pathname === href || pathname.startsWith(`${href}/`)
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          <Icon className="w-5 h-5" />
          {label}
        </Link>
      ))}
    </nav>
  );
}
