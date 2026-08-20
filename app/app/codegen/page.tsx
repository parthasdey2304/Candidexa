"use client";

import { useState } from "react";
import {
  Check,
  Code2,
  ExternalLink,
  FileCode,
  FolderTree,
  GitBranch,
  Loader2,
  Rocket,
  Shield,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CodeViewer } from "@/components/shared/code-viewer";
import { TechStackBadges } from "@/components/shared/tech-badges";

function GithubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const mockFiles = [
  { path: "src/main.ts", lines: 120 },
  { path: "src/routes/orders.ts", lines: 85 },
  { path: "src/routes/orderEvents.ts", lines: 64 },
  { path: "src/services/kafka.ts", lines: 92 },
  { path: "src/services/cache.ts", lines: 48 },
  { path: "src/models/order.ts", lines: 35 },
  { path: "docker-compose.yml", lines: 28 },
  { path: "Dockerfile", lines: 18 },
  { path: "README.md", lines: 120 },
  { path: ".github/workflows/deploy.yml", lines: 32 },
];

const projects = [
  {
    name: "Real-Time Order Tracking with Kafka",
    type: "Web App (Full-stack)",
    stack: ["Python", "FastAPI", "Kafka", "PostgreSQL", "Docker"],
    repo: "real-time-order-tracking-kafka",
  },
  {
    name: "Distributed Cache",
    type: "Backend Service",
    stack: ["Go", "Redis", "Docker"],
    repo: "distributed-cache",
  },
  {
    name: "AI Resume Parser",
    type: "ML Service",
    stack: ["Python", "FastAPI", "PostgreSQL"],
    repo: "ai-resume-parser",
  },
];

const fileContents: Record<string, string> = {
  "src/main.ts":
    'import { createApp } from "express";\nimport { orderRoutes } from "./routes/orders";\n\nconst app = createApp();\n\napp.use("/api/orders", orderRoutes);\napp.use(express.json());\n\napp.listen(3000, () => {\n  console.log("Order service running on :3000");\n});',
  "src/routes/orders.ts":
    'import { Router } from "express";\nimport { orderService } from "../services/kafka";\n\nconst router = Router();\n\nrouter.get("/:id", async (req, res) => {\n  const order = await orderService.getOrder(req.params.id);\n  res.json(order);\n});\n\nrouter.post("/", async (req, res) => {\n  const order = await orderService.createOrder(req.body);\n  res.status(201).json(order);\n});',
};

export default function CodegenPage() {
  const [connected, setConnected] = useState(false);
  const [project, setProject] = useState(projects[0].name);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState("");
  const [selectedFile, setSelectedFile] = useState(mockFiles[0].path);
  const [validated, setValidated] = useState<boolean | null>(null);
  const [showPushConfirm, setShowPushConfirm] = useState(false);
  const [pushing, setPushing] = useState(false);
  const [pushed, setPushed] = useState(false);
  const [repoUrl, setRepoUrl] = useState("");

  const activeProject = projects.find((p) => p.name === project) ?? projects[0];
  const totalLines = mockFiles.reduce((sum, f) => sum + f.lines, 0);

  const handleGenerate = () => {
    if (generating) return;
    setGenerating(true);
    setValidated(null);
    setProgress(0);
    setCurrentFile("");
    let i = 0;
    const interval = window.setInterval(() => {
      i++;
      setProgress(Math.min((i / mockFiles.length) * 100, 100));
      setCurrentFile(mockFiles[Math.min(i - 1, mockFiles.length - 1)].path);
      if (i >= mockFiles.length) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          setGenerating(false);
          setValidated(true);
        }, 800);
      }
    }, 300);
  };

  const handlePush = async () => {
    setPushing(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setPushing(false);
    setPushed(true);
    setRepoUrl(`https://github.com/username/${activeProject.repo}`);
    setShowPushConfirm(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Code Generator</h1>
        <p className="text-[#908fa0]">
          Generate production-grade code and push to GitHub
        </p>
      </div>

      <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  connected
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-[#171f33] text-[#908fa0]"
                }`}
              >
                <GithubMark className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {connected ? "Connected to GitHub" : "Not connected"}
                </p>
                <p className="text-xs text-[#908fa0]">
                  {connected ? "@username" : "Connect to auto-push generated code"}
                </p>
              </div>
            </div>
            <Button
              variant={connected ? "outline" : "default"}
              size="sm"
              onClick={() => setConnected((c) => !c)}
            >
              {connected ? "Disconnect" : "Connect GitHub"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
          <CardHeader>
            <CardTitle className="text-base text-white">Generate Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#dae2fd]">
                Project
              </label>
              <Select value={project} onValueChange={(v) => v !== null && setProject(v)}>
                <SelectTrigger className="w-full border-[#2d3449] bg-[#0b1326] text-[#dae2fd]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-[#2d3449] bg-[#171f33] text-[#dae2fd]">
                  {projects.map((p) => (
                    <SelectItem key={p.name} value={p.name}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#dae2fd]">
                Type
              </label>
              <Badge
                variant="default"
                className="bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30"
              >
                {activeProject.type}
              </Badge>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[#dae2fd]">
                Tech Stack
              </label>
              <TechStackBadges stack={activeProject.stack} />
            </div>
            <Button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full bg-indigo-500 text-white hover:bg-indigo-400"
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Code2 className="mr-2 h-4 w-4" /> Generate Code
                </>
              )}
            </Button>
            {generating && (
              <div className="space-y-2">
                <Progress value={progress} className="[&_[data-slot=progress-track]]:bg-[#171f33]" />
                <p className="truncate text-xs text-[#908fa0]">
                  Generating: {currentFile}
                </p>
              </div>
            )}
            {validated !== null && (
              <div
                className={`flex items-center gap-2 rounded-lg p-3 text-sm ${
                  validated
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-red-500/15 text-red-400"
                }`}
              >
                {validated ? (
                  <>
                    <Check className="h-4 w-4" /> Code validated successfully
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4" /> Validation failed
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4 lg:col-span-2">
          <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
            <CardHeader>
              <CardTitle className="text-base text-white">Code Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="max-h-96 overflow-y-auto border-[#2d3449] p-3 md:border-r">
                  <p className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#908fa0]">
                    <FolderTree className="h-3 w-3" /> Files ({mockFiles.length})
                  </p>
                  <div className="space-y-0.5">
                    {mockFiles.map((f) => (
                      <button
                        key={f.path}
                        onClick={() => setSelectedFile(f.path)}
                        className={`w-full rounded px-2 py-1.5 text-left font-mono text-xs ${
                          selectedFile === f.path
                            ? "bg-indigo-500/20 text-indigo-300"
                            : "text-[#dae2fd] hover:bg-[#171f33]"
                        }`}
                      >
                        <FileCode className="-mt-0.5 mr-1.5 inline h-3 w-3" />
                        {f.path}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-span-3 p-3 md:p-4">
                  <CodeViewer
                    code={
                      fileContents[selectedFile] ||
                      `// ${selectedFile}\n// File content would be displayed here`
                    }
                    language="ts"
                    title={selectedFile}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
            <CardContent>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-[#908fa0]" />
                  <span className="text-sm text-[#908fa0]">
                    Files: <strong className="text-[#dae2fd]">{mockFiles.length}</strong>
                    {" · "}Lines: <strong className="text-[#dae2fd]">{totalLines}</strong>
                  </span>
                  {validated && (
                    <Badge
                      variant="default"
                      className="bg-emerald-500/15 text-emerald-400 ring-1 ring-inset ring-emerald-500/30"
                    >
                      Validated
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPushConfirm(true)}
                    disabled={!validated || !connected}
                  >
                    <GithubMark className="mr-2 h-4 w-4" /> Push to GitHub
                  </Button>
                  <Button variant="outline" size="sm" disabled={!pushed}>
                    <Rocket className="mr-2 h-4 w-4" /> Deploy Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {pushed && (
            <Card className="border-[#2d3449] bg-[#131b2e] shadow-none">
              <CardContent>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15">
                      <Check className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Repository created and pushed!
                      </p>
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-indigo-400 hover:underline"
                      >
                        {repoUrl} <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" /> View on GitHub
                    </Button>
                    <Button size="sm" className="bg-indigo-500 text-white hover:bg-indigo-400">
                      <Rocket className="mr-2 h-4 w-4" /> Deploy Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={showPushConfirm} onOpenChange={setShowPushConfirm}>
        <DialogContent className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd]">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm GitHub Push</DialogTitle>
            <DialogDescription className="text-[#908fa0]">
              Create a repository on your GitHub account from the generated codebase.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-start gap-3 rounded-lg bg-[#171f33] p-3">
            <Shield className="mt-0.5 h-5 w-5 text-emerald-400" />
            <p className="text-sm text-[#dae2fd]">
              Create public repository{" "}
              <strong className="font-mono text-white">{activeProject.repo}</strong> on your
              GitHub account? Files were scanned for secrets before push.
            </p>
          </div>
          <DialogFooter>
            <DialogClose
              render={
                <Button
                  variant="outline"
                  className="border-[#2d3449] bg-transparent text-white hover:bg-[#171f33]"
                >
                  Cancel
                </Button>
              }
            />
            <Button
              onClick={handlePush}
              disabled={pushing}
              className="bg-indigo-500 text-white hover:bg-indigo-400"
            >
              {pushing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Pushing...
                </>
              ) : (
                "Confirm & Push"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}