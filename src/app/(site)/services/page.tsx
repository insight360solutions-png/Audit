import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { routes } from "@/config/routes";
import { getPillars, type Solution } from "@/lib/content";
import { cn } from "@/lib/utils";
import { JsonLd, abs, breadcrumbJsonLd, itemListJsonLd, webPageJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Advisory, Risk & Compliance Services in Mauritius",
  description:
    "Eight advisory solutions for organisations in Mauritius: business diagnostics, SOPs, KPIs, governance, risk, internal control, fraud and compliance reviews.",
  path: "/services",
});

export default async function ServicesPage() {
  const pillars = await getPillars();
  const solutions = pillars.flatMap((p) => p.solutions);

  return (
    <>
      <JsonLd data={webPageJsonLd({ type: "CollectionPage", path: "/services", name: "Services", description: metadata.description as string })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services" }])} />
      <JsonLd
        data={itemListJsonLd(
          "Insight.360° advisory solutions",
          solutions.map((s) => ({ name: s.name, url: abs(`/services/${s.slug}`), description: s.tagline })),
        )}
      />
      <PageHero
        eyebrow="02 · Services"
        title={
          <>
            Professional advice. <span className="text-gradient">Practical improvement.</span>
          </>
        }
        description="Our advisory services are organised around four connected pillars, supported by eight focused solutions. Each engagement follows the same proportionate, evidence-based methodology."
        crumbs={[{ label: "Services" }]}
      >
        <ul className="flex flex-wrap gap-2.5">
          {pillars.map((p) => (
            <li key={p.slug}>
              <a
                href={`#${p.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white px-4 py-2 text-sm font-semibold text-navy-900 shadow-sm transition hover:border-teal-500 hover:text-teal-600"
              >
                <Icon name={p.icon} className="size-4 text-teal-500" />
                {p.name}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {pillars.map((pillar, index) => {
        const multi = pillar.solutions.length > 1;
        const intro = (
          <>
            <Eyebrow className="mb-4">Pillar 0{pillar.order}</Eyebrow>
            <div className="flex size-14 items-center justify-center rounded-2xl bg-navy-900 text-white">
              <Icon name={pillar.icon} className="size-7" />
            </div>
            <h2 className="mt-6 text-3xl sm:text-4xl">{pillar.name}</h2>
            <p className="mt-2 font-display text-lg font-semibold text-teal-600">{pillar.strapline}</p>
          </>
        );
        const blurb = (
          <>
            <p className="leading-relaxed text-slate-600">{pillar.description}</p>
            <ButtonLink href={routes.contactFor(pillar.slug)} variant="outline" className="mt-7" arrow>
              Enquire about {pillar.name.toLowerCase()}
            </ButtonLink>
          </>
        );

        return (
          <section
            key={pillar.slug}
            id={pillar.slug}
            className={cn("scroll-mt-24 py-20 sm:py-24", index % 2 === 1 && "bg-navy-50")}
          >
            {multi ? (
              /* Intro across the top, then the solutions side by side */
              <Container>
                <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                  <div className="lg:col-span-5">{intro}</div>
                  <div className="lg:col-span-7 lg:pb-1">{blurb}</div>
                </div>
                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {pillar.solutions.map((solution) => (
                    <SolutionCard key={solution.slug} solution={solution} layout="column" />
                  ))}
                </div>
              </Container>
            ) : (
              /* Single solution: intro beside a wide card */
              <Container className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    {intro}
                    <div className="mt-5">{blurb}</div>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  {pillar.solutions.map((solution) => (
                    <SolutionCard key={solution.slug} solution={solution} layout="row" />
                  ))}
                </div>
              </Container>
            )}
          </section>
        );
      })}

      <CtaBand
        title="Not sure where to start?"
        description="A Business 360° Diagnostic gives you an independent view of the whole organisation and a prioritised list of improvements. Or simply tell us the challenge and we will suggest the right starting point."
        primaryLabel="Discuss your requirements"
        secondaryLabel="Our tools"
        secondaryHref={routes.tools}
      />
    </>
  );
}

function SolutionCard({ solution, layout }: { solution: Solution; layout: "row" | "column" }) {
  const column = layout === "column";
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white shadow-card transition hover:border-teal-200 hover:shadow-card-hover",
        column ? "p-7" : "p-7 sm:p-9",
      )}
    >
      <div className={cn(column ? "flex flex-col" : "flex items-start gap-5")}>
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
          <Icon name={solution.icon} className="size-6" />
        </div>
        <div className={cn("min-w-0 flex-1", column && "mt-5")}>
          <h3 className={column ? "text-xl" : "text-2xl"}>
            <Link href={routes.service(solution.slug)} className="hover:text-teal-600">
              {solution.name}
            </Link>
          </h3>
          <p className={cn("mt-1.5 font-medium text-navy-900/80", column && "text-sm")}>{solution.tagline}</p>
          <p className={cn("mt-4 leading-relaxed text-slate-600", column && "text-sm")}>{solution.summary}</p>
          {solution.outcomes.length ? (
            <ul className={cn("mt-5 grid gap-2.5", !column && "sm:grid-cols-2")}>
              {solution.outcomes.slice(0, column ? 3 : 4).map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-500" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <div className={cn("flex flex-wrap items-center gap-3", column ? "mt-auto pt-7" : "mt-7 pl-[4.25rem]")}>
        <ButtonLink href={routes.contactFor(solution.slug)} size="sm" variant="accent">
          Enquire now
        </ButtonLink>
        <Link
          href={routes.service(solution.slug)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-teal-600"
        >
          How it works
          <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
