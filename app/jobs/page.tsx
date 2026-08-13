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
      <div className="p-6 md:p-8 space-y-6">
        <h1 className="text-2xl font-bold">Find Jobs</h1>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by title, company, or skill..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Work mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="onsite">On-site</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">Best Match</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="relevance">Relevance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Cards */}
        <div className="space-y-3">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <Link href={`/jobs/${job.id}`} className="font-semibold hover:text-primary transition-colors">
                        {job.title}
                      </Link>
                      <Badge className={`${matchColor[job.matchLabel]} border-0 text-xs font-semibold`}>
                        <Zap className="w-3 h-3 mr-1" />{job.match}% {job.matchLabel}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{job.company}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.posted}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.skills.map((s) => (
                        <span key={s} className="text-xs px-2.5 py-1 bg-muted rounded-full text-muted-foreground">{s}</span>
                      ))}
                      <Badge variant="outline" className="text-xs">{job.mode}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm">
                      <Bookmark className="w-4 h-4 mr-1" />Save
                    </Button>
                    <Link href={`/match`}>
                      <Button size="sm">Match Job</Button>
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
