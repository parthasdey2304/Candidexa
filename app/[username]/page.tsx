import type { Metadata } from "next";
import Link from "next/link";
import { Play, ExternalLink, Mail } from "lucide-react";
import { TechStackBadges } from "@/components/shared/tech-badges";
import { Badge } from "@/components/ui/badge";
import { ScoreGauge } from "@/components/shared/score-gauge";
import { NavOrb } from "@/components/ui/nav-orb";

function GithubMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.15-.02-2.06-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.77 1.05.77 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

interface PortfolioProject {
  name: string;
  tagline: string;
  stack: string[];
  ats: number;
  demoUrl?: string;
}

const projects: PortfolioProject[] = [
  {
    name: "Real-Time Order Tracking",
    tagline: "10K+ events/sec order pipeline with Kafka, Redis and a reactive dashboard.",
    stack: ["Kafka", "Redis", "Python", "React", "Docker"],
    ats: 96,
  },
  {
    name: "AI Resume Parser",
    tagline: "Parses 50+ resume formats into structured ATS-ready profiles in under 5s.",
    stack: ["Python", "FastAPI", "PostgreSQL", "TypeScript"],
    ats: 91,
  },
  {
    name: "Distributed Cache Gateway",
    tagline: "Multi-node cache with consistent hashing, failover and prometheus metrics.",
    stack: ["Go", "Redis", "Kubernetes", "GCP"],
    ats: 88,
  },
];

const data = {
  name: "Aarav Sharma",
  role: "Backend Engineer · Kafka, Redis, Go",
  headline: "I build real-time systems that hold at 10K events/sec and resumes that clear 95% ATS.",
  email: "aarav.sharma@example.com",
  experience: 4,
  topSkills: ["System Design", "Distributed Systems", "Go", "Python", "Kafka", "Redis"],
};

export function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  return params.then(({ username }) => ({
    title: `${username} · Candidate Portfolio`,
    description: `Interview-ready portfolio for ${username} — projects, system design, and ATS-verified resumes.`,
    openGraph: {
      title: `${username} · Candidate Portfolio`,
      description: "Projects, system design stories, and a 95%+ ATS resume.",
      type: "profile",
    },
  }));
}

export default async function PublicPortfolioPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return (
    <div className="min-h-screen bg-[#060e20] text-[#dae2fd]">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-[#2d3449] bg-[#060e20]/80 backdrop-blur supports-backdrop-filter:blur(8px)">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <NavOrb />
            <span className="font-heading text-lg font-bold text-white">Candidexa</span>
          </div>
          <Link
            href="/login"
            className="rounded-lg border border-[#2d3449] px-4 py-2 text-sm font-medium text-[#dae2fd] transition-colors hover:border-indigo-500/60 hover:text-white"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-sm font-medium text-indigo-400">@{username}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {data.name}
            </h1>
            <p className="mt-3 text-lg text-[#908fa0]">{data.role}</p>
            <p className="mt-4 max-w-xl text-[#dae2fd]">{data.headline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`mailto:${data.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
              >
                <Mail className="size-4" /> Contact
              </Link>
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg border border-[#2d3449] px-4 py-2.5 text-sm font-medium text-[#dae2fd] transition-colors hover:border-indigo-500/60"
              >
                <Play className="size-4" /> Watch demos
              </Link>
              <a
                href="#"
                aria-label="GitHub profile"
                className="inline-flex items-center rounded-lg border border-[#2d3449] p-2.5 text-[#908fa0] transition-colors hover:border-indigo-500/60 hover:text-white"
              >
                <GithubMark className="size-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn profile"
                className="inline-flex items-center rounded-lg border border-[#2d3449] p-2.5 text-[#908fa0] transition-colors hover:border-indigo-500/60 hover:text-white"
              >
                <LinkedinMark className="size-4" />
              </a>
            </div>
            <div className="mt-8">
              <TechStackBadges stack={data.topSkills} />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="rounded-3xl border border-[#2d3449] bg-[#0b1326] p-8 text-center">
              <ScoreGauge value={96} label="Avg ATS Score" />
              <p className="mt-4 text-sm text-[#908fa0]">
                {data.experience} years of backend engineering
              </p>
              <Badge className="mt-2 bg-emerald-500/15 text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
                Interview-ready
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-t border-[#2d3449] bg-[#0b1326]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-bold text-white">Selected Projects</h2>
          <p className="mt-2 text-[#908fa0]">Each project ships with a generated demo video and a verified ATS summary.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.name}
                className="group overflow-hidden rounded-2xl border border-[#2d3449] bg-[#131b2e] transition-colors hover:border-indigo-500/60"
              >
                <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-[#060e20]">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-violet-600/20 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="flex size-14 items-center justify-center rounded-full bg-white/10 text-white opacity-80 transition-all group-hover:scale-110 group-hover:bg-indigo-500 group-hover:opacity-100">
                    <Play className="size-6" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pt-6 pb-2 text-xs text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                    Demo video placeholder
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-white">{project.name}</h3>
                    <Badge className="bg-indigo-500/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/40">
                      {project.ats}% ATS
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-[#908fa0]">{project.tagline}</p>
                  <div className="mt-4">
                    <TechStackBadges stack={project.stack} size="sm" />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <a href={project.demoUrl ?? "#"} className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 hover:underline">
                      Details <ExternalLink className="size-3.5" />
                    </a>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
                      <span className="size-1.5 rounded-full bg-emerald-400" /> Live
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="text-center text-sm text-[#908fa0]">
          Portfolio generated with{" "}
          <Link href="/" className="font-medium text-indigo-400 hover:underline">
            Candidexa
          </Link>{" "}
          — {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}