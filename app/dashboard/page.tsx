"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Briefcase, KanbanSquare, Zap, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/sign-in");
          return;
        }

        const res = await fetch("http://localhost:8000/api/dashboard/summary", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (res.ok) {
          const summary = await res.json();
          setData(summary);
        } else {
          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem("token");
            router.push("/sign-in");
          }
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [router]);

  if (loading) {
    return (
      <AppLayout currentPath="/dashboard">
        <div className="flex items-center justify-center min-h-screen bg-[#060e20]">
          <div className="w-16 h-16 border-4 border-[#2d3449] border-t-[#6366f1] rounded-full animate-spin"></div>
        </div>
      </AppLayout>
    );
  }

  const statCards = [
    { label: "Resume Readiness", value: `${data?.resume_readiness || 0}%`, icon: Target, color: "text-indigo-600", progress: data?.resume_readiness || 0 },
    { label: "Saved Jobs", value: `${data?.saved_jobs_count || 0}`, icon: Briefcase, color: "text-blue-600" },
    { label: "Active Applications", value: `${data?.active_apps_count || 0}`, icon: KanbanSquare, color: "text-green-600" },
    { label: "AI Credits Used", value: "12/30", icon: Zap, color: "text-amber-600", progress: 40 },
  ];

  const recentJobs = data?.recent_jobs || [];
  const recentApps = data?.recent_apps || [];

  return (
    <AppLayout currentPath="/dashboard">
      <div className="p-6 md:p-8 space-y-8 bg-[#060e20] min-h-screen text-[#dae2fd]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Good afternoon 👋</h1>
            <p className="text-[#908fa0] mt-2 text-lg">Here's what's happening with your applications.</p>
          </div>
          <Link href="/match">
            <Button size="lg" className="shrink-0 bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <Target className="w-4 h-4 mr-2" />
              Match a new job
            </Button>
          </Link>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map(({ label, value, icon: Icon, color, progress }) => (
            <Card key={label} className="bg-[#131b2e] border-[#2d3449] hover:border-[#6366f1]/50 transition-colors shadow-none">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-[#908fa0] font-medium mb-1">{label}</p>
                    <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-[#0b1326] shadow-inner`}>
                    <Icon className={`w-5 h-5 ${color.replace('text-', 'text-').replace('600', '400')}`} />
                  </div>
                </div>
                {progress !== undefined && (
                  <Progress value={progress} className="h-1.5 bg-[#222a3d] [&>div]:bg-[#6366f1]" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Job Matches */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Recent Job Matches</h2>
              <Link href="/jobs" className="text-sm text-[#6366f1] hover:text-[#8083ff] transition-colors flex items-center gap-1 font-medium">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <Card className="bg-[#131b2e] border-[#2d3449] shadow-none overflow-hidden">
              <CardContent className="p-0 divide-y divide-[#2d3449]">
                {recentJobs.length > 0 ? recentJobs.map((job: any) => (
                  <Link key={job.title} href="/match" className="flex items-center justify-between p-5 hover:bg-[#171f33] transition-colors group">
                    <div>
                      <p className="font-semibold text-[15px] text-white group-hover:text-[#6366f1] transition-colors">{job.title}</p>
                      <p className="text-sm text-[#908fa0] mt-1">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                        job.status === 'strong' ? 'bg-[#002f38] text-[#4cd7f6] border border-[#009eb9]/30' :
                        job.status === 'partial' ? 'bg-[#0d0096] text-[#c0c1ff] border border-[#494bd6]/30' :
                        'bg-[#93000a] text-[#ffb4ab] border border-[#ba1a1a]/30'
                      }`}>
                        {job.match}% match
                      </span>
                      <ChevronRight className="w-5 h-5 text-[#464554] group-hover:text-[#908fa0] transition-colors" />
                    </div>
                  </Link>
                )) : (
                  <div className="p-8 text-center text-[#908fa0]">
                    No recent jobs found. Start matching!
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <div className="flex items-center justify-between mt-8">
              <h2 className="text-xl font-semibold text-white">Recent Applications</h2>
              <Link href="/applications" className="text-sm text-[#6366f1] hover:text-[#8083ff] transition-colors flex items-center gap-1 font-medium">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <Card className="bg-[#131b2e] border-[#2d3449] shadow-none overflow-hidden">
              <CardContent className="p-0 divide-y divide-[#2d3449]">
                {recentApps.length > 0 ? recentApps.map((app: any) => (
                  <div key={app.role} className="flex items-center justify-between p-5 hover:bg-[#171f33] transition-colors">
                    <div>
                      <p className="font-semibold text-[15px] text-white">{app.role}</p>
                      <p className="text-sm text-[#908fa0] mt-1">{app.company} <span className="mx-2 text-[#464554]">·</span> {app.date}</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      app.status === 'Interview' ? 'bg-[#002f38] text-[#4cd7f6] border border-[#009eb9]/30' :
                      app.status === 'Applied' ? 'bg-[#0d0096] text-[#c0c1ff] border border-[#494bd6]/30' :
                      'bg-[#2c0051] text-[#ddb7ff] border border-[#6f00be]/30'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                )) : (
                  <div className="p-8 text-center text-[#908fa0]">
                    No active applications found.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Onboarding Checklist */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Getting Started</h2>
            <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
              <CardContent className="pt-6 space-y-5">
                {checklist.map(({ label, done }) => (
                  <div key={label} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#171f33] transition-colors">
                    {done
                      ? <CheckCircle2 className="w-6 h-6 text-[#4cd7f6] shrink-0" />
                      : <Circle className="w-6 h-6 text-[#464554] shrink-0" />
                    }
                    <span className={`text-[15px] ${done ? "line-through text-[#908fa0]" : "text-white font-medium"}`}>
                      {label}
                    </span>
                  </div>
                ))}
                <div className="pt-4 border-t border-[#2d3449]">
                  <div className="flex justify-between text-sm text-[#908fa0] mb-2 font-medium">
                    <span>Progress</span>
                    <span className="text-[#c0c1ff]">2/4 done</span>
                  </div>
                  <Progress value={50} className="h-2 bg-[#222a3d] [&>div]:bg-[#6366f1]" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
