import type { Metadata } from "next";
import { BookOpen, PlayCircle, FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { ToolInterestForm } from "@/components/forms/tool-interest-form";
import { routes } from "@/config/routes";
import { getToolCollections } from "@/lib/content";
import { JsonLd, abs, breadcrumbJsonLd, itemListJsonLd, webPageJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Governance, Risk & Compliance Tools and Templates",
  description:
    "Practical business, governance, risk and compliance tools from Insight.360° in Mauritius: diagnostics, KPI dashboards, SOP toolkits, risk registers and more.",
  path: "/tools",
});

const support = [
  { icon: BookOpen, title: "User guides", text: "Step-by-step guidance for every tool." },
  { icon: FileText, title: "Worked examples", text: "Completed examples to learn from." },
  { icon: PlayCircle, title: "Tutorial videos", text: "Short walk-throughs for quick adoption." },
];

export default async function ToolsPage() {
  const collections = await getToolCollections();

  return (
    <>
      <JsonLd data={webPageJsonLd({ type: "CollectionPage", path: "/tools", name: "Tools", description: metadata.description as string })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Tools", path: "/tools" }])} />
      <JsonLd
        data={itemListJsonLd(
          "Insight.360° tool collections",
          collections.map((c) => ({ name: c.name, url: abs(`/tools#${c.slug}`), description: c.description })),
        )}
      />
      <PageHero
        eyebrow="03 · Tools"
        title={
          <>
            Professional tools. <span className="text-gradient">Practical application.</span>
          </>
        }
        description="Insight.360° develops practical business tools that help organisations bring greater structure, visibility and control to the way they work. They complement our advisory services but are designed for practical self-use."
        crumbs={[{ label: "Tools" }]}
      />

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Tool collections"
            title="Built around real business needs."
            description="Client-facing digital tools are simplified, user-friendly products. Each collection maps to one of our advisory pillars so you can start where it matters most."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {collections.map((collection) => (
              <div key={collection.slug} id={collection.slug} className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-8 shadow-card">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-navy-900 text-white">
                    <Icon name={collection.icon} className="size-7" />
                  </div>
                  <Badge tone="slate">{collection.tools.length} tools</Badge>
                </div>
                <h3 className="mt-6 text-2xl">{collection.name}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{collection.description}</p>
                <ul className="mt-6 divide-y divide-slate-100 border-t border-slate-100">
                  {collection.tools.map((tool) => (
                    <li key={tool.slug} className="flex items-start justify-between gap-4 py-3.5">
                      <div>
                        <p className="font-semibold text-navy-900">{tool.name}</p>
                        {tool.description ? <p className="mt-0.5 text-sm text-slate-500">{tool.description}</p> : null}
                        {tool.format ? <p className="mt-1 text-xs font-medium tracking-wide text-slate-500 uppercase">{tool.format}</p> : null}
                      </div>
                      <Badge tone={tool.status === "available" ? "teal" : "amber"} className="shrink-0">
                        {tool.status === "available" ? "Available" : "Coming soon"}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Learning and implementation"
              title="More than a download."
              description="Selected tools can be supported by user guides, worked examples and short tutorial videos, creating a practical learning and implementation experience for business owners, managers and professionals."
            />
            <ul className="mt-10 space-y-4">
              {support.map((s) => (
                <li key={s.title} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-card">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                    <s.icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold text-navy-900">{s.title}</span>
                    <span className="block text-sm text-slate-600">{s.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-navy-900 p-8 text-white sm:p-10">
            <p className="font-display text-2xl leading-snug font-bold sm:text-3xl">
              Advisory helps you. <span className="text-teal-400">Tools equip you.</span> Insights inform you.
            </p>
            <p className="mt-5 text-white/70">
              Our tools complement our advisory services. Insight.360° internal consulting methodologies remain proprietary; the
              client-facing tools distil them into products you can apply yourself.
            </p>
          </div>
        </Container>
      </section>

      <section id="register-interest" className="scroll-mt-24 py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Register your interest"
              title="Be first to know when the tools launch."
              description="Tell us which collections matter to you. We will notify you at launch and may invite you to preview selected tools."
            />
          </div>
          <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-card sm:p-9 lg:col-span-7">
            <ToolInterestForm collections={collections.map((c) => ({ slug: c.slug, name: c.name }))} />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Need help applying a tool?"
        description="Where deeper assessment or implementation support is required, our advisory team can step in with a structured engagement."
        primaryLabel="Talk to an advisor"
        secondaryLabel="View services"
        secondaryHref={routes.services}
      />
    </>
  );
}
