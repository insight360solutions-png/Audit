import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, HelpCircle, Search, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { InsightCard } from "@/components/insights/insight-card";
import { routes } from "@/config/routes";
import { getAllSolutions, getAllTools, getInsights, getSolution } from "@/lib/content";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd, webPageJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const solutions = await getAllSolutions();
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = await getSolution(slug);
  if (!solution) return {};
  return pageMetadata({
    title: `${solution.name} in Mauritius`,
    description: `${solution.tagline} ${solution.pillar.name} advisory for organisations in Mauritius from Insight.360°.`,
    path: `/services/${solution.slug}`,
  });
}

const steps = ["Plan", "Understand", "Assess", "Analyse", "Report", "Improve", "Follow up"];

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = await getSolution(slug);
  if (!solution) notFound();

  const [allSolutions, allTools, insights] = await Promise.all([getAllSolutions(), getAllTools(), getInsights()]);
  const siblings = allSolutions.filter((s) => s.pillar.slug === solution.pillar.slug && s.slug !== solution.slug);
  const tools = allTools.filter((t) => solution.relatedTools.includes(t.slug));
  const related = insights.filter((i) => i.relatedServices.includes(solution.slug)).slice(0, 3);

  return (
    <>
      <JsonLd data={serviceJsonLd(solution)} />
      <JsonLd data={webPageJsonLd({ type: "ItemPage", path: `/services/${solution.slug}`, name: solution.name, description: solution.summary })} />
      {solution.faq.length ? <JsonLd data={faqJsonLd(solution.faq)} /> : null}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Services", path: "/services" },
          { name: solution.pillar.name, path: `/services#${solution.pillar.slug}` },
          { name: solution.name, path: `/services/${solution.slug}` },
        ])}
      />
      <PageHero
        eyebrow={solution.pillar.name}
        title={solution.name}
        description={solution.tagline}
        crumbs={[{ label: "Services", href: "/services" }, { label: solution.name }]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={routes.contactFor(solution.slug)} variant="accent" arrow>
            Enquire about this service
          </ButtonLink>
          <ButtonLink href={`/services#${solution.pillar.slug}`} variant="outline">
            All {solution.pillar.name.toLowerCase()} services
          </ButtonLink>
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <div>
              <p className="text-xl leading-relaxed text-navy-900">{solution.summary}</p>
            </div>

            {solution.whoItIsFor.length ? (
              <div>
                <h2 className="flex items-center gap-3 text-2xl">
                  <Users className="size-6 text-teal-500" aria-hidden />
                  Who it is for
                </h2>
                <ul className="mt-5 space-y-3">
                  {solution.whoItIsFor.map((w) => (
                    <li key={w} className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-teal-500" aria-hidden />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {solution.whatWeAssess.length ? (
              <div>
                <h2 className="flex items-center gap-3 text-2xl">
                  <Search className="size-6 text-teal-500" aria-hidden />
                  What we assess
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {solution.whatWeAssess.map((w) => (
                    <li key={w} className="flex items-start gap-3 rounded-2xl bg-navy-50 p-5">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-500" aria-hidden />
                      <span className="text-navy-900">{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {solution.outcomes.length ? (
              <div className="rounded-3xl bg-navy-900 p-8 text-white sm:p-10">
                <h2 className="flex items-center gap-3 text-2xl text-white">
                  <Sparkles className="size-6 text-teal-400" aria-hidden />
                  What you get
                </h2>
                <ul className="mt-6 space-y-4">
                  {solution.outcomes.map((o, i) => (
                    <li key={o} className="flex items-start gap-4">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-600 font-display text-sm font-bold">{i + 1}</span>
                      <span className="pt-1 text-white/85">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {solution.faq.length ? (
              <div>
                <h2 className="flex items-center gap-3 text-2xl">
                  <HelpCircle className="size-6 text-teal-500" aria-hidden />
                  Frequently asked questions
                </h2>
                <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200/80 bg-white shadow-card">
                  {solution.faq.map((item, i) => (
                    <details key={item.question} className="group px-6 py-4" open={i === 0}>
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                        <span>{item.question}</span>
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 transition group-open:rotate-45" aria-hidden>
                          +
                        </span>
                      </summary>
                      <p className="mt-3 leading-relaxed text-slate-600">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            ) : null}

            <div>
              <h2 className="text-2xl">How the engagement runs</h2>
              <p className="mt-2 text-slate-600">Every Insight.360° assignment follows the same seven-step approach, scaled to your size and complexity.</p>
              <ol className="mt-6 flex flex-wrap gap-2">
                {steps.map((s, i) => (
                  <li key={s} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-navy-900">
                    <span className="text-teal-600">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-3xl border border-teal-100 bg-teal-50 p-7">
              <h3 className="text-lg">Talk to us about {solution.shortName ?? solution.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                We work with organisations across Mauritius. Tell us about yours and we will come back to you with a proportionate proposal.
              </p>
              <ButtonLink href={routes.contactFor(solution.slug)} className="mt-5 w-full" arrow>
                Make an enquiry
              </ButtonLink>
            </div>

            {tools.length ? (
              <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-card">
                <h3 className="text-lg">Related tools</h3>
                <ul className="mt-4 space-y-3">
                  {tools.map((t) => (
                    <li key={t.slug} className="flex items-start justify-between gap-3">
                      <span>
                        <span className="block font-semibold text-navy-900">{t.name}</span>
                        <span className="block text-sm text-slate-500">{t.collection.name}</span>
                      </span>
                      <Badge tone="amber">Coming soon</Badge>
                    </li>
                  ))}
                </ul>
                <Link href={routes.tools} className="mt-5 inline-block text-sm font-semibold text-teal-600 hover:text-navy-900">
                  Register interest in tools →
                </Link>
              </div>
            ) : null}

            {siblings.length ? (
              <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-card">
                <h3 className="text-lg">More in {solution.pillar.name}</h3>
                <ul className="mt-4 space-y-3">
                  {siblings.map((s) => (
                    <li key={s.slug}>
                      <Link href={routes.service(s.slug)} className="group flex items-center gap-3 font-medium text-navy-900 hover:text-teal-600">
                        <Icon name={s.icon} className="size-5 text-teal-500" />
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </Container>
      </section>

      {related.length ? (
        <section className="bg-navy-50 py-20">
          <Container>
            <h2 className="text-3xl">Related insights</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((i) => (
                <InsightCard key={i.slug} insight={i} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
