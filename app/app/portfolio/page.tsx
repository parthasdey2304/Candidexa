"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  Eye,
  Globe,
  LayoutTemplate,
  Loader2,
  Monitor,
  Palette,
  Rocket,
  Smartphone,
  Sparkles,
  Tablet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/providers/AuthProvider";

const templates = [
  "Developer",
  "Designer",
  "Data Analyst",
  "Fresher",
  "Creative",
  "Minimal",
  "Cyberpunk",
  "Corporate",
];

const palettes = [
  { name: "Violet", colors: ["#7c3aed", "#312e81", "#f5f3ff", "#1e1b4b"] },
  { name: "Ocean", colors: ["#0891b2", "#164e63", "#ecfeff", "#082f49"] },
  { name: "Sunset", colors: ["#f97316", "#7c2d12", "#fff7ed", "#431407"] },
  { name: "Forest", colors: ["#16a34a", "#14532d", "#f0fdf4", "#052e16"] },
];

const sections = ["Hero", "About", "Experience", "Projects", "Skills", "Education", "Contact"];

export default function PortfolioPage() {
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [selectedPalette, setSelectedPalette] = useState(palettes[0]);
  const [enabledSections, setEnabledSections] = useState<string[]>(sections);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [publishing, setPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const slug = useMemo(() => {
    const base = user?.name ? user.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "username";
    return base || "username";
  }, [user]);

  const toggleSection = (s: string) => {
    setEnabledSections((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handlePublish = async () => {
    setPublishing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setPublishing(false);
    setPublishedUrl(`https://${slug}.candidexa.app`);
  };

  const copyUrl = () => {
    void navigator.clipboard.writeText(publishedUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Portfolio Generator</h1>
        <p className="text-[#908fa0]">Generate a responsive portfolio with AI video demos</p>
      </div>

      <Tabs defaultValue="template">
        <TabsList variant="line" className="w-full justify-start border-b border-[#2d3449]">
          <TabsTrigger value="template">
            <LayoutTemplate className="mr-2 h-4 w-4" /> Template
          </TabsTrigger>
          <TabsTrigger value="customize">
            <Palette className="mr-2 h-4 w-4" /> Customize
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="mr-2 h-4 w-4" /> Preview
          </TabsTrigger>
          <TabsTrigger value="publish">
            <Rocket className="mr-2 h-4 w-4" /> Publish
          </TabsTrigger>
        </TabsList>

        <TabsContent value="template">
          <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
            <CardHeader>
              <CardTitle className="text-base text-white">Choose Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {templates.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTemplate(t)}
                    className={`rounded-lg border-2 p-3 text-center transition-all ${
                      selectedTemplate === t
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-[#2d3449] hover:border-[#3a4160]"
                    }`}
                  >
                    <div className="mb-2 flex aspect-[3/4] items-center justify-center rounded-lg bg-[#0b1326]">
                      <Globe className="h-8 w-8 text-[#908fa0]" />
                    </div>
                    <p className="text-sm font-medium text-white">{t}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customize">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-white">Color Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {palettes.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setSelectedPalette(p)}
                      className={`rounded-lg border-2 p-3 transition-all ${
                        selectedPalette.name === p.name
                          ? "border-indigo-500"
                          : "border-[#2d3449] hover:border-[#3a4160]"
                      }`}
                    >
                      <div className="mb-2 flex gap-1">
                        {p.colors.map((c, i) => (
                          <div key={i} className="h-6 flex-1 rounded" style={{ background: c }} />
                        ))}
                      </div>
                      <p className="text-sm font-medium text-white">{p.name}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-white">Sections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sections.map((s) => (
                    <label
                      key={s}
                      className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-[#171f33]"
                    >
                      <Checkbox checked={enabledSections.includes(s)} onCheckedChange={() => toggleSection(s)} />
                      <span className="text-sm font-medium text-[#dae2fd]">{s}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
            <CardContent>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDevice("desktop")}
                    className={
                      device === "desktop"
                        ? "border-indigo-500 text-indigo-300"
                        : ""
                    }
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDevice("tablet")}
                    className={
                      device === "tablet"
                        ? "border-indigo-500 text-indigo-300"
                        : ""
                    }
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDevice("mobile")}
                    className={
                      device === "mobile"
                        ? "border-indigo-500 text-indigo-300"
                        : ""
                    }
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
                <Badge variant="secondary" className="bg-[#171f33] text-[#dae2fd]">
                  Template: {selectedTemplate} · Palette: {selectedPalette.name}
                </Badge>
              </div>
              <div
                className={`mx-auto rounded-lg border border-[#2d3449] bg-[#0b1326] p-6 transition-all ${
                  device === "desktop"
                    ? "max-w-4xl"
                    : device === "tablet"
                      ? "max-w-lg"
                      : "max-w-[320px]"
                }`}
              >
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500" />
                  <h3 className="text-xl font-bold text-white">
                    {user?.name ?? "Your Name"}
                  </h3>
                  <p className="text-sm text-[#908fa0]">Full Stack Developer</p>
                  <p className="mt-2 text-xs text-[#908fa0]">
                    AI-written tagline appears here
                  </p>
                </div>
                {enabledSections.includes("Projects") && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[1, 2].map((i) => (
                      <div key={i} className="rounded-lg border border-[#2d3449] p-3">
                        <div className="mb-2 flex aspect-video items-center justify-center rounded bg-[#060e20]">
                          <Sparkles className="h-6 w-6 text-indigo-400" />
                          <span className="ml-2 text-xs text-[#908fa0]">
                            Video autoplays on hover
                          </span>
                        </div>
                        <p className="text-sm font-medium text-white">Project {i}</p>
                        <div className="mt-1 flex gap-1">
                          {["React", "Python"].map((t) => (
                            <Badge key={t} variant="secondary" className="bg-[#171f33] text-[#dae2fd]">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publish">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-white">Publish Portfolio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-[#0b1326] p-4">
                  <p className="text-sm text-[#dae2fd]">
                    <span className="font-medium text-white">Subdomain:</span>{" "}
                    <code className="text-indigo-300">{slug}.candidexa.app</code>
                  </p>
                </div>
                <Button
                  onClick={handlePublish}
                  disabled={publishing}
                  className="w-full bg-indigo-500 text-white hover:bg-indigo-400"
                >
                  {publishing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Publishing...
                    </>
                  ) : (
                    <>
                      <Rocket className="mr-2 h-4 w-4" /> Publish to Subdomain
                    </>
                  )}
                </Button>
                {publishedUrl && (
                  <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/15 p-3">
                    <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                    <a
                      href={publishedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-w-0 items-center gap-1 text-sm text-emerald-400 hover:underline"
                    >
                      <span className="truncate">Portfolio is live! {publishedUrl}</span>
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                    <button
                      onClick={copyUrl}
                      className="ml-auto shrink-0 rounded p-1 text-[#908fa0] hover:bg-[#171f33]"
                      aria-label="Copy URL"
                    >
                      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-white">Export & Deploy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full bg-[#0b1326]">
                  <Download className="mr-2 h-4 w-4" /> Download Code (ZIP)
                </Button>
                <Button variant="outline" className="w-full bg-[#0b1326]">
                  <Rocket className="mr-2 h-4 w-4" /> Deploy to Vercel
                </Button>
                <Button variant="outline" className="w-full bg-[#0b1326]">
                  <Rocket className="mr-2 h-4 w-4" /> Deploy to Netlify
                </Button>
                <div className="rounded-lg bg-[#0b1326] p-3 text-sm text-[#908fa0]">
                  Custom domain support available on Pro plan.{" "}
                  <Link
                    href="/pricing"
                    className="text-indigo-400 hover:underline"
                  >
                    View plans
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}