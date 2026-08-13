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
      <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8 bg-[#060e20] min-h-screen text-[#dae2fd]">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Match a Job</h1>
          <p className="text-[#908fa0] mt-2 text-lg">Paste or enter a job description to start the AI match analysis.</p>
        </div>

        {!loading ? (
          <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
            <CardContent className="pt-8 space-y-6">
              <div className="p-5 bg-[#002f38] border border-[#009eb9]/30 rounded-xl flex items-start gap-4">
                <Shield className="w-5 h-5 text-[#4cd7f6] mt-0.5 shrink-0" />
                <p className="text-sm text-[#c7c4d7] leading-relaxed">
                  <span className="font-semibold text-white">Candidexa will not add experience you do not have.</span>
                  {" "}Every suggestion is grounded in your verified resume only.
                </p>
              </div>

              <div className="space-y-3">
                <Label className="text-[#908fa0] uppercase tracking-wider text-xs font-semibold">Job Description</Label>
                <Textarea
                  placeholder="Paste the full job description here..."
                  className="min-h-56 resize-none bg-[#0b1326] border-[#2d3449] text-white focus-visible:ring-[#6366f1] placeholder:text-[#464554] p-4 text-[15px] leading-relaxed"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[#908fa0] uppercase tracking-wider text-xs font-semibold">Job URL (optional)</Label>
                <Input placeholder="https://company.com/jobs/role" className="bg-[#0b1326] border-[#2d3449] text-white focus-visible:ring-[#6366f1] h-11 placeholder:text-[#464554]" />
              </div>

              <div className="space-y-3">
                <Label className="text-[#908fa0] uppercase tracking-wider text-xs font-semibold">Resume Version</Label>
                <Select defaultValue="master">
                  <SelectTrigger className="bg-[#0b1326] border-[#2d3449] text-white focus:ring-[#6366f1] h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#131b2e] border-[#2d3449] text-white">
                    <SelectItem value="master" className="focus:bg-[#171f33] focus:text-white">Master Resume (Aug 12)</SelectItem>
                    <SelectItem value="stripe" className="focus:bg-[#171f33] focus:text-white">Stripe – Frontend Engineer</SelectItem>
                    <SelectItem value="notion" className="focus:bg-[#171f33] focus:text-white">Notion – React Developer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full h-12 text-base font-semibold bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] mt-2" onClick={handleAnalyze}>
                Analyze Job Fit
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-[#131b2e] border-[#2d3449] shadow-none overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6366f1] to-transparent opacity-50 animate-pulse"></div>
            <CardContent className="py-20 text-center space-y-8">
              <div className="w-16 h-16 border-4 border-[#2d3449] border-t-[#6366f1] rounded-full animate-spin mx-auto shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
              <div className="space-y-3 max-w-sm mx-auto">
                {stages.map((s, idx) => (
                  <div key={s} className={`flex items-center justify-center gap-3 text-[15px] transition-all duration-300 ${idx < stageIndex ? "text-[#4cd7f6] font-medium" : idx === stageIndex ? "text-white font-semibold shadow-[0_0_10px_rgba(255,255,255,0.1)] py-1 rounded" : "text-[#464554]"}`}>
                    {idx < stageIndex ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : idx === stageIndex ? "→" : "·"} {s}
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
