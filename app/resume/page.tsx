import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { FileText, Download, Eye, Copy, Pencil, Trash2, CheckCircle2, AlertCircle, UploadCloud } from "lucide-react";
import Link from "next/link";

const versions = [
  { name: "Master Resume", updated: "Aug 12, 2026", status: "active", ats: 91 },
  { name: "Stripe – Frontend Engineer", updated: "Aug 10, 2026", status: "tailored", ats: 96 },
  { name: "Notion – React Developer", updated: "Aug 7, 2026", status: "tailored", ats: 83 },
];

const statusStyle: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  tailored: "bg-indigo-100 text-indigo-700",
};

export default function MyResume() {
  return (
    <AppLayout currentPath="/resume">
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Resume</h1>
          <div className="flex gap-2">
            <Link href="/resume/upload">
              <Button variant="outline">
                <UploadCloud className="w-4 h-4 mr-2" />Upload
              </Button>
            </Link>
            <Button>
              <Pencil className="w-4 h-4 mr-2" />Edit Master
            </Button>
          </div>
        </div>

        {/* Master Resume Card */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-lg">Master Resume</p>
                    <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                      <CheckCircle2 className="w-3 h-3 mr-1" />Active
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Updated Aug 12, 2026</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">ATS Score</span>
                    <Progress value={91} className="w-32 h-1.5" />
                    <span className="text-xs font-bold text-green-600">91%</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm"><Eye className="w-4 h-4 mr-1" />Preview</Button>
                <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" />PDF</Button>
                <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" />DOCX</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* All Versions */}
        <div>
          <h2 className="text-lg font-semibold mb-4">All Versions</h2>
          <div className="space-y-3">
            {versions.map((v) => (
              <Card key={v.name} className="hover:shadow-sm transition-shadow">
                <CardContent className="py-4 px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{v.name}</p>
                        <Badge className={`${statusStyle[v.status]} hover:${statusStyle[v.status]} border-0 text-xs`}>
                          {v.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-xs text-muted-foreground">{v.updated}</p>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">ATS:</span>
                        <Progress value={v.ats} className="w-16 h-1" />
                        <span className="text-xs font-medium">{v.ats}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Copy className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
