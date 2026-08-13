import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { MapPin, Building2, CalendarDays, FileText, Zap, Clock, CheckCircle2 } from "lucide-react";

const timeline = [
  { event: "Applied", date: "Aug 8, 2026", done: true },
  { event: "Application viewed", date: "Aug 9, 2026", done: true },
  { event: "Moved to Screening", date: "Aug 10, 2026", done: true },
  { event: "Phone Screen scheduled", date: "Aug 14, 2026", done: false },
];

export default function ApplicationDetail({ params }: { params: { applicationId: string } }) {
  return (
    <AppLayout currentPath="/applications">
      <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">React Developer</h1>
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm mt-2">
              <span className="flex items-center gap-1"><Building2 className="w-4 h-4" />Notion</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />New York, NY (Remote)</span>
              <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" />Applied Aug 8, 2026</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100 px-3 py-1.5 text-sm">Screening</Badge>
            <Badge className="bg-primary/10 text-primary border-0 px-3 py-1.5 text-sm">
              <Zap className="w-3.5 h-3.5 mr-1" />73% Match
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Documents */}
            <Card>
              <CardHeader><CardTitle>Application Documents</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Notion – React Developer</p>
                      <p className="text-xs text-muted-foreground">Tailored Resume · ATS: 83%</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Cover Letter</p>
                      <p className="text-xs text-muted-foreground">Generated Aug 8, 2026</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader><CardTitle>Notes</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  placeholder="Add notes about this application..."
                  className="resize-none"
                  defaultValue="Spoke with recruiter – very positive call. They are looking for strong React experience. Mentioned their design system project which aligns well with my background."
                />
                <Button variant="outline" size="sm">Save Note</Button>
              </CardContent>
            </Card>

            {/* Update Status */}
            <Card>
              <CardHeader><CardTitle>Update Status</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {["Saved", "Applied", "Screening", "Interview", "Offer", "Rejected"].map((s) => (
                  <Button key={s} variant={s === "Screening" ? "default" : "outline"} size="sm">{s}</Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Timeline + Reminder */}
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Timeline</CardTitle></CardHeader>
              <CardContent>
                <div className="relative space-y-4">
                  {timeline.map(({ event, date, done }, i) => (
                    <div key={event} className="flex gap-3 items-start">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${done ? "bg-green-500 text-white" : "bg-muted border-2 border-border"}`}>
                        {done && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${!done ? "text-muted-foreground" : ""}`}>{event}</p>
                        <p className="text-xs text-muted-foreground">{date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Follow-up Reminder</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label>Follow-up Date</Label>
                  <Input type="date" defaultValue="2026-08-17" />
                </div>
                <Button className="w-full" variant="outline">
                  <Clock className="w-4 h-4 mr-2" />Set Reminder
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
