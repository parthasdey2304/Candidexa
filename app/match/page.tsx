"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Shield, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const stages = [
  "Reading job description...",
  "Extracting requirements...",
  "Comparing verified experience...",
  "Preparing analysis...",
];

export default function MatchJob() {
  const [loading, setLoading] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const router = useRouter();

  const handleAnalyze = () => {
    setLoading(true);
    setStageIndex(0);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i < stages.length) {
        setStageIndex(i);
      } else {
        clearInterval(iv);
        router.push("/match/demo-match-id");
      }
    }, 900);
  };

  return (
    <AppLayout currentPath="/match">
      <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Match a Job</h1>
          <p className="text-muted-foreground mt-1">Paste or enter a job description to start the AI match analysis.</p>
        </div>

        {!loading ? (
          <Card>
            <CardContent className="pt-6 space-y-5">
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <p className="text-sm text-green-800">
                  <span className="font-semibold">Candidexa will not add experience you do not have.</span>
                  {" "}Every suggestion is grounded in your verified resume only.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Job Description</Label>
                <Textarea
                  placeholder="Paste the full job description here..."
                  className="min-h-48 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label>Job URL (optional)</Label>
                <Input placeholder="https://company.com/jobs/role" />
              </div>

              <div className="space-y-2">
                <Label>Resume Version</Label>
                <Select defaultValue="master">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="master">Master Resume (Aug 12)</SelectItem>
                    <SelectItem value="stripe">Stripe – Frontend Engineer</SelectItem>
                    <SelectItem value="notion">Notion – React Developer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full h-12 text-base" onClick={handleAnalyze}>
                Analyze Job Fit
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-16 text-center space-y-6">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <div className="space-y-2">
                {stages.map((s, idx) => (
                  <div key={s} className={`flex items-center justify-center gap-2 text-sm transition-all duration-300 ${idx < stageIndex ? "text-green-600 font-medium" : idx === stageIndex ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                    {idx < stageIndex ? "✓" : idx === stageIndex ? "→" : "·"} {s}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
