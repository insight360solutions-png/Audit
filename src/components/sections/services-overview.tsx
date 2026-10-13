import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { routes } from "@/config/routes";
import type { Pillar } from "@/lib/content";

export function ServicesOverview({ pillars }: { pillars: Pillar[] }) {
  const total = pillars.reduce((n, p) => n + p.solutions.length, 0);
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="02 · Services"
            title="Four connected pillars. Eight focused solutions."
            description={`Our advisory services are organised around ${pillars.length} connected pillars, supported by ${total} focused solutions.`}
          />
          <ButtonLink href={routes.services} variant="outline" arrow className="shrink-0">
            View all services
          </ButtonLink>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {pillars.map((pillar, i) => (
            <Link
              key={pillar.slug}
              href={`/services#${pillar.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-card-hover"
            >
              <span aria-hidden data-n={`0${i + 1}`} className="absolute top-6 right-7 font-display text-5xl font-extrabold text-navy-50 transition group-hover:text-teal-50 before:content-[attr(data-n)]" />
              <div className="flex size-14 items-center justify-center rounded-2xl bg-navy-900 text-white transition group-hover:bg-teal-500">
                <Icon name={pillar.icon} className="size-7" />
              </div>
              <h3 className="mt-6 text-2xl">{pillar.name}</h3>
              <p className="mt-1 text-sm font-semibold text-teal-600">{pillar.strapline}</p>
              <ul className="mt-5 space-y-2.5">
                {pillar.solutions.map((s) => (
                  <li key={s.slug} className="flex items-start gap-2.5 text-[0.95rem] text-slate-600">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-500" aria-hidden />
                    <span>
                      <span className="font-semibold text-navy-900">{s.name}</span> – {s.tagline.replace(/\.$/, "")}
                    </span>
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900">
                Explore {pillar.name.toLowerCase()}
                <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
