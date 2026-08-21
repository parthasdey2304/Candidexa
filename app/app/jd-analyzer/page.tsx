"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScoreGauge } from "@/components/shared/score-gauge";
import { useAuth } from "@/components/providers/AuthProvider";
import { Sparkles, Search, Target, Check, X, History, Zap, Globe } from "lucide-react";

interface Keyword {
  keyword: string;
  category: "required" | "preferred" | "soft" | "nice-to-have";
  weight: number;
  inResume: boolean;
}

interface AnalyzeResult {
  score: number;
  keywords: Keyword[];
}

const mockResult: AnalyzeResult = {
  score: 68,
  keywords: [
    { keyword: "Python", category: "required", weight: 15, inResume: true },
    { keyword: "React", category: "required", weight: 12, inResume: true },
    { keyword: "Docker", category: "required", weight: 10, inResume: false },
    { keyword: "Kubernetes", category: "required", weight: 10, inResume: false },
    { keyword: "AWS", category: "preferred", weight: 8, inResume: false },
    { keyword: "CI/CD", category: "preferred", weight: 8, inResume: false },
    { keyword: "PostgreSQL", category: "preferred", weight: 7, inResume: true },
    { keyword: "Microservices", category: "preferred", weight: 6, inResume: false },
    { keyword: "Communication", category: "soft", weight: 4, inResume: true },
    { keyword: "Problem Solving", category: "soft", weight: 4, inResume: true },
  ],
};

const sampleJd = `We are looking for a Senior Backend Engineer to join our platform team.
Required: 4+ years of Python experience, strong knowledge of Docker and Kubernetes in production,
and hands-on AWS infrastructure management. Working knowledge of CI/CD pipelines is a plus.
Nice to have: PostgreSQL, microservices architecture, and experience scaling distributed systems.
We value communication skills, problem solving, and a collaborative mindset.`;

const categoryColors: Record<Keyword["category"], string> = {
  required: "bg-red-500/15 text-red-400 ring-red-500/30",
  preferred: "bg-blue-500/15 text-blue-400 ring-blue-500/30",
  soft: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  "nice-to-have": "bg-slate-500/15 text-slate-300 ring-slate-500/30",
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function JDAnalyzerPage() {
  const { plan } = useAuth();
  const [jdText, setJdText] = useState("");
  const [jdUrl, setJdUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [fixed, setFixed] = useState<string[]>([]);
  const [history, setHistory] = useState<{ score: number; at: string }[]>([]);
  const [notice, setNotice] = useState("");

  const isPro = plan?.tier === "pro";
  const analysesLeft = Math.max(0, 3 - history.length);

  const handleAnalyze = async () => {
    if (!jdText.trim() || analyzing) return;
    setAnalyzing(true);
    setNotice("");
    setFixed([]);
    await delay(2200);
    setResult(mockResult);
    setHistory((prev) => [
      { score: mockResult.score, at: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ...prev,
    ]);
    setAnalyzing(false);
  };

  const handleScrape = async () => {
    if (!jdUrl.trim() || scraping) return;
    setScraping(true);
    await delay(900);
    setJdText(sampleJd);
    setScraping(false);
  };

  const fixKeyword = (keyword: string) => {
    setFixed((prev) => (prev.includes(keyword) ? prev : [...prev, keyword]));
  };

  const applyAllFixes = () => {
    if (!result) return;
    setFixed(result.keywords.filter((k) => !k.inResume).map((k) => k.keyword));
    setNotice("All fixes applied to your resume draft.");
  };

  const matchedCount = result
    ? result.keywords.filter((k) => k.inResume || fixed.includes(k.keyword)).length
    : 0;
  const projectedScore = result ? Math.min(result.score + 18, 98) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">JD Analyzer</h1>
        <p className="mt-1 text-sm text-muted-foreground">Paste a job description to get an instant AI match score</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base text-foreground">Job Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                rows={12}
                placeholder="Paste the job description here..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                className="border-border bg-muted font-mono text-sm text-foreground placeholder:text-muted-foreground"
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 flex-col gap-2 sm:flex-row">
                  <Input
                    placeholder="Or paste a URL..."
                    value={jdUrl}
                    onChange={(e) => setJdUrl(e.target.value)}
                    className="flex-1 border-border bg-muted text-foreground placeholder:text-muted-foreground"
                  />
                  <Button
                    variant="outline"
                    onClick={handleScrape}
                    disabled={scraping || !jdUrl.trim()}
                    className="border-border bg-transparent text-foreground hover:bg-muted"
                  >
                    {scraping ? (
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Globe className="mr-2 h-4 w-4" />
                    )}
                    {scraping ? "Scraping..." : "Scrape"}
                  </Button>
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={analyzing || !jdText.trim()}
                  className="bg-primary text-foreground hover:bg-primary/90"
                >
                  {analyzing ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" /> Analyze
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {result && (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base text-foreground">Keyword Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-xl border border-border bg-muted">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                        <th className="px-4 py-3 text-left font-medium">Keyword</th>
                        <th className="px-4 py-3 text-left font-medium">Category</th>
                        <th className="px-4 py-3 text-left font-medium">Weight</th>
                        <th className="px-4 py-3 text-left font-medium">In Resume</th>
                        <th className="px-4 py-3 text-left font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1c2440]">
                      {result.keywords.map((k) => {
                        const isMatched = k.inResume || fixed.includes(k.keyword);
                        const isFixed = fixed.includes(k.keyword);
                        return (
                          <tr key={k.keyword}>
                            <td className="px-4 py-3 font-medium text-foreground">{k.keyword}</td>
                            <td className="px-4 py-3">
                              <Badge className={`ring-1 ring-inset ${categoryColors[k.category]}`}>
                                {k.category}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">{k.weight} pts</td>
                            <td className="px-4 py-3">
                              {isMatched ? (
                                <Check className="h-4 w-4 text-emerald-400" />
                              ) : (
                                <X className="h-4 w-4 text-red-400" />
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {!k.inResume &&
                                (isFixed ? (
                                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                                    <Check className="h-3.5 w-3.5" /> Fixed
                                  </span>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fixKeyword(k.keyword)}
                                    className="border-border bg-transparent text-foreground hover:bg-muted"
                                  >
                                    <Zap className="mr-1 h-3 w-3" /> Fix
                                  </Button>
                                ))}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base text-foreground">Match Score</CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="flex flex-col items-center">
                  <ScoreGauge
                    value={result.score}
                    label="Match score"
                    sub={`${matchedCount} of ${result.keywords.length} keywords matched`}
                    size={150}
                  />
                  <div className="mt-4 w-full space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current Score</span>
                      <span className="font-medium text-foreground">{result.score}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">After Fixes</span>
                      <span className="font-medium text-emerald-400">{projectedScore}%</span>
                    </div>
                  </div>
                  <Button
                    className="mt-4 w-full bg-primary text-foreground hover:bg-primary/90"
                    onClick={applyAllFixes}
                    disabled={result.keywords.every((k) => k.inResume || fixed.includes(k.keyword))}
                  >
                    <Sparkles className="mr-2 h-4 w-4" /> Apply All Fixes
                  </Button>
                  {notice && <p className="mt-3 text-sm text-emerald-400">{notice}</p>}
                </div>
              ) : (
                <div className="flex flex-col items-center py-10 text-center text-muted-foreground">
                  <Target className="h-12 w-12 opacity-50" />
                  <p className="mt-3 text-sm">Paste a JD to analyze</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-foreground">
                <History className="h-4 w-4 text-indigo-300" /> Analysis History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="py-4 text-center text-sm text-muted-foreground">
                  <History className="mx-auto mb-2 h-6 w-6 opacity-50" />
                  <p>No analyses yet</p>
                  <p className="mt-1 text-xs">
                    {isPro ? "Pro plan: unlimited analyses" : `Free tier: ${analysesLeft} of 3 analyses left this month`}
                  </p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {history.map((h, i) => (
                    <li
                      key={`${h.at}-${i}`}
                      className="flex items-center justify-between rounded-lg border border-border bg-muted px-3 py-2 text-sm"
                    >
                      <span className="font-medium text-foreground">{h.score}% match</span>
                      <span className="text-xs text-muted-foreground">{h.at}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}