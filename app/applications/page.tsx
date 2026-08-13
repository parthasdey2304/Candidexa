import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, CalendarDays, Plus, Zap, ExternalLink } from "lucide-react";
import Link from "next/link";

const columns = [
  { id: "saved", label: "Saved", color: "bg-slate-100 text-slate-700" },
  { id: "applied", label: "Applied", color: "bg-blue-100 text-blue-700" },
  { id: "screening", label: "Screening", color: "bg-amber-100 text-amber-700" },
  { id: "interview", label: "Interview", color: "bg-violet-100 text-violet-700" },
  { id: "offer", label: "Offer", color: "bg-green-100 text-green-700" },
  { id: "rejected", label: "Rejected", color: "bg-red-100 text-red-700" },
];

const applications: Record<string, { role: string; company: string; location: string; date: string; match: number }[]> = {
  saved: [
    { role: "UI Engineer", company: "Vercel", location: "Remote", date: "Aug 13", match: 61 },
  ],
  applied: [
    { role: "React Developer", company: "Notion", location: "New York", date: "Aug 8", match: 73 },
    { role: "Full-Stack Dev", company: "Loom", location: "Remote", date: "Aug 6", match: 55 },
  ],
  screening: [
    { role: "Product Engineer", company: "Linear", location: "SF", date: "Aug 5", match: 79 },
  ],
  interview: [
    { role: "Frontend Eng", company: "Stripe", location: "SF", date: "Aug 1", match: 87 },
  ],
  offer: [],
  rejected: [
    { role: "Staff Engineer", company: "Airbnb", location: "SF", date: "Jul 28", match: 48 },
  ],
};

export default function ApplicationTracker() {
  return (
    <AppLayout currentPath="/applications">
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Application Tracker</h1>
          <Link href="/applications/new">
            <Button><Plus className="w-4 h-4 mr-2" />Add Application</Button>
          </Link>
        </div>

        {/* Desktop Kanban */}
        <div className="hidden md:grid grid-cols-6 gap-3 items-start">
          {columns.map((col) => (
            <div key={col.id} className="space-y-3">
              <div className={`flex items-center justify-between px-3 py-2 rounded-lg ${col.color}`}>
                <span className="font-semibold text-sm">{col.label}</span>
                <span className="text-xs font-bold">{applications[col.id].length}</span>
              </div>
              {applications[col.id].map((app) => (
                <Link key={app.role} href="/applications/1">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-3 space-y-2">
                      <p className="font-semibold text-sm leading-tight">{app.role}</p>
                      <p className="text-xs text-muted-foreground">{app.company}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />{app.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <CalendarDays className="w-3 h-3" />{app.date}
                        </div>
                        <Badge className="bg-primary/10 text-primary border-0 text-xs px-1.5">
                          <Zap className="w-2.5 h-2.5 mr-0.5" />{app.match}%
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile List */}
        <div className="md:hidden space-y-3">
          {Object.entries(applications).flatMap(([status, apps]) =>
            apps.map((app) => (
              <Link key={`${status}-${app.role}`} href="/applications/1">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{app.role}</p>
                      <p className="text-xs text-muted-foreground">{app.company} · {app.location}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={`${columns.find(c => c.id === status)?.color} border-0 text-xs`}>{status}</Badge>
                        <span className="text-xs text-muted-foreground">{app.date}</span>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-0">
                      <Zap className="w-3 h-3 mr-1" />{app.match}%
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}
