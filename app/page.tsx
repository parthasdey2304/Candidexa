import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Zap, Globe, Shield, Sparkles } from "lucide-react";
import { ThreeHero } from "@/components/ui/three-hero";
import { Card3D } from "@/components/ui/3d-card";
import { GsapReveal } from "@/components/animations/gsap-reveal";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b1326] text-[#dae2fd] overflow-hidden selection:bg-[#6366f1] selection:text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-16">
        <ThreeHero />
        
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <GsapReveal direction="up" delay={0.2}>
            <div className="inline-flex items-center rounded-full border border-[#6366f1]/30 bg-[#171f33]/80 backdrop-blur-sm px-3 py-1 text-sm font-medium text-[#c0c1ff] mb-8">
              <Sparkles className="h-4 w-4 mr-2" />
              Candidexa 2.0 is here
            </div>
          </GsapReveal>
          
          <GsapReveal direction="up" delay={0.4}>
            <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-white to-[#c0c1ff] mb-6">
              The Future is Spatial.
            </h1>
          </GsapReveal>
          
          <GsapReveal direction="up" delay={0.6}>
            <p className="mx-auto max-w-[700px] text-[#908fa0] md:text-xl lg:text-2xl font-light mb-10">
              Redefining the boundaries between digital and physical through immersive AI technology and intelligent career matching.
            </p>
          </GsapReveal>
          
          <GsapReveal direction="up" delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="h-14 px-8 rounded-full bg-[#6366f1] hover:bg-[#494bd6] text-white text-lg shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]">
                  Explore the Vision
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/jobs">
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-white/20 hover:bg-white/10 text-white text-lg backdrop-blur-md">
                  View Opportunities
                </Button>
              </Link>
            </div>
          </GsapReveal>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 lg:py-32 relative z-10">
        <div className="container px-4 md:px-6">
          <GsapReveal direction="up">
            <div className="rounded-3xl border border-white/10 bg-[#131b2e]/50 backdrop-blur-xl p-8 md:p-12 lg:p-16 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#6366f1]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              
              <div className="relative z-10 max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Precision in Dimension</h2>
                <p className="text-[#c7c4d7] text-lg md:text-xl mb-8 leading-relaxed">
                  Candidexa utilizes spatial intelligence and neural matching to seamlessly integrate your professional profile with the world's most elite opportunities. 
                  Experience a frictionless, immersive environment designed for absolute focus.
                </p>
                <Link href="/about" className="inline-flex items-center text-[#c0c1ff] font-medium hover:text-white transition-colors">
                  Learn about our technology <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </GsapReveal>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 lg:py-32 relative z-10">
        <div className="container px-4 md:px-6">
          <GsapReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Next-Gen Capabilities</h2>
              <p className="text-[#908fa0] text-lg max-w-2xl mx-auto">
                Powered by neural graphics and real-time processing, Candidexa offers an unparalleled workspace.
              </p>
            </div>
          </GsapReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GsapReveal direction="up" delay={0.2}>
              <Card3D>
                <div className="h-12 w-12 rounded-full bg-[#171f33] border border-[#6366f1]/30 flex items-center justify-center mb-6">
                  <Brain className="h-6 w-6 text-[#c0c1ff]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Immersive Engines</h3>
                <p className="text-[#908fa0] leading-relaxed">
                  Our proprietary rendering engines create deep, spatial environments that reduce cognitive load and maximize focus during intense job searches.
                </p>
              </Card3D>
            </GsapReveal>

            <GsapReveal direction="up" delay={0.4}>
              <Card3D>
                <div className="h-12 w-12 rounded-full bg-[#171f33] border border-[#a855f7]/30 flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-[#ddb7ff]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Real-time Spatiality</h3>
                <p className="text-[#908fa0] leading-relaxed">
                  Experience lightning-fast, real-time updates as you navigate through opportunities, with seamless GSAP-powered transitions.
                </p>
              </Card3D>
            </GsapReveal>

            <GsapReveal direction="up" delay={0.6}>
              <Card3D>
                <div className="h-12 w-12 rounded-full bg-[#171f33] border border-[#06b6d4]/30 flex items-center justify-center mb-6">
                  <Globe className="h-6 w-6 text-[#4cd7f6]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Neural Graphics</h3>
                <p className="text-[#908fa0] leading-relaxed">
                  AI-driven interface generation that adapts the 3D environment to your specific workflow and preference patterns.
                </p>
              </Card3D>
            </GsapReveal>
          </div>
        </div>
      </section>
      
      {/* Footer is already included in layout.tsx */}
    </div>
  );
}
