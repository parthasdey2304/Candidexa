"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import { ApiError, apiClient } from "@/lib/api-client";
import { useToast } from "@/components/providers/ToastProvider";

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
  login: (payload: LoginPayload) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  register: (payload: RegisterPayload) => Promise<AuthResponse>;
}

interface AuthResponse {
  requiresTwoFactor?: boolean;
  ticket?: string;
  user?: AuthUser | null;
  plan?: AuthPlan | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function normalizeSession(payload: unknown): AuthSession {
  const root =
    typeof payload === "object" && payload !== null && "data" in payload
      ? (payload as { data?: unknown }).data
      : payload;

  const source = (typeof root === "object" && root !== null ? root : {}) as {
    user?: Partial<AuthUser>;
    plan?: Partial<AuthPlan>;
    subscription?: Partial<AuthPlan>;
  };

  const user = source.user
    ? {
        id: String(source.user.id ?? source.user.email ?? "current-user"),
        email: String(source.user.email ?? ""),
        name: String(
          source.user.name ?? source.user.email?.split("@")[0] ?? "Candidate"
        ),
        avatarUrl: source.user.avatarUrl ?? null,
      }
    : null;

  const planSource = source.plan ?? source.subscription;
  const plan = planSource
    ? {
        id: planSource.id,
        name: String(planSource.name ?? planSource.tier ?? "Free"),
        tier: typeof planSource.tier === "string" ? planSource.tier : undefined,
        usageLimit:
          typeof planSource.usageLimit === "number" ? planSource.usageLimit : null,
      }
    : null;

  return { plan, user };
}

function normalizeAuthResponse(payload: unknown): AuthResponse {
  const root =
    typeof payload === "object" && payload !== null && "data" in payload
      ? (payload as { data?: unknown }).data
      : payload;

  const source = (typeof root === "object" && root !== null ? root : {}) as {
    ticket?: string;
    requiresTwoFactor?: boolean;
    requires_2fa?: boolean;
  };

  const session = normalizeSession(root);

  return {
    ...session,
    requiresTwoFactor:
      source.requiresTwoFactor ?? source.requires_2fa ?? false,
    ticket: source.ticket,
  };
}

const PUBLIC_AUTH_ROUTES = new Set([
  "/",
  "/login",
  "/register",
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
  const [session, setSession] = useState<AuthSession>({ plan: null, user: null });
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const response = await apiClient.get("/auth/me", { retryOnAuthFailure: false });
      setSession(normalizeSession(response));
    } catch (error) {
      // Silently handle network/CORS/404 when backend is unavailable - don't spam console
      if (error instanceof ApiError && error.status === 0) {
        console.debug("[Auth] Backend unavailable, treating as unauthenticated");
      }
      setSession({ plan: null, user: null });
    }
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await apiClient.post<AuthResponse>("/auth/login", payload);
    const normalized = normalizeAuthResponse(response);

    if (!normalized.requiresTwoFactor && normalized.user) {
      setSession({
        plan: normalized.plan ?? null,
        user: normalized.user,
      });
    } else if (!normalized.requiresTwoFactor) {
      await refreshSession();
    }

    return normalized;
  }, [refreshSession]);

  const register = useCallback(async (payload: RegisterPayload) => {
    const response = await apiClient.post<AuthResponse>("/auth/register", payload);
    const normalized = normalizeAuthResponse(response);

    if (!normalized.requiresTwoFactor && normalized.user) {
      setSession({
        plan: normalized.plan ?? null,
        user: normalized.user,
      });
    } else if (!normalized.requiresTwoFactor) {
      await refreshSession();
    }

    return normalized;
  }, [refreshSession]);

  const logout = useCallback(async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // Best effort logout keeps the client responsive if the backend session is gone.
    } finally {
      setSession({ plan: null, user: null });
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      // Skip auth check on public routes when no auth indicator - prevents 500/CORS spam when Railway is sleeping
      const isPublicRoute = PUBLIC_AUTH_ROUTES.has(pathname);
      const hasAuthIndicator =
        typeof document !== "undefined" &&
        (document.cookie.includes("token") ||
          document.cookie.includes("session") ||
          localStorage.getItem("token") ||
          localStorage.getItem("access_token") ||
          sessionStorage.getItem("token"));

      if (isPublicRoute && !hasAuthIndicator) {
        if (mounted) setIsLoading(false);
        return;
      }

      try {
        const response = await apiClient.get("/auth/me", {
          retryOnAuthFailure: false,
        });

        if (mounted) {
          setSession(normalizeSession(response));
        }
      } catch (error) {
        // Suppress noisy CORS/network errors on public routes - backend may be sleeping on Railway
        if (error instanceof ApiError) {
          if (error.status === 0 || error.status === 404 || error.status >= 500) {
            console.debug("[Auth] Bootstrap failed gracefully:", error.message);
          }
        } else if (error instanceof TypeError) {
          console.debug("[Auth] Network/CORS error suppressed");
        }
        if (mounted) {
          setSession({ plan: null, user: null });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void bootstrap();

    return () => {
      mounted = false;
    };
  }, [pathname]);

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

    window.addEventListener(
      "candidexa:auth-expired",
      handleExpired as EventListener
    );

    return () => {
      window.removeEventListener(
        "candidexa:auth-expired",
        handleExpired as EventListener
      );
    };
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
    }),
    [isLoading, login, logout, refreshSession, register, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

export function isInvalidCredentialsError(error: unknown) {
  return error instanceof ApiError && error.status === 401;
}
