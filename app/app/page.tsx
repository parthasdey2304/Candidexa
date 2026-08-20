"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Spinner } from "@/components/ui/spinner";
import { UsageGauge, PlanBadge } from "@/components/shared/usage-gauge";
import {
  FileText,
  Briefcase,
  Kanban,
  Brain,
  Search,
  ArrowRight,
  Clock,
  Target,
  Plus,
  Sparkles,
  Code2,
  Rocket,
  FolderKanban,
  Route,
  ChartNoAxesCombined,
} from "lucide-react";

const quickActions = [
  { title: "Upload Resume", description: "Build your AI-powered resume", icon: FileText, href: "/app/resume" },
  { title: "Analyze JD", description: "Match resume against a job", icon: Search, href: "/app/jd-analyzer" },
  { title: "Browse Jobs", description: "Explore company listings", icon: Briefcase, href: "/app/jobs" },
  { title: "Mock Interview", description: "Practice with AI feedback", icon: Brain, href: "/app/mock-interview" },
];

const aiEngines = [
  { title: "Tailor", description: "Batch tailor resumes for 500 companies", icon: Route, href: "/app/tailor" },
  { title: "Code Gen", description: "Generate portfolio-ready project code", icon: Code2, href: "/app/codegen" },
  { title: "Deploy", description: "Ship projects with one click", icon: Rocket, href: "/app/deployments" },
  { title: "Roadmap", description: "Personal 30-60-90 day interview plan", icon: FolderKanban, href: "/app/roadmap" },
];

export default function AppDashboardPage() {
  const { user, plan, isLoading } = useAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 700);
    return () => clearTimeout(t);
  }, []);

  const firstName = user?.name?.split(" ")[0] ?? "there";
  const isPro = plan?.tier === "pro" || plan?.name?.toLowerCase().includes("pro");

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 p-6 text-white sm:p-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="mb-1 text-2xl font-bold sm:text-3xl">Welcome back, {firstName}!</h1>
            <p className="text-indigo-100">
              {isPro ? "You have full access to all AI features." : "Upgrade to unlock AI tailoring, video demos, and more."}
            </p>
          </div>
          <PlanBadge plan={plan?.name ?? (isPro ? "pro" : "free")} />
        </div>
      </div>

      {!isPro && (
        <Card className="rounded-2xl border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-violet-500/10">
          <CardContent className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <Sparkles className="size-5 shrink-0 text-indigo-400" />
              <p className="text-sm font-medium text-[#dae2fd]">Unlock batch tailoring, code generation, video demos, and more.</p>
            </div>
            <Link href="/app/settings?tab=billing" className="shrink-0">
              <Button size="sm">
                Upgrade to Pro <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="mb-3 text-lg font-semibold text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href} className="h-full">
              <Card className="h-full cursor-pointer border-[#2d3449] bg-[#131b2e] transition-all hover:border-indigo-500/60 hover:shadow-[0_8px_30px_-8px_rgba(99,102,241,0.4)]">
                <CardContent className="flex flex-col items-start gap-3">
                  <div className="inline-flex rounded-xl bg-indigo-500/15 p-3 text-indigo-300 ring-1 ring-inset ring-indigo-500/30">
                    <action.icon className="size-5" />
                  </div>
                  <h3 className="font-semibold text-white">{action.title}</h3>
                  <p className="text-sm text-[#908fa0]">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {isLoading || !ready ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">AI Engines</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {aiEngines.map((engine) => (
                <Link key={engine.title} href={engine.href} className="h-full">
                  <Card className="h-full cursor-pointer border-[#2d3449] bg-[#131b2e] transition-all hover:border-indigo-500/60">
                    <CardContent className="flex items-center gap-3">
                      <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300 ring-1 ring-inset ring-violet-500/30">
                        <engine.icon className="size-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate font-medium text-white">{engine.title}</h3>
                        <p className="truncate text-xs text-[#908fa0]">{engine.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">Overview</h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { label: "Resumes Created", value: "0", icon: FileText },
                { label: "Applications", value: "0", icon: Kanban },
                { label: "Interviews Scheduled", value: "0", icon: Brain },
                { label: "Avg ATS Score", value: "--", icon: Target },
              ].map((stat) => (
                <Card key={stat.label} className="border-[#2d3449] bg-[#131b2e]">
                  <CardContent>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-[#908fa0]">{stat.label}</span>
                      <stat.icon className="size-4 text-indigo-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-[#2d3449] bg-[#131b2e]">
              <CardHeader>
                <CardTitle className="text-white">AI Usage This Month</CardTitle>
                <CardDescription className="text-[#908fa0]">Credits across all engines</CardDescription>
              </CardHeader>
              <CardContent>
                {isPro ? (
                  <UsageGauge used={38} limit={500} />
                ) : (
                  <UsageGauge used={2} limit={10} />
                )}
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#0b1326] p-3 text-xs text-[#908fa0] ring-1 ring-inset ring-white/10">
                  <ChartNoAxesCombined className="size-4 shrink-0 text-indigo-400" />
                  Projects deployed and videos generated count toward your monthly quota.
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#2d3449] bg-[#131b2e]">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-[#908fa0]">Your latest pipeline actions</CardDescription>
              </CardHeader>
              <CardContent>
                <EmptyState
                  icon={<Clock className="size-6" />}
                  title="No activity yet"
                  description="Start by uploading your resume or analyzing your first job description."
                  action={
                    <Link href="/app/resume">
                      <Button size="sm">
                        <Plus className="mr-2 size-4" /> Create Resume
                      </Button>
                    </Link>
                  }
                />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}