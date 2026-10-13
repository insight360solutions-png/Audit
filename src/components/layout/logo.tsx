import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The Insight.360° logo on a transparent background (same artwork as inside
 * the hero wheel and the favicon). `tone="light"` uses the reversed variant,
 * with white lettering, for dark backgrounds such as the footer.
 */
export function Logo({
  className,
  tone = "dark",
  size = "md",
}: {
  className?: string;
  tone?: "dark" | "light";
  size?: "md" | "lg";
}) {
  return (
    <Link href="/" aria-label="Insight.360° – home" className={cn("inline-flex shrink-0 items-center", className)}>
      <Image
        src={tone === "light" ? "/brand/insight360-logo-light-480.webp" : "/brand/insight360-logo-transparent-480.webp"}
        alt="Insight.360° – Better Insight. Better Business."
        width={480}
        height={480}
        priority={tone === "dark"}
        className={cn("w-auto", size === "md" ? "h-12 sm:h-16" : "h-24")}
      />
    </Link>
  );
}
