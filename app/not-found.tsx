import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-24">
      <Container className="text-center max-w-md">
        <p className="text-8xl font-black text-primary/20 select-none">404</p>
        <h1 className="text-2xl font-bold mt-4">Page not found</h1>
        <p className="text-muted-foreground mt-2">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center mt-8">
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
          <Link href="/jobs">
            <Button variant="outline">Find Jobs</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
