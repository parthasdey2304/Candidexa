"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Brain, Mic, MicOff, Play, Square, SkipForward, CheckCircle, MessageSquare, BarChart3 } from "lucide-react";
import { ScoreGauge } from "@/components/shared/score-gauge";

type InterviewType = "project" | "technical" | "behavioral" | "full";
type InterviewMode = "text" | "voice";
type Difficulty = "easy" | "medium" | "hard";

const mockQuestions: { id: string; question: string; category: string; difficulty: Difficulty }[] = [
  { id: "1", question: "Tell me about a time you had to optimize a database query for performance. What was the bottleneck and how did you fix it?", category: "Performance & Optimization", difficulty: "medium" },
  { id: "2", question: "How would you design a real-time notification system that handles millions of users?", category: "System Design", difficulty: "hard" },
  { id: "3", question: "Explain the difference between authentication and authorization. Give an example of each.", category: "Security", difficulty: "easy" },
];

const typeOptions: { value: InterviewType; label: string }[] = [
  { value: "project", label: "Project Deep-Dive" },
  { value: "technical", label: "Role-Specific Technical" },
  { value: "behavioral", label: "Behavioral" },
  { value: "full", label: "Full Mock Interview" },
];

function difficultyVariant(difficulty: Difficulty) {
  if (difficulty === "easy") return "bg-emerald-500/15 text-emerald-400 ring-1 ring-inset ring-emerald-500/30";
  if (difficulty === "medium") return "bg-amber-500/15 text-amber-400 ring-1 ring-inset ring-amber-500/30";
  return "bg-red-500/15 text-red-400 ring-1 ring-inset ring-red-500/30";
}

export default function MockInterviewPage() {
  const [started, setStarted] = useState(false);
  const [type, setType] = useState<InterviewType>("technical");
  const [mode, setMode] = useState<InterviewMode>("text");
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<{ score: number; feedback: string } | null>(null);
  const [answers, setAnswers] = useState<{ q: string; a: string; score: number }[]>([]);
  const [listening, setListening] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setCurrentQ(0);
    setAnswers([]);
  };

  const handleEnd = () => {
    setStarted(false);
    setEvaluation(null);
    setAnswer("");
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return;
    setEvaluating(true);
    await new Promise((r) => setTimeout(r, 2000));
    const score = Math.floor(Math.random() * 4) + 6;
    setAnswers((prev) => [...prev, { q: mockQuestions[currentQ].question, a: answer, score }]);
    setEvaluation({
      score,
      feedback:
        score >= 8
          ? "Excellent answer with strong technical depth and clear structure."
          : "Good answer, but consider adding more specific examples and measurable outcomes.",
    });
    setEvaluating(false);
  };

  const handleNext = () => {
    setAnswer("");
    setEvaluation(null);
    if (currentQ < mockQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setReportOpen(true);
    }
  };

  const avgScore = answers.length ? Math.round(answers.reduce((sum, a) => sum + a.score, 0) / answers.length) : 0;

  if (!started) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="mb-8 text-center">
          <Brain className="mx-auto mb-4 size-12 text-indigo-400" />
          <h1 className="text-2xl font-bold text-white">AI Mock Interview</h1>
          <p className="text-[#908fa0]">Practice with AI-powered questions and get instant feedback</p>
        </div>
        <Card>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#dae2fd]">Interview Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as InterviewType)}
                className="flex h-10 w-full rounded-lg border border-[#2d3449] bg-[#0b1326] px-3 text-sm text-[#dae2fd] outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
              >
                {typeOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#dae2fd]">Mode</label>
              <div className="grid grid-cols-2 gap-2">
                {(["text", "voice"] as InterviewMode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      mode === m
                        ? "border-indigo-500 bg-indigo-500/20 text-indigo-300"
                        : "border-[#2d3449] bg-[#0b1326] text-[#908fa0] hover:border-indigo-500/50"
                    }`}
                  >
                    {m === "voice" ? <Mic className="size-4" /> : <MessageSquare className="size-4" />}
                    {m === "voice" ? "Voice" : "Text"}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={handleStart} className="w-full">
              <Play className="mr-2 size-4" /> Start Interview
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = mockQuestions[currentQ];
  const isLast = currentQ === mockQuestions.length - 1;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">Mock Interview</h1>
          <p className="text-sm text-[#908fa0]">
            {type === "technical" ? "Role-Specific Technical" : type === "project" ? "Project Deep-Dive" : type === "behavioral" ? "Behavioral" : "Full Mock"}{" "}
            · Question {currentQ + 1} of {mockQuestions.length}
          </p>
        </div>
        <Button variant="outline" size="sm" className="border-[#2d3449] bg-transparent text-[#dae2fd] hover:bg-[#171f33]" onClick={handleEnd}>
          <Square className="mr-2 size-4" /> End Interview
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-[#908fa0]">
          Progress {currentQ + 1}/{mockQuestions.length}
        </span>
        <Progress value={((currentQ + 1) / mockQuestions.length) * 100} className="flex-1" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-[#2d3449] text-[#908fa0]">
              {question.category}
            </Badge>
            <Badge className={difficultyVariant(question.difficulty)}>{question.difficulty}</Badge>
          </div>
          <CardTitle className="mt-2 text-lg text-white">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mode === "voice" ? (
            <div className="py-8 text-center">
              <button
                onClick={() => setListening(!listening)}
                className={`mx-auto flex size-20 items-center justify-center rounded-full transition-all ${
                  listening ? "animate-pulse bg-red-500" : "bg-indigo-600 hover:bg-indigo-500"
                }`}
                aria-label={listening ? "Stop recording" : "Start speaking"}
              >
                {listening ? <MicOff className="size-8 text-white" /> : <Mic className="size-8 text-white" />}
              </button>
              <p className="mt-4 text-sm text-[#908fa0]">{listening ? "Listening... Click to stop" : "Click to start speaking"}</p>
            </div>
          ) : (
            <Textarea rows={6} placeholder="Type your answer here..." value={answer} onChange={(e) => setAnswer(e.target.value)} disabled={evaluating} />
          )}

          {evaluation && (
            <div
              className={`rounded-lg border p-4 ${
                evaluation.score >= 8
                  ? "border-emerald-500/30 bg-emerald-500/10"
                  : "border-amber-500/30 bg-amber-500/10"
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                {evaluation.score >= 8 ? (
                  <CheckCircle className="size-5 text-emerald-400" />
                ) : (
                  <MessageSquare className="size-5 text-amber-400" />
                )}
                <span className="font-semibold text-white">Score: {evaluation.score}/10</span>
              </div>
              <p className="text-sm text-[#dae2fd]">{evaluation.feedback}</p>
            </div>
          )}

          <div className="flex gap-2">
            {!evaluation ? (
              <Button onClick={handleSubmitAnswer} disabled={evaluating || (!answer.trim() && mode === "text")} className="flex-1">
                {evaluating ? "Evaluating..." : "Submit Answer"}
              </Button>
            ) : (
              <Button onClick={handleNext} className="flex-1">
                {!isLast ? (
                  <>
                    <SkipForward className="mr-2 size-4" /> Next Question
                  </>
                ) : (
                  <>
                    <BarChart3 className="mr-2 size-4" /> View Report
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {answers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base text-white">Your Answers So Far</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {answers.map((a, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-[#131b2e] p-3 ring-1 ring-white/10">
                <span className="text-sm font-medium text-white">Q{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-[#dae2fd]">{a.q}</p>
                </div>
                {a.score >= 8 ? (
                  <Badge className="bg-emerald-500/15 text-emerald-400 ring-1 ring-inset ring-emerald-500/30">{a.score}/10</Badge>
                ) : (
                  <Badge className="bg-amber-500/15 text-amber-400 ring-1 ring-inset ring-amber-500/30">{a.score}/10</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd] sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <ScoreGauge value={avgScore * 10} size={140} label="Avg Score" />
            <DialogTitle className="text-white">Interview Complete</DialogTitle>
            <DialogDescription className="text-[#908fa0]">
              You answered {answers.length} of {mockQuestions.length} questions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {answers.map((a, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-[#131b2e] px-3 py-2 ring-1 ring-white/10">
                <span className="truncate pr-2 text-sm text-[#dae2fd]">Q{i + 1}</span>
                <span className="text-sm font-semibold text-white">{a.score}/10</span>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setReportOpen(false)} className="w-full">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}