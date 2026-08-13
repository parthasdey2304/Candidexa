"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Plus, Pencil } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const [skills, setSkills] = useState(["React", "TypeScript", "Next.js", "Node.js", "Figma", "TailwindCSS"]);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  return (
    <AppLayout currentPath="/profile">
      <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-10 bg-transparent min-h-screen text-[#dae2fd]">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#c0c1ff] to-[#6366f1]">
            Candidate Profile
          </h1>
          <Button className="bg-gradient-to-r from-[#6366f1] to-[#494bd6] hover:from-[#4f46e5] hover:to-[#3b3dbf] text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] border-0 h-11 px-6 rounded-xl font-semibold transition-all hover:scale-105">
            Save Changes
          </Button>
        </div>

        {/* Identity */}
        <Card className="bg-[#131b2e]/60 backdrop-blur-xl border border-[#2d3449]/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden rounded-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366f1] via-[#4cd7f6] to-[#6366f1] opacity-50"></div>
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-2xl font-bold flex items-center gap-2">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex items-center gap-8">
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1] to-[#4cd7f6] rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Avatar className="w-24 h-24 ring-4 ring-[#131b2e] relative z-10">
                  <AvatarFallback className="text-3xl font-extrabold bg-gradient-to-br from-[#171f33] to-[#0b1326] text-[#c0c1ff]">AJ</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 z-20 bg-[#131b2e] p-1.5 rounded-full border border-[#2d3449] shadow-lg group-hover:scale-110 transition-transform">
                  <Pencil className="w-4 h-4 text-[#4cd7f6]" />
                </div>
              </div>
              <div>
                <p className="font-bold text-3xl text-white tracking-tight">Alex Johnson</p>
                <p className="text-base text-[#908fa0] mt-1 font-medium">Frontend Developer <span className="mx-2 text-[#464554]">·</span> San Francisco, CA</p>
                <Badge className="mt-4 bg-[#002f38]/80 backdrop-blur-sm text-[#4cd7f6] border border-[#009eb9]/50 hover:bg-[#002f38] px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(76,215,246,0.2)]">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-[#4cd7f6]" /> Profile Complete
                </Badge>
              </div>
            </div>
            
            <Separator className="bg-gradient-to-r from-transparent via-[#2d3449] to-transparent h-px border-0" />
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-[#908fa0] uppercase tracking-wider text-[11px] font-bold">Full Name</Label>
                <Input defaultValue="Alex Johnson" className="bg-[#0b1326]/50 backdrop-blur-sm border-[#2d3449]/50 text-white focus-visible:ring-[#6366f1] focus-visible:border-[#6366f1] h-12 rounded-xl px-4 transition-all hover:bg-[#0b1326]/80" />
              </div>
              <div className="space-y-3">
                <Label className="text-[#908fa0] uppercase tracking-wider text-[11px] font-bold">Professional Headline</Label>
                <Input defaultValue="Frontend Developer" className="bg-[#0b1326]/50 backdrop-blur-sm border-[#2d3449]/50 text-white focus-visible:ring-[#6366f1] focus-visible:border-[#6366f1] h-12 rounded-xl px-4 transition-all hover:bg-[#0b1326]/80" />
              </div>
              <div className="space-y-3">
                <Label className="text-[#908fa0] uppercase tracking-wider text-[11px] font-bold">Email</Label>
                <Input defaultValue="alex@example.com" type="email" className="bg-[#0b1326]/50 backdrop-blur-sm border-[#2d3449]/50 text-white focus-visible:ring-[#6366f1] focus-visible:border-[#6366f1] h-12 rounded-xl px-4 transition-all hover:bg-[#0b1326]/80" />
              </div>
              <div className="space-y-3">
                <Label className="text-[#908fa0] uppercase tracking-wider text-[11px] font-bold">Phone</Label>
                <Input defaultValue="+1 (555) 123-4567" className="bg-[#0b1326]/50 backdrop-blur-sm border-[#2d3449]/50 text-white focus-visible:ring-[#6366f1] focus-visible:border-[#6366f1] h-12 rounded-xl px-4 transition-all hover:bg-[#0b1326]/80" />
              </div>
              <div className="space-y-3">
                <Label className="text-[#908fa0] uppercase tracking-wider text-[11px] font-bold">Location</Label>
                <Input defaultValue="San Francisco, CA" className="bg-[#0b1326]/50 backdrop-blur-sm border-[#2d3449]/50 text-white focus-visible:ring-[#6366f1] focus-visible:border-[#6366f1] h-12 rounded-xl px-4 transition-all hover:bg-[#0b1326]/80" />
              </div>
              <div className="space-y-3">
                <Label className="text-[#908fa0] uppercase tracking-wider text-[11px] font-bold">Portfolio URL</Label>
                <Input defaultValue="https://alexj.dev" className="bg-[#0b1326]/50 backdrop-blur-sm border-[#2d3449]/50 text-white focus-visible:ring-[#6366f1] focus-visible:border-[#6366f1] h-12 rounded-xl px-4 transition-all hover:bg-[#0b1326]/80" />
              </div>
              <div className="space-y-3">
                <Label className="text-[#908fa0] uppercase tracking-wider text-[11px] font-bold">LinkedIn URL</Label>
                <Input defaultValue="https://linkedin.com/in/alexjohnson" className="bg-[#0b1326]/50 backdrop-blur-sm border-[#2d3449]/50 text-white focus-visible:ring-[#6366f1] focus-visible:border-[#6366f1] h-12 rounded-xl px-4 transition-all hover:bg-[#0b1326]/80" />
              </div>
              <div className="space-y-3">
                <Label className="text-[#908fa0] uppercase tracking-wider text-[11px] font-bold">GitHub URL</Label>
                <Input defaultValue="https://github.com/alexj" className="bg-[#0b1326]/50 backdrop-blur-sm border-[#2d3449]/50 text-white focus-visible:ring-[#6366f1] focus-visible:border-[#6366f1] h-12 rounded-xl px-4 transition-all hover:bg-[#0b1326]/80" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Preferences */}
        <Card className="bg-[#131b2e]/60 backdrop-blur-xl border border-[#2d3449]/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#6366f1] to-transparent opacity-50"></div>
          <CardHeader><CardTitle className="text-white text-2xl font-bold">Job Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-[#908fa0] uppercase tracking-wider text-[11px] font-bold">Target Roles</Label>
                <Input defaultValue="Frontend Developer, UI Engineer" className="bg-[#0b1326]/50 backdrop-blur-sm border-[#2d3449]/50 text-white focus-visible:ring-[#6366f1] focus-visible:border-[#6366f1] h-12 rounded-xl px-4 transition-all hover:bg-[#0b1326]/80" />
              </div>
              <div className="space-y-3">
                <Label className="text-[#908fa0] uppercase tracking-wider text-[11px] font-bold">Preferred Locations</Label>
                <Input defaultValue="San Francisco, Remote" className="bg-[#0b1326]/50 backdrop-blur-sm border-[#2d3449]/50 text-white focus-visible:ring-[#6366f1] focus-visible:border-[#6366f1] h-12 rounded-xl px-4 transition-all hover:bg-[#0b1326]/80" />
              </div>
              <div className="space-y-3">
                <Label className="text-[#908fa0] uppercase tracking-wider text-[11px] font-bold">Work Authorization</Label>
                <Input defaultValue="US Citizen" className="bg-[#0b1326]/50 backdrop-blur-sm border-[#2d3449]/50 text-white focus-visible:ring-[#6366f1] focus-visible:border-[#6366f1] h-12 rounded-xl px-4 transition-all hover:bg-[#0b1326]/80" />
              </div>
              <div className="space-y-3">
                <Label className="text-[#908fa0] uppercase tracking-wider text-[11px] font-bold">Availability</Label>
                <Input defaultValue="2 weeks notice" className="bg-[#0b1326]/50 backdrop-blur-sm border-[#2d3449]/50 text-white focus-visible:ring-[#6366f1] focus-visible:border-[#6366f1] h-12 rounded-xl px-4 transition-all hover:bg-[#0b1326]/80" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="bg-[#131b2e]/60 backdrop-blur-xl border border-[#2d3449]/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-2xl relative overflow-hidden">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
            <CardTitle className="text-white text-2xl font-bold">Skills</CardTitle>
            <div className="flex items-center gap-2">
              <Input 
                placeholder="e.g. Next.js" 
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddSkill(); }}
                className="bg-[#0b1326]/80 backdrop-blur-sm border-[#2d3449] text-white focus-visible:ring-[#6366f1] focus-visible:border-[#6366f1] h-10 w-full sm:w-48 rounded-lg px-3 transition-all"
              />
              <Button onClick={handleAddSkill} variant="outline" size="sm" className="bg-[#171f33]/80 border-[#2d3449] text-white hover:bg-[#222a3d] hover:text-[#dae2fd] rounded-lg h-10 px-4 font-semibold shadow-sm transition-all hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] shrink-0">
                <Plus className="w-4 h-4 mr-2" /> Add Skill
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {skills.map((s) => (
                <div key={s} className="inline-flex items-center gap-2 bg-[#0b1326]/80 border border-[#2d3449]/80 text-[#dae2fd] hover:bg-[#171f33] hover:border-[#6366f1]/50 transition-all rounded-xl shadow-sm cursor-default hover:-translate-y-0.5 group px-4 py-2 h-10">
                  <CheckCircle2 className="w-4 h-4 text-[#4cd7f6] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="font-medium text-sm whitespace-nowrap leading-none mt-0.5">{s}</span>
                  <button onClick={() => handleRemoveSkill(s)} className="text-[#464554] hover:text-[#ffb4ab] ml-1 transition-colors p-1 rounded-md hover:bg-[#93000a]/20 shrink-0 flex items-center justify-center h-6 w-6">
                    <span className="sr-only">Remove {s}</span>
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
