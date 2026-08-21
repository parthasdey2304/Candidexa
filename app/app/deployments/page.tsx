"use client";

import { useState } from "react";
import {
  Activity,
  Check,
  Copy,
  ExternalLink,
  Globe,
  Loader2,
  RefreshCw,
  Rocket,
  Server,
  TrendingUp,
  Video,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { StatusBadge } from "@/components/shared/status-badge";

interface Deployment {
  id: string;
  project: string;
  platform: "Vercel" | "Railway" | "Render" | "Netlify";
  url: string;
  status: "live" | "deploying" | "down" | "sleeping";
  lastCheck: string;
}

const platformUrl: Record<Deployment["platform"], string> = {
  Vercel: ".vercel.app",
  Railway: ".up.railway.app",
  Render: ".onrender.com",
  Netlify: ".netlify.app",
};

const mockDeployments: Deployment[] = [
  {
    id: "dep-1",
    project: "real-time-order-tracking-kafka",
    platform: "Vercel",
    url: "https://real-time-order-tracking-kafka.vercel.app",
    status: "live",
    lastCheck: "2 min ago",
  },
  {
    id: "dep-2",
    project: "real-time-order-tracking-kafka",
    platform: "Railway",
    url: "https://real-time-order-tracking-kafka.up.railway.app",
    status: "live",
    lastCheck: "5 min ago",
  },
  {
    id: "dep-3",
    project: "distributed-cache",
    platform: "Render",
    url: "https://distributed-cache.onrender.com",
    status: "deploying",
    lastCheck: "Just now",
  },
  {
    id: "dep-4",
    project: "ai-resume-parser",
    platform: "Netlify",
    url: "https://ai-resume-parser.netlify.app",
    status: "sleeping",
    lastCheck: "1 hour ago",
  },
];

const deployableProjects = [
  "real-time-order-tracking-kafka",
  "distributed-cache",
  "ai-resume-parser",
];

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState<Deployment[]>(mockDeployments);
  const [deploying, setDeploying] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [project, setProject] = useState(deployableProjects[0]);
  const [platform, setPlatform] = useState<Deployment["platform"]>("Vercel");
  const [copied, setCopied] = useState("");

  const copyUrl = (url: string) => {
    void navigator.clipboard.writeText(url);
    setCopied(url);
    window.setTimeout(() => setCopied(""), 2000);
  };

  const handleDeploy = () => {
    setShowConfirm(true);
  };

  const confirmDeploy = () => {
    setShowConfirm(false);
    setDeploying(true);
    const newDeployment: Deployment = {
      id: `dep-${Date.now()}`,
      project,
      platform,
      url: `https://${project}${platformUrl[platform]}`,
      status: "deploying",
      lastCheck: "Just now",
    };
    setDeployments((prev) => [newDeployment, ...prev]);
    window.setTimeout(() => {
      setDeployments((prev) =>
        prev.map((d) =>
          d.id === newDeployment.id ? { ...d, status: "live", lastCheck: "Just now" } : d
        )
      );
      setDeploying(false);
    }, 2500);
  };

  const allLive = deployments.filter((d) => d.status === "live").length;
  const allDeploying = deployments.filter((d) => d.status === "deploying").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Deployments</h1>
        <p className="text-muted-foreground">
          Auto-deploy your AI-generated projects to production
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="bg-card border-border shadow-none">
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <Server className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">{deployments.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border shadow-none">
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Live</span>
              <Activity className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="mt-1 text-2xl font-bold text-emerald-400">{allLive}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border shadow-none">
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Deploying</span>
              <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
            </div>
            <p className="mt-1 text-2xl font-bold text-amber-400">{allDeploying}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border shadow-none">
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg Uptime</span>
              <TrendingUp className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="mt-1 text-2xl font-bold text-indigo-400">99.2%</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base text-foreground">Active Deployments</CardTitle>
            <Button
              size="sm"
              className="bg-indigo-500 text-foreground hover:bg-indigo-400"
              onClick={handleDeploy}
            >
              <Rocket className="mr-2 h-4 w-4" /> Deploy Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {deploying && (
            <div className="mb-4 flex items-center gap-3 rounded-lg bg-indigo-500/15 p-4">
              <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
              <p className="text-sm text-indigo-300">
                Deploying to {platform}... This usually takes 1-2 minutes.
              </p>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Project
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Platform
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    URL
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Health Check
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {deployments.map((d) => (
                  <tr key={d.id}>
                    <td className="border-t border-border px-4 py-3 font-medium text-foreground">
                      {d.project}
                    </td>
                    <td className="border-t border-border px-4 py-3">
                      <Badge variant="secondary" className="bg-muted text-foreground">
                        {d.platform}
                      </Badge>
                    </td>
                    <td className="border-t border-border px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={d.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-indigo-400 hover:underline"
                        >
                          <Globe className="h-3 w-3" /> {d.url.replace("https://", "")}
                        </a>
                        <button
                          onClick={() => copyUrl(d.url)}
                          className="rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                          aria-label="Copy URL"
                        >
                          {copied === d.url ? (
                            <Check className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="border-t border-border px-4 py-3">
                      <StatusBadge status={d.status} />
                    </td>
                    <td className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
                      {d.lastCheck}
                    </td>
                    <td className="border-t border-border px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-muted-foreground hover:bg-muted hover:text-foreground"
                          aria-label="Visit"
                          onClick={() => void navigator.clipboard.writeText(d.url)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-muted-foreground hover:bg-muted hover:text-foreground"
                          aria-label="Redeploy"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-muted-foreground hover:bg-muted hover:text-foreground"
                          aria-label="Video demo"
                        >
                          <Video className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="border-border bg-muted text-foreground">
          <DialogHeader>
            <DialogTitle className="text-foreground">Deploy Project</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Deploy an AI-generated project to your favorite platform.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Project
              </label>
              <Select value={project} onValueChange={(v) => v !== null && setProject(v)}>
                <SelectTrigger className="w-full border-border bg-muted text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-border bg-muted text-foreground">
                  {deployableProjects.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Platform (auto-selected)
              </label>
              <Select value={platform} onValueChange={(v) => v !== null && setPlatform(v as Deployment["platform"])}>
                <SelectTrigger className="w-full border-border bg-muted text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-border bg-muted text-foreground">
                  {(["Vercel", "Railway", "Render", "Netlify"] as Deployment["platform"][]).map(
                    (p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground">
              Vercel is auto-selected for Next.js frontends. Backends deploy to Railway/Render
              automatically.
            </p>
          </div>
          <DialogFooter>
            <DialogClose
              render={
                <Button
                  variant="outline"
                  className="border-border bg-transparent text-foreground hover:bg-muted"
                >
                  Cancel
                </Button>
              }
            />
            <Button
              className="bg-indigo-500 text-foreground hover:bg-indigo-400"
              onClick={confirmDeploy}
            >
              <Rocket className="mr-2 h-4 w-4" /> Deploy Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}