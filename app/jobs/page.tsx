"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bookmark, MapPin, Building2, Clock, Zap, Search } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const matchColor: Record<string, string> = {
  Strong: "bg-green-100 text-green-700",
  Partial: "bg-blue-100 text-blue-700",
  Weak: "bg-amber-100 text-amber-700",
};

export default function FindJobs() {
  const router = useRouter();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/sign-in");
          return;
        }

        const res = await fetch("http://localhost:8000/api/jobs", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        }
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [router]);

  return (
    <AppLayout currentPath="/jobs">
      <div className="p-6 md:p-8 space-y-8 bg-[#060e20] min-h-screen text-[#dae2fd]">
        <h1 className="text-3xl font-bold text-white tracking-tight">Saved Jobs</h1>

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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#2d3449] border-t-[#6366f1] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.length > 0 ? jobs.map((job) => (
              <Card key={job.id} className="bg-[#131b2e] border-[#2d3449] hover:border-[#464554] hover:bg-[#171f33] transition-all duration-200 shadow-none group">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 flex-wrap mb-2">
                        <Link href={`/jobs/${job.id}`} className="font-bold text-lg text-white group-hover:text-[#6366f1] transition-colors">
                          {job.title}
                        </Link>
                        <Badge className="bg-[#002f38] text-[#4cd7f6] border border-[#009eb9]/30 px-2.5 py-1 text-xs font-bold">
                          <Zap className="w-3.5 h-3.5 mr-1.5" />85% Strong
                        </Badge>
                      </div>
                      <div className="flex items-center gap-5 text-sm text-[#908fa0] mb-4 font-medium">
                        <span className="flex items-center gap-1.5 text-white"><Building2 className="w-4 h-4 text-[#464554]" />{job.company}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#464554]" />Remote</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#464554]" />{new Date(job.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs px-3 py-1 bg-[#0b1326] border border-[#2d3449] rounded-full text-[#dae2fd] font-medium">React</span>
                        <span className="text-xs px-3 py-1 bg-[#0b1326] border border-[#2d3449] rounded-full text-[#dae2fd] font-medium">TypeScript</span>
                        <Badge variant="outline" className="text-xs px-3 py-1 bg-[#222a3d] border-transparent text-[#dae2fd]">Full-Time</Badge>
                      </div>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <Button variant="outline" className="bg-[#131b2e]/80 backdrop-blur-sm border-[#2d3449]/80 text-white hover:bg-[#171f33] hover:text-[#dae2fd] hover:border-[#6366f1]/50 h-12 px-5 rounded-xl font-medium transition-all shadow-sm">
                        <Bookmark className="w-5 h-5 mr-2 text-[#6366f1] fill-[#6366f1]" />Saved
                      </Button>
                      <Link href={`/match`}>
                        <Button className="bg-gradient-to-r from-[#6366f1] to-[#494bd6] hover:from-[#4f46e5] hover:to-[#3b3dbf] text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] border-0 h-12 px-6 rounded-xl font-semibold transition-all hover:scale-105">Match Job</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <div className="text-center py-20 border-2 border-dashed border-[#2d3449] rounded-2xl">
                <p className="text-[#908fa0] text-lg font-medium">You haven't saved any jobs yet.</p>
                <Link href="/match">
                  <Button className="mt-4 bg-[#6366f1] hover:bg-[#4f46e5]">Find a Job to Match</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
