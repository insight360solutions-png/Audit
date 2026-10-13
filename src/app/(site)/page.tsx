import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home-hero";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { HowWeWork } from "@/components/sections/how-we-work";
import { ServicesOverview } from "@/components/sections/services-overview";
import { ToolsPreview } from "@/components/sections/tools-preview";
import { BusinessLines } from "@/components/sections/business-lines";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd, webPageJsonLd, pageMetadata } from "@/lib/seo";
import { getInsights, getPillars, getSiteSettings, getToolCollections } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  absoluteTitle: "Business Advisory, Governance & Risk in Mauritius | Insight.360°",
  description:
    "Independent business advisory in Mauritius: governance, risk management, internal controls, compliance and performance. Practical, proportionate advice.",
  path: "/",
});

export default async function HomePage() {
  const [settings, pillars, insights, collections] = await Promise.all([
    getSiteSettings(),
    getPillars(),
    getInsights(),
    getToolCollections(),
  ]);
  const featured = [...insights].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          type: "AboutPage",
          path: "/",
          name: "Who We Are",
          description: metadata.description as string,
        })}
      />
      <HomeHero descriptor={settings.descriptor} />
      <WhoWeAre purpose={settings.purpose} />
      <HowWeWork />
      <ServicesOverview pillars={pillars} />
      <ToolsPreview collections={collections} />
      <InsightsPreview insights={featured} />
      <BusinessLines />
      <CtaBand />
    </>
  );
}
