"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { AppLayout } from "@/components/layout/AppLayout";
import { Spinner } from "@/components/ui/spinner";

export default function AppSectionLayout({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b1326]">
        <div className="flex flex-col items-center gap-3 text-[#908fa0]">
          <Spinner size="lg" />
          <p className="text-sm">Loading your workspace…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppLayout>
      <div className="p-4 md:p-8">{children}</div>
    </AppLayout>
  );
}