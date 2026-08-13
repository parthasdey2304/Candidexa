import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bookmark, MapPin, Building2, Clock, Zap, Search } from "lucide-react";
import Link from "next/link";

const jobs = [
  { id: "1", title: "Frontend Engineer", company: "Stripe", location: "San Francisco, CA", mode: "Hybrid", posted: "2 days ago", match: 87, matchLabel: "Strong", skills: ["React", "TypeScript", "GraphQL"] },
  { id: "2", title: "React Developer", company: "Notion", location: "New York, NY", mode: "Remote", posted: "1 week ago", match: 73, matchLabel: "Partial", skills: ["React", "Redux", "Jest"] },
  { id: "3", title: "UI Engineer", company: "Vercel", location: "Remote", mode: "Remote", posted: "3 days ago", match: 61, matchLabel: "Partial", skills: ["Next.js", "CSS", "Figma"] },
  { id: "4", title: "Software Engineer – Frontend", company: "Linear", location: "San Francisco, CA", mode: "Hybrid", posted: "5 days ago", match: 79, matchLabel: "Strong", skills: ["TypeScript", "React", "Electron"] },
  { id: "5", title: "Product Engineer", company: "Loom", location: "Remote", mode: "Remote", posted: "1 day ago", match: 55, matchLabel: "Weak", skills: ["React", "Node.js", "Postgres"] },
];

const matchColor: Record<string, string> = {
  Strong: "bg-green-100 text-green-700",
  Partial: "bg-blue-100 text-blue-700",
  Weak: "bg-amber-100 text-amber-700",
};

export default function FindJobs() {
  return (
    <AppLayout currentPath="/jobs">
      <div className="p-6 md:p-8 space-y-8 bg-[#060e20] min-h-screen text-[#dae2fd]">
        <h1 className="text-3xl font-bold text-white tracking-tight">Find Jobs</h1>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#908fa0]" />
            <Input placeholder="Search by title, company, or skill..." className="pl-12 bg-[#0b1326] border-[#2d3449] text-white focus-visible:ring-[#6366f1] h-11" />
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-48 bg-[#0b1326] border-[#2d3449] text-white focus:ring-[#6366f1] h-11">
              <SelectValue placeholder="Work mode" />
            </SelectTrigger>
            <SelectContent className="bg-[#131b2e] border-[#2d3449] text-white">
              <SelectItem value="all" className="focus:bg-[#171f33] focus:text-white">All</SelectItem>
              <SelectItem value="remote" className="focus:bg-[#171f33] focus:text-white">Remote</SelectItem>
              <SelectItem value="hybrid" className="focus:bg-[#171f33] focus:text-white">Hybrid</SelectItem>
              <SelectItem value="onsite" className="focus:bg-[#171f33] focus:text-white">On-site</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-48 bg-[#0b1326] border-[#2d3449] text-white focus:ring-[#6366f1] h-11">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-[#131b2e] border-[#2d3449] text-white">
              <SelectItem value="match" className="focus:bg-[#171f33] focus:text-white">Best Match</SelectItem>
              <SelectItem value="newest" className="focus:bg-[#171f33] focus:text-white">Newest</SelectItem>
              <SelectItem value="relevance" className="focus:bg-[#171f33] focus:text-white">Relevance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id} className="bg-[#131b2e] border-[#2d3449] hover:border-[#464554] hover:bg-[#171f33] transition-all duration-200 shadow-none group">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 flex-wrap mb-2">
                      <Link href={`/jobs/${job.id}`} className="font-bold text-lg text-white group-hover:text-[#6366f1] transition-colors">
                        {job.title}
                      </Link>
                      <Badge className={`${job.matchLabel === 'Strong' ? 'bg-[#002f38] text-[#4cd7f6] border border-[#009eb9]/30' : job.matchLabel === 'Partial' ? 'bg-[#0d0096] text-[#c0c1ff] border border-[#494bd6]/30' : 'bg-[#93000a] text-[#ffb4ab] border border-[#ba1a1a]/30'} px-2.5 py-1 text-xs font-bold`}>
                        <Zap className="w-3.5 h-3.5 mr-1.5" />{job.match}% {job.matchLabel}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-5 text-sm text-[#908fa0] mb-4 font-medium">
                      <span className="flex items-center gap-1.5 text-white"><Building2 className="w-4 h-4 text-[#464554]" />{job.company}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#464554]" />{job.location}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#464554]" />{job.posted}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((s) => (
                        <span key={s} className="text-xs px-3 py-1 bg-[#0b1326] border border-[#2d3449] rounded-full text-[#dae2fd] font-medium">{s}</span>
                      ))}
                      <Badge variant="outline" className="text-xs px-3 py-1 bg-[#222a3d] border-transparent text-[#dae2fd]">{job.mode}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <Button variant="outline" className="bg-[#131b2e]/80 backdrop-blur-sm border-[#2d3449]/80 text-white hover:bg-[#171f33] hover:text-[#dae2fd] hover:border-[#6366f1]/50 h-12 px-5 rounded-xl font-medium transition-all shadow-sm">
                      <Bookmark className="w-5 h-5 mr-2 text-[#908fa0]" />Save
                    </Button>
                    <Link href={`/match`}>
                      <Button className="bg-gradient-to-r from-[#6366f1] to-[#494bd6] hover:from-[#4f46e5] hover:to-[#3b3dbf] text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] border-0 h-12 px-6 rounded-xl font-semibold transition-all hover:scale-105">Match Job</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
