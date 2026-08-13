import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/shared/Logo";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function ForgotPassword() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 bg-muted/30">
      <div className="w-full max-w-md text-center mb-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold">Forgot your password?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email and we'll send you a reset link.
        </p>
      </div>
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
          <Button className="w-full">
            <Mail className="w-4 h-4 mr-2" />Send Reset Link
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            For security reasons, we won't confirm whether this email is registered.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center border-t py-4">
          <Link href="/sign-in" className="text-sm text-primary hover:underline">
            Back to Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
