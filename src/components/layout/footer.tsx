import Link from "next/link";
import { Mail, MapPin, Clock } from "lucide-react";
import { WhatsappIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/container";
import { primaryNav, routes } from "@/config/routes";
import { getPillars, getSiteSettings } from "@/lib/content";
import { Logo } from "./logo";
import { SocialLinks } from "./social-links";

export async function Footer() {
  const [settings, pillars] = await Promise.all([getSiteSettings(), getPillars()]);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white/75">
      <div className="pointer-events-none absolute -top-40 -right-40 size-[32rem] rounded-full bg-teal-500/10 blur-3xl" aria-hidden />
      <Container className="relative grid gap-12 py-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo tone="light" size="lg" />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed">
            {settings.footerNote} We help organisations strengthen performance, governance, risk management, internal controls and compliance.
          </p>
          <SocialLinks links={settings.social} variant="boxed" className="mt-6 gap-3" />
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-display text-sm font-bold tracking-[0.16em] text-white uppercase">Explore</h3>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-teal-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-display text-sm font-bold tracking-[0.16em] text-white uppercase">Services</h3>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {pillars.map((pillar) => (
              <li key={pillar.slug}>
                <Link href={`/services#${pillar.slug}`} className="transition hover:text-teal-400">
                  {pillar.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-display text-sm font-bold tracking-[0.16em] text-white uppercase">Contact</h3>
          <ul className="mt-5 space-y-4 text-[0.95rem]">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-teal-400" aria-hidden />
              <a href={`mailto:${settings.contact.email}`} className="transition hover:text-teal-400">
                {settings.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <WhatsappIcon className="mt-0.5 size-4 shrink-0 text-teal-400" />
              <a href={routes.whatsapp()} target="_blank" rel="noopener noreferrer" className="transition hover:text-teal-400">
                Chat with us on WhatsApp
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-teal-400" aria-hidden />
              <span>{settings.contact.addressLine ?? settings.contact.location}</span>
            </li>
            {settings.contact.hours ? (
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-teal-400" aria-hidden />
                <span>{settings.contact.hours}</span>
              </li>
            ) : null}
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col items-start justify-between gap-3 py-6 text-sm text-white/55 sm:flex-row sm:items-center">
          <p>© {year} Insight.360°. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href={routes.privacy} className="transition hover:text-teal-400">
              Privacy notice
            </Link>
            <span className="text-teal-400/80">Developed by Salman (+230 58222428)</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
