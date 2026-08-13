import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Sparkles, ArrowRight, UploadCloud, Search, Send } from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { GsapReveal } from "@/components/animations/gsap-reveal";

export default function Home() {
  return (
    <MarketingLayout>
      <main className="pt-10">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 px-4 md:px-8 max-w-[1440px] mx-auto overflow-hidden">
          {/* Hero Pattern */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              opacity: 0.4
            }}
          />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 flex flex-col gap-8">
              <GsapReveal direction="up" delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight text-balance">
                  Apply with a resume built for the role.
                </h1>
              </GsapReveal>
              
              <GsapReveal direction="up" delay={0.3}>
                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  Candidexa compares your verified experience with each job description and helps you create a stronger, truthful application.
                </p>
              </GsapReveal>
              
              <GsapReveal direction="up" delay={0.5}>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <Link href="/sign-up">
                    <Button size="lg" className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/20">
                      Create my application
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-sm font-semibold bg-background hover:bg-muted/50">
                      See how it works
                    </Button>
                  </Link>
                </div>
              </GsapReveal>
            </div>

            {/* Product Preview Bento */}
            <div className="lg:col-span-7 mt-12 lg:mt-0 relative">
              <GsapReveal direction="left" delay={0.4}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-2xl border border-border relative z-10 shadow-xl">
                  
                  {/* Score Card */}
                  <div className="bg-card rounded-xl p-6 border border-border flex flex-col items-center justify-center gap-4">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle className="text-muted/50" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeWidth="8"></circle>
                        <circle className="text-emerald-500" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeDasharray="282.7" strokeDashoffset="62.2" strokeLinecap="round" strokeWidth="8"></circle>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-emerald-600">78%</span>
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Match</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-foreground">Senior UX Designer</h3>
                      <p className="text-sm text-muted-foreground">Acme Corp</p>
                    </div>
                  </div>

                  {/* Skills Card */}
                  <div className="bg-card rounded-xl p-6 border border-border flex flex-col gap-4">
                    <h4 className="text-sm font-medium text-muted-foreground">Matched Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-secondary text-foreground text-xs font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Figma
                      </span>
                      <span className="px-3 py-1 rounded-full bg-secondary text-foreground text-xs font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Prototyping
                      </span>
                      <span className="px-3 py-1 rounded-full bg-secondary text-foreground text-xs font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> User Research
                      </span>
                    </div>

                    <h4 className="text-sm font-medium text-muted-foreground mt-2">Missing Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> React
                      </span>
                      <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> CSS
                      </span>
                    </div>
                  </div>

                  {/* Resume Preview */}
                  <div className="md:col-span-2 bg-emerald-500/5 rounded-xl p-6 border border-emerald-500/20 border-l-4 border-l-emerald-500">
                    <div className="flex items-start gap-4">
                      <Sparkles className="text-emerald-600 mt-1 shrink-0" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">AI Suggestion</h4>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          Highlight your experience leading cross-functional workshops to address the requirement for "strong stakeholder management".
                        </p>
                        <button className="mt-3 text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
                          Apply suggestion <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </GsapReveal>
            </div>
          </div>
        </section>

        {/* 3-Step Guide */}
        <section className="py-24 px-4 md:px-8 bg-muted/30 border-t border-border" id="how-it-works">
          <div className="max-w-[1440px] mx-auto">
            <GsapReveal direction="up">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How it works</h2>
                <p className="text-lg text-muted-foreground">A streamlined process to ensure your application stands out for all the right reasons.</p>
              </div>
            </GsapReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px] bg-border z-0"></div>
              
              {/* Step 1 */}
              <GsapReveal direction="up" delay={0.2}>
                <div className="relative z-10 flex flex-col items-center text-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-card border-4 border-muted/50 flex items-center justify-center shadow-sm">
                    <UploadCloud className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">1. Upload Resume</h3>
                  <p className="text-sm text-muted-foreground max-w-[280px] leading-relaxed">
                    Provide your baseline experience. We'll parse it and verify your core competencies.
                  </p>
                </div>
              </GsapReveal>

              {/* Step 2 */}
              <GsapReveal direction="up" delay={0.4}>
                <div className="relative z-10 flex flex-col items-center text-center gap-4 mt-12 md:mt-0">
                  <div className="w-24 h-24 rounded-full bg-card border-4 border-muted/50 flex items-center justify-center shadow-sm">
                    <Search className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">2. Match a Job</h3>
                  <p className="text-sm text-muted-foreground max-w-[280px] leading-relaxed">
                    Paste a job description. We analyze the requirements against your profile to find gaps.
                  </p>
                </div>
              </GsapReveal>

              {/* Step 3 */}
              <GsapReveal direction="up" delay={0.6}>
                <div className="relative z-10 flex flex-col items-center text-center gap-4 mt-12 md:mt-0">
                  <div className="w-24 h-24 rounded-full bg-card border-4 border-muted/50 flex items-center justify-center shadow-sm">
                    <Send className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">3. Apply Confidently</h3>
                  <p className="text-sm text-muted-foreground max-w-[280px] leading-relaxed">
                    Export a tailored resume formatted for modern ATS systems and hit submit.
                  </p>
                </div>
              </GsapReveal>
            </div>
          </div>
        </section>
      </main>
    </MarketingLayout>
  );
}
