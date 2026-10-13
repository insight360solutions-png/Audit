import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icons";
import { routes } from "@/config/routes";
import { insightTypeMeta, type Insight } from "@/lib/content";
import { cn, formatDate } from "@/lib/utils";

const typeTone: Record<Insight["type"], string> = {
  article: "from-navy-900 to-navy-700",
  guide: "from-teal-600 to-mint-500",
  video: "from-navy-800 to-teal-500",
  download: "from-slate-700 to-navy-900",
};

export function InsightCard({
  insight,
  featured = false,
  headingLevel = "h3",
}: {
  insight: Insight;
  featured?: boolean;
  /** h2 on listing pages (cards sit directly under the page h1), h3 inside a titled section. */
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const meta = insightTypeMeta[insight.type];
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-card-hover",
        featured && "lg:flex-row",
      )}
    >
      <div
        className={cn(
          "relative flex shrink-0 items-end bg-gradient-to-br p-6 text-white",
          typeTone[insight.type],
          featured ? "min-h-56 lg:w-2/5" : "min-h-40",
        )}
      >
        <div className="absolute inset-0 bg-dots opacity-30 [mask-image:linear-gradient(to_top,black,transparent)]" aria-hidden />
        <div className="absolute top-5 left-6 flex size-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 backdrop-blur">
          <Icon name={meta.icon} className="size-5" />
        </div>
        <span className="relative text-xs font-bold tracking-[0.2em] text-white/90 uppercase">
          {meta.verb} · {meta.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <Badge tone="teal">{insight.category}</Badge>
          <span>{formatDate(insight.date)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden />
            {insight.readingMinutes} min
          </span>
        </div>
        <Heading className={cn("mt-3 leading-snug", featured ? "text-2xl" : "text-lg")}>
          <Link href={routes.insight(insight.slug)} className="after:absolute after:inset-0">
            {insight.title}
          </Link>
        </Heading>
        <p className={cn("mt-3 text-slate-600", featured ? "text-base" : "line-clamp-3 text-sm leading-relaxed")}>{insight.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-teal-600 transition group-hover:text-navy-900">
          {meta.verb} now
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
    </article>
  );
}
