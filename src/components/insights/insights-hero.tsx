import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/page-hero";
import { getSiteSettings, insightTypeMeta, type InsightType, type SiteSettings } from "@/lib/content";
import { cn } from "@/lib/utils";

const order: InsightType[] = ["video", "article", "guide", "download"];

/** Where each content type card leads off-site (social URLs come from content/site.json). */
const external: Partial<Record<InsightType, { platform: SiteSettings["social"][number]["platform"]; label: string }>> = {
  video: { platform: "youtube", label: "Watch on YouTube" },
  article: { platform: "linkedin", label: "Read on LinkedIn" },
};

export async function InsightsHero({
  title,
  description,
  crumbs,
}: {
  title: React.ReactNode;
  description: string;
  crumbs?: Array<{ label: string; href?: string }>;
}) {
  const settings = await getSiteSettings();

  return (
    <PageHero eyebrow="04 · Insights" title={title} description={description} crumbs={crumbs ?? [{ label: "Insights" }]}>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {order.map((type) => {
          const meta = insightTypeMeta[type];
          const target = external[type];
          const href = target ? settings.social.find((s) => s.platform === target.platform)?.url : undefined;

          const body = (
            <>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                <Icon name={meta.icon} className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2 text-xs font-bold tracking-[0.16em] text-navy-900 uppercase">
                  {meta.verb}
                  {href ? <ArrowUpRight className="size-4 text-slate-500 transition group-hover:text-teal-600" aria-hidden /> : null}
                </span>
                <span className="block text-sm text-slate-600">{meta.description}</span>
                {href && target ? (
                  <span className="mt-2 block text-xs font-semibold text-teal-600 group-hover:text-navy-900">{target.label} →</span>
                ) : null}
              </span>
            </>
          );

          const card = "flex h-full items-start gap-3 rounded-2xl border border-navy-900/10 bg-white/80 p-4 backdrop-blur";
          return (
            <li key={type}>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(card, "group transition hover:-translate-y-0.5 hover:border-teal-300 hover:bg-white hover:shadow-card")}
                >
                  {body}
                </a>
              ) : (
                <div className={card}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </PageHero>
  );
}
