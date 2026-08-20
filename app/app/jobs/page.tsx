"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { Spinner } from "@/components/ui/spinner";
import { CompanyLogo } from "@/components/shared/company-logo";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  Search,
  MapPin,
  Building2,
  Clock,
  ExternalLink,
  Bookmark,
  Filter,
  X,
  Briefcase,
} from "lucide-react";

interface Job {
  id: string;
  company: string;
  title: string;
  location: string;
  experience: string;
  salary: string;
  source: string;
  posted: string;
}

const mockJobs: Job[] = [
  { id: "1", company: "Flipkart", title: "SDE-1", location: "Bangalore", experience: "0-2 years", salary: "₹12-18 LPA", source: "LinkedIn", posted: "2 days ago" },
  { id: "2", company: "Razorpay", title: "Backend Developer", location: "Bangalore", experience: "1-3 years", salary: "₹15-22 LPA", source: "Naukri", posted: "1 day ago" },
  { id: "3", company: "Swiggy", title: "Full Stack Developer", location: "Bangalore", experience: "2-4 years", salary: "₹18-25 LPA", source: "Direct", posted: "3 days ago" },
  { id: "4", company: "PhonePe", title: "SDE-2", location: "Bangalore", experience: "2-5 years", salary: "₹20-30 LPA", source: "LinkedIn", posted: "5 hours ago" },
  { id: "5", company: "Meesho", title: "Frontend Developer", location: "Bangalore", experience: "1-3 years", salary: "₹14-20 LPA", source: "Naukri", posted: "1 week ago" },
  { id: "6", company: "Zomato", title: "SDE-1", location: "Gurugram", experience: "0-2 years", salary: "₹12-18 LPA", source: "LinkedIn", posted: "4 days ago" },
  { id: "7", company: "CRED", title: "Backend Engineer", location: "Bangalore", experience: "2-4 years", salary: "₹22-35 LPA", source: "Direct", posted: "2 days ago" },
  { id: "8", company: "Groww", title: "SDE-1", location: "Bangalore", experience: "0-2 years", salary: "₹12-18 LPA", source: "LinkedIn", posted: "6 days ago" },
];

const companies = ["Flipkart", "Razorpay", "Swiggy", "PhonePe", "Meesho", "Zomato", "CRED", "Groww", "Paytm", "Zepto"];
const locations = ["Bangalore", "Mumbai", "Delhi", "Gurugram", "Hyderabad", "Remote", "Pune", "Chennai"];

export default function JobsPage() {
  const { plan } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;
    const timer = setTimeout(() => {
      if (!mounted) return;
      setJobs(mockJobs);
      setLoading(false);
    }, 700);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  const isPro = plan?.tier === "pro";

  const toggleSave = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCompany("");
    setSelectedLocation("");
  };

  const hasActiveFilters =
    search.trim() !== "" || selectedCompany !== "" || selectedLocation !== "";

  const filteredJobs = jobs.filter((job) => {
    if (
      search &&
      !job.title.toLowerCase().includes(search.toLowerCase()) &&
      !job.company.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    if (selectedCompany && job.company !== selectedCompany) return false;
    if (selectedLocation && job.location !== selectedLocation) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Spinner size="lg" />
        <p className="mt-4 text-sm text-[#908fa0]">Loading job board...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Job Board</h1>
          <p className="mt-1 text-sm text-[#908fa0]">Browse jobs from 35+ companies across platforms</p>
        </div>
        <div className="flex items-center gap-2">
          {savedJobs.length > 0 && (
            <Badge className="bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/40">
              <Bookmark className="h-3 w-3 fill-current" />
              {savedJobs.length} saved
            </Badge>
          )}
          <Badge variant="outline" className="border-[#2d3449] bg-[#131b2e] text-[#dae2fd]">
            {filteredJobs.length} jobs found
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#908fa0]" />
          <Input
            type="text"
            placeholder="Search by title, company, or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 border-[#2d3449] bg-[#0b1326] pl-10 pr-4 text-sm text-[#dae2fd] placeholder:text-[#908fa0] focus-visible:ring-[#6366f1]/50"
          />
        </div>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="h-9 w-full rounded-lg border border-[#2d3449] bg-[#0b1326] px-3 text-sm text-[#dae2fd] outline-none focus:ring-2 focus:ring-[#6366f1]/50 sm:w-44"
        >
          <option value="" className="bg-[#0b1326]">All Companies</option>
          {companies.map((c) => (
            <option key={c} value={c} className="bg-[#0b1326]">
              {c}
            </option>
          ))}
        </select>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="h-9 w-full rounded-lg border border-[#2d3449] bg-[#0b1326] px-3 text-sm text-[#dae2fd] outline-none focus:ring-2 focus:ring-[#6366f1]/50 sm:w-44"
        >
          <option value="" className="bg-[#0b1326]">All Locations</option>
          {locations.map((l) => (
            <option key={l} value={l} className="bg-[#0b1326]">
              {l}
            </option>
          ))}
        </select>
        {hasActiveFilters ? (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="h-9 border-[#2d3449] bg-[#131b2e] text-[#dae2fd] hover:bg-[#171f33]"
          >
            <X className="mr-2 h-4 w-4" /> Clear filters
          </Button>
        ) : (
          <Button
            variant="outline"
            disabled
            className="h-9 border-[#2d3449] bg-[#131b2e] text-[#908fa0]"
          >
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredJobs.map((job) => (
          <Card
            key={job.id}
            className="border-[#2d3449] bg-[#131b2e] transition-all hover:border-[#6366f1]/50 hover:bg-[#171f33]"
          >
            <CardContent className="flex h-full flex-col">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <CompanyLogo name={job.company} size="md" />
                  <div>
                    <h3 className="font-semibold text-white">{job.title}</h3>
                    <p className="text-sm text-[#908fa0]">{job.company}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleSave(job.id)}
                  aria-label={savedJobs.includes(job.id) ? "Remove from saved jobs" : "Save job"}
                  className="rounded-lg p-1 text-[#908fa0] transition-colors hover:bg-[#0b1326] hover:text-white"
                >
                  <Bookmark
                    className={`h-5 w-5 ${savedJobs.includes(job.id) ? "fill-[#6366f1] text-[#6366f1]" : ""}`}
                  />
                </button>
              </div>
              <div className="mb-4 space-y-2 text-sm text-[#908fa0]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#5c5a72]" /> {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-[#5c5a72]" /> {job.experience}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#5c5a72]" /> {job.posted}
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between gap-2">
                <Badge variant="secondary" className="border-[#2d3449] bg-[#171f33] text-[#dae2fd]">
                  {job.source}
                </Badge>
                <span className="text-sm font-medium text-emerald-400">{job.salary}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open("#", "_blank")}
                  className="flex-1 border-[#2d3449] bg-transparent text-[#dae2fd] hover:bg-[#171f33]"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Apply
                </Button>
                {isPro ? (
                  <Link href="/app/jd-analyzer" className="flex-1">
                    <Button size="sm" className="w-full bg-[#6366f1] text-white hover:bg-[#4f46e5]">
                      Analyze Match
                    </Button>
                  </Link>
                ) : (
                  <Link href="/pricing" className="flex-1">
                    <Button size="sm" className="w-full bg-[#6366f1] text-white hover:bg-[#4f46e5]">
                      Upgrade to analyze
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <EmptyState
          icon={<Building2 className="h-6 w-6" />}
          title="No jobs found"
          description="Try adjusting your search or clear the filters to see more opportunities."
          action={
            <Button
              variant="outline"
              onClick={clearFilters}
              className="border-[#2d3449] bg-transparent text-[#dae2fd] hover:bg-[#171f33]"
            >
              Clear filters
            </Button>
          }
        />
      )}
    </div>
  );
}