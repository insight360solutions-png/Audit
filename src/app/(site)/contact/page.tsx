import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageSquareText, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/layout/social-links";
import { WhatsappIcon } from "@/components/ui/brand-icons";
import { routes } from "@/config/routes";
import { ContactForm, type EnquiryOption } from "@/components/forms/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { getPillars, getSiteSettings } from "@/lib/content";
import { JsonLd, breadcrumbJsonLd, pageAlternates, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact us – Let’s talk about your business",
  description:
    "Get in touch with Insight.360° in Mauritius about business advisory, governance, risk management, internal controls or compliance.",
  alternates: pageAlternates("/contact"),
};

type Props = { searchParams: Promise<{ service?: string }> };

const steps = [
  { title: "We listen", text: "A short conversation to understand your organisation and the challenge." },
  { title: "We propose", text: "A proportionate scope, approach and fee, with no obligation." },
  { title: "We deliver", text: "Structured work following the Insight.360° approach, with clear outputs." },
];

export default async function ContactPage({ searchParams }: Props) {
  const [{ service }, settings, pillars] = await Promise.all([searchParams, getSiteSettings(), getPillars()]);

  const options: EnquiryOption[] = [
    ...pillars.flatMap((p) => [
      { value: p.slug, label: `${p.name} (general)`, group: p.name },
      ...p.solutions.map((s) => ({ value: s.slug, label: s.name, group: p.name })),
    ]),
    { value: "tools", label: "Tools and resources", group: "Other" },
    { value: "other", label: "Something else", group: "Other" },
  ];

  return (
    <>
      <JsonLd data={webPageJsonLd({ type: "ContactPage", path: "/contact", name: "Contact us", description: metadata.description as string })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      <PageHero
        eyebrow="06 · Contact us"
        title={
          <>
            Let’s talk about <span className="text-gradient">your business.</span>
          </>
        }
        description="Whether you are looking to strengthen operations, governance, risk management, internal controls or compliance, we would be pleased to understand your requirements."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-4">
            <ul className="space-y-4">
              <li className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <Mail className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs font-bold tracking-[0.16em] text-slate-500 uppercase">Email</span>
                  <a href={`mailto:${settings.contact.email}`} className="mt-1 block font-semibold text-navy-900 hover:text-teal-600">
                    {settings.contact.email}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#1DA851]">
                  <WhatsappIcon className="size-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold tracking-[0.16em] text-slate-500 uppercase">WhatsApp</span>
                  <a href={routes.whatsapp()} target="_blank" rel="noopener noreferrer" className="mt-1 block font-semibold text-navy-900 hover:text-teal-600">
                    Chat with an advisor
                  </a>
                  <span className="block text-xs text-slate-500">Opens WhatsApp with our number</span>
                </span>
              </li>
              {settings.contact.phone ? (
                <li className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                    <Phone className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-bold tracking-[0.16em] text-slate-500 uppercase">Telephone</span>
                    <a href={`tel:${settings.contact.phone.replace(/\s+/g, "")}`} className="mt-1 block font-semibold text-navy-900 hover:text-teal-600">
                      {settings.contact.phone}
                    </a>
                  </span>
                </li>
              ) : null}
              <li className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <MapPin className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs font-bold tracking-[0.16em] text-slate-500 uppercase">Location</span>
                  <span className="mt-1 block font-semibold text-navy-900">{settings.contact.addressLine ?? settings.contact.location}</span>
                </span>
              </li>
              {settings.contact.hours ? (
                <li className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                    <Clock className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs font-bold tracking-[0.16em] text-slate-500 uppercase">Hours</span>
                    <span className="mt-1 block font-semibold text-navy-900">{settings.contact.hours}</span>
                  </span>
                </li>
              ) : null}
              <li className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <MessageSquareText className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs font-bold tracking-[0.16em] text-slate-500 uppercase">Enquiries</span>
                  <span className="mt-1 block font-semibold text-navy-900">{settings.descriptor}</span>
                </span>
              </li>
            </ul>

            {settings.social.length ? (
              <div className="rounded-2xl bg-navy-900 p-6 text-white">
                <p className="text-sm font-semibold">Follow Insight.360°</p>
                <SocialLinks links={settings.social} variant="boxed" className="mt-4 gap-3" />
              </div>
            ) : null}

            <ol className="space-y-3">
              {steps.map((s, i) => (
                <li key={s.title} className="flex items-start gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">{i + 1}</span>
                  <span>
                    <span className="block font-semibold text-navy-900">{s.title}</span>
                    <span className="block text-sm text-slate-600">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-card sm:p-10">
              <h2 className="text-2xl">Send us an enquiry</h2>
              <p className="mt-2 text-slate-600">We aim to respond within two working days.</p>
              <div className="mt-8">
                <ContactForm options={options} defaultService={service} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
