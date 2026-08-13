import { Container } from "@/components/shared/Container";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <Container className="flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm leading-loose text-muted-foreground text-center md:text-left">
          Built for truthful applications. © {new Date().getFullYear()} Candidexa.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
      </Container>
    </footer>
  );
}
