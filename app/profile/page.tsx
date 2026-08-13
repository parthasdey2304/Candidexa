import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Plus, Pencil } from "lucide-react";

const skills = ["React", "TypeScript", "Next.js", "Node.js", "Figma", "TailwindCSS"];

export default function Profile() {
  return (
    <AppLayout currentPath="/profile">
      <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Candidate Profile</h1>
          <Button>Save Changes</Button>
        </div>

        {/* Identity */}
        <Card>
          <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">AJ</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">Alex Johnson</p>
                <p className="text-sm text-muted-foreground">Frontend Developer · San Francisco, CA</p>
                <Badge className="mt-2 bg-green-100 text-green-700 border border-green-200 hover:bg-green-100">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Profile Complete
                </Badge>
              </div>
            </div>
            <Separator />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input defaultValue="Alex Johnson" />
              </div>
              <div className="space-y-2">
                <Label>Professional Headline</Label>
                <Input defaultValue="Frontend Developer" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue="alex@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input defaultValue="San Francisco, CA" />
              </div>
              <div className="space-y-2">
                <Label>Portfolio URL</Label>
                <Input defaultValue="https://alexj.dev" />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn URL</Label>
                <Input defaultValue="https://linkedin.com/in/alexjohnson" />
              </div>
              <div className="space-y-2">
                <Label>GitHub URL</Label>
                <Input defaultValue="https://github.com/alexj" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Preferences */}
        <Card>
          <CardHeader><CardTitle>Job Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Target Roles</Label>
                <Input defaultValue="Frontend Developer, UI Engineer" />
              </div>
              <div className="space-y-2">
                <Label>Preferred Locations</Label>
                <Input defaultValue="San Francisco, Remote" />
              </div>
              <div className="space-y-2">
                <Label>Work Authorization</Label>
                <Input defaultValue="US Citizen" />
              </div>
              <div className="space-y-2">
                <Label>Availability</Label>
                <Input defaultValue="2 weeks notice" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Skills</CardTitle>
            <Button variant="outline" size="sm"><Plus className="w-4 h-4 mr-1" /> Add</Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <Badge key={s} variant="secondary" className="text-sm px-3 py-1 flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                  {s}
                  <button className="text-muted-foreground hover:text-destructive ml-1">×</button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
