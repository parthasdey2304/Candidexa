import { Container } from "@/components/shared/Container";

export default function TermsPage() {
  return (
    <Container className="py-12 md:py-24 lg:py-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="lead">
            Welcome to Candidexa. By accessing or using our website and services, you agree to be bound by these Terms of Service.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By registering for and/or using the Services in any manner, including but not limited to visiting or browsing the Site, you agree to these Terms of Service and all other operating rules, policies, and procedures that may be published from time to time on the Site by us.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
          <p>
            Candidexa provides an intelligent career workspace that allows users to search for jobs, analyze their fit, and generate tailored applications using artificial intelligence.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Conduct</h2>
          <p>
            You promise not to use the Services for any purpose that is unlawful or prohibited by these Terms. You are responsible for all of your activity in connection with the Services.
          </p>
          
          <p className="mt-8 text-sm text-muted-foreground">
            Last updated: August 2026
          </p>
        </div>
      </div>
    </Container>
  );
}
