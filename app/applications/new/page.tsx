import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function NewApplication() {
  return (
    <AppLayout currentPath="/applications">
      <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Add Application</h1>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input placeholder="e.g. Acme Corp" />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input placeholder="e.g. Frontend Engineer" />
              </div>
              <div className="space-y-2">
                <Label>Job URL</Label>
                <Input placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Date Applied</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    {["Saved", "Applied", "Screening", "Interview", "Offer", "Rejected"].map(s => (
                      <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Follow-up Date</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea placeholder="Add any notes about this application..." className="resize-none" />
            </div>
            <div className="flex gap-3 justify-end">
              <Link href="/applications"><Button variant="outline">Cancel</Button></Link>
              <Button>Save Application</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
