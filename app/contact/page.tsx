import { Container } from "@/components/shared/Container";

export default function ContactPage() {
  return (
    <Container className="py-12 md:py-24 lg:py-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Contact Us</h1>
        <div className="prose prose-neutral dark:prose-invert">
          <p className="lead">
            We would love to hear from you. Whether you have a question about our services, pricing, need a demo, or anything else, our team is ready to answer all your questions.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Get in Touch</h2>
          <p>
            You can reach out to our support team directly via email:
            <br />
            <a href="mailto:support@candidexa.com" className="text-primary hover:underline">support@candidexa.com</a>
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Business Inquiries</h2>
          <p>
            For partnerships and business inquiries, please contact:
            <br />
            <a href="mailto:business@candidexa.com" className="text-primary hover:underline">business@candidexa.com</a>
          </p>
        </div>
      </div>
    </Container>
  );
}
