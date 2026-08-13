import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { Container } from "@/components/shared/Container";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-4">
          <Link href="/sign-in">
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </Container>
    </header>
  );
}
