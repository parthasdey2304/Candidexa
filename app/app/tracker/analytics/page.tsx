"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ScoreGauge } from "@/components/shared/score-gauge";
import { useAuth } from "@/components/providers/AuthProvider";
import { ArrowLeft, Briefcase, TrendingUp, BarChart3, Building2, CalendarClock } from "lucide-react";

interface AnalyticsStats {
  total: number;
  responseRate: number;
  interviewConversion: number;
  avgTimeInStage: Record<string, string>;
  topCompanies: { name: string; count: number }[];
  funnel: { stage: string; count: number }[];
  timeline: { month: string; count: number }[];
}

const mockStats: AnalyticsStats = {
  total: 42,
  responseRate: 48,
  interviewConversion: 33,
  avgTimeInStage: { saved: "3d", applied: "2d", phone: "1d", technical: "5d", hr: "2d" },
  topCompanies: [
    { name: "Flipkart", count: 8 },
    { name: "Razorpay", count: 6 },
    { name: "Swiggy", count: 5 },
    { name: "CRED", count: 4 },
    { name: "Zomato", count: 4 },
  ],
  funnel: [
    { stage: "Saved", count: 42 },
    { stage: "Applied", count: 35 },
    { stage: "Phone Screen", count: 17 },
    { stage: "Technical", count: 9 },
    { stage: "HR Round", count: 4 },
    { stage: "Offer", count: 2 },
  ],
  timeline: [
    { month: "Mar", count: 3 },
    { month: "Apr", count: 6 },
    { month: "May", count: 9 },
    { month: "Jun", count: 7 },
    { month: "Jul", count: 10 },
    { month: "Aug", count: 7 },
  ],
};

const statCards = [
  { label: "Total Applications", icon: Briefcase, value: (s: AnalyticsStats) => String(s.total) },
  { label: "Response Rate", icon: TrendingUp, value: (s: AnalyticsStats) => `${s.responseRate}%`, tone: "text-emerald-400" },
  { label: "Interview Conversion", icon: BarChart3, value: (s: AnalyticsStats) => `${s.interviewConversion}%`, tone: "text-indigo-300" },
  { label: "Offers", icon: Building2, value: () => "2", tone: "text-emerald-300" },
];

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const timer = setTimeout(() => {
      if (!mounted) return;
      setStats(mockStats);
      setLoading(false);
    }, 650);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Spinner size="lg" />
        <p className="mt-4 text-sm text-muted-foreground">Crunching your numbers...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/app/tracker"
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Application Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {user?.name ? `${user.name.split(" ")[0]}'s` : "Your"} job search performance at a glance
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map(({ label, icon: Icon, value, tone }) => (
          <Card key={label} className="border-border bg-card">
            <CardContent>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{label}</p>
                  <p className={`mt-1 text-2xl font-bold text-foreground ${tone ?? ""}`}>{value(stats)}</p>
                </div>
                <div className="rounded-xl bg-muted p-2.5 text-indigo-300 ring-1 ring-inset ring-[#2d3449]">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base text-foreground">Response Rate</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-4">
            <ScoreGauge
              value={stats.responseRate}
              label="Response rate"
              sub={`${stats.total} applications sent`}
              size={170}
            />
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base text-foreground">Interview Conversion</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-4">
            <ScoreGauge
              value={stats.interviewConversion}
              label="Interview conversion"
              sub="Applied → interview"
              size={170}
            />
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base text-foreground">Application Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.funnel.map((f) => {
                const width = (f.count / stats.funnel[0].count) * 100;
                return (
                  <div key={f.stage}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="font-medium text-foreground">{f.stage}</span>
                      <span className="text-muted-foreground">{f.count}</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#818cf8] transition-all duration-500"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base text-foreground">Avg Time in Each Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-center sm:grid-cols-5">
              {Object.entries(stats.avgTimeInStage).map(([stage, time]) => (
                <div key={stage} className="rounded-lg border border-border bg-muted p-3">
                  <p className="text-lg font-bold text-indigo-300">{time}</p>
                  <p className="mt-1 text-xs capitalize text-muted-foreground">
                    {stage === "phone" ? "Phone" : stage}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base text-foreground">Top Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.topCompanies.map((c) => {
                const width = (c.count / stats.topCompanies[0].count) * 100;
                return (
                  <div key={c.name} className="flex items-center gap-3">
                    <span className="w-24 truncate text-sm font-medium text-foreground">{c.name}</span>
                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-emerald-500/80 transition-all duration-500"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                    <span className="text-sm tabular-nums text-muted-foreground">{c.count}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base text-foreground">
              <span className="inline-flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-indigo-300" /> Applications Over Time
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-40 items-end gap-3">
              {stats.timeline.map((t) => {
                const max = Math.max(...stats.timeline.map((x) => x.count));
                return (
                  <div key={t.month} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <span className="text-xs tabular-nums text-muted-foreground">{t.count}</span>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-[#4f46e5] to-[#818cf8] transition-all duration-500"
                      style={{ height: `${(t.count / max) * 100}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{t.month}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}