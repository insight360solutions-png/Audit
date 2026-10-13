import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, CheckCircle2, Clock, Download, User } from "lucide-react";
import { Container } from "@/components/ui/container";
import { WhatsappIcon } from "@/components/ui/brand-icons";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { InsightBody } from "@/components/insights/mdx";
import { InsightCard } from "@/components/insights/insight-card";
import { ShareButtons } from "@/components/insights/share-buttons";
import { VideoEmbed } from "@/components/insights/video-embed";
import { CtaBand } from "@/components/sections/cta-band";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { getAllSolutions, getInsight, getInsights, getRelatedInsights, insightTypeMeta } from "@/lib/content";
import { JsonLd, articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) return {};
  return pageMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${insight.slug}`,
    type: "article",
    image: null,
    openGraph: {
      publishedTime: insight.date,
      modifiedTime: insight.updated ?? insight.date,
      authors: [insight.author],
      tags: insight.tags,
      section: insight.category,
    },
  });
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  if (!insight) notFound();

  const [related, solutions] = await Promise.all([getRelatedInsights(insight), getAllSolutions()]);
  const services = solutions.filter((s) => insight.relatedServices.includes(s.slug));
  const meta = insightTypeMeta[insight.type];
  const url = `${siteConfig.url}/insights/${insight.slug}`;

  return (
    <>
      <JsonLd data={articleJsonLd(insight)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Insights", path: "/insights" },
          { name: insight.category, path: `/insights/category/${insight.categorySlug}` },
          { name: insight.title, path: `/insights/${insight.slug}` },
        ])}
      />

      <article>
        <header className="relative overflow-hidden bg-navy-50">
          <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden />
          <Container size="narrow" className="relative py-14 sm:py-20">
            <Link href={routes.insights} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-navy-900">
              <ArrowLeft className="size-4" aria-hidden />
              All insights
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge tone="navy">
                <Icon name={meta.icon} className="size-3.5" />
                {meta.verb} · {meta.label}
              </Badge>
              <Link href={routes.insightCategory(insight.categorySlug)}>
                <Badge tone="teal">{insight.category}</Badge>
              </Link>
            </div>
            <h1 className="mt-5 text-3xl leading-[1.12] sm:text-4xl lg:text-5xl">{insight.title}</h1>
            <p className="insight-summary mt-5 text-lg leading-relaxed text-slate-600 sm:text-xl">{insight.excerpt}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <User className="size-4 text-teal-500" aria-hidden />
                {insight.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="size-4 text-teal-500" aria-hidden />
                <time dateTime={insight.date}>{formatDate(insight.date)}</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4 text-teal-500" aria-hidden />
                {insight.readingMinutes} min {insight.type === "video" ? "summary" : "read"}
              </span>
            </div>
          </Container>
        </header>

        <Container size="narrow" className="py-12 sm:py-16">
          {insight.keyTakeaways.length ? (
            <aside className="insight-takeaways mb-10 rounded-3xl border border-navy-100 bg-navy-50 p-7" aria-labelledby="key-takeaways">
              <h2 id="key-takeaways" className="text-xs font-bold tracking-[0.18em] text-teal-600 uppercase">
                Key takeaways
              </h2>
              <ul className="mt-4 space-y-3">
                {insight.keyTakeaways.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-navy-900">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-teal-500" aria-hidden />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}

          {insight.type === "video" ? (
            <div className="mb-10">
              <VideoEmbed url={insight.videoUrl} title={insight.title} />
            </div>
          ) : null}

          {insight.type === "download" && insight.resourceUrl ? (
            <div className="mb-10 flex flex-col items-start gap-4 rounded-3xl border border-teal-100 bg-teal-50 p-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-lg font-bold text-navy-900">Free resource</p>
                <p className="text-sm text-slate-600">Download and apply it in your organisation today.</p>
              </div>
              <ButtonLink href={insight.resourceUrl} variant="accent" external>
                <Download className="size-4" aria-hidden />
                {insight.resourceLabel ?? "Download"}
              </ButtonLink>
            </div>
          ) : null}

          <InsightBody source={insight.body} />

          {insight.type === "download" && insight.resourceUrl ? (
            <div className="mt-10">
              <ButtonLink href={insight.resourceUrl} variant="primary" external>
                <Download className="size-4" aria-hidden />
                {insight.resourceLabel ?? "Download"}
              </ButtonLink>
            </div>
          ) : null}

          <footer className="mt-12 space-y-8 border-t border-slate-200 pt-8">
            {insight.tags.length ? (
              <ul className="flex flex-wrap gap-2">
                {insight.tags.map((tag, i) => (
                  <li key={tag}>
                    <Link
                      href={routes.insightTag(insight.tagSlugs[i])}
                      className="inline-block rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-600 ring-1 ring-slate-200 transition hover:text-navy-900 hover:ring-teal-400"
                    >
                      #{tag}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <ShareButtons url={url} title={insight.title} />
          </footer>

          {services.length ? (
            <aside className="mt-12 rounded-3xl bg-navy-900 p-8 text-white">
              <p className="text-xs font-bold tracking-[0.18em] text-teal-400 uppercase">Related services</p>
              <h2 className="mt-2 text-2xl text-white">Need support with this?</h2>
              <ul className="mt-5 space-y-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={routes.service(s.slug)} className="group flex items-start gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-teal-400">
                        <Icon name={s.icon} className="size-4" />
                      </span>
                      <span>
                        <span className="block font-semibold group-hover:text-teal-400">{s.name}</span>
                        <span className="block text-sm text-white/65">{s.tagline}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ButtonLink href={routes.whatsapp()} variant="accent" size="sm" className="mt-6" arrow>
                <WhatsappIcon className="size-4" />
                Talk to us
              </ButtonLink>
            </aside>
          ) : null}
        </Container>
      </article>

      {related.length ? (
        <section className="bg-navy-50 py-20">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-3xl">Related content</h2>
              <Link href={routes.insights} className="text-sm font-semibold text-teal-600 hover:text-navy-900">
                All insights →
              </Link>
            </div>
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
