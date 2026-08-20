"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Search, Zap, Download, Eye, AlertTriangle, Check, Loader2, Lock } from "lucide-react";
import { CompanyLogo } from "@/components/shared/company-logo";
import { StatusBadge } from "@/components/shared/status-badge";

interface Company {
  name: string;
  category: string;
  ats: number;
  status: "ready" | "gap";
}

const mockCompanies: Company[] = [
  { name: "Flipkart", category: "E-commerce", ats: 96, status: "ready" },
  { name: "Razorpay", category: "FinTech", ats: 91, status: "ready" },
  { name: "Swiggy", category: "Food Tech", ats: 88, status: "ready" },
  { name: "PhonePe", category: "FinTech", ats: 84, status: "ready" },
  { name: "CRED", category: "FinTech", ats: 78, status: "gap" },
  { name: "Zomato", category: "Food Tech", ats: 72, status: "gap" },
  { name: "Meesho", category: "E-commerce", ats: 93, status: "ready" },
  { name: "Groww", category: "FinTech", ats: 89, status: "ready" },
];

const categories = ["All", "E-commerce", "FinTech", "Food Tech"];

function selectClass() {
  return "flex h-10 w-full rounded-lg border border-[#2d3449] bg-[#0b1326] px-3 text-sm text-[#dae2fd] outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40";
}

export default function TailorPage() {
  const [step, setStep] = useState<"setup" | "progress" | "results">("setup");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectAll, setSelectAll] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentCompany, setCurrentCompany] = useState("");
  const [avgAts, setAvgAts] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const filteredCompanies = mockCompanies.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== "All" && c.category !== category) return false;
    return true;
  });

  const toggleCompany = (name: string) => {
    setSelectedCompanies((prev) => (prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]));
  };

  const toggleAll = () => {
    if (selectAll) setSelectedCompanies([]);
    else setSelectedCompanies(mockCompanies.map((c) => c.name));
    setSelectAll(!selectAll);
  };

  const startTailoring = () => {
    if (selectedCompanies.length === 0) return;
    setStep("progress");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStep("results");
          return 100;
        }
        setCurrentCompany(mockCompanies[Math.floor((p / 100) * mockCompanies.length)]?.name ?? "");
        setAvgAts(85 + Math.floor(Math.random() * 10));
        return p + 5;
      });
    }, 300);
  };

  const avgScore = mockCompanies.length
    ? Math.round(mockCompanies.reduce((sum, c) => sum + c.ats, 0) / mockCompanies.length)
    : 0;
  const readyCount = mockCompanies.filter((c) => c.status === "ready").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Resume Tailoring Engine</h1>
        <p className="text-[#908fa0]">Tailor your resume for 500 companies with AI</p>
      </div>

      {step === "setup" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base text-white">Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#dae2fd]">Master Resume</label>
                    <select className={selectClass()}>
                      <option>My Master Resume</option>
                      <option>Resume 2 (SDE-1)</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#dae2fd]">Target Role</label>
                    <select className={selectClass()}>
                      <option value="sde1">SDE-1</option>
                      <option value="backend">Backend Developer</option>
                      <option value="frontend">Frontend Developer</option>
                      <option value="data">Data Analyst</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#131b2e] p-4 ring-1 ring-white/10">
                  <div>
                    <p className="text-sm font-medium text-white">Company Selection</p>
                    <p className="text-xs text-[#908fa0]">{selectedCompanies.length} companies selected</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-[#2d3449] bg-transparent text-[#dae2fd] hover:bg-[#171f33]" onClick={toggleAll}>
                      {selectAll ? "Deselect All" : "Select All"}
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#2d3449] bg-transparent text-[#dae2fd] hover:bg-[#171f33]" onClick={() => setShowUpgrade(true)}>
                      Browse 500
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-base text-white">Companies</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-[#908fa0]" />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        className="rounded-lg border border-[#2d3449] bg-[#0b1326] py-1.5 pr-3 pl-8 text-sm text-[#dae2fd] outline-none placeholder:text-[#908fa0] focus:border-indigo-500"
                      />
                    </div>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-32 text-sm">
                      {categories.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="max-h-96 space-y-2 overflow-y-auto pr-2">
                  {filteredCompanies.map((company) => (
                    <label
                      key={company.name}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#2d3449] p-3 transition-colors hover:border-indigo-500/50 hover:bg-[#131b2e]"
                    >
                      <Checkbox checked={selectedCompanies.includes(company.name)} onCheckedChange={() => toggleCompany(company.name)} />
                      <CompanyLogo name={company.name} size="md" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-[#dae2fd]">{company.name}</p>
                        <p className="text-xs text-[#908fa0]">{company.category}</p>
                      </div>
                      <Badge className="bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/40">{company.ats}%</Badge>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-base text-white">Start Tailoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 rounded-lg bg-indigo-500/10 p-3 ring-1 ring-inset ring-indigo-500/30">
                <Zap className="size-4 shrink-0 text-indigo-400" />
                <p className="text-xs text-indigo-200">AI will fetch each company&apos;s JD, profile the company, and tailor your resume with up to 3 iterations for max ATS score.</p>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-[#131b2e] p-3 ring-1 ring-white/10">
                <Lock className="size-4 shrink-0 text-[#908fa0]" />
                <p className="text-xs text-[#908fa0]">Paid feature - requires Pro plan</p>
              </div>
              <Button onClick={startTailoring} disabled={selectedCompanies.length === 0} className="w-full">
                <Zap className="mr-2 size-4" /> Start AI Tailoring ({selectedCompanies.length})
              </Button>
              <p className="text-center text-xs text-[#908fa0]">Estimated time: ~{Math.ceil(selectedCompanies.length * 2)} minutes</p>
            </CardContent>
          </Card>
        </div>
      )}

      {step === "progress" && (
        <Card>
          <CardContent className="space-y-6 p-8 text-center">
            <Loader2 className="mx-auto size-12 animate-spin text-indigo-400" />
            <div>
              <h3 className="mb-1 text-lg font-semibold text-white">AI is tailoring your resume...</h3>
              <p className="text-[#908fa0]">Processing: {currentCompany}</p>
            </div>
            <div className="mx-auto max-w-md">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-[#908fa0]">
                  Company {Math.min(Math.round((progress / 100) * selectedCompanies.length || 0) + 1, selectedCompanies.length)} of {selectedCompanies.length}
                </span>
                <span className="font-medium text-white">{progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full rounded-full bg-indigo-500 transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-3 text-sm text-[#908fa0]">
                Average ATS score so far: <span className="font-semibold text-emerald-400">{avgAts}%</span>
              </p>
            </div>
            <Button variant="outline" size="sm" className="border-[#2d3449] bg-transparent text-[#dae2fd] hover:bg-[#171f33]">
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}

      {step === "results" && (
        <>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid grid-cols-3 gap-4">
              <Card size="sm">
                <CardContent>
                  <p className="text-xs text-[#908fa0]">Total Companies</p>
                  <p className="text-2xl font-bold text-white">{mockCompanies.length}</p>
                </CardContent>
              </Card>
              <Card size="sm">
                <CardContent>
                  <p className="text-xs text-[#908fa0]">Avg ATS Score</p>
                  <p className="text-2xl font-bold text-emerald-400">{avgScore}%</p>
                </CardContent>
              </Card>
              <Card size="sm">
                <CardContent>
                  <p className="text-xs text-[#908fa0]">Ready</p>
                  <p className="text-2xl font-bold text-white">{readyCount}</p>
                </CardContent>
              </Card>
            </div>
            <Button size="sm">
              <Download className="mr-2 size-4" /> Download All (ZIP)
            </Button>
          </div>

          <Card>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#2d3449]">
                      <th className="py-2 pr-2 text-left">
                        <span className="text-xs font-medium uppercase tracking-wide text-[#908fa0]">Company</span>
                      </th>
                      <th className="py-2 pr-2 text-left">
                        <span className="text-xs font-medium uppercase tracking-wide text-[#908fa0]">Role</span>
                      </th>
                      <th className="py-2 pr-2 text-left">
                        <span className="text-xs font-medium uppercase tracking-wide text-[#908fa0]">ATS Score</span>
                      </th>
                      <th className="py-2 pr-2 text-left">
                        <span className="text-xs font-medium uppercase tracking-wide text-[#908fa0]">Status</span>
                      </th>
                      <th className="py-2 text-right">
                        <span className="text-xs font-medium uppercase tracking-wide text-[#908fa0]">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockCompanies.map((company) => (
                      <tr key={company.name} className="border-b border-[#1c2440] last:border-0">
                        <td className="py-2.5 pr-2">
                          <div className="flex items-center gap-2">
                            <CompanyLogo name={company.name} size="sm" />
                            <span className="font-medium text-[#dae2fd]">{company.name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 pr-2 text-[#dae2fd]">SDE-1</td>
                        <td className="py-2.5 pr-2">
                          {company.ats >= 80 ? (
                            <Badge className="bg-emerald-500/15 text-emerald-400 ring-1 ring-inset ring-emerald-500/30">{company.ats}%</Badge>
                          ) : (
                            <Badge className="bg-amber-500/15 text-amber-400 ring-1 ring-inset ring-amber-500/30">{company.ats}%</Badge>
                          )}
                        </td>
                        <td className="py-2.5 pr-2">
                          <StatusBadge status={company.status === "ready" ? "ready" : "gap_detected"} />
                        </td>
                        <td className="py-2.5">
                          <div className="flex justify-end gap-1">
                            <button className="rounded p-1.5 text-[#908fa0] transition-colors hover:bg-[#171f33] hover:text-white" title="Download">
                              <Download className="size-4" />
                            </button>
                            <button className="rounded p-1.5 text-[#908fa0] transition-colors hover:bg-[#171f33] hover:text-white" title="Preview">
                              <Eye className="size-4" />
                            </button>
                            {company.status === "gap" && (
                              <button className="rounded p-1.5 text-red-400 transition-colors hover:bg-red-500/10" title="View Gap">
                                <AlertTriangle className="size-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Dialog open={showUpgrade} onOpenChange={setShowUpgrade}>
        <DialogContent className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd] sm:max-w-sm">
          <DialogHeader className="items-center text-center">
            <Lock className="mx-auto size-10 text-indigo-400" />
            <DialogTitle className="text-white">Multi-Company Tailoring</DialogTitle>
            <DialogDescription className="text-[#908fa0]">
              AI-tailored resumes for up to 500 companies per batch. Get 85-95%+ ATS scores for every company.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 text-left">
            {["500 companies per batch", "3 AI iterations per company", "Company profiling + JD analysis", "Batch download (ZIP)"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-[#dae2fd]">
                <Check className="size-4 text-emerald-400" /> {f}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button className="w-full">Upgrade to Pro - ₹299/mo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}