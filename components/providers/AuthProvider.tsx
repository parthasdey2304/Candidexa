"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/providers/ToastProvider";
import type { User, Session } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
}

export interface AuthPlan {
  id?: string;
  name: string;
  tier?: string;
  usageLimit?: number | null;
}

interface AuthSession {
  user: AuthUser | null;
  plan: AuthPlan | null;
}

type LoginPayload = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

interface AuthContextValue extends AuthSession {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<{ requiresTwoFactor?: boolean }>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  register: (payload: RegisterPayload) => Promise<{ requiresTwoFactor?: boolean }>;
  signInWithOAuth: (provider: "google" | "github") => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function mapSupabaseUser(user: User | null): AuthUser | null {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email ?? "",
    name: (user.user_metadata?.full_name as string) || (user.user_metadata?.name as string) || user.email?.split("@")[0] || "Candidate",
    avatarUrl: (user.user_metadata?.avatar_url as string) || (user.user_metadata?.picture as string) || null,
  };
}

const PUBLIC_AUTH_ROUTES = new Set([
  "/",
  "/login",
  "/register",
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/privacy",
  "/terms",
  "/pricing",
  "/contact",
]);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const supabase = useMemo(() => createClient(), []);
  const [session, setSession] = useState<AuthSession>({ plan: null, user: null });
  const [isLoading, setIsLoading] = useState(true);
  const [supabaseSession, setSupabaseSession] = useState<Session | null>(null);

  const refreshSession = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    const s = data.session;
    setSupabaseSession(s);
    setSession({
      user: mapSupabaseUser(s?.user ?? null),
      plan: { name: "Free", tier: "free" },
    });
  }, [supabase]);

  const login = useCallback(
    async (payload: LoginPayload) => {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || (!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY && !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
        throw new Error("Supabase not configured on this deployment (candidexa.online). Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in Vercel -> Settings -> Environment Variables and redeploy.");
      }
      const { error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });
      if (error) throw error;
      await refreshSession();
      return {};
    },
    [supabase, refreshSession]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      const { error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          data: { full_name: payload.name },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      await refreshSession();
      return {};
    },
    [supabase, refreshSession]
  );

  const signInWithOAuth = useCallback(
    async (provider: "google" | "github") => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/app`,
        },
      });
      if (error) throw error;
    },
    [supabase]
  );

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setSession({ plan: null, user: null });
    setSupabaseSession(null);
    router.push("/login");
  }, [supabase, router]);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      const s = data.session;
      setSupabaseSession(s);
      setSession({
        user: mapSupabaseUser(s?.user ?? null),
        plan: s ? { name: "Free", tier: "free" } : null,
      });
      setIsLoading(false);
    };
    void init();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSupabaseSession(newSession);
      setSession({
        user: mapSupabaseUser(newSession?.user ?? null),
        plan: newSession ? { name: "Free", tier: "free" } : null,
      });
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (supabaseSession === undefined) return;
  }, [supabaseSession]);

  useEffect(() => {
    const handleExpired = () => {
      setSession({ plan: null, user: null });
      if (!PUBLIC_AUTH_ROUTES.has(pathname)) {
        toast({
          title: "Session expired",
          description: "Please sign in again to continue.",
          variant: "warning",
        });
        router.push("/login");
      }
    };
    window.addEventListener("candidexa:auth-expired", handleExpired as EventListener);
    return () => window.removeEventListener("candidexa:auth-expired", handleExpired as EventListener);
  }, [pathname, router, toast]);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...session,
      isAuthenticated: Boolean(session.user),
      isLoading,
      login,
      logout,
      refreshSession,
      register,
      signInWithOAuth,
    }),
    [isLoading, login, logout, refreshSession, register, signInWithOAuth, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

export function isInvalidCredentialsError(error: unknown) {
  const msg = (error as { message?: string })?.message?.toLowerCase() ?? "";
  return msg.includes("invalid") || msg.includes("credentials") || msg.includes("incorrect");
}
