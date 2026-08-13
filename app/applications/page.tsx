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
      <div className="p-6 md:p-8 space-y-8 bg-[#060e20] min-h-screen text-[#dae2fd]">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white tracking-tight">Application Tracker</h1>
          <Link href="/applications/new">
            <Button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]"><Plus className="w-4 h-4 mr-2" />Add Application</Button>
          </Link>
        </div>

        {/* Desktop Kanban */}
        <div className="hidden md:grid grid-cols-6 gap-4 items-start">
          {columns.map((col) => (
            <div key={col.id} className="space-y-4">
              <div className={`flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#0b1326] border border-[#2d3449]`}>
                <span className="font-semibold text-[13px] uppercase tracking-wider text-[#dae2fd]">{col.label}</span>
                <span className="text-sm font-bold text-[#6366f1]">{applications[col.id].length}</span>
              </div>
              {applications[col.id].map((app) => (
                <Link key={app.role} href="/applications/1">
                  <Card className="cursor-pointer bg-[#131b2e] border-[#2d3449] hover:border-[#6366f1]/50 hover:bg-[#171f33] transition-all duration-200 shadow-none mb-3">
                    <CardContent className="p-4 space-y-3">
                      <p className="font-semibold text-[15px] leading-tight text-white">{app.role}</p>
                      <p className="text-sm text-[#908fa0]">{app.company}</p>
                      <div className="flex items-center gap-1.5 text-xs text-[#464554] font-medium">
                        <MapPin className="w-3.5 h-3.5" />{app.location}
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-[#2d3449]/50">
                        <div className="flex items-center gap-1.5 text-xs text-[#908fa0]">
                          <CalendarDays className="w-3.5 h-3.5 text-[#464554]" />{app.date}
                        </div>
                        <Badge className="bg-[#0b1326] text-[#c0c1ff] border border-[#2d3449] text-[10px] px-2 py-0.5">
                          <Zap className="w-3 h-3 mr-1 text-[#6366f1]" />{app.match}%
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
        <div className="md:hidden space-y-4">
          {Object.entries(applications).flatMap(([status, apps]) =>
            apps.map((app) => (
              <Link key={`${status}-${app.role}`} href="/applications/1">
                <Card className="bg-[#131b2e] border-[#2d3449] hover:border-[#6366f1]/50 hover:bg-[#171f33] transition-all duration-200 shadow-none mb-3">
                  <CardContent className="p-5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-lg text-white">{app.role}</p>
                      <p className="text-sm text-[#908fa0] mt-1">{app.company} <span className="mx-1 text-[#464554]">·</span> {app.location}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <Badge className={`bg-[#0b1326] border-[#2d3449] text-[#dae2fd] px-2.5 py-1 text-xs font-semibold capitalize`}>{status}</Badge>
                        <span className="text-sm text-[#464554]">{app.date}</span>
                      </div>
                    </div>
                    <Badge className="bg-[#0b1326] text-[#c0c1ff] border border-[#2d3449] text-xs px-2.5 py-1">
                      <Zap className="w-3.5 h-3.5 mr-1 text-[#6366f1]" />{app.match}%
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
