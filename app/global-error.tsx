"use client";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
            <p className="text-muted-foreground mt-2 mb-8">
              An unexpected error occurred. Our team has been notified. Please try again or contact support.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={reset}>Try Again</Button>
              <a href="mailto:support@candidexa.com">
                <Button variant="outline">Contact Support</Button>
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
