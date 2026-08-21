"use client";

import { useState } from "react";
import Link from "next/link";

import { useAuth } from "@/components/providers/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Spinner } from "@/components/ui/spinner";
import { CodeViewer, TerminalBlock } from "@/components/shared/code-viewer";
import { TechStackBadges } from "@/components/shared/tech-badges";
import {
  Check,
  Code2,
  Copy,
  GitBranch,
  Rocket,
  Sparkles,
} from "lucide-react";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Project {
  title: string;
  description: string;
  gapFilled: string[];
  techStack: string[];
  features: string[];
  resumeBullets: string[];
  language: string;
  file: string;
  scaffold: string;
  repoUrl: string;
  commitMsg: string;
}

const SAMPLE_PROJECTS: Project[] = [
  {
    title: "Real-Time Order Tracking System with Kafka",
    description:
      "Event-driven order tracking microservice processing 10K+ events/sec",
    gapFilled: ["Kafka", "Event-Driven Architecture", "Microservices"],
    techStack: ["Python", "FastAPI", "Apache Kafka", "PostgreSQL", "Redis", "Docker"],
    features: [
      "Real-time order status updates",
      "Event sourcing",
      "Dead letter queue handling",
      "REST API",
    ],
    resumeBullets: [
      "Built an event-driven order tracking microservice processing 10K+ events/sec using Apache Kafka and FastAPI, reducing order status latency by 60%",
    ],
    language: "python",
    file: "services/orders/main.py",
    scaffold: `from fastapi import FastAPI, HTTPException
from aiokafka import AIOKafkaProducer

app = FastAPI(title="order-tracker")

@app.on_event("startup")
async def startup() -> None:
    app.state.producer = AIOKafkaProducer(
        bootstrap_servers="localhost:9092",
    )
    await app.state.producer.start()

@app.post("/orders")
async def create_order(order: dict) -> dict:
    await app.state.producer.send(
        "orders.created", value=order
    )
    return {"status": "queued", "order": order}`,
    repoUrl: "https://github.com/candidate/order-tracker.git",
    commitMsg: "feat: order tracking with Kafka",
  },
  {
    title: "Distributed Cache with Consistent Hashing",
    description:
      "A distributed caching layer with consistent hashing for horizontal scaling",
    gapFilled: ["System Design", "Distributed Systems", "Caching"],
    techStack: ["Go", "gRPC", "Redis", "Docker"],
    features: ["Consistent hashing", "Cache eviction", "Health checks", "Client library"],
    resumeBullets: [
      "Designed a distributed caching layer using consistent hashing supporting 50K req/sec with 99.9% cache hit rate",
    ],
    language: "go",
    file: "cmd/cache/main.go",
    scaffold: `package main

import (
	"log"
	"net"

	"google.golang.org/grpc"
	pb "cache/proto"
)

func main() {
	ln, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatal(err)
	}
	s := grpc.NewServer()
	pb.RegisterCacheServer(s, NewConsistentHashCache(256))
	log.Fatal(s.Serve(ln))
}`,
    repoUrl: "https://github.com/candidate/distributed-cache.git",
    commitMsg: "feat: consistent hashing cache",
  },
];

const outlineBtnClass =
  "border-border bg-muted text-foreground hover:bg-muted";

const gapBadgeClass =
  "bg-[#6366f1]/15 text-[#818cf8] ring-1 ring-inset ring-[#6366f1]/30";

const proBadgeClass =
  "bg-[#6366f1]/15 text-[#818cf8] ring-1 ring-inset ring-[#6366f1]/30";

const freeBadgeClass =
  "bg-muted text-muted-foreground ring-1 ring-inset ring-[#2d3449]";

export default function ProjectsPage() {
  const { plan } = useAuth();
  const [generating, setGenerating] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [codeDialog, setCodeDialog] = useState<number | null>(null);
  const [pushDialog, setPushDialog] = useState<number | null>(null);
  const [pushing, setPushing] = useState(false);
  const [pushDone, setPushDone] = useState(false);
  const [pushNote, setPushNote] = useState<number | null>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    await delay(3000);
    setProjects(SAMPLE_PROJECTS);
    setGenerating(false);
  };

  const copyBullet = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // clipboard unavailable
    }
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const isPro = plan?.tier === "pro";

  const handlePushClick = (index: number) => {
    if (!isPro) {
      setPushNote(index);
      return;
    }
    setPushNote(null);
    setPushing(true);
    setPushDone(false);
    setPushDialog(index);
    void finishPush();
  };

  const finishPush = async () => {
    await delay(2500);
    setPushing(false);
    setPushDone(true);
  };

  const pushLines = (project: Project) => [
    "$ git init",
    "$ git add .",
    `$ git commit -m "${project.commitMsg}"`,
    "$ git branch -M main",
    `$ git remote add origin ${project.repoUrl}`,
    "$ git push -u origin main",
    ...(pushDone
      ? [
          "Enumerating objects: 18, done.",
          "Writing objects: 100% (18/18), 2.1 MiB | 4.9 MiB/s, done.",
          "✓  main -> main (branch 'main' set up to track 'origin/main')",
        ]
      : []),
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Project Generator</h1>
          <p className="mt-1 text-muted-foreground">
            Generate projects to fill skill gaps in your resume
          </p>
        </div>
        <Badge className={isPro ? proBadgeClass : freeBadgeClass}>
          {plan?.name ?? "Free"}
        </Badge>
      </div>

      {!projects.length ? (
        <EmptyState
          className="border-border bg-card"
          icon={<Code2 className="size-6 text-[#818cf8]" />}
          title="Generate Project Ideas"
          description="AI analyzes your resume and generates project ideas to fill skill gaps."
          action={
            <Button
              onClick={() => void handleGenerate()}
              disabled={generating}
              className="bg-[#6366f1] hover:bg-[#4f46e5]"
            >
              {generating ? (
                <>
                  <Spinner size="sm" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> Generate Projects
                </>
              )}
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Card key={project.title} className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">{project.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Gap Filled
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.gapFilled.map((gap) => (
                      <Badge key={gap} className={gapBadgeClass}>
                        {gap}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Tech Stack
                  </h4>
                  <TechStackBadges stack={project.techStack} />
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Features
                  </h4>
                  <ul className="space-y-1 text-sm text-foreground">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <span className="text-[#818cf8]">-</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Resume Bullet (STAR)
                  </h4>
                  <div className="mt-1 space-y-2">
                    {project.resumeBullets.map((bullet, bulletIndex) => {
                      const key = `${index}-${bulletIndex}`;
                      return (
                        <div
                          key={key}
                          className="flex items-start gap-2 rounded-lg border border-border bg-muted p-2"
                        >
                          <p className="flex-1 text-sm text-foreground">{bullet}</p>
                          <button
                            type="button"
                            onClick={() => void copyBullet(bullet, key)}
                            className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            aria-label="Copy resume bullet"
                          >
                            {copied === key ? (
                              <Check className="size-3 text-emerald-400" />
                            ) : (
                              <Copy className="size-3" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {pushNote === index ? (
                  <p className="text-xs text-muted-foreground">
                    Push to GitHub is a Pro feature.{" "}
                    <Link
                      href="/pricing"
                      className="font-medium text-[#818cf8] hover:underline"
                    >
                      Upgrade to Pro
                    </Link>{" "}
                    to deploy your project.
                  </p>
                ) : null}
              </CardContent>
              <CardFooter className="flex gap-2 border-border bg-card">
                <Button
                  variant="outline"
                  size="sm"
                  className={`flex-1 ${outlineBtnClass}`}
                  onClick={() => setCodeDialog(index)}
                >
                  <GitBranch className="size-4" /> Generate Code
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-[#6366f1] hover:bg-[#4f46e5]"
                  onClick={() => handlePushClick(index)}
                >
                  <Rocket className="size-4" /> Push to GitHub
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {codeDialog !== null ? (
        <Dialog open onOpenChange={(open) => (open ? undefined : setCodeDialog(null))}>
          <DialogContent className="border-border bg-muted text-foreground sm:max-w-xl">
            <DialogHeader>
              <DialogTitle className="text-foreground">Project scaffold</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Ready-to-run starter code for {projects[codeDialog]?.title}
              </DialogDescription>
            </DialogHeader>
            <CodeViewer
              code={projects[codeDialog]?.scaffold ?? ""}
              language={projects[codeDialog]?.language ?? "text"}
              title={projects[codeDialog]?.file ?? "scaffold"}
            />
            <DialogFooter className="border-border bg-card">
              <Button
                variant="outline"
                className={outlineBtnClass}
                onClick={() => setCodeDialog(null)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null}

      {pushDialog !== null ? (
        <Dialog
          open
          onOpenChange={(open) => {
            if (!open) {
              setPushDialog(null);
              setPushing(false);
              setPushDone(false);
            }
          }}
        >
          <DialogContent className="border-border bg-muted text-foreground sm:max-w-xl">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {pushing
                  ? "Pushing to GitHub…"
                  : pushDone
                    ? "Repository pushed"
                    : "Push to GitHub"}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {projects[pushDialog]?.title}
              </DialogDescription>
            </DialogHeader>
            {pushing ? (
              <div className="flex items-center gap-3 rounded-lg border border-border bg-[#060e20] px-4 py-6">
                <Spinner size="sm" />
                <span className="text-sm text-muted-foreground">
                  Creating remote repository and pushing commits…
                </span>
              </div>
            ) : (
              <TerminalBlock
                lines={pushLines(projects[pushDialog])}
                className="max-h-96 overflow-auto"
              />
            )}
            <DialogFooter className="border-border bg-card">
              <Button
                variant="outline"
                className={outlineBtnClass}
                onClick={() => {
                  setPushDialog(null);
                  setPushing(false);
                  setPushDone(false);
                }}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}