"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock, Zap, ArrowLeft } from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { isSupabaseConfigured } from "@/lib/supabase/client";

function GithubMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.15-.02-2.06-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.77 1.05.77 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export default function SignInAliasPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, login, signInWithOAuth } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("partha");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated) router.replace("/app");
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login({ email, password, rememberMe });
      toast({ title: "Signed in", description: "Welcome back.", variant: "success" });
      router.push("/app");
    } catch (caughtError) {
      const raw = (caughtError as { message?: string })?.message ?? "";
      const low = raw.toLowerCase();
      let msg = raw || "We couldn't sign you in. Please try again.";
      if (low.includes("supabase not configured")) msg = raw + " — fix Vercel env and redeploy.";
      else if (low.includes("email not confirmed") || low.includes("confirm")) msg = "Email not confirmed — check inbox for verification link.";
      else if (low.includes("invalid") || low.includes("not found")) msg = `${raw} — try Sign up free if this email was registered on the old backend (not Supabase).`;
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="absolute top-4 left-4 z-10 lg:hidden">
        <Link href="/" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground">
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="flex flex-1">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative max-w-md text-white">
            <div className="flex items-center gap-2 mb-8"><Zap className="h-8 w-8" /><span className="text-2xl font-bold">Candidexa</span></div>
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-lg text-purple-100">Continue building your AI-powered career toolkit. Your next interview is just one login away.</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8 bg-background">
          <div className="w-full max-w-md">
            <div className="lg:hidden flex items-center gap-2 mb-8"><Zap className="h-7 w-7 text-primary" /><span className="text-xl font-bold text-foreground">Candidexa</span></div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Sign in to Candidexa</h2>
            <p className="text-muted-foreground mb-6">Enter your credentials to access your dashboard.</p>
            {!isSupabaseConfigured() && (
              <div className="mb-4 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-xs text-amber-700 dark:text-amber-300">
                Supabase not configured on this deployment. Set <code>NEXT_PUBLIC_SUPABASE_URL</code> + <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> in Vercel → Settings → Environment Variables and redeploy.
              </div>
            )}
            {error && <div className="mb-4 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive whitespace-pre-wrap break-words">{error}</div>}
            <div className="grid gap-3 mb-6">
              <Button variant="outline" className="h-11" type="button" onClick={() => void signInWithOAuth("google")}>
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Sign in with Google
              </Button>
              <Button variant="outline" className="h-11" type="button" onClick={() => void signInWithOAuth("github")}>
                <GithubMark className="h-5 w-5 mr-2" />Sign in with GitHub
              </Button>
            </div>
            <div className="relative mb-6"><div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with email</span></div></div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-10 h-11" /></div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between"><Label htmlFor="password">Password</Label><Link className="text-sm text-primary hover:underline" href="/forgot-password">Forgot password?</Link></div>
                <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="pl-10 pr-10 h-11" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>
              </div>
              <label className="flex items-center gap-3 text-sm text-muted-foreground cursor-pointer"><Checkbox checked={rememberMe} onCheckedChange={(c) => setRememberMe(Boolean(c))} />Keep me signed in</label>
              <Button className="h-11 w-full" disabled={submitting} type="submit">{submitting ? <><Spinner className="mr-2" size="sm" />Signing in...</> : "Sign In"}</Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">Don&apos;t have an account? <Link className="font-medium text-primary hover:underline" href="/sign-up">Sign up</Link> • <Link className="font-medium text-primary hover:underline" href="/login">Go to Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
