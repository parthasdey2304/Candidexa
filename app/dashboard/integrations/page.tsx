"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Search, Link as LinkIcon, CheckCircle2, Building2 } from "lucide-react";
import { useState } from "react";

const portals = [
  { id: "linkedin", name: "LinkedIn", type: "Global Network", jobs: "Tech, Finance, Marketing", connected: false },
  { id: "naukri", name: "Naukri.com", type: "Regional Hub (India)", jobs: "IT, Engineering, Sales", connected: false },
  { id: "internshala", name: "Internshala", type: "Entry Level", jobs: "Internships, Fresher Roles", connected: false },
  { id: "handshake", name: "Handshake", type: "University", jobs: "Early Career, Campus", connected: false },
  { id: "indeed", name: "Indeed", type: "Global Aggregator", jobs: "All Categories", connected: false },
  { id: "glassdoor", name: "Glassdoor", type: "Company Insights", jobs: "Tech, Corporate", connected: false },
  { id: "ziprecruiter", name: "ZipRecruiter", type: "AI Matched", jobs: "SME, Corporate", connected: false },
  { id: "wellfound", name: "Wellfound", type: "Startups", jobs: "Engineering, Product", connected: false },
  { id: "dice", name: "Dice", type: "Tech Specialized", jobs: "Software, Data, Cloud", connected: false },
  { id: "foundit", name: "FoundIt (Monster)", type: "Global Portal", jobs: "Enterprise, IT", connected: false },
  { id: "careerbuilder", name: "CareerBuilder", type: "General Board", jobs: "Sales, Retail, Admin", connected: false },
  { id: "flexjobs", name: "FlexJobs", type: "Remote Specialized", jobs: "Remote, Freelance", connected: false },
  { id: "simplyhired", name: "SimplyHired", type: "Global Aggregator", jobs: "All Categories", connected: false },
  { id: "ycombinator", name: "YC Work at a Startup", type: "Startup Network", jobs: "Founding Engineer, Seed", connected: false },
  { id: "upwork", name: "Upwork", type: "Freelance", jobs: "Contract, Hourly", connected: false },
];

export default function Integrations() {
  const [integrations, setIntegrations] = useState(portals);
  const [search, setSearch] = useState("");

  const handleConnect = (id: string) => {
    setIntegrations(prev => prev.map(p => p.id === id ? { ...p, connected: true } : p));
  };

  const filtered = integrations.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.type.toLowerCase().includes(search.toLowerCase()));
  const connectedCount = integrations.filter(p => p.connected).length;

  return (
    <AppLayout currentPath="/dashboard/integrations">
      <div className="max-w-7xl mx-auto space-y-8 p-6 md:p-8 bg-[#060e20] min-h-screen text-[#dae2fd]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Job Portal Integrations</h1>
            <p className="text-[#908fa0] mt-2 text-lg">
              Connect your accounts to sync job matches and applications directly to Candidexa.
            </p>
          </div>
          <Badge className="px-5 py-2.5 text-sm font-semibold w-fit bg-[#002f38] text-[#4cd7f6] border border-[#009eb9]/30 rounded-full">
            <CheckCircle2 className="w-4 h-4 mr-2 text-[#4cd7f6]" />
            {connectedCount} / {portals.length} Connected
          </Badge>
        </div>

        {/* Search */}
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#908fa0]" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search portals (e.g., LinkedIn, Remote)..." 
            className="pl-12 h-14 bg-[#0b1326] border-[#2d3449] text-white focus-visible:ring-[#6366f1] placeholder:text-[#464554] text-base rounded-xl shadow-none"
          />
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((portal) => (
            <Card key={portal.id} className={`flex flex-col bg-[#131b2e] shadow-none transition-all duration-300 group ${portal.connected ? 'border-[#6366f1] shadow-[0_0_20px_rgba(99,102,241,0.15)] bg-[#171f33]' : 'border-[#2d3449] hover:border-[#464554] hover:bg-[#171f33]'}`}>
              <CardHeader className="pb-5">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${portal.connected ? 'bg-[#6366f1]/10 border-[#6366f1]/30' : 'bg-[#0b1326] border-[#2d3449]'}`}>
                    <Building2 className={`w-7 h-7 ${portal.connected ? 'text-[#6366f1]' : 'text-[#908fa0]'}`} />
                  </div>
                  {portal.connected && (
                    <Badge className="bg-[#002f38] text-[#4cd7f6] border border-[#009eb9]/30 font-bold px-2.5 py-1">Connected</Badge>
                  )}
                </div>
                <CardTitle className="text-xl text-white group-hover:text-[#c0c1ff] transition-colors">{portal.name}</CardTitle>
                <CardDescription className="font-semibold text-[#6366f1] mt-1">{portal.type}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-[15px] text-[#908fa0] leading-relaxed">
                  Provides jobs in: <span className="text-[#dae2fd]">{portal.jobs}</span>
                </p>
              </CardContent>
              <CardFooter className="pt-5 border-t border-[#2d3449]">
                {portal.connected ? (
                  <Button variant="outline" className="w-full bg-[#0b1326] border-[#2d3449] text-[#908fa0] hover:bg-[#93000a] hover:text-[#ffb4ab] hover:border-[#ba1a1a]/50 h-11 transition-colors" onClick={() => {
                    setIntegrations(prev => prev.map(p => p.id === portal.id ? { ...p, connected: false } : p));
                  }}>
                    Disconnect
                  </Button>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-[#171f33] border border-[#2d3449] text-white hover:bg-[#6366f1] hover:border-transparent hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] h-11 transition-all"><LinkIcon className="w-4 h-4 mr-2" /> Connect API</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#131b2e] border-[#2d3449] text-white sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-white">Connect to {portal.name}</DialogTitle>
                        <DialogDescription className="text-[#908fa0] text-base mt-2">
                          Enter your Partner API Key or authenticate via OAuth to sync jobs from {portal.name}.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-5 py-6">
                        <div className="space-y-3">
                          <Label className="text-[#908fa0] uppercase tracking-wider text-xs font-semibold">API Key</Label>
                          <Input type="password" placeholder="sk_test_..." className="bg-[#0b1326] border-[#2d3449] text-white focus-visible:ring-[#6366f1] h-12" />
                        </div>
                        <div className="p-4 bg-[#0d0096]/20 border border-[#494bd6]/30 rounded-xl text-sm text-[#c0c1ff] leading-relaxed">
                          <span className="font-semibold text-white">Note:</span> Since {portal.name} does not offer public open job APIs, this simulates a verified partner connection.
                        </div>
                      </div>
                      <DialogFooter className="gap-3 sm:gap-0">
                        <DialogClose asChild>
                          <Button variant="outline" className="bg-[#0b1326] border-[#2d3449] text-white hover:bg-[#171f33] hover:text-[#dae2fd]">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]" onClick={() => handleConnect(portal.id)}>Save Connection</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-32 text-[#908fa0] text-lg bg-[#131b2e] border border-[#2d3449] rounded-2xl border-dashed">
            No portals found matching "{search}".
          </div>
        )}

      </div>
    </AppLayout>
  );
}
