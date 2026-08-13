import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, RotateCcw, Download, ArrowUpDown, RefreshCw, UserPlus, AlertCircle, Pencil } from "lucide-react";

const changes = [
  { type: "Reordered", label: "Reordered", description: "Moved React experience to top of skills section.", color: "bg-blue-100 text-blue-700" },
  { type: "Rephrased", label: "Rephrased", description: `"Built features" → "Architected and shipped React components"`, color: "bg-violet-100 text-violet-700" },
  { type: "Added from profile", label: "Added from profile", description: "TypeScript certification added from your verified profile.", color: "bg-green-100 text-green-700" },
  { type: "Requires confirmation", label: "Requires confirmation", description: "Please confirm: did you use GraphQL in production?", color: "bg-amber-100 text-amber-700" },
];

const changeIcon: Record<string, React.ReactNode> = {
  "Reordered": <ArrowUpDown className="w-4 h-4" />,
  "Rephrased": <RefreshCw className="w-4 h-4" />,
  "Added from profile": <UserPlus className="w-4 h-4" />,
  "Requires confirmation": <AlertCircle className="w-4 h-4" />,
};

export default function TailoredResumePreview({ params }: { params: { matchId: string } }) {
  return (
    <AppLayout currentPath="/applications/tailored">
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold">Tailored Resume Preview</h1>
            <p className="text-sm text-muted-foreground">Frontend Engineer at Stripe · 7 changes applied</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" />PDF</Button>
            <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" />DOCX</Button>
            <Button size="sm">Save Version</Button>
          </div>
        </div>

        {/* Desktop: 3-column */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr] gap-4">
          {/* Left: Requirements */}
          <Card className="h-fit">
            <CardHeader><CardTitle className="text-sm">Job Requirements</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-xs">
              {["React (Required)", "TypeScript (Required)", "GraphQL (Required)", "Node.js (Preferred)", "Kubernetes (Preferred)"].map((r) => (
                <div key={r} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${r.includes("Required") ? "bg-red-500" : "bg-amber-400"}`} />
                  <span>{r}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Center: Resume */}
          <Card>
            <CardContent className="pt-6 font-mono text-sm space-y-4">
              <div className="text-center">
                <p className="text-xl font-bold">Alex Johnson</p>
                <p className="text-muted-foreground text-xs">alex@example.com · San Francisco, CA · github.com/alexj</p>
              </div>
              <Separator />
              <div>
                <p className="font-bold uppercase text-xs tracking-widest text-muted-foreground mb-2">Experience</p>
                <div className="space-y-3">
                  <div className="border-l-2 border-primary pl-3">
                    <p className="font-semibold">Senior Frontend Engineer · Acme Corp</p>
                    <p className="text-xs text-muted-foreground">Jan 2022 – Present</p>
                    <p className="text-xs mt-1">Architected and shipped React + TypeScript component library used across 4 product teams.</p>
                  </div>
                  <div className="pl-3">
                    <p className="font-semibold">Frontend Developer · StartupXYZ</p>
                    <p className="text-xs text-muted-foreground">Jun 2019 – Dec 2021</p>
                    <p className="text-xs mt-1">Built scalable UI with React and Redux, reducing load time by 40%.</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-bold uppercase text-xs tracking-widest text-muted-foreground mb-2">Skills</p>
                <p className="text-xs">React · TypeScript · Next.js · Node.js · REST APIs · Git · CSS</p>
              </div>
            </CardContent>
          </Card>

          {/* Right: Changes */}
          <div className="space-y-3">
            <Card>
              <CardHeader><CardTitle className="text-sm">Changes Summary</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {changes.map((c) => (
                  <div key={c.type} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className={`${c.color} border-0 text-xs flex items-center gap-1`}>
                        {changeIcon[c.type]}{c.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{c.description}</p>
                    {c.type !== "Requires confirmation" ? (
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="h-6 text-xs px-2">Reject</Button>
                        <Button size="sm" className="h-6 text-xs px-2">Accept</Button>
                      </div>
                    ) : (
                      <Button size="sm" className="h-6 text-xs px-2 bg-amber-500 hover:bg-amber-600 text-white">Confirm</Button>
                    )}
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full text-xs mt-2">
                  <CheckCircle2 className="w-3 h-3 mr-1" />Accept All Safe Changes
                </Button>
                <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground">
                  <RotateCcw className="w-3 h-3 mr-1" />Restore Original
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile: Tabs */}
        <div className="md:hidden">
          <Tabs defaultValue="resume">
            <TabsList className="w-full">
              <TabsTrigger value="resume" className="flex-1">Resume</TabsTrigger>
              <TabsTrigger value="changes" className="flex-1">Changes</TabsTrigger>
              <TabsTrigger value="checks" className="flex-1">Checks</TabsTrigger>
            </TabsList>
            <TabsContent value="resume" className="mt-4">
              <Card>
                <CardContent className="pt-6 font-mono text-sm space-y-4">
                  <p className="text-xl font-bold text-center">Alex Johnson</p>
                  <Separator />
                  <p className="font-bold uppercase text-xs tracking-widest text-muted-foreground">Experience</p>
                  <div className="border-l-2 border-primary pl-3">
                    <p className="font-semibold">Senior Frontend Engineer · Acme Corp</p>
                    <p className="text-xs text-muted-foreground">Jan 2022 – Present</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="changes" className="mt-4 space-y-3">
              {changes.map((c) => (
                <Card key={c.type}>
                  <CardContent className="pt-4 space-y-2">
                    <Badge className={`${c.color} border-0 text-xs`}>{c.label}</Badge>
                    <p className="text-xs text-muted-foreground">{c.description}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Reject</Button>
                      <Button size="sm">Accept</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="checks" className="mt-4">
              <Card>
                <CardContent className="pt-4 space-y-3 text-sm">
                  <div className="flex justify-between"><span>ATS Score</span><span className="font-bold text-green-600">96%</span></div>
                  <div className="flex justify-between"><span>Keyword coverage</span><span className="font-bold text-green-600">8/10</span></div>
                  <div className="flex justify-between"><span>Fabrications</span><span className="font-bold text-green-600">0</span></div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
