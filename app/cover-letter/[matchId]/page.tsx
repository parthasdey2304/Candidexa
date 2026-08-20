"use client";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Copy, Download, CheckCircle2, Zap } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const evidenceChips = ["4 years React experience", "TypeScript certified", "Open source contributor", "Remote-first experience"];

const fallbackLetter = `Dear Hiring Team,

I am writing to express my enthusiasm for the Frontend Engineer position at Stripe. With my experience building React and TypeScript applications, I am confident in my ability to contribute meaningfully to your product and engineering culture.

I look forward to discussing this opportunity further.

Best regards,
Alex`;

export default function CoverLetterGenerator({ params }: { params: { matchId: string } }) {
  const router = useRouter();
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [letterContent, setLetterContent] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/sign-in");
        return;
      }
      
      const res = await fetch("http://localhost:8000/api/ai/cover-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          resume_text: "Mock resume text (should be fetched from DB in full version)",
          job_description: "Mock job description (should be fetched from Job DB in full version)",
          tone: tone,
          length: length
        })
      });

      if (res.ok) {
        const data = await res.json();
        setLetterContent(data.cover_letter);
        setGenerated(true);
      } else {
        console.error("Failed to generate");
        setLetterContent(fallbackLetter);
        setGenerated(true);
      }
    } catch (err) {
      console.error(err);
      setLetterContent(fallbackLetter);
      setGenerated(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout currentPath="/applications/tailored">
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Cover Letter Generator</h1>
          <p className="text-muted-foreground mt-1">Frontend Engineer at Stripe · Master Resume</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-sm">Options</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tone</Label>
                  <Select value={tone} onValueChange={(v) => setTone(v ?? "professional")}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Length</Label>
                  <Select value={length} onValueChange={(v) => setLength(v ?? "medium")}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (~150 words)</SelectItem>
                      <SelectItem value="medium">Medium (~300 words)</SelectItem>
                      <SelectItem value="long">Long (~450 words)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" onClick={handleGenerate} disabled={loading}>
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Generating...</>
                  ) : (
                    <><Zap className="w-4 h-4 mr-2" />Generate</>
                  )}
                </Button>
              </CardContent>
            </Card>

            {generated && (
              <Card>
                <CardHeader><CardTitle className="text-sm">Evidence Used</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {evidenceChips.map((c) => (
                    <Badge key={c} className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-50 text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />{c}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Letter */}
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">Generated Cover Letter</CardTitle>
                {generated && (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleGenerate}>
                      <RefreshCw className="w-4 h-4 mr-1" />Regenerate
                    </Button>
                    <Button variant="ghost" size="sm"><Copy className="w-4 h-4 mr-1" />Copy</Button>
                    <Button variant="ghost" size="sm"><Download className="w-4 h-4 mr-1" />Download</Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {!generated ? (
                  <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
                    Select your options and click Generate.
                  </div>
                ) : (
                  <Textarea
                    className="min-h-96 font-serif text-sm resize-none"
                    value={letterContent}
                    onChange={(e) => setLetterContent(e.target.value)}
                  />
                )}
              </CardContent>
            </Card>
            {generated && (
              <div className="flex justify-end gap-2">
                <Button variant="outline">Discard</Button>
                <Button>Save Cover Letter</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
