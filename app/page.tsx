import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CheckCircle2, Shield, Zap, Target, Search, MapPin, Code, Megaphone, PenTool, BarChart, Building2, Briefcase } from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";

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
      <section className="relative overflow-hidden py-24 sm:py-32 bg-muted/30">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        
        <Container className="text-center">
          <Badge variant="outline" className="mb-6 px-10 py-6 text-sm bg-background border-primary/20 text-primary">
            Trusted by 50,000+ candidates globally
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-foreground max-w-4xl mx-auto">
            Find your next career <span className="text-primary">milestone.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            The intelligent career workspace. Search top jobs, analyze your fit, and generate AI-tailored applications instantly.
          </p>
          
          {/* Search Bar */}
          <div className="mt-10 max-w-3xl mx-auto bg-card rounded-2xl shadow-xl border p-2 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Job title, keywords, or company" 
                className="pl-12 border-0 focus-visible:ring-0 shadow-none h-12 text-base"
              />
            </div>
            <div className="hidden sm:block w-px bg-border my-2"></div>
            <div className="relative flex-1 flex items-center border-t sm:border-0 pt-2 sm:pt-0">
              <MapPin className="absolute left-4 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="City, state, or 'Remote'" 
                className="pl-12 border-0 focus-visible:ring-0 shadow-none h-12 text-base"
              />
            </div>
            <Button size="lg" className="h-12 px-8 w-full sm:w-auto">
              Find Jobs
            </Button>
          </div>
          
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>Popular:</span>
            <Link href="#" className="hover:text-primary transition-colors">Frontend Developer</Link>
            <Link href="#" className="hover:text-primary transition-colors">Product Designer</Link>
            <Link href="#" className="hover:text-primary transition-colors">Data Analyst</Link>
          </div>
        </Container>
      </section>

      {/* Trending Categories */}
      <section className="py-20 border-b">
        <Container>
          <h2 className="text-2xl font-bold mb-8">Trending Categories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCategories.map((category) => (
              <Link key={category.name} href="#">
                <Card className="hover:border-primary/50 transition-colors group cursor-pointer">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <category.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Recommended Jobs Feed */}
      <section className="py-20 bg-muted/30">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Recommended for you</h2>
            <Link href="/jobs" className="text-primary hover:underline text-sm font-medium">View all jobs →</Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {topCompanies.map((job) => (
              <Card key={job.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
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
                    <Badge variant="secondary" className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                      {job.match} Match
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Badge variant="outline">Full-time</Badge>
                    <Badge variant="outline">Remote</Badge>
                    <Badge variant="outline">Senior</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Candidate Workspace Showcase */}
      <section className="py-24 border-y">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
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
            
            {/* Workspace Mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl -z-10 rounded-full"></div>
              <div className="bg-card rounded-2xl shadow-2xl border overflow-hidden">
                <div className="p-4 border-b flex gap-2 items-center bg-muted/50">
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
                      <h3 className="font-bold text-lg">Senior Frontend Engineer</h3>
                      <p className="text-sm text-muted-foreground">TechFlow Inc.</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-extrabold text-green-500">92%</span>
                      <p className="text-xs text-muted-foreground">Match Score</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-green-500/10 text-green-700 dark:text-green-400 p-3 rounded-lg border border-green-500/20">
                      <span className="font-medium text-sm">React & Next.js Experience</span>
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="flex justify-between items-center bg-green-500/10 text-green-700 dark:text-green-400 p-3 rounded-lg border border-green-500/20">
                      <span className="font-medium text-sm">TypeScript Proficiency</span>
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="flex justify-between items-center bg-amber-500/10 text-amber-700 dark:text-amber-400 p-3 rounded-lg border border-amber-500/20">
                      <span className="font-medium text-sm">GraphQL Knowledge</span>
                      <span className="text-xs font-semibold px-2 py-1 bg-background rounded-full">Missing</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6" variant="secondary">Generate Tailored Resume</Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <Container>
          <h2 className="text-3xl font-bold mb-6">Ready to land your dream job?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are using AI to build truthful, highly-targeted applications.
          </p>
          <Link href="/sign-up">
            <Button size="lg" variant="secondary" className="h-12 px-8 font-semibold">
              Create your free account
            </Button>
          </Link>
        </Container>
      </section>
    </MarketingLayout>
  );
}
