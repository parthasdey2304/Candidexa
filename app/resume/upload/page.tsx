"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X } from "lucide-react";
import { useState } from "react";

type UploadState = "idle" | "dragging" | "uploading" | "parsing" | "success" | "error";

export default function ResumeUpload() {
  const [state, setState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);

  const simulate = () => {
    setState("uploading");
    setProgress(0);
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(iv);
          setState("parsing");
          setTimeout(() => setState("success"), 1200);
          return 100;
        }
        return p + 15;
      });
    }, 200);
  };

  return (
    <AppLayout currentPath="/resume">
      <div className="p-6 md:p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Upload Resume</h1>
        <p className="text-muted-foreground mb-8">Import your existing PDF or DOCX resume. We will extract your experience and ask you to confirm before saving anything.</p>

        {state === "idle" || state === "dragging" ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setState("dragging"); }}
            onDragLeave={() => setState("idle")}
            onDrop={(e) => { e.preventDefault(); simulate(); }}
            onClick={simulate}
            className={`border-2 border-dashed rounded-2xl p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
              state === "dragging"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary hover:bg-muted/50"
            }`}
          >
            <UploadCloud className={`w-14 h-14 mb-4 transition-colors ${state === "dragging" ? "text-primary" : "text-muted-foreground"}`} />
            <p className="font-semibold text-lg">Drop your resume here</p>
            <p className="text-sm text-muted-foreground mt-2">or click to browse</p>
            <p className="text-xs text-muted-foreground mt-4">Supports PDF and DOCX · Max 5MB</p>
          </div>
        ) : null}

        {state === "uploading" && (
          <Card>
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <FileText className="w-12 h-12 text-primary mx-auto" />
              <p className="font-medium">Uploading resume.pdf...</p>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground">{progress}%</p>
            </CardContent>
          </Card>
        )}

        {state === "parsing" && (
          <Card>
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="font-medium">Parsing your resume...</p>
              <p className="text-sm text-muted-foreground">Extracting experience, education, and skills</p>
            </CardContent>
          </Card>
        )}

        {state === "success" && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto" />
              <p className="font-bold text-lg text-green-800">Resume parsed successfully!</p>
              <div className="text-left bg-white rounded-xl border border-green-200 p-4 space-y-2 text-sm">
                <p className="font-medium text-green-900">Extracted information:</p>
                <p className="text-muted-foreground">✓ 3 work experiences extracted</p>
                <p className="text-muted-foreground">✓ 2 education entries found</p>
                <p className="text-muted-foreground">✓ 12 skills identified</p>
                <p className="text-amber-700 font-medium">⚠ 2 items require your confirmation</p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => setState("idle")}>Upload different</Button>
                <Button>Review & Confirm</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {state === "error" && (
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <AlertCircle className="w-14 h-14 text-destructive mx-auto" />
              <p className="font-bold text-lg text-destructive">Upload failed</p>
              <p className="text-sm text-muted-foreground">The file format is not supported or the file is too large.</p>
              <Button onClick={() => setState("idle")}>Try again</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
