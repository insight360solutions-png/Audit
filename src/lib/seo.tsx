import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { FaqItem, Insight, Pillar, SiteSettings, Solution } from "@/lib/content";

/* ------------------------------------------------------------------ */
/*  Stable @ids let every page's JSON-LD link to the same entities,    */
/*  which is what search and answer engines use to build their graph.  */
/* ------------------------------------------------------------------ */
export const ORG_ID = `${siteConfig.url}/#organization`;
export const SITE_ID = `${siteConfig.url}/#website`;

export function abs(path: string) {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Canonical, hreflang and RSS discovery for a page (Next replaces, not merges, `alternates`). */
export function pageAlternates(canonical: string) {
  return {
    canonical,
    languages: { "en-MU": abs(canonical), "x-default": abs(canonical) },
    types: { "application/rss+xml": abs("/feed.xml") },
  };
}

const clip = (text: string, max = 160) => (text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`);

/**
 * Complete per-page metadata. Next does not merge `openGraph` / `twitter`
 * from the layout, so every page sets its own title, description and URL
 * here; otherwise shares and crawlers would see the home page's values.
 */
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  type = "website",
  noindex = false,
  image = "/opengraph-image",
  openGraph = {},
}: {
  /** Page title; the layout template appends " | Insight.360°". */
  title?: string;
  /** Full title used as-is (e.g. the home page). */
  absoluteTitle?: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
  /**
   * Share image. Defaults to the site-wide generated image; pass null when the
   * route has its own opengraph-image file (e.g. insights), which Next adds.
   */
  image?: string | null;
  openGraph?: Record<string, unknown>;
}): Metadata {
  const fullTitle = absoluteTitle ?? `${title} | ${siteConfig.name}`;
  const desc = clip(description);
  const images = image ? [{ url: image, width: 1200, height: 630, alt: `${siteConfig.name} – ${siteConfig.tagline}` }] : undefined;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description: desc,
    alternates: pageAlternates(path),
    openGraph: {
      type,
      url: abs(path),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: fullTitle,
      description: desc,
      ...(images ? { images } : {}),
      ...openGraph,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc, ...(images ? { images } : {}) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is static, trusted, build-time content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Site-wide entities (rendered once in the site layout)              */
/* ------------------------------------------------------------------ */
export function organizationJsonLd(settings: SiteSettings, pillars: Pillar[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: siteConfig.name,
    alternateName: ["Insight360", "Insight 360"],
    legalName: siteConfig.legalName,
    slogan: settings.tagline,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: { "@type": "ImageObject", url: abs("/brand/insight360-logo.png") },
    image: abs("/opengraph-image"),
    email: settings.contact.email,
    telephone: settings.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: "MU",
      addressLocality: settings.contact.location,
      streetAddress: settings.contact.addressLine,
    },
    areaServed: [{ "@type": "Country", name: "Mauritius" }, { "@type": "Place", name: "Indian Ocean region" }],
    foundingLocation: { "@type": "Place", name: "Mauritius" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: settings.contact.email,
        telephone: settings.contact.phone,
        areaServed: "MU",
        availableLanguage: ["English", "French"],
      },
    ],
    sameAs: settings.social.map((s) => s.url),
    knowsAbout: [
      "Business advisory",
      "Corporate governance",
      "Enterprise risk management",
      "Internal controls",
      "Regulatory compliance",
      "Fraud risk",
      "Standard operating procedures",
      "Key performance indicators",
      "Management reporting",
    ],
    hasOfferCatalog: pillars.length
      ? {
          "@type": "OfferCatalog",
          name: "Advisory services",
          itemListElement: pillars.map((pillar) => ({
            "@type": "OfferCatalog",
            name: pillar.name,
            description: pillar.strapline,
            itemListElement: pillar.solutions.map((s) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                "@id": abs(`/services/${s.slug}#service`),
                name: s.name,
                description: s.summary,
                url: abs(`/services/${s.slug}`),
              },
            })),
          })),
        }
      : undefined,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

/* ------------------------------------------------------------------ */
/*  Per-page helpers                                                   */
/* ------------------------------------------------------------------ */
type WebPageType = "WebPage" | "AboutPage" | "CollectionPage" | "ContactPage" | "ItemPage";

export function webPageJsonLd({
  type = "WebPage",
  path,
  name,
  description,
}: {
  type?: WebPageType;
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
  };
}

export function itemListJsonLd(name: string, items: Array<{ name: string; url: string; description?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function serviceJsonLd(solution: Solution & { pillar: { name: string } }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": abs(`/services/${solution.slug}#service`),
    name: solution.name,
    alternateName: solution.shortName,
    description: solution.summary,
    serviceType: solution.pillar.name,
    category: solution.pillar.name,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Mauritius" },
    audience: solution.whoItIsFor.length
      ? { "@type": "BusinessAudience", audienceType: solution.whoItIsFor.join("; ") }
      : undefined,
    url: abs(`/services/${solution.slug}`),
  };
}

export function articleJsonLd(insight: Insight) {
  const url = abs(`/insights/${insight.slug}`);
  const base = {
    "@context": "https://schema.org",
    "@id": `${url}#article`,
    headline: insight.title,
    description: insight.excerpt,
    abstract: insight.keyTakeaways.length ? insight.keyTakeaways.join(" ") : insight.excerpt,
    datePublished: insight.date,
    dateModified: insight.updated ?? insight.date,
    author: { "@type": "Organization", "@id": ORG_ID, name: insight.author },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    isPartOf: { "@id": SITE_ID },
    inLanguage: "en",
    keywords: insight.tags.join(", "),
    articleSection: insight.category,
    wordCount: insight.body.trim().split(/\s+/).length,
    image: `${url}/opengraph-image`,
    // Lets voice and answer engines pick the summary without parsing the body.
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".insight-summary", ".insight-takeaways"] },
  };
  if (insight.type === "video" && insight.videoUrl) {
    return {
      ...base,
      "@type": "VideoObject",
      name: insight.title,
      uploadDate: insight.date,
      embedUrl: insight.videoUrl,
      thumbnailUrl: base.image,
    };
  }
  return { ...base, "@type": insight.type === "guide" ? "TechArticle" : "Article" };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}
