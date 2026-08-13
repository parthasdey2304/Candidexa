"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useState } from "react";
import { UploadCloud, FileText } from "lucide-react";

export default function Onboarding() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
        </div>

        <Card>
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Tell us about your next role</CardTitle>
                <CardDescription>We'll use this to personalize your job matches.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="targetRole">Target Role</Label>
                  <Input id="targetRole" placeholder="e.g. Frontend Developer, Product Manager" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (5-10 years)</SelectItem>
                      <SelectItem value="director">Director / Executive (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-6 mt-6">
                <Button onClick={() => setStep(2)}>Continue</Button>
              </CardFooter>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Work preferences</CardTitle>
                <CardDescription>Where and how do you want to work?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Preferred Location</Label>
                  <Input id="location" placeholder="e.g. San Francisco, CA or Remote" />
                </div>
                <div className="space-y-4">
                  <Label>Work Environment</Label>
                  <RadioGroup defaultValue="hybrid">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="remote" id="remote" />
                      <Label htmlFor="remote" className="font-normal">Remote (100%)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hybrid" id="hybrid" />
                      <Label htmlFor="hybrid" className="font-normal">Hybrid (Some days in office)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="onsite" id="onsite" />
                      <Label htmlFor="onsite" className="font-normal">On-site (Full time in office)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6 mt-6">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)}>Continue</Button>
              </CardFooter>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Your Master Resume</CardTitle>
                <CardDescription>Start from an existing resume or build from scratch.</CardDescription>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors group">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Upload Resume</h3>
                  <p className="text-xs text-muted-foreground">PDF or DOCX (Max 5MB)</p>
                </div>
                
                <div className="border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors group">
                  <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Start from Scratch</h3>
                  <p className="text-xs text-muted-foreground">Build it in our editor</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6 mt-6">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Link href="/dashboard">
                  <Button>Complete Setup</Button>
                </Link>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
