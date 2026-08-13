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
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Tailored Applications</h1>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                <SelectItem value="stripe">Stripe</SelectItem>
                <SelectItem value="notion">Notion</SelectItem>
                <SelectItem value="vercel">Vercel</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="company">Company</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          {tailored.map((doc, idx) => (
            <Card key={idx} className="hover:shadow-sm transition-shadow">
              <CardContent className="py-4 px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${doc.type === "Resume" ? "bg-indigo-100" : "bg-blue-100"}`}>
                    <FileText className={`w-5 h-5 ${doc.type === "Resume" ? "text-indigo-600" : "text-blue-600"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm">{doc.name}</p>
                      <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                      {doc.ats && (
                        <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100 text-xs">ATS {doc.ats}%</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">Created {doc.date}</p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
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
    </AppLayout>
  );
}
