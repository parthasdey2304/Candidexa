import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AppProviders } from "@/components/providers/AppProviders";
import { SecurityConsole } from "@/components/SecurityConsole";
import { env } from "@/lib/env";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(env.appUrl),
  title: {
    default: `${env.appName} | Intelligent Career Workspace`,
    template: `%s | ${env.appName}`,
  },
  description:
    "Build targeted resumes, analyze job descriptions, and track every application in one career workspace.",
  openGraph: {
    title: `${env.appName} | Intelligent Career Workspace`,
    description:
      "Build targeted resumes, analyze job descriptions, and track every application in one career workspace.",
    siteName: env.appName,
    type: "website",
    url: env.appUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${env.appName} | Intelligent Career Workspace`,
    description:
      "Build targeted resumes, analyze job descriptions, and track every application in one career workspace.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <SecurityConsole />
        <AppProviders>
          <main className="flex-1 flex flex-col">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
