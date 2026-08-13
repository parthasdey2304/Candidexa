import { Container } from "@/components/shared/Container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, X } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Get started with the basics.",
    cta: "Get Started",
    href: "/sign-up",
    featured: false,
    features: [
      { text: "1 master resume", ok: true },
      { text: "3 job matches per month", ok: true },
      { text: "Basic ATS analysis", ok: true },
      { text: "Cover letter generation", ok: false },
      { text: "Unlimited tailored resumes", ok: false },
      { text: "Application tracker", ok: false },
    ],
  },
  {
    name: "Candidate",
    price: "₹29",
    period: "per month",
    description: "Everything you need to land your next role.",
    cta: "Start Free Trial",
    href: "/sign-up",
    featured: true,
    badge: "Most Popular",
    features: [
      { text: "Unlimited master resumes", ok: true },
      { text: "30 job matches per month", ok: true },
      { text: "Full ATS & keyword analysis", ok: true },
      { text: "Unlimited cover letters", ok: true },
      { text: "Unlimited tailored resumes", ok: true },
      { text: "Full application tracker", ok: true },
    ],
  },
];

const faq = [
  { q: "Can I cancel anytime?", a: "Yes. You can cancel your subscription at any time. You retain access until the end of your billing period." },
  { q: "Does Candidexa guarantee interviews?", a: "No. Candidexa helps you prepare stronger applications, but we cannot guarantee interviews or employment outcomes." },
  { q: "How is pricing determined?", a: "Pricing is set by our backend and may change at any time. The current price is experimental. You will always be notified before any change." },
  { q: "Is my resume data safe?", a: "Yes. We store your data securely and never use it to train public AI models. You can delete your data at any time." },
];

export default function Pricing() {
  return (
    <>
      <section className="py-20 text-center">
        <Container>
          <h1 className="text-4xl font-extrabold">Simple, honest pricing</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free. Upgrade when you're ready. No auto-enrollments or hidden fees.
          </p>
        </Container>
      </section>

      <section className="pb-20">
        <Container className="max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <Card key={plan.name} className={`relative ${plan.featured ? "border-primary shadow-lg shadow-primary/10" : ""}`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1">{plan.badge}</Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">/{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href={plan.href}>
                    <Button className="w-full" variant={plan.featured ? "default" : "outline"} size="lg">
                      {plan.cta}
                    </Button>
                  </Link>
                  <div className="space-y-3 pt-2">
                    {plan.features.map(({ text, ok }) => (
                      <div key={text} className="flex items-center gap-3 text-sm">
                        {ok
                          ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          : <X className="w-4 h-4 text-muted-foreground shrink-0" />
                        }
                        <span className={ok ? "" : "text-muted-foreground"}>{text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/50 border-t">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-10">Pricing FAQ</h2>
          <div className="space-y-6">
            {faq.map(({ q, a }) => (
              <div key={q}>
                <p className="font-semibold mb-1">{q}</p>
                <p className="text-muted-foreground text-sm">{a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
