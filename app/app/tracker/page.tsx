"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { CompanyLogo } from "@/components/shared/company-logo";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Plus,
  Calendar,
  FileText,
  AlertCircle,
  ExternalLink,
  BarChart3,
  TrendingUp,
} from "lucide-react";

type Column = "saved" | "applied" | "phone_screen" | "technical" | "hr" | "offer" | "rejected" | "accepted";

interface Application {
  id: string;
  company: string;
  title: string;
  source: string;
  status: Column;
  appliedDate: string;
  atsScore?: number;
  nextAction?: string;
  notes?: string;
  hasResume?: boolean;
}

const columnConfig: Record<Column, { label: string; dot: string; panel: string; badge: string }> = {
  saved: { label: "Saved", dot: "bg-slate-400", panel: "border-slate-500/20 bg-slate-500/10", badge: "bg-slate-500/15 text-slate-300 ring-slate-500/30" },
  applied: { label: "Applied", dot: "bg-blue-400", panel: "border-blue-500/20 bg-blue-500/10", badge: "bg-blue-500/15 text-blue-300 ring-blue-500/30" },
  phone_screen: { label: "Phone Screen", dot: "bg-amber-400", panel: "border-amber-500/20 bg-amber-500/10", badge: "bg-amber-500/15 text-amber-300 ring-amber-500/30" },
  technical: { label: "Technical", dot: "bg-violet-400", panel: "border-violet-500/20 bg-violet-500/10", badge: "bg-violet-500/15 text-violet-300 ring-violet-500/30" },
  hr: { label: "HR Round", dot: "bg-indigo-400", panel: "border-indigo-500/20 bg-indigo-500/10", badge: "bg-indigo-500/15 text-indigo-300 ring-indigo-500/30" },
  offer: { label: "Offer", dot: "bg-emerald-400", panel: "border-emerald-500/20 bg-emerald-500/10", badge: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30" },
  rejected: { label: "Rejected", dot: "bg-red-400", panel: "border-red-500/20 bg-red-500/10", badge: "bg-red-500/15 text-red-300 ring-red-500/30" },
  accepted: { label: "Accepted", dot: "bg-green-400", panel: "border-green-500/20 bg-green-500/10", badge: "bg-green-500/15 text-green-300 ring-green-500/30" },
};

const mockApplications: Application[] = [
  { id: "1", company: "Flipkart", title: "SDE-1", source: "LinkedIn", status: "technical", appliedDate: "2026-08-15", atsScore: 89, nextAction: "2026-08-22", hasResume: true },
  { id: "2", company: "Razorpay", title: "Backend Developer", source: "Naukri", status: "applied", appliedDate: "2026-08-18", atsScore: 76 },
  { id: "3", company: "Swiggy", title: "Full Stack Developer", source: "Direct", status: "phone_screen", appliedDate: "2026-08-12", nextAction: "2026-08-21" },
  { id: "4", company: "PhonePe", title: "SDE-2", source: "LinkedIn", status: "saved", appliedDate: "2026-08-19" },
  { id: "5", company: "CRED", title: "Backend Engineer", source: "Direct", status: "hr", appliedDate: "2026-08-10", atsScore: 92, nextAction: "2026-08-20", notes: "Salary discussion pending" },
  { id: "6", company: "Zomato", title: "SDE-1", source: "LinkedIn", status: "rejected", appliedDate: "2026-08-05" },
  { id: "7", company: "Meesho", title: "Frontend Developer", source: "Naukri", status: "offer", appliedDate: "2026-08-01", atsScore: 85 },
];

const emptyForm = {
  company: "",
  title: "",
  source: "",
  appliedDate: "",
  notes: "",
  status: "saved" as Column,
};

export default function TrackerPage() {
  const { plan } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let mounted = true;
    const timer = setTimeout(() => {
      if (!mounted) return;
      setApplications(mockApplications);
      setLoading(false);
    }, 700);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  const isPro = plan?.tier === "pro";

  const atsBadge = (score: number) =>
    score >= 80
      ? "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30"
      : score >= 60
        ? "bg-amber-500/15 text-amber-400 ring-amber-500/30"
        : "bg-red-500/15 text-red-400 ring-red-500/30";

  const isOverdue = (app: Application) =>
    Boolean(app.nextAction && new Date(app.nextAction) < new Date());

  const getApplicationsByColumn = (column: Column) =>
    applications.filter((app) => app.status === column);

  const openDetail = (app: Application) => {
    setSelectedApp(app);
    setShowDetailModal(true);
  };

  const handleAdd = () => {
    if (!form.company.trim() || !form.title.trim()) {
      setFormError("Company and job title are required.");
      return;
    }
    const app: Application = {
      id: `app-${Date.now()}`,
      company: form.company.trim(),
      title: form.title.trim(),
      source: form.source.trim() || "Manual",
      status: form.status,
      appliedDate: form.appliedDate || new Date().toISOString().slice(0, 10),
      notes: form.notes.trim() || undefined,
      hasResume: false,
    };
    setApplications((prev) => [app, ...prev]);
    setShowAddModal(false);
    setForm({ ...emptyForm });
    setFormError("");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Spinner size="lg" />
        <p className="mt-4 text-sm text-muted-foreground">Loading your applications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Application Tracker</h1>
          <p className="mt-1 text-sm text-muted-foreground">{applications.length} applications tracked</p>
        </div>
        <div className="flex gap-2">
          <Link href="/app/tracker/analytics">
            <Button variant="outline" size="sm" className="border-border bg-transparent text-foreground hover:bg-muted">
              <BarChart3 className="mr-2 h-4 w-4" /> Analytics
            </Button>
          </Link>
          <Button size="sm" onClick={() => setShowAddModal(true)} className="bg-[#6366f1] text-foreground hover:bg-[#4f46e5]">
            <Plus className="mr-2 h-4 w-4" /> Add Application
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {(Object.keys(columnConfig) as Column[]).map((column) => {
          const config = columnConfig[column];
          const colApps = getApplicationsByColumn(column);
          return (
            <div key={column} className="w-full flex flex-col">
              <div className={`mb-3 flex items-center justify-between rounded-xl border px-3 py-2.5 ${config.panel}`}>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className={`h-2 w-2 rounded-full ${config.dot}`} />
                  {config.label}
                </h3>
                <Badge className={`ring-1 ring-inset ${config.badge}`}>{colApps.length}</Badge>
              </div>
              <div className="min-h-[200px] space-y-2">
                {colApps.map((app) => (
                  <Card
                    key={app.id}
                    onClick={() => openDetail(app)}
                    className="cursor-pointer border-border bg-card transition-all hover:border-[#6366f1]/50 hover:bg-muted"
                  >
                    <CardContent>
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <CompanyLogo name={app.company} size="sm" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{app.company}</p>
                            <p className="text-xs text-muted-foreground">{app.title}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 text-[#5c5a72]" /> {app.appliedDate}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Badge variant="secondary" className="border-border bg-muted text-foreground">
                          {app.source}
                        </Badge>
                        {app.atsScore !== undefined && (
                          <Badge className={`ring-1 ring-inset ${atsBadge(app.atsScore)}`}>
                            ATS {app.atsScore}%
                          </Badge>
                        )}
                        {app.hasResume && <FileText className="h-3.5 w-3.5 text-emerald-400" />}
                        {isOverdue(app) && (
                          <Badge className="bg-red-500/15 text-red-400 ring-1 ring-inset ring-red-500/30">
                            <AlertCircle className="h-3 w-3" /> Overdue
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {colApps.length === 0 && (
                  <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-border text-xs text-muted-foreground">
                    No applications
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="border-border bg-muted text-foreground sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Add Application</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Track a new opportunity in your pipeline.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Company</label>
              <Input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g., Flipkart"
                className="border-border bg-card text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Job Title</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., SDE-1"
                className="border-border bg-card text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Source</label>
                <Input
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                  placeholder="e.g., LinkedIn"
                  className="border-border bg-card text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Application Date</label>
                <Input
                  type="date"
                  value={form.appliedDate}
                  onChange={(e) => setForm({ ...form, appliedDate: e.target.value })}
                  className="border-border bg-card text-foreground"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Column })}
                className="h-8 w-full rounded-lg border border-border bg-card px-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-[#6366f1]/50"
              >
                {(Object.keys(columnConfig) as Column[]).map((key) => (
                  <option key={key} value={key} className="bg-card">
                    {columnConfig[key].label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Notes</label>
              <Textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Any notes about this application..."
                className="border-border bg-card text-foreground placeholder:text-muted-foreground"
              />
            </div>
            {formError && <p className="text-sm text-red-400">{formError}</p>}
          </div>
          <DialogFooter className="-mx-4 -mb-4 border-border bg-card">
            <DialogClose
              render={
                <Button variant="outline" className="border-border bg-transparent text-foreground hover:bg-muted">
                  Cancel
                </Button>
              }
            />
            <Button onClick={handleAdd} className="bg-[#6366f1] text-foreground hover:bg-[#4f46e5]">
              <Plus className="mr-2 h-4 w-4" /> Add Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="border-border bg-muted text-foreground sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {selectedApp ? `${selectedApp.company} - ${selectedApp.title}` : "Application"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Application details and suggested next steps.
            </DialogDescription>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Status</span>
                  <p className="mt-1 font-medium capitalize text-foreground">
                    {columnConfig[selectedApp.status].label}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Source</span>
                  <p className="mt-1 font-medium text-foreground">{selectedApp.source}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Applied</span>
                  <p className="mt-1 font-medium text-foreground">{selectedApp.appliedDate}</p>
                </div>
                {selectedApp.atsScore !== undefined && (
                  <div>
                    <span className="text-sm text-muted-foreground">ATS Score</span>
                    <p className="mt-1 font-medium text-foreground">{selectedApp.atsScore}%</p>
                  </div>
                )}
              </div>
              {selectedApp.nextAction && (
                <div>
                  <span className="text-sm text-muted-foreground">Next Action</span>
                  <p className="mt-1 text-sm font-medium text-foreground">{selectedApp.nextAction}</p>
                </div>
              )}
              {selectedApp.notes && (
                <div>
                  <span className="text-sm text-muted-foreground">Notes</span>
                  <p className="mt-1 text-sm text-foreground">{selectedApp.notes}</p>
                </div>
              )}
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" className="flex-1 border-border bg-transparent text-foreground hover:bg-muted">
                  <ExternalLink className="mr-2 h-4 w-4" /> View Job
                </Button>
                {selectedApp.hasResume && (
                  <Button variant="outline" className="flex-1 border-border bg-transparent text-foreground hover:bg-muted">
                    <FileText className="mr-2 h-4 w-4" /> View Resume
                  </Button>
                )}
                <Link href={isPro ? "/app/tailor" : "/pricing"} className="flex-1">
                  <Button className="w-full bg-[#6366f1] text-foreground hover:bg-[#4f46e5]">
                    <TrendingUp className="mr-2 h-4 w-4" /> Tailor Resume
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}