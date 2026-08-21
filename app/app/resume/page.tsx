"use client";

import { useCallback, useState } from "react";
import Link from "next/link";

import { useAuth } from "@/components/providers/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload, type UploadState } from "@/components/shared/file-upload";
import { ScoreGauge } from "@/components/shared/score-gauge";
import { TagInput } from "@/components/shared/tag-input";
import {
  Check,
  Download,
  FileText,
  Plus,
  Save,
  Sparkles,
  Target,
  Trash2,
} from "lucide-react";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type SectionType = "experience" | "education" | "project" | "certification";

interface SectionItem {
  title?: string;
  company?: string;
  degree?: string;
  institution?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  tech?: string;
  link?: string;
  gpa?: string;
}

interface ResumeSection {
  id: string;
  type: SectionType;
  title: string;
  items: SectionItem[];
}

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

interface Resume {
  id: string;
  title: string;
  summary: string;
  contact: ContactInfo;
  sections: ResumeSection[];
  skills: string[];
  atsScore: number | null;
}

interface AnalysisResult {
  score: number;
  gaps: string[];
}

interface ManualDetails {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
}

const DEFAULT_CONTACT: ContactInfo = {
  email: "john@example.com",
  phone: "+91 98765 43210",
  location: "Bangalore, India",
  linkedin: "linkedin.com/in/johndoe",
  github: "github.com/johndoe",
};

const TEMPLATES = ["Professional", "Modern", "Minimal", "Creative", "Executive", "Technical"];

const inputClass =
  "border-border bg-muted text-foreground placeholder:text-[#464554] focus-visible:ring-[#6366f1]";

const outlineBtnClass =
  "border-border bg-muted text-foreground hover:bg-muted";

const proBadgeClass =
  "bg-[#6366f1]/15 text-[#818cf8] ring-1 ring-inset ring-[#6366f1]/30";

const freeBadgeClass =
  "bg-muted text-muted-foreground ring-1 ring-inset ring-[#2d3449]";

const sectionFieldSets: Record<Exclude<SectionType, "certification">, { key: string; placeholder: string }[]> = {
  experience: [
    { key: "title", placeholder: "Job Title" },
    { key: "company", placeholder: "Company" },
    { key: "startDate", placeholder: "Start Date" },
    { key: "endDate", placeholder: "End Date" },
  ],
  education: [
    { key: "degree", placeholder: "Degree" },
    { key: "institution", placeholder: "Institution" },
    { key: "startDate", placeholder: "Start Year" },
    { key: "endDate", placeholder: "End Year" },
  ],
  project: [
    { key: "title", placeholder: "Project Title" },
    { key: "tech", placeholder: "Technologies" },
    { key: "startDate", placeholder: "Start Year" },
    { key: "endDate", placeholder: "End Year" },
  ],
};

export default function ResumePage() {
  const { plan, user } = useAuth();
  const [resume, setResume] = useState<Resume>({
    id: "",
    title: "My Resume",
    summary: "",
    contact: DEFAULT_CONTACT,
    sections: [],
    skills: [],
    atsScore: null,
  });
  const [activeTab, setActiveTab] = useState("upload");
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [manual, setManual] = useState<ManualDetails>({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    summary: "",
  });
  const [jdText, setJdText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [fixingGaps, setFixingGaps] = useState(false);
  const [action, setAction] = useState<"idle" | "saving" | "saved" | "downloading" | "downloaded">("idle");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleFile = useCallback(async (file: File) => {
    setFileName(file.name);
    await delay(2000);
    setResume({
      id: "resume-1",
      title: file.name.replace(/\.[^/.]+$/, "") || "My Resume",
      summary:
        "Experienced software engineer with expertise in building scalable web applications.",
      contact: DEFAULT_CONTACT,
      sections: [
        {
          id: "exp-1",
          type: "experience",
          title: "Experience",
          items: [
            {
              title: "Software Engineer",
              company: "Tech Corp",
              startDate: "2022-01",
              endDate: "Present",
              description: "Built microservices handling 10K+ requests/sec",
            },
          ],
        },
        {
          id: "edu-1",
          type: "education",
          title: "Education",
          items: [
            {
              degree: "B.Tech Computer Science",
              institution: "IIT Delhi",
              startDate: "2018",
              endDate: "2022",
              gpa: "8.5",
            },
          ],
        },
      ],
      skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "PostgreSQL"],
      atsScore: 72,
    });
    setUploadState("done");
  }, []);

  const handleAnalyzeJD = async () => {
    if (!jdText.trim()) return;
    setAnalyzing(true);
    await delay(3000);
    setAnalysisResult({
      score: 68,
      gaps: ["Docker", "Kubernetes", "AWS", "CI/CD", "System Design", "Microservices"],
    });
    setAnalyzing(false);
  };

  const handleFixGaps = async () => {
    setFixingGaps(true);
    await delay(1500);
    setAnalysisResult((prev) =>
      prev ? { score: Math.min(prev.score + 15, 100), gaps: [] } : prev
    );
    setFixingGaps(false);
  };

  const applyManual = () => {
    setResume({
      id: "manual-1",
      title: manual.name.trim() || "My Resume",
      summary:
        manual.summary.trim() ||
        "Experienced software engineer with expertise in building scalable web applications.",
      contact: {
        email: manual.email || DEFAULT_CONTACT.email,
        phone: manual.phone || DEFAULT_CONTACT.phone,
        location: manual.location || DEFAULT_CONTACT.location,
        linkedin: manual.linkedin || DEFAULT_CONTACT.linkedin,
        github: manual.github || DEFAULT_CONTACT.github,
      },
      sections: [],
      skills: [],
      atsScore: null,
    });
    setActiveTab("preview");
  };

  const addSection = (type: SectionType) => {
    setResume((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: `${type}-${Date.now()}`,
          type,
          title: `${type.charAt(0).toUpperCase()}${type.slice(1)}s`,
          items: [{}],
        },
      ],
    }));
  };

  const removeSection = (sectionId: string) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== sectionId),
    }));
  };

  const addEntry = (sectionId: string) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId ? { ...s, items: [...s.items, {}] } : s
      ),
    }));
  };

  const handleSave = async () => {
    setAction("saving");
    await delay(1200);
    setAction("saved");
    setTimeout(() => setAction("idle"), 2000);
  };

  const handleDownload = async () => {
    setAction("downloading");
    await delay(1800);
    setAction("downloaded");
    setTimeout(() => setAction("idle"), 2000);
  };

  const busy = action === "saving" || action === "downloading";
  const contactLine = [
    resume.contact.email,
    resume.contact.phone,
    resume.contact.location,
    resume.contact.linkedin,
    resume.contact.github,
  ]
    .filter(Boolean)
    .join(" | ");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Resume Builder</h1>
          <p className="mt-1 text-muted-foreground">
            Build ATS-optimized resumes with AI assistance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={plan?.tier === "pro" ? proBadgeClass : freeBadgeClass}>
            {plan?.name ?? "Free"}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className={outlineBtnClass}
            disabled={busy}
            onClick={() => void handleSave()}
          >
            {action === "saving" ? (
              <>
                <Spinner size="sm" /> Saving…
              </>
            ) : action === "saved" ? (
              <>
                <Check className="size-4 text-emerald-400" /> Saved
              </>
            ) : (
              <>
                <Save className="size-4" /> Save
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={outlineBtnClass}
            disabled={busy}
            onClick={() => void handleDownload()}
          >
            {action === "downloading" ? (
              <>
                <Spinner size="sm" /> Preparing…
              </>
            ) : action === "downloaded" ? (
              <>
                <Check className="size-4 text-emerald-400" /> Downloaded
              </>
            ) : (
              <>
                <Download className="size-4" /> Download PDF
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(typeof value === "string" ? value : "upload")}
      >
        <TabsList variant="line" className="w-full border-b border-border">
          <TabsTrigger
            value="upload"
            className="text-muted-foreground data-active:text-foreground after:bg-[#6366f1]"
          >
            Upload / Input
          </TabsTrigger>
          <TabsTrigger
            value="ats"
            className="text-muted-foreground data-active:text-foreground after:bg-[#6366f1]"
          >
            ATS Score
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="text-muted-foreground data-active:text-foreground after:bg-[#6366f1]"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="templates"
            className="text-muted-foreground data-active:text-foreground after:bg-[#6366f1]"
          >
            Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Upload Resume</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Drag and drop your PDF, DOCX, or TXT file
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FileUpload
                  label="Drag & drop your resume here"
                  accept=".pdf,.docx,.txt"
                  state={uploadState}
                  onStateChange={setUploadState}
                  onFile={(file) => void handleFile(file)}
                  fileName={fileName}
                />
                {uploadState === "done" && resume.id ? (
                  <div className="flex flex-wrap items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
                    <Check className="size-3.5" />
                    Parsed {fileName} — {resume.sections.length} section
                    {resume.sections.length === 1 ? "" : "s"} · {resume.skills.length} skills ·
                    baseline ATS {resume.atsScore}%
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Or Fill Manually</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Enter your details below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="manual-name">Name</Label>
                    <Input
                      id="manual-name"
                      placeholder="John Doe"
                      className={inputClass}
                      value={manual.name}
                      onChange={(e) => setManual({ ...manual, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="manual-email">Email</Label>
                    <Input
                      id="manual-email"
                      type="email"
                      placeholder="john@example.com"
                      className={inputClass}
                      value={manual.email}
                      onChange={(e) => setManual({ ...manual, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="manual-phone">Phone</Label>
                    <Input
                      id="manual-phone"
                      placeholder="+91 98765 43210"
                      className={inputClass}
                      value={manual.phone}
                      onChange={(e) => setManual({ ...manual, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="manual-location">Location</Label>
                    <Input
                      id="manual-location"
                      placeholder="Bangalore, India"
                      className={inputClass}
                      value={manual.location}
                      onChange={(e) => setManual({ ...manual, location: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="manual-linkedin">LinkedIn</Label>
                  <Input
                    id="manual-linkedin"
                    placeholder="linkedin.com/in/johndoe"
                    className={inputClass}
                    value={manual.linkedin}
                    onChange={(e) => setManual({ ...manual, linkedin: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="manual-github">GitHub</Label>
                  <Input
                    id="manual-github"
                    placeholder="github.com/johndoe"
                    className={inputClass}
                    value={manual.github}
                    onChange={(e) => setManual({ ...manual, github: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="manual-summary">Summary</Label>
                  <Textarea
                    id="manual-summary"
                    rows={3}
                    placeholder="Experienced software engineer…"
                    className={inputClass}
                    value={manual.summary}
                    onChange={(e) => setManual({ ...manual, summary: e.target.value })}
                  />
                </div>
                <Button
                  variant="outline"
                  className={`w-full ${outlineBtnClass}`}
                  onClick={applyManual}
                >
                  <Sparkles className="size-4 text-[#818cf8]" />
                  Use these details in preview
                </Button>
              </CardContent>
            </Card>
          </div>

          {resume.sections.length > 0 ? (
            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-foreground">Resume Sections</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={outlineBtnClass}
                    onClick={() => addSection("experience")}
                  >
                    <Plus className="size-4" /> Experience
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={outlineBtnClass}
                    onClick={() => addSection("education")}
                  >
                    <Plus className="size-4" /> Education
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={outlineBtnClass}
                    onClick={() => addSection("project")}
                  >
                    <Plus className="size-4" /> Project
                  </Button>
                </div>
              </div>
              {resume.sections.map((section) => (
                <Card key={section.id} className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-base text-foreground">{section.title}</CardTitle>
                    <CardAction>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        onClick={() => removeSection(section.id)}
                        aria-label={`Remove ${section.title}`}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {section.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-2 gap-4">
                          {sectionFieldSets[section.type === "certification" ? "experience" : section.type].map(
                            (field) => (
                              <Input
                                key={field.key}
                                placeholder={field.placeholder}
                                defaultValue={item[field.key as keyof SectionItem]}
                                className={inputClass}
                              />
                            )
                          )}
                          <div className="col-span-2">
                            <Textarea
                              rows={2}
                              placeholder="Description and achievements…"
                              defaultValue={item.description}
                              className={inputClass}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-[#818cf8] hover:bg-muted hover:text-[#a5b4fc]"
                      onClick={() => addEntry(section.id)}
                    >
                      <Plus className="size-4" /> Add Entry
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}

          {resume.id ? (
            <Card className="mt-6 border-border bg-card">
              <CardHeader>
                <CardTitle className="text-base text-foreground">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <TagInput
                  tags={resume.skills}
                  onChange={(skills) => setResume((prev) => ({ ...prev, skills }))}
                  placeholder="Add a skill and press Enter"
                />
              </CardContent>
            </Card>
          ) : null}
        </TabsContent>

        <TabsContent value="ats" className="mt-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Paste Job Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  rows={10}
                  placeholder="Paste the job description here to analyze keyword match…"
                  className={`font-mono text-sm ${inputClass}`}
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                />
                <Button
                  onClick={() => void handleAnalyzeJD()}
                  disabled={analyzing || !jdText.trim()}
                  className="w-full bg-[#6366f1] hover:bg-[#4f46e5]"
                >
                  {analyzing ? (
                    <>
                      <Spinner size="sm" /> Analyzing…
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" /> Analyze Match
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {analyzing ? (
              <Card className="border-border bg-card">
                <CardContent className="flex min-h-64 flex-col items-center justify-center">
                  <Spinner size="lg" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    Scoring your resume against the job description…
                  </p>
                </CardContent>
              </Card>
            ) : analysisResult ? (
              <Card className="border-border bg-card">
                <CardContent className="flex flex-col items-center">
                  <ScoreGauge value={analysisResult.score} />
                  <p className="mt-4 text-lg font-semibold text-foreground">
                    Match Score: {analysisResult.score}%
                  </p>
                  {analysisResult.gaps.length > 0 ? (
                    <div className="mt-6 w-full">
                      <h4 className="mb-3 text-sm font-medium text-red-400">
                        Missing Keywords:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.gaps.map((g) => (
                          <Badge
                            key={g}
                            className="bg-red-500/15 text-red-400 ring-1 ring-inset ring-red-500/30"
                          >
                            {g}
                          </Badge>
                        ))}
                      </div>
                      {plan?.tier === "pro" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className={`mt-4 w-full ${outlineBtnClass}`}
                          disabled={fixingGaps}
                          onClick={() => void handleFixGaps()}
                        >
                          {fixingGaps ? (
                            <>
                              <Spinner size="sm" /> Closing gaps…
                            </>
                          ) : (
                            <>
                              <Sparkles className="size-4" /> AI Fix All Gaps
                            </>
                          )}
                        </Button>
                      ) : (
                        <div className="mt-4 w-full rounded-lg border border-border bg-muted px-3 py-2 text-center">
                          <p className="text-xs text-muted-foreground">
                            Auto-Filling gaps is a Pro feature.{" "}
                            <Link
                              href="/pricing"
                              className="font-medium text-[#818cf8] hover:underline"
                            >
                              Upgrade to Pro
                            </Link>
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="mt-4 flex items-center gap-1.5 text-sm text-emerald-400">
                      <Check className="size-4" /> All gaps closed — score updated
                    </p>
                  )}
                </CardContent>
              </Card>
            ) : (
              <EmptyState
                className="border-border bg-card"
                icon={
                  <Target className="size-5 text-[#818cf8]" />
                }
                title="No analysis yet"
                description="Paste a job description to measure your ATS match and surface missing keywords."
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <Card className="border-border bg-card">
            <CardContent>
              {!resume.id ? (
                <div className="mb-6 flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 text-xs text-muted-foreground">
                  <FileText className="size-3.5 shrink-0 text-[#818cf8]" />
                  Previewing defaults — upload a resume or fill the manual form to preview your
                  data.
                </div>
              ) : null}
              <div className="mx-auto max-w-2xl rounded-lg border border-border bg-card p-8 shadow-lg">
                <h1 className="mb-1 text-2xl font-bold text-foreground">
                  {resume.title || user?.name || "Your Name"}
                </h1>
                <p className="mb-4 text-sm text-muted-foreground">{contactLine}</p>
                {resume.summary ? (
                  <div className="mb-4">
                    <h2 className="mb-3 border-b border-border pb-1 text-sm font-bold uppercase text-muted-foreground">
                      Summary
                    </h2>
                    <p className="text-sm text-foreground">{resume.summary}</p>
                  </div>
                ) : null}
                {resume.skills.length > 0 ? (
                  <div className="mb-4">
                    <h2 className="mb-3 border-b border-border pb-1 text-sm font-bold uppercase text-muted-foreground">
                      Skills
                    </h2>
                    <p className="text-sm text-foreground">{resume.skills.join(" | ")}</p>
                  </div>
                ) : null}
                {resume.sections.map((section) => (
                  <div key={section.id} className="mb-4">
                    <h2 className="mb-3 border-b border-border pb-1 text-sm font-bold uppercase text-muted-foreground">
                      {section.title}
                    </h2>
                    {section.items.map((item, index) => (
                      <div key={index} className="mb-3">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm font-semibold text-foreground">
                            {item.title || item.degree || "Untitled"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {[item.startDate, item.endDate].filter(Boolean).join(" - ")}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">
                          {item.company || item.institution || item.tech || "—"}
                        </p>
                        {item.description ? (
                          <p className="mt-1 text-sm text-muted-foreground">- {item.description}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {TEMPLATES.map((template) => (
              <Card
                key={template}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedTemplate(template)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedTemplate(template);
                }}
                className={`cursor-pointer border-border bg-card transition-all ${
                  selectedTemplate === template
                    ? "border-[#6366f1] ring-2 ring-[#6366f1]/40"
                    : "hover:border-[#6366f1]/60"
                }`}
              >
                <CardContent>
                  <div className="flex aspect-[3/4] items-center justify-center rounded-lg border border-border bg-muted">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="mt-3 text-sm font-medium text-foreground">{template}</p>
                  <Badge className={`mt-2 ${proBadgeClass}`}>ATS-Safe</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          {selectedTemplate ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Selected:{" "}
              <span className="font-medium text-foreground">{selectedTemplate}</span> — this
              layout will be applied to the next export.
            </p>
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  );
}