import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-900 text-white shadow-[0_8px_20px_-8px_rgb(7_54_101/0.5)] hover:bg-navy-800 hover:-translate-y-0.5",
  accent:
    "bg-teal-500 text-navy-950 shadow-[0_8px_20px_-8px_rgb(0_175_195/0.6)] hover:bg-teal-400 hover:-translate-y-0.5",
  outline:
    "border border-navy-900/15 bg-white text-navy-900 hover:border-navy-900 hover:bg-navy-50",
  ghost: "text-navy-900 hover:bg-navy-50",
  white: "bg-white text-navy-900 hover:bg-teal-50 hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  arrow?: boolean;
};

type ButtonLinkProps = CommonProps & {
  href: Route | string;
  external?: boolean;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  arrow,
  external,
}: ButtonLinkProps) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {arrow ? <ArrowRight className="size-4" aria-hidden /> : null}
    </>
  );
  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={href as Route} className={cls}>
      {content}
    </Link>
  );
}

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  arrow,
  ...rest
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {arrow ? <ArrowRight className="size-4" aria-hidden /> : null}
    </button>
  );
}
