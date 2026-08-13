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
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 bg-[#060e20] min-h-screen text-[#dae2fd]">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white tracking-tight">My Resume</h1>
          <div className="flex gap-4">
            <Link href="/resume/upload">
              <Button variant="outline" className="bg-[#131b2e]/80 backdrop-blur-sm border-[#2d3449] text-white hover:bg-[#171f33] hover:border-[#6366f1]/50 h-12 px-6 rounded-xl font-semibold transition-all">
                <UploadCloud className="w-5 h-5 mr-2 text-[#908fa0]" />Upload
              </Button>
            </Link>
            <Button className="bg-gradient-to-r from-[#6366f1] to-[#494bd6] hover:from-[#4f46e5] hover:to-[#3b3dbf] text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] border-0 h-12 px-8 rounded-xl font-bold transition-all hover:scale-105">
              <Pencil className="w-4 h-4 mr-2" />Edit Master
            </Button>
          </div>
        </div>

        {/* Master Resume Card */}
        <Card className="border-[#6366f1]/30 bg-[#6366f1]/5 shadow-none">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 bg-[#6366f1]/10 rounded-2xl flex items-center justify-center border border-[#6366f1]/20">
                  <FileText className="w-8 h-8 text-[#6366f1]" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-xl text-white">Master Resume</p>
                    <Badge className="bg-[#002f38] text-[#4cd7f6] border border-[#009eb9]/30 hover:bg-[#002f38]">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />Active
                    </Badge>
                  </div>
                  <p className="text-sm text-[#908fa0] mt-1">Updated Aug 12, 2026</p>
                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-xs font-semibold text-[#908fa0] uppercase tracking-wider">ATS Score</span>
                    <Progress value={91} className="w-40 h-2 bg-[#222a3d] [&>div]:bg-[#4cd7f6]" />
                    <span className="text-sm font-bold text-[#4cd7f6]">91%</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="bg-[#171f33]/80 backdrop-blur-sm border-[#2d3449] text-white hover:bg-[#222a3d] hover:text-[#dae2fd] h-11 px-5 rounded-xl font-medium shadow-sm transition-all hover:border-[#6366f1]/50"><Eye className="w-4 h-4 mr-2 text-[#908fa0]" />Preview</Button>
                <Button variant="outline" className="bg-[#171f33]/80 backdrop-blur-sm border-[#2d3449] text-white hover:bg-[#222a3d] hover:text-[#dae2fd] h-11 px-5 rounded-xl font-medium shadow-sm transition-all hover:border-[#6366f1]/50"><Download className="w-4 h-4 mr-2 text-[#908fa0]" />PDF</Button>
                <Button variant="outline" className="bg-[#171f33]/80 backdrop-blur-sm border-[#2d3449] text-white hover:bg-[#222a3d] hover:text-[#dae2fd] h-11 px-5 rounded-xl font-medium shadow-sm transition-all hover:border-[#6366f1]/50"><Download className="w-4 h-4 mr-2 text-[#908fa0]" />DOCX</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* All Versions */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">All Versions</h2>
          <div className="space-y-4">
            {versions.map((v) => (
              <Card key={v.name} className="bg-[#131b2e] border-[#2d3449] hover:border-[#464554] transition-colors shadow-none group">
                <CardContent className="py-5 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-[#0b1326] rounded-xl flex items-center justify-center border border-[#2d3449]">
                      <FileText className="w-5 h-5 text-[#908fa0]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold text-[15px] text-white">{v.name}</p>
                        <Badge className={`${v.status === 'active' ? 'bg-[#002f38] text-[#4cd7f6] border border-[#009eb9]/30' : 'bg-[#0d0096] text-[#c0c1ff] border border-[#494bd6]/30'} border-0 px-2.5 py-1 text-xs font-bold`}>
                          {v.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <p className="text-sm text-[#908fa0]">{v.updated}</p>
                        <span className="text-[#464554]">·</span>
                        <span className="text-xs font-semibold text-[#908fa0] uppercase tracking-wider">ATS:</span>
                        <Progress value={v.ats} className="w-20 h-1.5 bg-[#222a3d] [&>div]:bg-[#c0c1ff]" />
                        <span className="text-sm font-bold text-[#c0c1ff]">{v.ats}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-[#908fa0] hover:bg-[#171f33] hover:text-white"><Eye className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-[#908fa0] hover:bg-[#171f33] hover:text-white"><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-[#908fa0] hover:bg-[#171f33] hover:text-white"><Copy className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-[#908fa0] hover:bg-[#171f33] hover:text-white"><Download className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-[#464554] hover:bg-[#93000a] hover:text-[#ffb4ab]"><Trash2 className="w-4 h-4" /></Button>
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
