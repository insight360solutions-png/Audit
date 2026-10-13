import { ArrowUpRight, Briefcase, Lightbulb, Wrench } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HeroEmblem } from "@/components/ui/hero-emblem";
import { WhatsappIcon } from "@/components/ui/brand-icons";
import { Typewriter } from "@/components/ui/typewriter";
import { routes } from "@/config/routes";

const lines = [
  { icon: Briefcase, label: "Advisory", text: "We help you.", href: routes.services },
  { icon: Wrench, label: "Tools", text: "We equip you.", href: routes.tools },
  { icon: Lightbulb, label: "Insights", text: "We inform you.", href: routes.insights },
];

export function HomeHero({ descriptor }: { descriptor: string }) {
  const pillars = descriptor.split("|").map((s) => s.trim());
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden />
      <div className="pointer-events-none absolute top-1/2 -left-40 size-[36rem] -translate-y-1/2 rounded-full bg-teal-100/60 blur-3xl" aria-hidden />
      <Container className="relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div className="lg:col-span-7">
          <Eyebrow className="mb-5 animate-fade-up">Business Advisory · Governance · Risk · Compliance</Eyebrow>
          <h1 className="animate-fade-up text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem] [animation-delay:80ms]">
            <Typewriter
              segments={[
                { text: "A " },
                { text: "360° perspective", className: "text-gradient" },
                { text: " on better business." },
              ]}
            />
          </h1>
          <p className="mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-slate-600 sm:text-xl [animation-delay:160ms]">
            Insight.360° is an independent business advisory practice in Mauritius, helping organisations strengthen performance,
            governance, risk management, internal controls and compliance.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 animate-fade-up [animation-delay:240ms]">
            <ButtonLink href={routes.services} size="lg" arrow>
              Explore our services
            </ButtonLink>
            <ButtonLink href={routes.whatsapp()} variant="outline" size="lg">
              <WhatsappIcon className="size-5 text-[#25D366]" />
              Talk to us
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-navy-900/80 animate-fade-up [animation-delay:320ms]">
            {pillars.map((p) => (
              <li key={p} className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-teal-500" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div className="relative aspect-square">
            <HeroEmblem className="absolute inset-0" />
            {lines.map((line, i) => (
              <a
                key={line.label}
                href={line.href}
                className={[
                  "absolute hidden items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover animate-float sm:flex",
                  i === 0 && "top-[6%] -left-2 sm:-left-6 [animation-delay:0s]",
                  i === 1 && "right-[-4%] bottom-[30%] sm:right-[-8%] [animation-delay:1.2s]",
                  i === 2 && "bottom-[2%] left-[8%] [animation-delay:2.4s]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <line.icon className="size-5" aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold text-navy-900">{line.label}</span>
                  <span className="block text-xs text-slate-500">{line.text}</span>
                </span>
                <ArrowUpRight className="ml-1 size-4 text-slate-300" aria-hidden />
              </a>
            ))}
          </div>
          {/* Compact version of the floating cards for narrow screens */}
          <ul className="mt-6 grid grid-cols-3 gap-2 sm:hidden">
            {lines.map((line) => (
              <li key={line.label}>
                <a href={line.href} className="flex flex-col items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white px-2 py-3 text-center shadow-card">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                    <line.icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-sm font-bold text-navy-900">{line.label}</span>
                  <span className="text-[11px] text-slate-500">{line.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
