import { AppSidebar } from "@/components/layout/AppSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

export function AppLayout({ children, currentPath }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar currentPath={currentPath} />
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-40 flex h-14 items-center justify-between px-4 border-b bg-card">
          <Logo />
          <Button variant="ghost" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
        </header>
        <main className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
      </div>
      <MobileBottomNav currentPath={currentPath} />
    </div>
  );
}
