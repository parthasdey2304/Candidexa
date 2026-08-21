import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CheckCircle2, Shield, Zap, Target, Search, MapPin, Code, Megaphone, PenTool, BarChart, Building2, Briefcase, ArrowRight, Check, Star, X, Sparkles, FileText, Brain, Code2, Rocket, Video, Globe, Kanban, BookOpen } from "lucide-react";
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

const features = [
  { name: 'AI Resume Generator', description: 'ATS-optimized resumes with AI-powered rewriting', icon: FileText, badge: 'Free' },
  { name: 'Job Aggregator', description: '35-40 companies across LinkedIn, Naukri, and more', icon: Briefcase, badge: 'Free' },
  { name: 'JD Analyzer', description: 'Match your resume against any job description', icon: Search, badge: 'Free' },
  { name: 'Application Tracker', description: 'Kanban board with drag-and-drop pipeline', icon: Kanban, badge: 'Free' },
  { name: 'AI Project Generator', description: 'Generate projects to fill skill gaps', icon: Code2, badge: 'Paid' },
  { name: 'Mock Interview Engine', description: 'Text & voice mode with AI feedback', icon: Brain, badge: 'Paid' },
  { name: 'Resume Tailoring Engine', description: 'Tailor for 500 companies automatically', icon: Zap, badge: 'Paid' },
  { name: 'Code Generator + GitHub', description: 'AI writes code and pushes to GitHub', icon: Code2, badge: 'Paid' },
  { name: 'Live Deployment', description: 'Auto-deploy to Vercel, Railway, Render', icon: Rocket, badge: 'Paid' },
  { name: 'AI Video Demos', description: 'Seedance + Kling video walkthroughs', icon: Video, badge: 'Paid' },
  { name: 'Portfolio Generator', description: 'Responsive portfolio with video demos', icon: Globe, badge: 'Paid' },
  { name: 'Skill Gap Analyzer', description: 'Personalized learning roadmaps', icon: BookOpen, badge: 'Paid' },
];

const steps = [
  { icon: UploadIcon, title: 'Upload', description: 'Upload your resume or fill a form' },
  { icon: Target, title: 'Tailor', description: 'AI tailors for 500 companies' },
  { icon: Rocket, title: 'Generate', description: 'AI generates projects & code' },
  { icon: Globe, title: 'Deploy', description: 'Live demos on Vercel/Railway' },
  { icon: Video, title: 'Video', description: 'AI video walkthroughs for portfolio' },
  { icon: Briefcase, title: 'Apply', description: 'Apply with tailored resumes' },
  { icon: Brain, title: 'Interview', description: 'Practice with AI mock interviews' },
];

const competitors = [
  { name: 'Candidexa', resume: true, ats: true, jobBoard: true, portfolio: true, mockInterview: true, tracker: true, roadmap: true, projectGen: true, tailoring: true, codeGen: true, deployment: true, videoDemos: true },
  { name: 'Rezi', resume: true, ats: true, jobBoard: false, portfolio: false, mockInterview: false, tracker: false, roadmap: false, projectGen: false, tailoring: false, codeGen: false, deployment: false, videoDemos: false },
  { name: 'Wobo', resume: true, ats: true, jobBoard: false, portfolio: false, mockInterview: false, tracker: false, roadmap: false, projectGen: false, tailoring: false, codeGen: false, deployment: false, videoDemos: false },
  { name: 'Jobscan', resume: true, ats: true, jobBoard: false, portfolio: false, mockInterview: false, tracker: false, roadmap: false, projectGen: false, tailoring: false, codeGen: false, deployment: false, videoDemos: false },
  { name: 'Portfily', resume: true, ats: true, jobBoard: false, portfolio: true, mockInterview: false, tracker: false, roadmap: false, projectGen: false, tailoring: false, codeGen: false, deployment: false, videoDemos: false },
  { name: 'Seera', resume: false, ats: false, jobBoard: false, portfolio: true, mockInterview: false, tracker: false, roadmap: false, projectGen: false, tailoring: false, codeGen: false, deployment: false, videoDemos: false },
  { name: 'Seekario', resume: true, ats: true, jobBoard: false, portfolio: false, mockInterview: false, tracker: true, roadmap: false, projectGen: false, tailoring: false, codeGen: false, deployment: false, videoDemos: false },
];

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  );
}

export default function Home() {
  return (
    <MarketingLayout>
      {/* Hero Section with Three.js Banner */}
      <section className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center overflow-hidden py-24 sm:py-32 bg-muted/30">
        <ThreeHero />
        
        <Container className="text-center relative z-10">
          <GsapReveal direction="up" delay={0.2}>
            <Badge variant="outline" className="mb-6 px-6 py-2 text-sm bg-background/80 backdrop-blur-sm border-primary/20 text-primary">
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
            <form action="/jobs" className="mt-10 max-w-3xl mx-auto bg-card/80 backdrop-blur-xl rounded-2xl shadow-xl border border-border p-2 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
                <Input 
                  name="q"
                  placeholder="Job title, keywords, or company" 
                  className="pl-12 bg-transparent border-0 focus-visible:ring-0 shadow-none h-12 text-base text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="hidden sm:block w-px bg-border/50 my-2"></div>
              <div className="relative flex-1 flex items-center border-t border-border/50 sm:border-0 pt-2 sm:pt-0">
                <MapPin className="absolute left-4 w-5 h-5 text-muted-foreground" />
                <Input 
                  name="location"
                  placeholder="City, state, or 'Remote'" 
                  className="pl-12 bg-transparent border-0 focus-visible:ring-0 shadow-none h-12 text-base text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8 w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                Find Jobs
              </Button>
            </form>
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

      {/* Problem Statement - from Nemotron */}
      <section className="py-20 bg-background border-y border-border">
        <Container>
          <GsapReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">The Problem We Solve</h2>
              <p className="text-lg text-muted-foreground">Job seekers face a broken system. Here is what Candidexa fixes.</p>
            </div>
          </GsapReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: '75%+', label: 'Resumes Rejected by ATS', description: 'Before a human ever sees them' },
              { stat: '42%', label: 'Duplicate Applications', description: 'Across multiple platforms' },
              { stat: '0%', label: 'Keyword Feedback', description: 'Candidates do not know why they fail' },
              { stat: '10x', label: 'More Engagement', description: 'With video demos vs static screenshots' },
            ].map((item, idx) => (
              <GsapReveal key={item.label} direction="up" delay={idx * 0.1}>
                <Card className="p-6 h-full">
                  <div className="text-4xl font-bold text-primary mb-2">{item.stat}</div>
                  <div className="font-semibold text-foreground mb-1">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </Card>
              </GsapReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 12 AI-Powered Features */}
      <section id="features" className="py-20 bg-muted/30">
        <Container>
          <GsapReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">12 AI-Powered Features</h2>
              <p className="text-lg text-muted-foreground">Everything you need to go from resume to offer letter.</p>
            </div>
          </GsapReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <GsapReveal key={feature.name} direction="up" delay={idx * 0.05}>
                <Card className="group p-6 h-full hover:shadow-lg hover:border-primary/30 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="rounded-xl bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      feature.badge === 'Free' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    }`}>
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.name}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </GsapReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works - AI Career Loop */}
      <section id="how-it-works" className="py-20 bg-background border-y border-border">
        <Container>
          <GsapReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">The AI Career Loop</h2>
              <p className="text-lg text-muted-foreground">Upload to offer letter in one continuous AI-powered pipeline.</p>
            </div>
          </GsapReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {steps.map((step, i) => (
              <GsapReveal key={step.title} direction="up" delay={i * 0.07}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="rounded-2xl bg-primary p-4 text-primary-foreground shadow-lg shadow-primary/20">
                      <step.icon className="h-8 w-8" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background text-xs font-bold">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                </div>
              </GsapReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Candidexa Wins - Comparison Table */}
      <section className="py-20 bg-muted/30">
        <Container>
          <GsapReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why Candidexa Wins</h2>
              <p className="text-lg text-muted-foreground">The only platform with all 12 AI features in one place.</p>
            </div>
          </GsapReveal>
          <GsapReveal direction="up" delay={0.2}>
            <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Feature</th>
                    {competitors.map(c => (
                      <th key={c.name} className={`px-4 py-4 text-center font-semibold ${c.name === 'Candidexa' ? 'text-primary bg-primary/5' : 'text-foreground'}`}>
                        {c.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key: 'resume', label: 'AI Resume' },
                    { key: 'ats', label: 'ATS Score' },
                    { key: 'jobBoard', label: 'Job Board' },
                    { key: 'portfolio', label: 'AI Portfolio' },
                    { key: 'mockInterview', label: 'Mock Interview' },
                    { key: 'tracker', label: 'App Tracker' },
                    { key: 'roadmap', label: 'Skill Roadmap' },
                    { key: 'projectGen', label: 'Project Gen' },
                    { key: 'tailoring', label: '500-Company Tailoring' },
                    { key: 'codeGen', label: 'Code Generator' },
                    { key: 'deployment', label: 'Live Deployment' },
                    { key: 'videoDemos', label: 'AI Video Demos' },
                  ].map(({ key, label }) => (
                    <tr key={key} className="border-b last:border-0 hover:bg-muted/20">
                      <td className="px-6 py-3 font-medium text-foreground">{label}</td>
                      {competitors.map(c => (
                        <td key={c.name} className={`px-4 py-3 text-center ${c.name === 'Candidexa' ? 'bg-primary/5' : ''}`}>
                          {c[key as keyof typeof c] ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GsapReveal>
        </Container>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-background border-y border-border">
        <Container>
          <GsapReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Simple Pricing</h2>
              <p className="text-lg text-muted-foreground">Start free. Upgrade when you need more AI power.</p>
            </div>
          </GsapReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <GsapReveal direction="up" delay={0.1}>
              <Card className="p-8 h-full flex flex-col">
                <div className="text-sm font-medium text-muted-foreground mb-2">Free Tier</div>
                <div className="text-4xl font-bold text-foreground mb-1">₹0</div>
                <div className="text-sm text-muted-foreground mb-6">Forever free</div>
                <ul className="space-y-3 mb-8 flex-1">
                  {['AI Resume Generator (1 resume)', 'Job Aggregator Board', 'Application Tracker (20 apps)', 'JD Analyzer (3/month)', '10K AI tokens/day'].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                      <Check className="h-4 w-4 text-green-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="block w-full">
                  <Button variant="outline" className="w-full rounded-full">Get Started Free</Button>
                </Link>
              </Card>
            </GsapReveal>
            <GsapReveal direction="up" delay={0.2}>
              <Card className="relative p-8 h-full flex flex-col border-primary shadow-lg shadow-primary/10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">Most Popular</div>
                <div className="text-sm font-medium text-primary mb-2">Paid Tier</div>
                <div className="text-4xl font-bold text-foreground mb-1">₹299-499<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                <div className="text-sm text-muted-foreground mb-6">Everything in Free +</div>
                <ul className="space-y-3 mb-8 flex-1">
                  {['Unlimited AI resumes + all templates', 'Resume Tailoring for 500 companies', 'AI Project & Code Generator', 'AI Video Demos (20/month)', 'Portfolio Generator + hosting', 'Mock Interview Engine (voice mode)', '500K AI tokens/day', '2FA Security'].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register?plan=paid" className="block w-full">
                  <Button className="w-full rounded-full shadow-lg">Upgrade to Pro</Button>
                </Link>
              </Card>
            </GsapReveal>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <Container>
          <GsapReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">What Users Say</h2>
            </div>
          </GsapReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Priya Sharma', role: 'SDE-1 at Flipkart', quote: 'Candidexa tailored my resume for 200 companies in minutes. I got 5 interview calls in the first week.' },
              { name: 'Arjun Patel', role: 'Backend Developer', quote: 'The AI mock interview feature was a game-changer. I practiced for 2 weeks and aced my Google interview.' },
              { name: 'Sneha Reddy', role: 'Full Stack Developer', quote: 'The portfolio generator with video demos blew my recruiters away. Every project had a live demo link.' },
            ].map((t, idx) => (
              <GsapReveal key={t.name} direction="up" delay={idx * 0.1}>
                <Card className="p-6 h-full">
                  <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-foreground mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <div className="font-semibold text-foreground">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </Card>
              </GsapReveal>
            ))}
          </div>
        </Container>
      </section>
    </MarketingLayout>
  );
}
