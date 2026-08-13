import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container className="flex h-16 items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-4">
            <Button variant="ghost">Log in</Button>
            <Button>Get Started</Button>
          </nav>
        </Container>
      </header>
      
      <main className="flex-1">
        <Container className="py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Apply with a resume <br className="hidden sm:inline" />
            <span className="text-primary">built for the role.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Candidexa compares your verified experience with each job description 
            and helps you create a stronger, more truthful application.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8">
              Create my application
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8">
              See how it works
            </Button>
          </div>
        </Container>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <Container className="flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm leading-loose text-muted-foreground text-center md:text-left">
            Built for truthful applications. © {new Date().getFullYear()} Candidexa.
          </p>
        </Container>
      </footer>
    </div>
  );
}
