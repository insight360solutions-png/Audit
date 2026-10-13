import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllSolutions, getInsightCategories, getInsights } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  // Tag pages are noindex (thin), so they are deliberately not listed here.
  const [solutions, insights, categories] = await Promise.all([getAllSolutions(), getInsights(), getInsightCategories()]);
  const latest = insights[0]?.date ? new Date(insights[0].date) : new Date();

  return [
    { url: `${base}/`, lastModified: latest, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/services`, lastModified: latest, changeFrequency: "monthly", priority: 0.9 },
    ...solutions.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: latest, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${base}/tools`, lastModified: latest, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/insights`, lastModified: latest, changeFrequency: "weekly", priority: 0.9 },
    ...insights.map((i) => ({ url: `${base}/insights/${i.slug}`, lastModified: new Date(i.updated ?? i.date), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...categories.map((c) => ({ url: `${base}/insights/category/${c.slug}`, lastModified: latest, changeFrequency: "weekly" as const, priority: 0.5 })),
    { url: `${base}/contact`, lastModified: latest, changeFrequency: "yearly", priority: 0.8 },
  ];
}
