import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Briefcase, KanbanSquare, Zap, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";

const statCards = [
  { label: "Resume Readiness", value: "72%", icon: Target, color: "text-indigo-600", progress: 72 },
  { label: "Saved Jobs", value: "8", icon: Briefcase, color: "text-blue-600" },
  { label: "Active Applications", value: "3", icon: KanbanSquare, color: "text-green-600" },
  { label: "AI Credits Used", value: "12/30", icon: Zap, color: "text-amber-600", progress: 40 },
];

const recentJobs = [
  { title: "Frontend Engineer", company: "Stripe", match: 87, status: "strong" },
  { title: "React Developer", company: "Notion", match: 73, status: "partial" },
  { title: "UI Engineer", company: "Vercel", match: 61, status: "weak" },
];

const recentApps = [
  { role: "Product Engineer", company: "Linear", status: "Interview", date: "Aug 10" },
  { role: "Software Engineer", company: "Figma", status: "Applied", date: "Aug 8" },
  { role: "Full-Stack Dev", company: "Loom", status: "Screening", date: "Aug 6" },
];

const checklist = [
  { label: "Upload resume", done: true },
  { label: "Set target role", done: true },
  { label: "Match your first job", done: false },
  { label: "Generate tailored resume", done: false },
];

const matchColors: Record<string, string> = {
  strong: "bg-green-100 text-green-700 border-green-200",
  partial: "bg-blue-100 text-blue-700 border-blue-200",
  weak: "bg-amber-100 text-amber-700 border-amber-200",
};

const statusColors: Record<string, string> = {
  Interview: "bg-green-100 text-green-700",
  Applied: "bg-blue-100 text-blue-700",
  Screening: "bg-amber-100 text-amber-700",
};

export default function Dashboard() {
  return (
    <AppLayout currentPath="/dashboard">
      <div className="p-6 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Good afternoon, Alex 👋</h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your applications.</p>
          </div>
          <Link href="/match">
            <Button size="lg" className="shrink-0">
              <Target className="w-4 h-4 mr-2" />
              Match a new job
            </Button>
          </Link>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(({ label, value, icon: Icon, color, progress }) => (
            <Card key={label}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{label}</p>
                    <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
                  </div>
                  <div className={`p-2 rounded-lg bg-muted ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                {progress !== undefined && (
                  <Progress value={progress} className="h-1.5" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Job Matches */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Job Matches</h2>
              <Link href="/jobs" className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <Card>
              <CardContent className="p-0 divide-y">
                {recentJobs.map((job) => (
                  <Link key={job.title} href="/match" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-medium text-sm">{job.title}</p>
                      <p className="text-xs text-muted-foreground">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${matchColors[job.status]}`}>
                        {job.match}% match
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <div className="flex items-center justify-between mt-6">
              <h2 className="text-lg font-semibold">Recent Applications</h2>
              <Link href="/applications" className="text-sm text-primary hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <Card>
              <CardContent className="p-0 divide-y">
                {recentApps.map((app) => (
                  <div key={app.role} className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium text-sm">{app.role}</p>
                      <p className="text-xs text-muted-foreground">{app.company} · {app.date}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[app.status]}`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Onboarding Checklist */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Getting Started</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                {checklist.map(({ label, done }) => (
                  <div key={label} className="flex items-center gap-3">
                    {done
                      ? <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      : <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                    }
                    <span className={`text-sm ${done ? "line-through text-muted-foreground" : "text-foreground font-medium"}`}>
                      {label}
                    </span>
                  </div>
                ))}
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>2/4 done</span>
                  </div>
                  <Progress value={50} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
