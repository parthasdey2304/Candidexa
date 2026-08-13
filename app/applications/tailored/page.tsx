import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Pencil, Copy, Trash2, Eye } from "lucide-react";

const tailored = [
  { name: "Stripe – Frontend Engineer", type: "Resume", date: "Aug 12", ats: 96, company: "Stripe" },
  { name: "Stripe – Frontend Engineer", type: "Cover Letter", date: "Aug 12", ats: null, company: "Stripe" },
  { name: "Notion – React Developer", type: "Resume", date: "Aug 7", ats: 83, company: "Notion" },
  { name: "Notion – React Developer", type: "Cover Letter", date: "Aug 7", ats: null, company: "Notion" },
  { name: "Vercel – UI Engineer", type: "Resume", date: "Aug 5", ats: 79, company: "Vercel" },
];

export default function TailoredApplications() {
  return (
    <AppLayout currentPath="/applications/tailored">
      <div className="p-6 md:p-8 space-y-8 bg-[#060e20] min-h-screen text-[#dae2fd]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-white tracking-tight">Tailored Applications</h1>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-48 bg-[#0b1326] border-[#2d3449] text-white focus:ring-[#6366f1] h-11">
                <SelectValue placeholder="Filter by company" />
              </SelectTrigger>
              <SelectContent className="bg-[#131b2e] border-[#2d3449] text-white">
                <SelectItem value="all" className="focus:bg-[#171f33] focus:text-white">All Companies</SelectItem>
                <SelectItem value="stripe" className="focus:bg-[#171f33] focus:text-white">Stripe</SelectItem>
                <SelectItem value="notion" className="focus:bg-[#171f33] focus:text-white">Notion</SelectItem>
                <SelectItem value="vercel" className="focus:bg-[#171f33] focus:text-white">Vercel</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40 bg-[#0b1326] border-[#2d3449] text-white focus:ring-[#6366f1] h-11">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-[#131b2e] border-[#2d3449] text-white">
                <SelectItem value="newest" className="focus:bg-[#171f33] focus:text-white">Newest</SelectItem>
                <SelectItem value="company" className="focus:bg-[#171f33] focus:text-white">Company</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {tailored.map((doc, idx) => (
            <Card key={idx} className="bg-[#131b2e] border-[#2d3449] hover:border-[#464554] hover:bg-[#171f33] transition-all duration-200 shadow-none group">
              <CardContent className="py-5 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-[#2d3449] ${doc.type === "Resume" ? "bg-[#6366f1]/10 border-[#6366f1]/20" : "bg-[#0d0096]/20 border-[#494bd6]/20"}`}>
                    <FileText className={`w-6 h-6 ${doc.type === "Resume" ? "text-[#6366f1]" : "text-[#c0c1ff]"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="font-semibold text-[15px] text-white group-hover:text-[#c0c1ff] transition-colors">{doc.name}</p>
                      <Badge variant="outline" className="text-xs px-2.5 py-1 bg-[#0b1326] border-[#2d3449] text-[#dae2fd]">{doc.type}</Badge>
                      {doc.ats && (
                        <Badge className="bg-[#002f38] text-[#4cd7f6] border border-[#009eb9]/30 hover:bg-[#002f38] text-xs px-2.5 py-1">ATS {doc.ats}%</Badge>
                      )}
                    </div>
                    <p className="text-sm text-[#908fa0] mt-1.5 font-medium">Created {doc.date}</p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="ghost" size="icon" className="h-10 w-10 text-[#908fa0] hover:bg-[#0b1326] hover:text-white"><Eye className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10 text-[#908fa0] hover:bg-[#0b1326] hover:text-white"><Pencil className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10 text-[#908fa0] hover:bg-[#0b1326] hover:text-white"><Copy className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10 text-[#908fa0] hover:bg-[#0b1326] hover:text-white"><Download className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10 text-[#464554] hover:bg-[#93000a] hover:text-[#ffb4ab]"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
