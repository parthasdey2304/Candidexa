"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { Container } from "@/components/shared/Container";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
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

  const protectedLinks = [
    { label: "Dashboard", href: "/sign-in" },
    { label: "Find Jobs", href: "/sign-in" },
    { label: "My Resume", href: "/sign-in" },
    { label: "Integrations", href: "/sign-in" },
    { label: "Settings", href: "/sign-in" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container className="flex h-16 items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6 mr-4">
              {protectedLinks.slice(0, 3).map((link) => (
                <Link key={link.label} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </Container>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-50 bg-background/95 backdrop-blur-xl transition-all duration-300 ease-in-out flex flex-col",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"
        )}
      >
        <div className="flex items-center justify-end p-4 h-16 border-b border-transparent">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8">
          <nav className="flex flex-col items-center gap-8">
            {protectedLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-bold tracking-tight hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="w-full h-px bg-border my-4 max-w-[200px]" />
          
          <div className="flex flex-col w-full max-w-[200px] gap-4">
            <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full h-12 text-lg">Log in</Button>
            </Link>
            <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full h-12 text-lg">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
