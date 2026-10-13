"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { primaryNav } from "@/config/routes";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-all",
        scrolled ? "border-slate-200 shadow-[0_6px_24px_-12px_rgb(7_54_101/0.25)]" : "border-transparent",
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between gap-6 sm:h-20">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative rounded-full px-4 py-2 text-[0.95rem] font-semibold transition",
                isActive(item.href) ? "text-navy-900" : "text-slate-600 hover:text-navy-900",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-teal-500 transition-transform",
                  isActive(item.href) ? "scale-x-100" : "scale-x-0",
                )}
                aria-hidden
              />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href={routes.contact} variant="accent" size="sm" arrow>
            Get in touch
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-full text-navy-900 hover:bg-navy-50 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-slate-200 bg-white shadow-[0_24px_40px_-16px_rgb(7_54_101/0.3)]">
          <Container className="flex flex-col gap-2 py-6">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-3.5 text-lg font-semibold",
                  isActive(item.href) ? "bg-teal-50 text-navy-900" : "text-slate-700 hover:bg-navy-50",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4" onClickCapture={() => setOpen(false)}>
              <ButtonLink href={routes.contact} variant="accent" className="w-full" arrow>
                Get in touch
              </ButtonLink>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
