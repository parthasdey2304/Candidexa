"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Download, Brain, Eye, EyeOff } from "lucide-react";

interface Question {
  question: string;
  difficulty: "easy" | "medium" | "hard";
  modelAnswer: string;
  followUps: string[];
}

const mockCategories: Record<string, Question[]> = {
  "Architecture & Design": [
    {
      question: "Why did you choose Redis over Memcached for caching in this project?",
      difficulty: "medium",
      modelAnswer:
        "Redis was chosen because it supports rich data structures (sorted sets for leaderboards, lists for queues), built-in persistence options, and atomic operations. Memcached only supports key-value strings with no persistence, making Redis the better fit for real-time order tracking where we needed atomic increments and pub/sub.",
      followUps: ["What happens when Redis is down?", "How did you handle cache invalidation?"],
    },
    {
      question: "How does your microservice architecture handle failure of one service?",
      difficulty: "hard",
      modelAnswer:
        "We implemented circuit breakers, retries with exponential backoff, and a dead letter queue. Each service is stateless, so traffic can be routed to healthy instances. Health checks run every 30 seconds, and failed instances are removed from the load balancer pool.",
      followUps: ["What about cascading failures?", "How do you test this resilience?"],
    },
  ],
  "Database & Data Modeling": [
    {
      question: "How did you normalize your order tracking schema? What are the trade-offs?",
      difficulty: "medium",
      modelAnswer:
        "The schema is in 3NF for transactional data - orders, items, and events are separate tables. For read-heavy analytics queries, we added denormalized aggregate tables and used Redis as a cache. This balances write consistency with read performance.",
      followUps: ["When would you use a NoSQL database here?", "How do you handle schema migrations?"],
    },
  ],
  "Performance & Optimization": [
    {
      question: "What was the bottleneck in your system and how did you profile and fix it?",
      difficulty: "medium",
      modelAnswer:
        "The initial bottleneck was synchronous database writes on every order event - only 500 events/sec throughput. We moved to Kafka-based async event ingestion, batched writes, and added Redis caching for hot order lookups. This increased throughput to 10K+ events/sec.",
      followUps: ["How did you measure the improvement?"],
    },
  ],
};

const difficultyClass = (d: Question["difficulty"]) => {
  if (d === "easy") return "bg-emerald-500/15 text-emerald-400 ring-1 ring-inset ring-emerald-500/30";
  if (d === "medium") return "bg-amber-500/15 text-amber-400 ring-1 ring-inset ring-amber-500/30";
  return "bg-red-500/15 text-red-400 ring-1 ring-inset ring-red-500/30";
};

function selectClass() {
  return "flex h-10 w-full rounded-lg border border-[#2d3449] bg-[#0b1326] px-3 text-sm text-[#dae2fd] outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40";
}

export default function InterviewQuestionsPage() {
  const [generating, setGenerating] = useState(false);
  const [questions, setQuestions] = useState<Record<string, Question[]>>({});
  const [project, setProject] = useState("real-time-order-tracking");
  const [role, setRole] = useState("SDE-1");
  const [expandedAnswers, setExpandedAnswers] = useState<string[]>([]);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 3000));
    setQuestions(mockCategories);
    setGenerating(false);
  };

  const toggleAnswer = (q: string) => {
    setExpandedAnswers((prev) => (prev.includes(q) ? prev.filter((x) => x !== q) : [...prev, q]));
  };

  const reset = () => {
    setQuestions({});
    setExpandedAnswers([]);
  };

  const total = Object.values(questions).flat();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Interview Question Generator</h1>
        <p className="text-[#908fa0]">AI generates role-calibrated questions for your projects</p>
      </div>

      {total.length === 0 ? (
        <Card>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#dae2fd]">Project</label>
                <select value={project} onChange={(e) => setProject(e.target.value)} className={selectClass()}>
                  <option value="real-time-order-tracking">Real-Time Order Tracking with Kafka</option>
                  <option value="distributed-cache">Distributed Cache</option>
                  <option value="ai-resume-parser">AI Resume Parser</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#dae2fd]">Target Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className={selectClass()}>
                  <option value="SDE-1">SDE-1</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Data Engineer">Data Engineer</option>
                </select>
              </div>
            </div>
            <Button onClick={handleGenerate} disabled={generating} className="w-full">
              {generating ? (
                <>
                  <Sparkles className="mr-2 size-4 animate-spin" /> Generating questions...
                </>
              ) : (
                <>
                  <Brain className="mr-2 size-4" /> Generate Questions
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between gap-3">
            <Badge variant="outline" className="border-[#2d3449] text-[#908fa0]">
              {total.length} questions generated
            </Badge>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-[#2d3449] bg-transparent text-[#dae2fd] hover:bg-[#171f33]">
                <Download className="mr-2 size-4" /> Download All
              </Button>
              <Button variant="ghost" size="sm" className="text-[#908fa0] hover:bg-[#171f33] hover:text-white" onClick={reset}>
                Regenerate
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(questions).map(([category, qs]) => (
              <Card key={category}>
                <CardContent className="gap-4">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-medium text-white">{category}</span>
                    <Badge variant="outline" className="border-[#2d3449] text-[#908fa0]">
                      {qs.length}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {qs.map((q, i) => (
                      <div key={i} className="rounded-lg border border-[#2d3449] bg-[#0b1326] p-4">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-[#dae2fd]">{q.question}</p>
                          <Badge className={`shrink-0 ${difficultyClass(q.difficulty)}`}>{q.difficulty}</Badge>
                        </div>
                        <div className="mt-3">
                          <button
                            onClick={() => toggleAnswer(q.question)}
                            className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 hover:underline"
                          >
                            {expandedAnswers.includes(q.question) ? (
                              <>
                                <EyeOff className="size-3" /> Hide Model Answer
                              </>
                            ) : (
                              <>
                                <Eye className="size-3" /> Show Model Answer
                              </>
                            )}
                          </button>
                          {expandedAnswers.includes(q.question) && (
                            <div className="mt-2 rounded-lg bg-[#131b2e] p-3 text-sm text-[#dae2fd] ring-1 ring-inset ring-white/10">
                              {q.modelAnswer}
                            </div>
                          )}
                        </div>
                        {q.followUps.length > 0 && (
                          <div className="mt-3 space-y-1">
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#908fa0]">Follow-ups</p>
                            {q.followUps.map((f, j) => (
                              <p key={j} className="text-sm text-[#dae2fd]">
                                - {f}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}