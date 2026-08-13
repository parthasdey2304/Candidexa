import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CheckCircle2, Shield, Zap, Target, Search, MapPin, Code, Megaphone, PenTool, BarChart, Building2, Briefcase } from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { ThreeHero } from "@/components/ui/three-hero";
import { Card3D } from "@/components/ui/3d-card";
import { GsapReveal } from "@/components/animations/gsap-reveal";

import { ScrollIndicator } from "@/components/ui/scroll-indicator";

const trendingCategories = [
  { name: "Software Engineering", icon: Code, count: "12,400+ jobs" },
  { name: "Marketing & PR", icon: Megaphone, count: "8,200+ jobs" },
  { name: "Design & UX", icon: PenTool, count: "5,100+ jobs" },
  { name: "Data & Analytics", icon: BarChart, count: "9,300+ jobs" },
];

const topCompanies = [
  { name: "TechFlow", role: "Software Engineer", location: "San Francisco, CA", match: "98%" },
  { name: "BlueCloud", role: "Product Manager", location: "Remote", match: "92%" },
  { name: "FinEdge", role: "UX Designer", location: "New York, NY", match: "89%" },
  { name: "GlobalRetail", role: "Data Scientist", location: "London, UK", match: "85%" },
];

export default function Home() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center overflow-hidden py-24 sm:py-32 bg-muted/30">
        <ThreeHero />
        
        <Container className="text-center relative z-10">
          <GsapReveal direction="up" delay={0.2}>
            <Badge variant="outline" className="mb-6 px-10 py-6 text-sm bg-background/80 backdrop-blur-sm border-primary/20 text-primary">
              Trusted by 50,000+ candidates globally
            </Badge>
          </GsapReveal>
          
          <GsapReveal direction="up" delay={0.4}>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-foreground max-w-4xl mx-auto drop-shadow-lg">
              Find your next career <span className="text-primary">milestone.</span>
            </h1>
          </GsapReveal>
          
          <GsapReveal direction="up" delay={0.6}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground drop-shadow">
              The intelligent career workspace. Search top jobs, analyze your fit, and generate AI-tailored applications instantly.
            </p>
          </GsapReveal>
          
          {/* Search Bar */}
          <GsapReveal direction="up" delay={0.8}>
            <div className="mt-10 max-w-3xl mx-auto bg-card/80 backdrop-blur-xl rounded-2xl shadow-xl border border-border p-2 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Job title, keywords, or company" 
                  className="pl-12 bg-transparent border-0 focus-visible:ring-0 shadow-none h-12 text-base text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="hidden sm:block w-px bg-border/50 my-2"></div>
              <div className="relative flex-1 flex items-center border-t border-border/50 sm:border-0 pt-2 sm:pt-0">
                <MapPin className="absolute left-4 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="City, state, or 'Remote'" 
                  className="pl-12 bg-transparent border-0 focus-visible:ring-0 shadow-none h-12 text-base text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button size="lg" className="h-12 px-8 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                Find Jobs
              </Button>
            </div>
          </GsapReveal>
          
          <GsapReveal direction="up" delay={1.0}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span>Popular:</span>
              <Link href="#" className="hover:text-primary transition-colors drop-shadow">Frontend Developer</Link>
              <Link href="#" className="hover:text-primary transition-colors drop-shadow">Product Designer</Link>
              <Link href="#" className="hover:text-primary transition-colors drop-shadow">Data Analyst</Link>
            </div>
          </GsapReveal>
        </Container>
        
        <ScrollIndicator />
      </section>

      {/* Trending Categories */}
      <section className="py-20 border-b border-border relative z-10 bg-background">
        <Container>
          <GsapReveal direction="up">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Trending Categories</h2>
          </GsapReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCategories.map((category, index) => (
              <GsapReveal key={category.name} direction="up" delay={index * 0.1}>
                <Link href="#">
                  <Card3D className="group cursor-pointer !p-0">
                    <div className="p-6 flex items-center gap-4">
                      <div className="p-3 bg-primary/20 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-[0_0_10px_rgba(99,102,241,0.3)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]">
                        <category.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.count}</p>
                      </div>
                    </div>
                  </Card3D>
                </Link>
              </GsapReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Recommended Jobs Feed */}
      <section className="py-20 bg-muted/30 relative z-10">
        <Container>
          <GsapReveal direction="up">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">Recommended for you</h2>
              <Link href="/jobs" className="text-primary hover:underline text-sm font-medium">View all jobs →</Link>
            </div>
          </GsapReveal>
          
          <div className="grid md:grid-cols-2 gap-6">
            {topCompanies.map((job, index) => (
              <GsapReveal key={job.name} direction="up" delay={index * 0.1}>
                <Card3D className="!p-0">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">{job.role}</h3>
                          <p className="text-sm text-muted-foreground">{job.name} • {job.location}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-tertiary/20 text-tertiary hover:bg-tertiary/30 border-tertiary/20">
                        {job.match} Match
                      </Badge>
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                      <Badge variant="outline" className="border-border">Full-time</Badge>
                      <Badge variant="outline" className="border-border">Remote</Badge>
                      <Badge variant="outline" className="border-border">Senior</Badge>
                    </div>
                  </div>
                </Card3D>
              </GsapReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Candidate Workspace Showcase */}
      <section className="py-24 border-y border-border relative z-10 bg-background">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <GsapReveal direction="left">
              <div>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4 border-0">The Candidexa Workspace</Badge>
                <h2 className="text-3xl font-bold mb-6 text-foreground">Stop guessing. Start matching.</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Don't just send the same resume to every employer. Candidexa analyzes your profile against the job description and instantly highlights skill gaps.
                </p>
                
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Instant Match Analysis</h4>
                      <p className="text-muted-foreground text-sm mt-1">See exactly how well you fit a role before you apply.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">AI Resume Tailoring</h4>
                      <p className="text-muted-foreground text-sm mt-1">Truthfully adapt your resume to highlight the exact skills the employer is looking for.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Track Everything</h4>
                      <p className="text-muted-foreground text-sm mt-1">Manage all your tailored applications and cover letters in one organized dashboard.</p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-10">
                  <Link href="/sign-up">
                    <Button size="lg" className="h-12 px-8">Upload Your Resume</Button>
                  </Link>
                </div>
              </div>
            </GsapReveal>
            
            {/* Workspace Mockup */}
            <GsapReveal direction="right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent blur-3xl -z-10 rounded-full"></div>
                <Card3D className="!p-0 border border-border bg-card/60 backdrop-blur-2xl overflow-hidden shadow-2xl">
                  <div className="p-4 border-b border-border flex gap-2 items-center bg-muted/50">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-xs text-muted-foreground font-medium ml-4">Match Analysis</div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="font-bold text-lg text-foreground">Senior Frontend Engineer</h3>
                        <p className="text-sm text-muted-foreground">TechFlow Inc.</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-extrabold text-tertiary drop-shadow-[0_0_10px_rgba(76,215,246,0.5)]">92%</span>
                        <p className="text-xs text-muted-foreground">Match Score</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center bg-tertiary/10 text-tertiary p-3 rounded-lg border border-tertiary/20">
                        <span className="font-medium text-sm">React & Next.js Experience</span>
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="flex justify-between items-center bg-tertiary/10 text-tertiary p-3 rounded-lg border border-tertiary/20">
                        <span className="font-medium text-sm">TypeScript Proficiency</span>
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="flex justify-between items-center bg-chart-3/10 text-chart-3 p-3 rounded-lg border border-chart-3/20">
                        <span className="font-medium text-sm">GraphQL Knowledge</span>
                        <span className="text-xs font-semibold px-2 py-1 bg-background/50 rounded-full">Missing</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-6" variant="secondary">Generate Tailored Resume</Button>
                  </div>
                </Card3D>
              </div>
            </GsapReveal>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card border-t border-border text-center relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"></div>
        <Container className="relative z-10">
          <GsapReveal direction="up">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to land your dream job?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are using AI to build truthful, highly-targeted applications.
            </p>
            <Link href="/sign-up">
              <Button size="lg" className="h-12 px-8 font-semibold">
                Create your free account
              </Button>
            </Link>
          </GsapReveal>
        </Container>
      </section>
    </MarketingLayout>
  );
}
