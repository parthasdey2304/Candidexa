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
      <div className="max-w-7xl mx-auto space-y-8 p-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Portal Integrations</h1>
            <p className="text-muted-foreground mt-1">
              Connect your accounts to sync job matches and applications directly to Candidexa.
            </p>
          </div>
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium w-fit">
            <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
            {connectedCount} / {portals.length} Connected
          </Badge>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search portals (e.g., LinkedIn, Remote)..." 
            className="pl-10 h-12"
          />
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((portal) => (
            <Card key={portal.id} className={`flex flex-col ${portal.connected ? 'border-primary/50 shadow-sm shadow-primary/10' : ''}`}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center border">
                    <Building2 className="w-6 h-6 text-muted-foreground" />
                  </div>
                  {portal.connected && (
                    <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20 border-0">Connected</Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{portal.name}</CardTitle>
                <CardDescription className="font-medium text-foreground">{portal.type}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Provides jobs in: {portal.jobs}
                </p>
              </CardContent>
              <CardFooter className="pt-4 border-t">
                {portal.connected ? (
                  <Button variant="outline" className="w-full text-muted-foreground" onClick={() => {
                    setIntegrations(prev => prev.map(p => p.id === portal.id ? { ...p, connected: false } : p));
                  }}>
                    Disconnect
                  </Button>
                ) : (
                  <Dialog>
                    <DialogTrigger render={<Button className="w-full"><LinkIcon className="w-4 h-4 mr-2" /> Connect API</Button>} />
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Connect to {portal.name}</DialogTitle>
                        <DialogDescription>
                          Enter your Partner API Key or authenticate via OAuth to sync jobs from {portal.name}.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>API Key</Label>
                          <Input type="password" placeholder="sk_test_..." />
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                          Note: Since {portal.name} does not offer public open job APIs, this simulates a verified partner connection.
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <DialogClose render={<Button onClick={() => handleConnect(portal.id)}>Save Connection</Button>} />
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            No portals found matching "{search}".
          </div>
        )}

      </div>
    </AppLayout>
  );
}
