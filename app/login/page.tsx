"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { LockKeyhole, Mail } from "lucide-react";

import { useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Logo } from "@/components/shared/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ApiError, getOAuthRedirectUrl } from "@/lib/api-client";

function GithubMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.15-.02-2.06-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.77 1.05.77 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function resolveLoginError(error: unknown) {
  if (error instanceof ApiError) {
    const message = error.message.toLowerCase();
    const code = error.code?.toLowerCase();

    if (error.status === 401) {
      return "Invalid credentials";
    }

    if (code?.includes("locked") || message.includes("locked")) {
      return "Account locked. Try again in 15 minutes.";
    }
  }

  return "We couldn't sign you in right now. Please try again.";
}

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/app");
    }
  }, [isAuthenticated, isLoading, router]);

  const oauthButtons = useMemo(
    () => [
      { label: "Sign in with Google", provider: "google" as const, icon: Mail },
      { label: "Sign in with GitHub", provider: "github" as const, icon: GithubMark },
    ],
    []
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await login({ email, password, rememberMe });

      if (response.requiresTwoFactor) {
        const suffix = response.ticket ? `?ticket=${encodeURIComponent(response.ticket)}` : "";
        router.push(`/verify-2fa${suffix}`);
        return;
      }

      toast({
        title: "Signed in",
        description: "Welcome back to your workspace.",
        variant: "success",
      });
      router.push("/app");
    } catch (caughtError) {
      setError(resolveLoginError(caughtError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
            Cookie-based auth only
          </Badge>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to continue tailoring resumes, tracking applications, and analyzing jobs.
            </p>
          </div>
        </div>

        <Card className="border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {oauthButtons.map(({ icon: Icon, label, provider }) => (
                <Button
                  key={provider}
                  className="h-11 justify-start"
                  onClick={() => {
                    window.location.href = getOAuthRedirectUrl(provider);
                  }}
                  type="button"
                  variant="outline"
                >
                  <Icon className="mr-2 size-4" />
                  {label}
                </Button>
              ))}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  autoComplete="email"
                  id="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={email}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link className="text-sm text-primary hover:underline" href="/forgot-password">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  autoComplete="current-password"
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                  type="password"
                  value={password}
                />
              </div>

              <label className="flex items-center gap-3 text-sm text-muted-foreground">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
                />
                Keep me signed in for 30 days
              </label>

              {error ? (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                  {error}
                </div>
              ) : null}

              <Button className="h-11 w-full" disabled={submitting} type="submit">
                {submitting ? (
                  <>
                    <Spinner className="mr-2" size="sm" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LockKeyhole className="mr-2 size-4" />
                    Sign in
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              New here?{" "}
              <Link className="font-medium text-primary hover:underline" href="/register">
                Create an account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
