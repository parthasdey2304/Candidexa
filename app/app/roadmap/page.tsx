"use client";

import { useState } from "react";

import { useAuth } from "@/components/providers/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Target,
} from "lucide-react";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface SkillGap {
  skill: string;
  current: string;
  target: string;
  gap: "critical" | "moderate" | "none";
  priority: number;
}

interface WeekResource {
  name: string;
  url: string;
  type: string;
}

interface Week {
  number: number;
  topics: string[];
  resources: WeekResource[];
  exercise: string;
  status: "not_started" | "in_progress" | "completed";
}

const gapBadgeClass: Record<SkillGap["gap"], string> = {
  critical: "bg-red-500/15 text-red-400 ring-1 ring-inset ring-red-500/30",
  moderate: "bg-amber-500/15 text-amber-400 ring-1 ring-inset ring-amber-500/30",
  none: "bg-emerald-500/15 text-emerald-400 ring-1 ring-inset ring-emerald-500/30",
};

const inputClass =
  "border-[#2d3449] bg-[#0b1326] text-[#dae2fd] placeholder:text-[#464554] focus-visible:ring-[#6366f1]";

const outlineBtnClass =
  "border-[#2d3449] bg-[#0b1326] text-[#dae2fd] hover:bg-[#171f33]";

const proBadgeClass =
  "bg-[#6366f1]/15 text-[#818cf8] ring-1 ring-inset ring-[#6366f1]/30";

const freeBadgeClass =
  "bg-[#171f33] text-[#908fa0] ring-1 ring-inset ring-[#2d3449]";

export default function RoadmapPage() {
  const { plan, user } = useAuth();
  const [targetRole, setTargetRole] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [analyzing, setAnalyzing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [gaps, setGaps] = useState<SkillGap[]>([]);
  const [roadmap, setRoadmap] = useState<Week[]>([]);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    await delay(3000);
    setGaps([
      { skill: "System Design", current: "None", target: "Intermediate", gap: "critical", priority: 1 },
      { skill: "Docker & Kubernetes", current: "None", target: "Intermediate", gap: "critical", priority: 2 },
      { skill: "SQL Optimization", current: "Intermediate", target: "Advanced", gap: "moderate", priority: 3 },
      { skill: "React Performance", current: "Intermediate", target: "Advanced", gap: "moderate", priority: 4 },
      { skill: "DSA (Graphs/Trees)", current: "Beginner", target: "Advanced", gap: "critical", priority: 5 },
    ]);
    setAnalyzing(false);
  };

  const handleGenerateRoadmap = async () => {
    setGenerating(true);
    await delay(3000);
    setRoadmap([
      {
        number: 1,
        topics: ["System Design Fundamentals", "CAP Theorem", "Load Balancing"],
        resources: [
          { name: "System Design Primer", url: "#", type: "course" },
          { name: "YouTube: System Design", url: "#", type: "video" },
        ],
        exercise: "Design a URL shortener",
        status: "not_started",
      },
      {
        number: 2,
        topics: ["Docker Basics", "Containerization", "Docker Compose"],
        resources: [{ name: "Docker Docs", url: "#", type: "docs" }],
        exercise: "Containerize a Node.js app",
        status: "not_started",
      },
      {
        number: 3,
        topics: ["Kubernetes Fundamentals", "Pods & Deployments"],
        resources: [{ name: "K8s Docs", url: "#", type: "docs" }],
        exercise: "Deploy to a local K8s cluster",
        status: "not_started",
      },
      {
        number: 4,
        topics: ["SQL Indexing", "Query Optimization", "EXPLAIN plans"],
        resources: [{ name: "PostgreSQL Tutorial", url: "#", type: "docs" }],
        exercise: "Optimize 5 slow queries",
        status: "not_started",
      },
    ]);
    setExpandedWeek(1);
    setGenerating(false);
  };

  const setWeekStatus = (number: number, status: Week["status"]) => {
    setRoadmap((prev) =>
      prev.map((week) => (week.number === number ? { ...week, status } : week))
    );
  };

  const resetAnalysis = () => {
    setGaps([]);
    setRoadmap([]);
    setExpandedWeek(null);
  };

  const completed = roadmap.filter((week) => week.status === "completed").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Skill Gap Analyzer & Roadmap</h1>
          <p className="mt-1 text-[#908fa0]">
            AI-powered personalized learning path for your target role
          </p>
          {user ? (
            <p className="mt-1 text-sm text-[#908fa0]">
              Welcome back, {user.name.split(" ")[0]} — let&apos;s close your gaps.
            </p>
          ) : null}
        </div>
        <Badge className={plan?.tier === "pro" ? proBadgeClass : freeBadgeClass}>
          {plan?.name ?? "Free"}
        </Badge>
      </div>

      {!gaps.length ? (
        <Card className="border-[#2d3449] bg-[#131b2e]">
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="target-role">Target Role</Label>
              <Input
                id="target-role"
                placeholder="e.g., SDE-1 at Google, Backend Developer at Flipkart"
                className={inputClass}
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="hours-per-week">Hours per week</Label>
                <span className="font-mono text-sm text-[#818cf8]">{hoursPerWeek}h</span>
              </div>
              <input
                id="hours-per-week"
                type="range"
                min={1}
                max={40}
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-[#6366f1]"
              />
            </div>
            <Button
              onClick={() => void handleAnalyze()}
              disabled={analyzing || !targetRole.trim()}
              className="w-full bg-[#6366f1] hover:bg-[#4f46e5]"
            >
              {analyzing ? (
                <>
                  <Spinner size="sm" /> Analyzing…
                </>
              ) : (
                <>
                  <Target className="size-4" /> Analyze Gap
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="border-[#2d3449] bg-[#131b2e]">
            <CardHeader>
              <CardTitle className="text-base text-white">Skill Gap Matrix</CardTitle>
              <CardAction>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#908fa0] hover:bg-[#171f33] hover:text-[#dae2fd]"
                  onClick={resetAnalysis}
                >
                  <RotateCcw className="size-3.5" /> Analyze a different role
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-xl border border-[#2d3449] bg-[#0b1326]">
                <table className="w-full text-sm">
                  <thead className="text-xs uppercase tracking-wide text-[#908fa0]">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Skill</th>
                      <th className="px-4 py-3 text-left font-medium">Current</th>
                      <th className="px-4 py-3 text-left font-medium">Target</th>
                      <th className="px-4 py-3 text-left font-medium">Gap</th>
                      <th className="px-4 py-3 text-left font-medium">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gaps.map((gap) => (
                      <tr key={gap.skill}>
                        <td className="border-t border-[#1c2440] px-4 py-3 text-sm font-medium text-[#dae2fd]">
                          {gap.skill}
                        </td>
                        <td className="border-t border-[#1c2440] px-4 py-3 text-sm text-[#dae2fd]">
                          {gap.current}
                        </td>
                        <td className="border-t border-[#1c2440] px-4 py-3 text-sm text-[#dae2fd]">
                          {gap.target}
                        </td>
                        <td className="border-t border-[#1c2440] px-4 py-3 text-sm text-[#dae2fd]">
                          <Badge className={gapBadgeClass[gap.gap]}>{gap.gap}</Badge>
                        </td>
                        <td className="border-t border-[#1c2440] px-4 py-3 text-sm text-[#dae2fd]">
                          #{gap.priority}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!roadmap.length ? (
                <Button
                  onClick={() => void handleGenerateRoadmap()}
                  disabled={generating}
                  className="mt-4 w-full bg-[#6366f1] hover:bg-[#4f46e5]"
                >
                  {generating ? (
                    <>
                      <Spinner size="sm" /> Generating…
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" /> Generate Learning Roadmap
                    </>
                  )}
                </Button>
              ) : null}
            </CardContent>
          </Card>

          {roadmap.length ? (
            <Card className="border-[#2d3449] bg-[#131b2e]">
              <CardHeader>
                <CardTitle className="text-base text-white">Learning Roadmap</CardTitle>
                <CardAction>
                  <Badge
                    variant="secondary"
                    className="bg-[#171f33] text-[#dae2fd] ring-1 ring-inset ring-[#2d3449]"
                  >
                    {roadmap.length} weeks
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                <Progress value={completed} max={roadmap.length} className="mb-6">
                  <ProgressLabel className="text-[#dae2fd]">Overall progress</ProgressLabel>
                  <ProgressValue>
                    {() => `${completed}/${roadmap.length} weeks`}
                  </ProgressValue>
                </Progress>
                <div className="space-y-3">
                  {roadmap.map((week) => (
                    <div
                      key={week.number}
                      className="overflow-hidden rounded-lg border border-[#2d3449] bg-[#0b1326]"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedWeek(expandedWeek === week.number ? null : week.number)
                        }
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[#171f33]"
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#6366f1]/15 text-sm font-bold text-[#818cf8] ring-1 ring-inset ring-[#6366f1]/30">
                            {week.number}
                          </span>
                          <span>
                            <span className="flex items-center gap-2">
                              <span className="text-sm font-medium text-[#dae2fd]">
                                Week {week.number}
                              </span>
                              <StatusBadge status={week.status} />
                            </span>
                            <span className="mt-0.5 block text-xs text-[#908fa0]">
                              {week.topics.join(", ")}
                            </span>
                          </span>
                        </span>
                        {expandedWeek === week.number ? (
                          <ChevronUp className="size-4 shrink-0 text-[#908fa0]" />
                        ) : (
                          <ChevronDown className="size-4 shrink-0 text-[#908fa0]" />
                        )}
                      </button>
                      {expandedWeek === week.number ? (
                        <div className="space-y-4 border-t border-[#1c2440] px-4 py-4">
                          <div>
                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#908fa0]">
                              Topics
                            </h4>
                            <ul className="space-y-1">
                              {week.topics.map((topic) => (
                                <li
                                  key={topic}
                                  className="flex items-center gap-2 text-sm text-[#dae2fd]"
                                >
                                  <Check className="size-3 text-[#818cf8]" />
                                  {topic}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#908fa0]">
                              Resources
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {week.resources.map((resource) => (
                                <a
                                  key={resource.name}
                                  href={resource.url}
                                  className="inline-flex items-center gap-1 text-sm text-[#818cf8] hover:text-[#a5b4fc] hover:underline"
                                >
                                  <ExternalLink className="size-3" /> {resource.name}
                                </a>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#908fa0]">
                              Exercise
                            </h4>
                            <p className="text-sm text-[#dae2fd]">{week.exercise}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className={outlineBtnClass}
                              disabled={week.status !== "not_started"}
                              onClick={() => setWeekStatus(week.number, "in_progress")}
                            >
                              {week.status === "in_progress" ? "In progress" : "Start"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className={outlineBtnClass}
                              disabled={week.status === "completed"}
                              onClick={() => setWeekStatus(week.number, "completed")}
                            >
                              <Check className="size-3.5" /> Mark complete
                            </Button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </>
      )}
    </div>
  );
}