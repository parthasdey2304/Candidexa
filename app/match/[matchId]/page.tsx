import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, AlertCircle, Zap, Download, Bookmark, FileText, Shield } from "lucide-react";
import Link from "next/link";

const matchedSkills = ["React", "TypeScript", "Next.js", "REST APIs", "Git", "CSS Modules"];
const missingSkills = [
  { skill: "GraphQL", level: "Required" },
  { skill: "Kubernetes", level: "Preferred" },
  { skill: "Rust", level: "Bonus" },
];
const atsKeywords = ["frontend", "react", "typescript", "performance", "component library", "scalable"];

export default function MatchAnalysis({ params }: { params: { matchId: string } }) {
  return (
    <AppLayout currentPath="/match">
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Frontend Engineer at Stripe</h1>
            <p className="text-muted-foreground mt-1">Match Analysis · Master Resume (Aug 12)</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline"><Bookmark className="w-4 h-4 mr-2" />Save</Button>
            <Link href="/applications/tailored">
              <Button><FileText className="w-4 h-4 mr-2" />Tailor Resume</Button>
            </Link>
          </div>
        </div>

        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-sm text-amber-800">
          <AlertCircle className="w-4 h-4 shrink-0" />
          This is an estimate, not a hiring decision.
        </div>

        {/* Score + Summary */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="flex flex-col items-center justify-center py-8 border-primary/30">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#4F46E5" strokeWidth="10"
                  strokeDasharray={`${87 * 2.64} ${(100 - 87) * 2.64}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-primary">87%</span>
                <span className="text-xs text-muted-foreground font-medium">Match</span>
              </div>
            </div>
            <Badge className="mt-4 bg-green-100 text-green-700 border-green-200 hover:bg-green-100 text-sm px-3 py-1">
              <Zap className="w-3 h-3 mr-1" />Strong Match
            </Badge>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader><CardTitle>Match Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">6</p>
                  <p className="text-xs text-muted-foreground">Skills Matched</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-500">3</p>
                  <p className="text-xs text-muted-foreground">Gaps Found</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">91%</p>
                  <p className="text-xs text-muted-foreground">ATS Score</p>
                </div>
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground">
                You have strong frontend experience that aligns well with this role. You are missing evidence of GraphQL and production Kubernetes usage, which are listed as required. These are your highest-priority gaps.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Matched Skills */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-green-600"><CheckCircle2 className="w-5 h-5" />Matched Skills</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {matchedSkills.map(s => (
                <Badge key={s} className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">{s}</Badge>
              ))}
            </CardContent>
          </Card>

          {/* Missing Skills */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-amber-600"><AlertCircle className="w-5 h-5" />Skill Gaps</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {missingSkills.map(({ skill, level }) => (
                <div key={skill} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{skill}</span>
                  <Badge variant="outline" className={`text-xs ${level === "Required" ? "border-red-300 text-red-600" : level === "Preferred" ? "border-amber-300 text-amber-600" : "border-slate-300 text-slate-500"}`}>
                    {level}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* ATS Keywords */}
          <Card>
            <CardHeader><CardTitle>ATS Keyword Coverage</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {atsKeywords.map(k => (
                  <span key={k} className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full">{k}</span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience Alignment */}
          <Card>
            <CardHeader><CardTitle>Experience Alignment</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex justify-between items-center">
                <span>Frontend experience</span>
                <span className="text-green-600 font-semibold flex items-center gap-1"><CheckCircle2 className="w-4 h-4" />Aligned</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Team leadership</span>
                <span className="text-amber-600 font-semibold flex items-center gap-1"><AlertCircle className="w-4 h-4" />Partial</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Fintech / payments</span>
                <span className="text-red-600 font-semibold flex items-center gap-1"><XCircle className="w-4 h-4" />Not found</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" />Export Analysis</Button>
          <Link href={`/cover-letter/demo-match-id`}>
            <Button variant="outline">Generate Cover Letter</Button>
          </Link>
          <Link href="/applications/tailored">
            <Button>Tailor Resume</Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
