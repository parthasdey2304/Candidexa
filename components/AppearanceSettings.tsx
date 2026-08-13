"use client";

import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  return (
      <Card id="appearance" className="bg-[#131b2e] border-[#2d3449] shadow-none">
      <CardHeader>
        <CardTitle className="text-white text-xl">Appearance</CardTitle>
        <CardDescription className="text-[#908fa0]">Customize the look and feel of Candidexa.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Label className="text-[#908fa0] uppercase tracking-wider text-xs font-semibold">Theme Preference</Label>
          <Select value={theme} onValueChange={(val) => { if (val) setTheme(val); }}>
            <SelectTrigger className="w-full sm:w-64 bg-[#0b1326] border-[#2d3449] text-white focus:ring-[#6366f1] h-11">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent className="bg-[#131b2e] border-[#2d3449] text-white">
              <SelectItem value="light" className="focus:bg-[#171f33] focus:text-white">Light</SelectItem>
              <SelectItem value="dark" className="focus:bg-[#171f33] focus:text-white">Dark</SelectItem>
              <SelectItem value="system" className="focus:bg-[#171f33] focus:text-white">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
