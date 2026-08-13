import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Trash2, Download, Shield } from "lucide-react";

const uploadedFiles = [
  { name: "resume_v1.pdf", uploaded: "Jul 28, 2026", size: "128 KB" },
  { name: "resume_v2.docx", uploaded: "Aug 5, 2026", size: "94 KB" },
];

const consentHistory = [
  { action: "Agreed to Terms & Privacy", date: "Jun 15, 2026" },
  { action: "Enabled AI processing of resume", date: "Jun 15, 2026" },
  { action: "Opted in to product updates", date: "Jun 15, 2026" },
];

export default function PrivacySettings() {
  return (
    <AppLayout currentPath="/settings">
      <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Privacy & Data Controls</h1>
        </div>

        {/* AI Processing */}
        <Card>
          <CardHeader>
            <CardTitle>AI Processing</CardTitle>
            <CardDescription>
              Your resume and job descriptions are processed by AI to generate analysis and tailored documents. 
              We do not use your personal data to train public AI models.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
              ✓ Your data is not used for public AI model training.
            </div>
          </CardContent>
        </Card>

        {/* Uploaded Files */}
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files</CardTitle>
            <CardDescription>Files you have uploaded to Candidexa. You can delete them at any time.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {uploadedFiles.map((f) => (
              <div key={f.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">Uploaded {f.uploaded} · {f.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card>
          <CardHeader>
            <CardTitle>Data Retention</CardTitle>
            <CardDescription>
              Your data is retained while your account is active. After deletion, data is removed within 30 days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />Download My Data
            </Button>
          </CardContent>
        </Card>

        {/* Consent History */}
        <Card>
          <CardHeader><CardTitle>Consent History</CardTitle></CardHeader>
          <CardContent className="divide-y">
            {consentHistory.map(({ action, date }) => (
              <div key={action} className="py-3">
                <p className="text-sm">{action}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
