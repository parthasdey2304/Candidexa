import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle2, Shield, Zap, Target } from "lucide-react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";

export default function Home() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="py-24 text-center">
        <Container>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
            Apply with a resume <br className="hidden sm:inline" />
            <span className="text-primary">built for the role.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Candidexa is an AI-powered job-application workspace. We compare your verified resume with a job description, provide a transparent fit analysis, and create a truthful tailored application.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="h-12 px-8">
                Create my application
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="h-12 px-8">
                See how it works
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Product Preview Mockup */}
      <section className="py-12 bg-muted/50 border-y">
        <Container>
          <div className="mx-auto max-w-4xl bg-card rounded-2xl shadow-xl border overflow-hidden">
            <div className="p-4 border-b flex gap-2 items-center bg-muted/30">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-xs text-muted-foreground font-medium ml-4">Candidexa Workspace</div>
            </div>
            <div className="p-8 grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Match Analysis</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-green-50 text-green-700 p-3 rounded-lg border border-green-200">
                    <span className="font-medium">React Experience</span>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="flex justify-between items-center bg-blue-50 text-blue-700 p-3 rounded-lg border border-blue-200">
                    <span className="font-medium">Tailoring Resume</span>
                    <span className="text-sm">In progress...</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Preview</h3>
                <div className="space-y-3 opacity-60">
                  <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded w-full"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded w-5/6"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Three Step Explanation */}
      <section className="py-24">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-semibold mb-3">Upload Resume</h3>
              <p className="text-muted-foreground">Start with your verified master resume. We safely extract your experience.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-semibold mb-3">Analyze Match</h3>
              <p className="text-muted-foreground">Provide a job description. We highlight skill gaps and match strength.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-semibold mb-3">Generate Tailored CV</h3>
              <p className="text-muted-foreground">Truthfully adapt your resume to highlight relevant skills for the role.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-24 bg-muted/50 border-y">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-16 text-foreground">Features built for candidates</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Target className="w-10 h-10 text-primary mb-2" />
                <CardTitle>ATS-readiness</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                Ensure your resume passes automated screenings with keyword checks.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Skill-gap Analysis</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                Identify exactly what you are missing for your target role.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Truthful AI</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                We never invent experience. Everything generated is based on your truth.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CheckCircle2 className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Application Tracking</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                Keep all your tailored resumes and application statuses in one place.
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Privacy Promise */}
      <section className="py-24 text-center">
        <Container className="max-w-3xl">
          <Shield className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4 text-foreground">Your data belongs to you</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We store your resume securely and never use your personal data to train public AI models. 
            You are always in control of your information.
          </p>
          <Link href="/privacy" className="text-primary hover:underline font-medium">Read our privacy policy</Link>
        </Container>
      </section>

      {/* Pricing Teaser */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <Container>
          <h2 className="text-3xl font-bold mb-6">Start building your application today</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Experience the full power of AI tailoring. Free plan available, with candidate-friendly premium plans starting at ₹29/month.
          </p>
          <Link href="/sign-up">
            <Button size="lg" variant="secondary" className="h-12 px-8 font-semibold">
              Get Started for Free
            </Button>
          </Link>
        </Container>
      </section>
    </MarketingLayout>
  );
}
