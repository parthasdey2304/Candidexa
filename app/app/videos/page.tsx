"use client";

import { useState } from "react";
import {
  Check,
  Clapperboard,
  Download,
  Loader2,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VideoPlayer, VideoEmptyState } from "@/components/shared/video-player";
import { StatusBadge } from "@/components/shared/status-badge";
import { ConfirmDialog, UpgradePrompt } from "@/components/shared/confirm-dialog";

interface ScriptScene {
  number: number;
  duration: number;
  visual: string;
  voiceover: string;
  onScreen: string;
  engine: "Kling" | "Seedance";
}

interface VideoItem {
  project: string;
  engine: "Kling" | "Seedance";
  duration: string;
  resolution: string;
  status: "ready" | "rendering";
}

const mockScript: ScriptScene[] = [
  {
    number: 1,
    duration: 3,
    visual: "Title card with project name and tagline over animated gradient",
    voiceover: "Meet OrderFlow - a real-time order tracking system built for scale.",
    onScreen: "OrderFlow - Real-Time Tracking",
    engine: "Kling",
  },
  {
    number: 2,
    duration: 5,
    visual: "Screen recording of the order dashboard with live status updates",
    voiceover: "Watch as orders flow through the system in real time, powered by Kafka.",
    onScreen: "Live Order Tracking",
    engine: "Kling",
  },
  {
    number: 3,
    duration: 3,
    visual: "Tech stack badges animation",
    voiceover: "Built with Python, FastAPI, Kafka, and PostgreSQL. Fully containerized with Docker.",
    onScreen: "Python · FastAPI · Kafka · PostgreSQL",
    engine: "Seedance",
  },
  {
    number: 4,
    duration: 2,
    visual: "End card with GitHub and live demo links",
    voiceover: "See it live and explore the code on GitHub.",
    onScreen: "github.com/username/orderflow",
    engine: "Seedance",
  },
];

const mockVideos: VideoItem[] = [
  { project: "Real-Time Order Tracking", engine: "Kling", duration: "13s", resolution: "1080p", status: "ready" },
  { project: "Distributed Cache", engine: "Seedance", duration: "18s", resolution: "720p", status: "ready" },
  { project: "AI Resume Parser", engine: "Kling", duration: "12s", resolution: "1080p", status: "rendering" },
];

const projectOptions = [
  "Real-Time Order Tracking (deployed)",
  "Distributed Cache (deployed)",
  "AI Resume Parser",
];

export default function VideosPage() {
  const [project, setProject] = useState(projectOptions[0]);
  const [script, setScript] = useState<ScriptScene[] | null>(null);
  const [generatingScript, setGeneratingScript] = useState(false);
  const [generatingVideo, setGeneratingVideo] = useState(false);
  const [editingScene, setEditingScene] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [currentVideo, setCurrentVideo] = useState(false);
  const [showBuyMore, setShowBuyMore] = useState(false);
  const [showPortfolioConfirm, setShowPortfolioConfirm] = useState(false);
  const [addedToPortfolio, setAddedToPortfolio] = useState(false);
  const [downloadNote, setDownloadNote] = useState("");

  const handleGenerateScript = async () => {
    setGeneratingScript(true);
    setScript(null);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setScript(mockScript);
    setGeneratingScript(false);
  };

  const handleGenerateVideo = () => {
    setGeneratingVideo(true);
    window.setTimeout(() => {
      setGeneratingVideo(false);
      setCurrentVideo(true);
      setAddedToPortfolio(false);
    }, 3000);
  };

  const cancelRender = () => {
    setGeneratingVideo(false);
    setCurrentVideo(false);
  };

  const saveEdit = (sceneNum: number) => {
    if (!script) return;
    setScript(script.map((s) => (s.number === sceneNum ? { ...s, voiceover: editText } : s)));
    setEditingScene(null);
  };

  const handleDownload = () => {
    setDownloadNote("Download started — your video will be saved to Downloads.");
    window.setTimeout(() => setDownloadNote(""), 3000);
  };

  const confirmAddToPortfolio = () => {
    setShowPortfolioConfirm(false);
    setAddedToPortfolio(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Video Generation</h1>
        <p className="text-muted-foreground">
          Create AI video walkthroughs for your portfolio projects
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-muted text-foreground">
            0 of 20 videos used this month
          </Badge>
          <Badge
            variant="outline"
            className="border-border text-muted-foreground"
          >
            Free tier: 0 videos
          </Badge>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowBuyMore(true)}>
          Buy More Videos
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <Card className="bg-card border-border shadow-none">
            <CardHeader>
              <CardTitle className="text-base text-foreground">Generate Video Script</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Project
                </label>
                <Select value={project} onValueChange={(v) => v !== null && setProject(v)}>
                  <SelectTrigger className="w-full border-border bg-muted text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-muted text-foreground">
                    {projectOptions.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleGenerateScript}
                disabled={generatingScript}
                className="w-full bg-indigo-500 text-foreground hover:bg-indigo-400"
              >
                {generatingScript ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating script...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> Generate Video Script
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {script && (
            <Card className="bg-card border-border shadow-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-foreground">Script Preview</CardTitle>
                  <Badge
                    variant="default"
                    className="bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30"
                  >
                    Engine: Kling
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {script.map((scene) => (
                  <div key={scene.number} className="rounded-lg border border-border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-bold text-indigo-300">
                          {scene.number}
                        </span>
                        <span className="text-xs text-muted-foreground">{scene.duration}s</span>
                        <Badge variant="secondary" className="bg-muted text-foreground">
                          {scene.engine}
                        </Badge>
                      </div>
                    </div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Visual
                    </p>
                    <p className="mb-2 text-sm text-foreground">{scene.visual}</p>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Voiceover
                    </p>
                    {editingScene === scene.number ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          rows={2}
                          className="border-border bg-muted text-foreground"
                        />
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingScene(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            className="bg-indigo-500 text-foreground hover:bg-indigo-400"
                            onClick={() => saveEdit(scene.number)}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-2">
                        <p className="flex-1 text-sm text-foreground">&quot;{scene.voiceover}&quot;</p>
                        <button
                          onClick={() => {
                            setEditingScene(scene.number);
                            setEditText(scene.voiceover);
                          }}
                          className="shrink-0 text-xs text-indigo-400 hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  onClick={handleGenerateVideo}
                  disabled={generatingVideo}
                  className="w-full bg-indigo-500 text-foreground hover:bg-indigo-400"
                >
                  {generatingVideo ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> AI is rendering your
                      13-second video... (~2 min)
                    </>
                  ) : (
                    <>
                      <Clapperboard className="mr-2 h-4 w-4" /> Generate Video
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          {generatingVideo && (
            <Card className="bg-card border-border shadow-none">
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Rendering with Kling 3.0...</p>
                      <p className="text-xs text-muted-foreground">Estimated time: ~2 minutes</p>
                    </div>
                  </div>
                  <Progress
                    value={45}
                    className="[&_[data-slot=progress-track]]:bg-muted"
                  />
                  <Button variant="outline" size="sm" onClick={cancelRender}>
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-card border-border shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-foreground">Video Result</CardTitle>
                <div className="flex items-center gap-1.5">
                  <Badge
                    variant="default"
                    className="bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30"
                  >
                    Kling
                  </Badge>
                  <Badge variant="secondary" className="bg-muted text-foreground">
                    13s
                  </Badge>
                  <Badge variant="secondary" className="bg-muted text-foreground">
                    1080p
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentVideo ? (
                <VideoPlayer title="OrderFlow Demo" poster="/videos/placeholder-demo.jpg" />
              ) : (
                <VideoEmptyState title="Generate a video to preview it here" />
              )}
              {addedToPortfolio && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-500/15 p-3 text-sm text-emerald-400">
                  <Check className="h-4 w-4" /> Added to your portfolio.
                </div>
              )}
              {downloadNote && (
                <p className="text-xs text-muted-foreground">{downloadNote}</p>
              )}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={handleDownload}
                  disabled={!currentVideo}
                >
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-indigo-500 text-foreground hover:bg-indigo-400"
                  onClick={() => setShowPortfolioConfirm(true)}
                  disabled={!currentVideo}
                >
                  <Check className="mr-2 h-4 w-4" /> Add to Portfolio
                </Button>
                {currentVideo && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:bg-muted hover:text-foreground"
                    onClick={() => setCurrentVideo(false)}
                    aria-label="Clear result"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-none">
            <CardHeader>
              <CardTitle className="text-base text-foreground">Video History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockVideos.map((v, i) => (
                  <div
                    key={`${v.project}-${i}`}
                    className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
                  >
                    <div className="flex h-10 w-14 items-center justify-center rounded bg-[#060e20]">
                      <Play className="h-4 w-4 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{v.project}</p>
                      <p className="text-xs text-muted-foreground">
                        {v.duration} · {v.resolution} · {v.engine}
                      </p>
                    </div>
                    <StatusBadge status={v.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <UpgradePrompt
        open={showBuyMore}
        onOpenChange={setShowBuyMore}
        feature="more AI videos"
      />

      <ConfirmDialog
        open={showPortfolioConfirm}
        onOpenChange={setShowPortfolioConfirm}
        title="Add video to portfolio"
        description="This walkthrough will appear on your public portfolio page with your other projects."
        confirmLabel="Add to Portfolio"
        onConfirm={confirmAddToPortfolio}
      />
    </div>
  );
}