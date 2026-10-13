import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import { routes } from "@/config/routes";
import { insightTypeMeta, type Insight, type InsightType, type Taxonomy } from "@/lib/content";
import { cn } from "@/lib/utils";
import { InsightCard } from "./insight-card";

const typeOrder: InsightType[] = ["video", "article", "guide", "download"];

export function InsightsListing({
  insights,
  categories,
  tags,
  activeType,
  activeCategory,
  activeTag,
  basePath,
}: {
  insights: Insight[];
  categories: Taxonomy[];
  tags: Taxonomy[];
  activeType?: InsightType;
  activeCategory?: string;
  activeTag?: string;
  /** Path that type filters append to, e.g. /insights or /insights/category/risk */
  basePath: string;
}) {
  const typeHref = (type?: InsightType) => (type ? `${basePath}?type=${type}` : basePath);
  const [lead, ...rest] = insights;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        {/* Type filter */}
        <div className="flex flex-wrap items-center gap-2" role="navigation" aria-label="Filter by content type">
          <Link
            href={typeHref() as never}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition",
              !activeType ? "bg-navy-900 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-navy-900",
            )}
          >
            All
          </Link>
          {typeOrder.map((type) => {
            const meta = insightTypeMeta[type];
            return (
              <Link
                key={type}
                href={typeHref(type) as never}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                  activeType === type ? "bg-navy-900 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-navy-900",
                )}
              >
                <Icon name={meta.icon} className="size-4" />
                {meta.verb}
              </Link>
            );
          })}
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {insights.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center">
                <p className="font-display text-xl font-bold text-navy-900">Nothing here yet</p>
                <p className="mt-2 text-slate-600">New content is published regularly. Try another filter.</p>
                <Link href={routes.insights} className="mt-5 inline-block font-semibold text-teal-600">
                  View all insights →
                </Link>
              </div>
            ) : (
              <>
                {lead && !activeType && !activeTag ? <InsightCard insight={lead} featured headingLevel="h2" /> : null}
                <div className={cn("grid gap-6 md:grid-cols-2", lead && !activeType && !activeTag && "mt-6")}>
                  {(lead && !activeType && !activeTag ? rest : insights).map((i) => (
                    <InsightCard key={i.slug} insight={i} headingLevel="h2" />
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="space-y-10 lg:col-span-4">
            <div>
              <h2 className="text-sm font-bold tracking-[0.16em] text-navy-900 uppercase">Categories</h2>
              <ul className="mt-4 space-y-1">
                <li>
                  <Link
                    href={routes.insights}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-2.5 text-[0.95rem] font-medium transition",
                      !activeCategory ? "bg-teal-50 text-navy-900" : "text-slate-600 hover:bg-navy-50 hover:text-navy-900",
                    )}
                  >
                    All categories
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={routes.insightCategory(c.slug)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-2.5 text-[0.95rem] font-medium transition",
                        activeCategory === c.slug ? "bg-teal-50 text-navy-900" : "text-slate-600 hover:bg-navy-50 hover:text-navy-900",
                      )}
                    >
                      {c.name}
                      <span className="text-xs text-slate-500">{c.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-[0.16em] text-navy-900 uppercase">Topics</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={routes.insightTag(t.slug)}
                      className={cn(
                        "inline-block rounded-full px-3 py-1.5 text-sm font-medium ring-1 transition",
                        activeTag === t.slug
                          ? "bg-navy-900 text-white ring-navy-900"
                          : "bg-white text-slate-600 ring-slate-200 hover:text-navy-900 hover:ring-teal-400",
                      )}
                    >
                      #{t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-navy-900 p-7 text-white">
              <p className="font-display text-lg font-bold">Insight → Resource → Tool → Advisory</p>
              <p className="mt-2 text-sm text-white/70">
                Our content helps organisations recognise issues, understand good practice, apply practical tools and know when
                specialist support may be useful.
              </p>
              <a href={routes.whatsapp()} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-teal-400 hover:text-white">
                Talk to us on WhatsApp →
              </a>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
