# SEO and GEO guide

This site is built to be found by **search engines** (SEO) and to be understood and
cited correctly by **AI answer engines** such as ChatGPT, Perplexity, Claude and Google
AI Overviews (GEO, generative engine optimisation). It also carries geographic signals
for the Mauritius market. This document lists what is in place, what to do at launch,
and how to keep it that way as content grows.

## What is built in

### Technical SEO

| Item | Where |
| --- | --- |
| Static, fast pages; no third-party scripts or fonts | whole site |
| Keyword + locality titles (≤ ~64 chars) and meta descriptions (≤ 160 chars, mention Mauritius) | `pageMetadata()` in `src/lib/seo.tsx`, used by every `page.tsx` |
| Per-page Open Graph / Twitter title, description, URL and image (Next does not inherit these from the layout) | `pageMetadata()` |
| Canonical URL and `hreflang` (`en-MU`, `x-default`) on every page; filtered Insights views canonicalise to the base list | `pageAlternates()` |
| Thin tag pages are `noindex, follow` and left out of the sitemap; category pages stay indexed | `insights/tag/[tag]/page.tsx`, `sitemap.ts` |
| Open Graph + Twitter cards, generated OG images (site-wide and per insight) | `src/app/opengraph-image.tsx`, `insights/[slug]/opengraph-image.tsx` |
| `sitemap.xml` covering pages, solutions, insights, categories and tags | `src/app/sitemap.ts` |
| `robots.txt` allowing all crawlers (AI crawlers listed explicitly), blocking `/api` and `/admin` | `src/app/robots.ts` |
| Web app manifest, favicons, theme colour | `src/app/manifest.ts`, `icon.tsx`, `apple-icon.tsx` |
| Security headers, `X-Robots` friendly, no `powered-by` | `next.config.ts` |
| Breadcrumbs (visible + schema), semantic headings, one `h1` per page | page heroes |
| Search Console / Bing verification via env vars | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION` |

### Structured data (JSON-LD)

All entities share stable `@id`s so engines can connect them.

| Page | Schema |
| --- | --- |
| Every page | `ProfessionalService` (the organisation, with contact point, area served = Mauritius, `knowsAbout`, and an `OfferCatalog` of all services) and `WebSite` |
| Home | `AboutPage` |
| Services | `CollectionPage`, `BreadcrumbList`, `ItemList` of the eight solutions |
| Solution page | `Service`, `ItemPage`, `BreadcrumbList`, **`FAQPage`** from the solution's FAQ |
| Tools | `CollectionPage`, `BreadcrumbList`, `ItemList` of collections |
| Insights | `CollectionPage`, `BreadcrumbList`, `ItemList` of posts |
| Insight | `Article` / `TechArticle` / `VideoObject` with `speakable`, `abstract`, `wordCount`, `BreadcrumbList` |
| Contact | `ContactPage`, `BreadcrumbList` |

Validate with https://validator.schema.org and Google's Rich Results Test after deploy.

### GEO (answer engines)

- **`/llms.txt`** and **`/llms-full.txt`**: machine-readable summaries of the practice,
  services (with FAQs), tools, insights and contact details in the llmstxt.org format.
  Generated from `/content`, so they are always current.
- **FAQ sections** on every solution page, also emitted as `FAQPage` schema. Answer
  engines quote short, direct Q&A.
- **Key takeaways** block at the top of every insight (also used as the article
  `abstract`). Three quotable sentences per piece.
- **Entity clarity**: the organisation description, alternate names ("Insight360"),
  slogan, location and areas of expertise are stated identically in schema, `llms.txt`
  and visible copy.
- **RSS feed** at `/feed.xml` with categories, linked from every page's `<head>`.
- **AI crawlers allowed** by name in `robots.txt`.

### Geographic signals (Mauritius)

- `geo.region` / `geo.placename` meta tags; `og:locale` `en_MU`.
- `PostalAddress` (country MU), `areaServed`, `foundingLocation` and a `ContactPoint`
  with English and French in the organisation schema.
- "Mauritius" appears in the home description, footer and contact page copy.

## Measured quality (Lighthouse, mobile, production build)

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home | 93 | 100 | 100 | 100 |
| Services | 95 | 100 | 100 | 100 |
| Service detail | 96 | 100 | 100 | 100 |
| Tools | 93 | 100 | 100 | 100 |
| Insights | 96 | 100 | 100 | 100 |
| Insight article | 96 | 100 | 100 | 100 |
| Contact | 93 | 100 | 100 | 100 |

Text colours meet WCAG AA contrast (teal text `#007785`, grey text `#667080`, navy
lettering on teal buttons). Layout shift is effectively zero. Lab LCP is about 3 s on
Lighthouse's throttled mobile profile; field values on Vercel's CDN are usually lower.
Re-run with `npx lighthouse <url> --view` after significant design changes.

## What ranking on Google still depends on

The site is technically ready; position in results is earned over time by signals
outside the code:

1. **Google Business Profile** with the same name, email and website (biggest local lever).
2. **Backlinks and citations**: Business Mauritius, MCCI, professional bodies, partner
   firms, LinkedIn articles linking back to insights.
3. **Fresh, specific content**: one or two insights a month answering questions clients
   actually ask, each linking to the relevant service page.
4. **Search Console**: submit the sitemap, watch which queries show impressions, and
   strengthen the pages ranking on page two.
5. **Reviews** on the Business Profile from satisfied clients.

## Launch checklist

1. Set `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy; check
   `/sitemap.xml`, `/robots.txt`, `/feed.xml`, `/llms.txt`.
2. **Google Search Console**: verify (token in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`),
   submit the sitemap, request indexing of the five main pages.
3. **Bing Webmaster Tools**: verify (token in `NEXT_PUBLIC_BING_SITE_VERIFICATION`) and
   import from Search Console. Bing powers ChatGPT search and Copilot answers.
4. **Google Business Profile**: create a profile for Insight.360° (category:
   Business management consultant; service area: Mauritius). This is the single most
   important local/geo step. Use exactly the same name, email and phone as the site.
5. **LinkedIn company page**: fill in the same description and link the website; add the
   URL to `content/site.json` `social` so it appears in `sameAs`.
6. Add the practice to Mauritius business directories (e.g. Business Mauritius, MCCI,
   Economic Development Board listings where eligible) with consistent name/contact.
7. Run the Rich Results Test on a solution page and an insight.
8. Run Lighthouse (aim for 90+ on Performance, Accessibility, SEO).

## Keeping it strong

- **Every new insight**: write a specific `excerpt` (one or two sentences that answer
  "what will I learn"), three `keyTakeaways`, 3 to 6 `tags`, and use descriptive `##`
  headings phrased as questions where natural. Publish regularly; recency matters.
- **Every service change**: keep `summary` factual and keep the `faq` list to real
  questions clients ask. Avoid marketing superlatives; answer engines prefer plain,
  verifiable statements.
- **Mention Mauritius** naturally where relevant (regulation, market context) rather
  than stuffing it in.
- Prefer one canonical URL per topic; do not duplicate content across pages.
- Review Search Console quarterly for queries and pages, and expand insights that rank
  on page two.
