"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { applyDesignStyle, getStoredAccent, getStoredDesignStyle, reapplyDesignStyleForTheme } from "@/lib/design-styles";

export function DesignStyleProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // initial apply
    const id = getStoredDesignStyle();
    applyDesignStyle(id);
    const accent = getStoredAccent();
    if (accent) {
      document.documentElement.style.setProperty("--primary", accent);
      document.documentElement.style.setProperty("--ring", accent);
      document.documentElement.style.setProperty("--sidebar-primary", accent);
      document.documentElement.style.setProperty("--sidebar-ring", accent);
    }
    // observer for theme class changes (next-themes adds .dark to html)
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      reapplyDesignStyleForTheme(isDark);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!resolvedTheme) return;
    const isDark = resolvedTheme === "dark";
    reapplyDesignStyleForTheme(isDark);
  }, [resolvedTheme]);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<string>;
      if (custom.detail) applyDesignStyle(custom.detail as any);
    };
    window.addEventListener("candidexa:design-style-changed", handler as EventListener);
    return () => window.removeEventListener("candidexa:design-style-changed", handler as EventListener);
  }, []);

  return <>{children}</>;
}
