import { Container } from "@/components/shared/Container";

export default function PrivacyPage() {
  return (
    <Container className="py-12 md:py-24 lg:py-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="lead">
            At Candidexa, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when you create an account, update your profile, or use our services. This may include your name, email address, resume data, and application history.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, including matching you with potential jobs and generating tailored applications.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.
          </p>
          
          <p className="mt-8 text-sm text-muted-foreground">
            Last updated: August 2026
          </p>
        </div>
      </div>
    </Container>
  );
}
