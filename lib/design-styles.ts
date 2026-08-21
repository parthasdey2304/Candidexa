"use client";

export type DesignStyleId =
  | "minimalism"
  | "modern"
  | "neobrutalism"
  | "papery"
  | "notebook"
  | "studio"
  | "claymorphism"
  | "vintage"
  | "glassmorphism"
  | "terminal"
  | "swiss";

export interface DesignStyle {
  id: DesignStyleId;
  name: string;
  description: string;
  group: "recommended" | "more";
  // preview dots colors
  dots: string[];
  // preview card accent colors
  preview: {
    primary: string;
    primaryText: string;
    totalBg: string;
    totalAccent: string;
    border?: string;
  };
  tokens: {
    light: Record<string, string>;
    dark: Record<string, string>;
    radius: string;
  };
}

export const designStyles: DesignStyle[] = [
  {
    id: "minimalism",
    name: "Minimalism",
    description: "Clean essentials",
    group: "recommended",
    dots: ["#111827", "#6b7280", "#d1d5db"],
    preview: { primary: "#111827", primaryText: "#ffffff", totalBg: "#f9fafb", totalAccent: "#111827" },
    tokens: {
      light: {
        "--background": "#ffffff",
        "--foreground": "#111827",
        "--card": "#ffffff",
        "--card-foreground": "#111827",
        "--popover": "#ffffff",
        "--primary": "#111827",
        "--primary-foreground": "#ffffff",
        "--secondary": "#f3f4f6",
        "--secondary-foreground": "#111827",
        "--muted": "#f9fafb",
        "--muted-foreground": "#6b7280",
        "--accent": "#f3f4f6",
        "--border": "#e5e7eb",
        "--input": "#e5e7eb",
        "--ring": "#111827",
        "--sidebar": "#ffffff",
        "--sidebar-foreground": "#111827",
        "--sidebar-border": "#e5e7eb",
      },
      dark: {
        "--background": "#0a0a0a",
        "--foreground": "#fafafa",
        "--card": "#171717",
        "--card-foreground": "#fafafa",
        "--popover": "#171717",
        "--primary": "#fafafa",
        "--primary-foreground": "#0a0a0a",
        "--secondary": "#262626",
        "--secondary-foreground": "#fafafa",
        "--muted": "#262626",
        "--muted-foreground": "#a1a1aa",
        "--accent": "#262626",
        "--border": "#27272a",
        "--input": "#27272a",
        "--ring": "#fafafa",
        "--sidebar": "#0a0a0a",
        "--sidebar-foreground": "#fafafa",
        "--sidebar-border": "#27272a",
      },
      radius: "0.375rem",
    },
  },
  {
    id: "modern",
    name: "Modern",
    description: "Crisp product polish",
    group: "recommended",
    dots: ["#2563eb", "#64748b", "#38bdf8"],
    preview: { primary: "#2563eb", primaryText: "#ffffff", totalBg: "#eff6ff", totalAccent: "#2563eb" },
    tokens: {
      light: {
        "--background": "#f8fafc",
        "--foreground": "#0f172a",
        "--card": "#ffffff",
        "--card-foreground": "#0f172a",
        "--popover": "#ffffff",
        "--primary": "#4f46e5",
        "--primary-foreground": "#ffffff",
        "--secondary": "#e2e8f0",
        "--secondary-foreground": "#0f172a",
        "--muted": "#f1f5f9",
        "--muted-foreground": "#64748b",
        "--accent": "#f1f5f9",
        "--border": "#e2e8f0",
        "--input": "#e2e8f0",
        "--ring": "#4f46e5",
        "--sidebar": "#ffffff",
        "--sidebar-foreground": "#0f172a",
        "--sidebar-border": "#e2e8f0",
      },
      dark: {
        "--background": "#0b1326",
        "--foreground": "#dae2fd",
        "--card": "#131b2e",
        "--card-foreground": "#dae2fd",
        "--popover": "#171f33",
        "--primary": "#6366f1",
        "--primary-foreground": "#ffffff",
        "--secondary": "#171f33",
        "--secondary-foreground": "#dae2fd",
        "--muted": "#171f33",
        "--muted-foreground": "#908fa0",
        "--accent": "#222a3d",
        "--border": "#2d3449",
        "--input": "#2d3449",
        "--ring": "#6366f1",
        "--sidebar": "#060e20",
        "--sidebar-foreground": "#dae2fd",
        "--sidebar-border": "#2d3449",
      },
      radius: "0.625rem",
    },
  },
  {
    id: "neobrutalism",
    name: "Neobrutalism Minimalism",
    description: "Hard edges, controlled palette",
    group: "recommended",
    dots: ["#f97316", "#facc15", "#111827"],
    preview: { primary: "#f97316", primaryText: "#ffffff", totalBg: "#fef08a", totalAccent: "#f97316", border: "#111827" },
    tokens: {
      light: {
        "--background": "#fefce8",
        "--foreground": "#111827",
        "--card": "#ffffff",
        "--card-foreground": "#111827",
        "--popover": "#ffffff",
        "--primary": "#f97316",
        "--primary-foreground": "#ffffff",
        "--secondary": "#fef08a",
        "--secondary-foreground": "#111827",
        "--muted": "#fef9c3",
        "--muted-foreground": "#713f12",
        "--accent": "#fef08a",
        "--border": "#111827",
        "--input": "#111827",
        "--ring": "#f97316",
        "--sidebar": "#fefce8",
        "--sidebar-foreground": "#111827",
        "--sidebar-border": "#111827",
      },
      dark: {
        "--background": "#1a1400",
        "--foreground": "#fefce8",
        "--card": "#271f00",
        "--card-foreground": "#fefce8",
        "--popover": "#271f00",
        "--primary": "#facc15",
        "--primary-foreground": "#111827",
        "--secondary": "#422006",
        "--secondary-foreground": "#fefce8",
        "--muted": "#422006",
        "--muted-foreground": "#fde68a",
        "--accent": "#422006",
        "--border": "#fef08a",
        "--input": "#422006",
        "--ring": "#facc15",
        "--sidebar": "#1a1400",
        "--sidebar-foreground": "#fefce8",
        "--sidebar-border": "#422006",
      },
      radius: "0rem",
    },
  },
  {
    id: "papery",
    name: "Papery",
    description: "Newsroom minimalism",
    group: "more",
    dots: ["#1c1917", "#a16207", "#b45309"],
    preview: { primary: "#1c1917", primaryText: "#ffffff", totalBg: "#fef3c7", totalAccent: "#1c1917" },
    tokens: {
      light: {
        "--background": "#fdf8f0",
        "--foreground": "#1c1917",
        "--card": "#fffbeb",
        "--card-foreground": "#1c1917",
        "--popover": "#fffbeb",
        "--primary": "#1c1917",
        "--primary-foreground": "#fdf8f0",
        "--secondary": "#f5e6c8",
        "--secondary-foreground": "#1c1917",
        "--muted": "#fef3c7",
        "--muted-foreground": "#78716c",
        "--accent": "#f5e6c8",
        "--border": "#e7d5b0",
        "--input": "#e7d5b0",
        "--ring": "#1c1917",
        "--sidebar": "#fdf8f0",
        "--sidebar-foreground": "#1c1917",
        "--sidebar-border": "#e7d5b0",
      },
      dark: {
        "--background": "#1c1810",
        "--foreground": "#fdf8f0",
        "--card": "#291e0f",
        "--card-foreground": "#fdf8f0",
        "--popover": "#291e0f",
        "--primary": "#fde68a",
        "--primary-foreground": "#1c1810",
        "--secondary": "#3d2a10",
        "--secondary-foreground": "#fdf8f0",
        "--muted": "#3d2a10",
        "--muted-foreground": "#d6c7a8",
        "--accent": "#3d2a10",
        "--border": "#4a3520",
        "--input": "#4a3520",
        "--ring": "#fde68a",
        "--sidebar": "#1c1810",
        "--sidebar-foreground": "#fdf8f0",
        "--sidebar-border": "#4a3520",
      },
      radius: "0.25rem",
    },
  },
  {
    id: "notebook",
    name: "Notebook",
    description: "Lined and hand-kept",
    group: "more",
    dots: ["#2563eb", "#dc2626", "#16a34a"],
    preview: { primary: "#2563eb", primaryText: "#ffffff", totalBg: "#fef9c3", totalAccent: "#2563eb" },
    tokens: {
      light: {
        "--background": "#fefefe",
        "--foreground": "#1e293b",
        "--card": "#ffffff",
        "--card-foreground": "#1e293b",
        "--popover": "#ffffff",
        "--primary": "#2563eb",
        "--primary-foreground": "#ffffff",
        "--secondary": "#dbeafe",
        "--secondary-foreground": "#1e40af",
        "--muted": "#f1f5f9",
        "--muted-foreground": "#64748b",
        "--accent": "#fef9c3",
        "--border": "#cbd5e1",
        "--input": "#cbd5e1",
        "--ring": "#2563eb",
        "--sidebar": "#f8fafc",
        "--sidebar-foreground": "#1e293b",
        "--sidebar-border": "#cbd5e1",
      },
      dark: {
        "--background": "#0f172a",
        "--foreground": "#f1f5f9",
        "--card": "#1e293b",
        "--card-foreground": "#f1f5f9",
        "--popover": "#1e293b",
        "--primary": "#3b82f6",
        "--primary-foreground": "#ffffff",
        "--secondary": "#1e3a5f",
        "--secondary-foreground": "#dbeafe",
        "--muted": "#1e293b",
        "--muted-foreground": "#94a3b8",
        "--accent": "#1e293b",
        "--border": "#334155",
        "--input": "#334155",
        "--ring": "#3b82f6",
        "--sidebar": "#0f172a",
        "--sidebar-foreground": "#f1f5f9",
        "--sidebar-border": "#334155",
      },
      radius: "0.5rem",
    },
  },
  {
    id: "studio",
    name: "Studio",
    description: "Soft modern editorial",
    group: "more",
    dots: ["#0f172a", "#64748b", "#e2e8f0"],
    preview: { primary: "#0f172a", primaryText: "#ffffff", totalBg: "#f1f5f9", totalAccent: "#0f172a" },
    tokens: {
      light: {
        "--background": "#f8fafc",
        "--foreground": "#0f172a",
        "--card": "#ffffff",
        "--card-foreground": "#0f172a",
        "--popover": "#ffffff",
        "--primary": "#0f172a",
        "--primary-foreground": "#ffffff",
        "--secondary": "#f1f5f9",
        "--secondary-foreground": "#0f172a",
        "--muted": "#f1f5f9",
        "--muted-foreground": "#64748b",
        "--accent": "#e2e8f0",
        "--border": "#e2e8f0",
        "--input": "#e2e8f0",
        "--ring": "#0f172a",
        "--sidebar": "#ffffff",
        "--sidebar-foreground": "#0f172a",
        "--sidebar-border": "#e2e8f0",
      },
      dark: {
        "--background": "#0f172a",
        "--foreground": "#e2e8f0",
        "--card": "#1e293b",
        "--card-foreground": "#e2e8f0",
        "--popover": "#1e293b",
        "--primary": "#e2e8f0",
        "--primary-foreground": "#0f172a",
        "--secondary": "#334155",
        "--secondary-foreground": "#e2e8f0",
        "--muted": "#334155",
        "--muted-foreground": "#94a3b8",
        "--accent": "#334155",
        "--border": "#334155",
        "--input": "#334155",
        "--ring": "#e2e8f0",
        "--sidebar": "#0f172a",
        "--sidebar-foreground": "#e2e8f0",
        "--sidebar-border": "#334155",
      },
      radius: "0.75rem",
    },
  },
  {
    id: "claymorphism",
    name: "Claymorphism",
    description: "Soft surfaces",
    group: "more",
    dots: ["#fb923c", "#fdba74", "#a78bfa"],
    preview: { primary: "#fb923c", primaryText: "#ffffff", totalBg: "#ffedd5", totalAccent: "#fb923c" },
    tokens: {
      light: {
        "--background": "#fff7ed",
        "--foreground": "#431407",
        "--card": "#ffffff",
        "--card-foreground": "#431407",
        "--popover": "#ffffff",
        "--primary": "#fb923c",
        "--primary-foreground": "#ffffff",
        "--secondary": "#ffedd5",
        "--secondary-foreground": "#431407",
        "--muted": "#fff7ed",
        "--muted-foreground": "#9a3412",
        "--accent": "#ffedd5",
        "--border": "#fed7aa",
        "--input": "#fed7aa",
        "--ring": "#fb923c",
        "--sidebar": "#fff7ed",
        "--sidebar-foreground": "#431407",
        "--sidebar-border": "#fed7aa",
      },
      dark: {
        "--background": "#1f130a",
        "--foreground": "#fff7ed",
        "--card": "#2a1a0e",
        "--card-foreground": "#fff7ed",
        "--popover": "#2a1a0e",
        "--primary": "#fb923c",
        "--primary-foreground": "#1f130a",
        "--secondary": "#431407",
        "--secondary-foreground": "#fff7ed",
        "--muted": "#431407",
        "--muted-foreground": "#fdba74",
        "--accent": "#431407",
        "--border": "#7c2d12",
        "--input": "#7c2d12",
        "--ring": "#fb923c",
        "--sidebar": "#1f130a",
        "--sidebar-foreground": "#fff7ed",
        "--sidebar-border": "#7c2d12",
      },
      radius: "1.25rem",
    },
  },
  {
    id: "vintage",
    name: "Vintage",
    description: "Aged and elegant",
    group: "more",
    dots: ["#92400e", "#78350f", "#dc2626"],
    preview: { primary: "#92400e", primaryText: "#ffffff", totalBg: "#fef3c7", totalAccent: "#92400e" },
    tokens: {
      light: {
        "--background": "#fdf6e3",
        "--foreground": "#451a03",
        "--card": "#fffbeb",
        "--card-foreground": "#451a03",
        "--popover": "#fffbeb",
        "--primary": "#92400e",
        "--primary-foreground": "#fef3c7",
        "--secondary": "#fde68a",
        "--secondary-foreground": "#451a03",
        "--muted": "#fef3c7",
        "--muted-foreground": "#78350f",
        "--accent": "#fde68a",
        "--border": "#d6c7a8",
        "--input": "#d6c7a8",
        "--ring": "#92400e",
        "--sidebar": "#fdf6e3",
        "--sidebar-foreground": "#451a03",
        "--sidebar-border": "#d6c7a8",
      },
      dark: {
        "--background": "#1a1205",
        "--foreground": "#fef3c7",
        "--card": "#291e0a",
        "--card-foreground": "#fef3c7",
        "--popover": "#291e0a",
        "--primary": "#f59e0b",
        "--primary-foreground": "#1a1205",
        "--secondary": "#451a03",
        "--secondary-foreground": "#fef3c7",
        "--muted": "#451a03",
        "--muted-foreground": "#fde68a",
        "--accent": "#451a03",
        "--border": "#78350f",
        "--input": "#78350f",
        "--ring": "#f59e0b",
        "--sidebar": "#1a1205",
        "--sidebar-foreground": "#fef3c7",
        "--sidebar-border": "#78350f",
      },
      radius: "0.5rem",
    },
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    description: "Light translucent depth",
    group: "more",
    dots: ["#6366f1", "#a78bfa", "#e0e7ff"],
    preview: { primary: "#6366f1", primaryText: "#ffffff", totalBg: "#eef2ff", totalAccent: "#6366f1" },
    tokens: {
      light: {
        "--background": "#f0f4ff",
        "--foreground": "#1e1b4b",
        "--card": "rgba(255,255,255,0.7)",
        "--card-foreground": "#1e1b4b",
        "--popover": "rgba(255,255,255,0.85)",
        "--primary": "#6366f1",
        "--primary-foreground": "#ffffff",
        "--secondary": "rgba(224,231,255,0.6)",
        "--secondary-foreground": "#1e1b4b",
        "--muted": "rgba(238,242,255,0.6)",
        "--muted-foreground": "#6366f1",
        "--accent": "rgba(224,231,255,0.6)",
        "--border": "rgba(199,210,254,0.5)",
        "--input": "rgba(199,210,254,0.5)",
        "--ring": "#6366f1",
        "--sidebar": "rgba(255,255,255,0.6)",
        "--sidebar-foreground": "#1e1b4b",
        "--sidebar-border": "rgba(199,210,254,0.5)",
      },
      dark: {
        "--background": "#0f0f23",
        "--foreground": "#e0e7ff",
        "--card": "rgba(19,27,46,0.6)",
        "--card-foreground": "#e0e7ff",
        "--popover": "rgba(23,31,51,0.8)",
        "--primary": "#818cf8",
        "--primary-foreground": "#0f0f23",
        "--secondary": "rgba(30,27,75,0.5)",
        "--secondary-foreground": "#e0e7ff",
        "--muted": "rgba(30,27,75,0.4)",
        "--muted-foreground": "#a5b4fc",
        "--accent": "rgba(30,27,75,0.5)",
        "--border": "rgba(99,102,241,0.2)",
        "--input": "rgba(99,102,241,0.2)",
        "--ring": "#818cf8",
        "--sidebar": "rgba(15,15,35,0.6)",
        "--sidebar-foreground": "#e0e7ff",
        "--sidebar-border": "rgba(99,102,241,0.2)",
      },
      radius: "1rem",
    },
  },
  {
    id: "terminal",
    name: "Terminal",
    description: "Light technical precision",
    group: "more",
    dots: ["#16a34a", "#15803d", "#facc15"],
    preview: { primary: "#16a34a", primaryText: "#ffffff", totalBg: "#f0fdf4", totalAccent: "#16a34a" },
    tokens: {
      light: {
        "--background": "#f8fafc",
        "--foreground": "#0f172a",
        "--card": "#ffffff",
        "--card-foreground": "#0f172a",
        "--popover": "#ffffff",
        "--primary": "#16a34a",
        "--primary-foreground": "#ffffff",
        "--secondary": "#dcfce7",
        "--secondary-foreground": "#14532d",
        "--muted": "#f1f5f9",
        "--muted-foreground": "#64748b",
        "--accent": "#dcfce7",
        "--border": "#cbd5e1",
        "--input": "#cbd5e1",
        "--ring": "#16a34a",
        "--sidebar": "#0f172a",
        "--sidebar-foreground": "#dcfce7",
        "--sidebar-border": "#1e293b",
      },
      dark: {
        "--background": "#020208",
        "--foreground": "#dcfce7",
        "--card": "#0a1a0f",
        "--card-foreground": "#dcfce7",
        "--popover": "#0a1a0f",
        "--primary": "#22c55e",
        "--primary-foreground": "#020208",
        "--secondary": "#14532d",
        "--secondary-foreground": "#dcfce7",
        "--muted": "#0a1a0f",
        "--muted-foreground": "#86efac",
        "--accent": "#14532d",
        "--border": "#14532d",
        "--input": "#14532d",
        "--ring": "#22c55e",
        "--sidebar": "#020208",
        "--sidebar-foreground": "#dcfce7",
        "--sidebar-border": "#14532d",
      },
      radius: "0.25rem",
    },
  },
  {
    id: "swiss",
    name: "Swiss",
    description: "Graphic grid clarity",
    group: "more",
    dots: ["#dc2626", "#1e3a8a", "#f8fafc"],
    preview: { primary: "#dc2626", primaryText: "#ffffff", totalBg: "#fef2f2", totalAccent: "#dc2626" },
    tokens: {
      light: {
        "--background": "#ffffff",
        "--foreground": "#0f172a",
        "--card": "#ffffff",
        "--card-foreground": "#0f172a",
        "--popover": "#ffffff",
        "--primary": "#dc2626",
        "--primary-foreground": "#ffffff",
        "--secondary": "#f1f5f9",
        "--secondary-foreground": "#0f172a",
        "--muted": "#f1f5f9",
        "--muted-foreground": "#64748b",
        "--accent": "#dbeafe",
        "--border": "#0f172a",
        "--input": "#cbd5e1",
        "--ring": "#dc2626",
        "--sidebar": "#0f172a",
        "--sidebar-foreground": "#ffffff",
        "--sidebar-border": "#1e293b",
      },
      dark: {
        "--background": "#020617",
        "--foreground": "#f8fafc",
        "--card": "#0f172a",
        "--card-foreground": "#f8fafc",
        "--popover": "#0f172a",
        "--primary": "#ef4444",
        "--primary-foreground": "#ffffff",
        "--secondary": "#1e293b",
        "--secondary-foreground": "#f8fafc",
        "--muted": "#1e293b",
        "--muted-foreground": "#94a3b8",
        "--accent": "#1e293b",
        "--border": "#334155",
        "--input": "#334155",
        "--ring": "#ef4444",
        "--sidebar": "#020617",
        "--sidebar-foreground": "#f8fafc",
        "--sidebar-border": "#1e293b",
      },
      radius: "0rem",
    },
  },
];

const STORAGE_KEY = "candidexa:design-style";
const ACCENT_KEY = "candidexa:accent";

export function getStoredDesignStyle(): DesignStyleId {
  if (typeof window === "undefined") return "modern";
  const stored = window.localStorage.getItem(STORAGE_KEY) as DesignStyleId | null;
  if (stored && designStyles.some((s) => s.id === stored)) return stored;
  return "modern";
}

export function setStoredDesignStyle(id: DesignStyleId) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, id);
  applyDesignStyle(id);
  window.dispatchEvent(new CustomEvent("candidexa:design-style-changed", { detail: id }));
}

export function applyDesignStyle(id: DesignStyleId) {
  if (typeof document === "undefined") return;
  const style = designStyles.find((s) => s.id === id);
  if (!style) return;
  const root = document.documentElement;
  root.setAttribute("data-design-style", id);
  // Determine current theme (dark vs light) to pick correct tokens
  const isDark = root.classList.contains("dark");
  const tokens = isDark ? style.tokens.dark : style.tokens.light;
  Object.entries(tokens).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  root.style.setProperty("--radius", style.tokens.radius);
  // Extra style-specific css variables
  if (id === "neobrutalism" || id === "swiss") {
    root.style.setProperty("--shadow-style", "hard");
  } else if (id === "claymorphism") {
    root.style.setProperty("--shadow-style", "soft");
  } else if (id === "glassmorphism") {
    root.style.setProperty("--shadow-style", "glass");
  } else {
    root.style.setProperty("--shadow-style", "default");
  }
}

// For accent override (used in appearance settings)
export function applyAccent(color: string) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty("--primary", color);
  document.documentElement.style.setProperty("--ring", color);
  document.documentElement.style.setProperty("--sidebar-primary", color);
  document.documentElement.style.setProperty("--sidebar-ring", color);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(ACCENT_KEY, color);
  }
}

export function getStoredAccent(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCENT_KEY);
}

export function reapplyDesignStyleForTheme(isDark: boolean) {
  const id = getStoredDesignStyle();
  const style = designStyles.find((s) => s.id === id);
  if (!style) return;
  const tokens = isDark ? style.tokens.dark : style.tokens.light;
  Object.entries(tokens).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
  // re-apply accent if exists
  const accent = getStoredAccent();
  if (accent) {
    document.documentElement.style.setProperty("--primary", accent);
    document.documentElement.style.setProperty("--ring", accent);
    document.documentElement.style.setProperty("--sidebar-primary", accent);
    document.documentElement.style.setProperty("--sidebar-ring", accent);
  }
}
