import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { getSiteSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Notice",
  description: "How Insight.360° collects and uses personal information submitted through this website.",
  path: "/privacy",
  noindex: true,
});

export default async function PrivacyPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy notice" description="How we handle the information you share with us through this website." crumbs={[{ label: "Privacy notice" }]} />
      <section className="py-16">
        <Container size="narrow" className="prose-insight">
          <p>
            <em>Last updated: October 2026. This notice should be reviewed by Insight.360° against the Mauritius Data Protection Act 2017 before go-live.</em>
          </p>
          <h2>Who we are</h2>
          <p>
            Insight.360° is an independent business advisory practice based in Mauritius. You can contact us at{" "}
            <a href={`mailto:${settings.contact.email}`}>{settings.contact.email}</a>.
          </p>
          <h2>What we collect</h2>
          <p>When you use the contact form or register interest in our tools we collect the information you provide: your name, email address, organisation, telephone number (optional), the nature of your enquiry and your message.</p>
          <h2>Why we collect it</h2>
          <ul>
            <li>To respond to your enquiry and, where relevant, prepare a proposal.</li>
            <li>To notify you about the availability of tools you have registered interest in.</li>
            <li>To keep a record of our correspondence with you.</li>
          </ul>
          <p>We rely on your consent, given when you submit a form, and on our legitimate interest in responding to business enquiries.</p>
          <h2>Who we share it with</h2>
          <p>Form submissions are delivered to our business mailbox by an email delivery provider acting on our instructions. We do not sell or share your information with third parties for their own marketing.</p>
          <h2>How long we keep it</h2>
          <p>Enquiry records are kept for as long as needed to deal with the enquiry and for a reasonable period afterwards, after which they are deleted.</p>
          <h2>Cookies and analytics</h2>
          <p>This website does not set marketing cookies. If analytics are enabled in future, this notice will be updated.</p>
          <h2>Your rights</h2>
          <p>You may ask us to access, correct or delete the personal information we hold about you, or withdraw your consent, by emailing us at the address above.</p>
        </Container>
      </section>
    </>
  );
}
