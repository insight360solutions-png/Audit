import type { Metadata } from "next";
import { InsightsHero } from "@/components/insights/insights-hero";
import { InsightsListing } from "@/components/insights/insights-listing";
import { CtaBand } from "@/components/sections/cta-band";
import { getInsightCategories, getInsightTags, insightTypeSchema, queryInsights } from "@/lib/content";
import { JsonLd, abs, breadcrumbJsonLd, itemListJsonLd, webPageJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Governance, Risk & Compliance Insights and Guides",
  description:
    "Practical articles, guides, videos and checklists on governance, risk management, internal controls and compliance from Insight.360° in Mauritius.",
  path: "/insights",
});

type Props = { searchParams: Promise<{ type?: string }> };

export default async function InsightsPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const parsedType = insightTypeSchema.safeParse(type);
  const activeType = parsedType.success ? parsedType.data : undefined;

  const [insights, categories, tags] = await Promise.all([
    queryInsights({ type: activeType }),
    getInsightCategories(),
    getInsightTags(),
  ]);

  return (
    <>
      <JsonLd data={webPageJsonLd({ type: "CollectionPage", path: "/insights", name: "Insights", description: metadata.description as string })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Insights", path: "/insights" }])} />
      <JsonLd
        data={itemListJsonLd(
          "Insight.360° Insights",
          insights.slice(0, 50).map((i) => ({ name: i.title, url: abs(`/insights/${i.slug}`), description: i.excerpt })),
        )}
      />
      <InsightsHero
        title={
          <>
            Ideas and knowledge for <span className="text-gradient">better decisions.</span>
          </>
        }
        description="Insight.360° Insights translates business, governance, risk and compliance topics into clear, useful and practical content."
      />
      <InsightsListing insights={insights} categories={categories} tags={tags} activeType={activeType} basePath="/insights" />
      <CtaBand
        title="Recognised an issue in your organisation?"
        description="Our content is designed to do more than create awareness. When deeper assessment or implementation support would help, we are a conversation away."
      />
    </>
  );
}
