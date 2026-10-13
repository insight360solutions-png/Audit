import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The Insight.360° logo (same artwork as inside the hero wheel and the
 * favicon). On dark backgrounds it sits in a white tile so the artwork reads
 * exactly as designed.
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
    <Link
      href="/"
      aria-label="Insight.360° – home"
      className={cn(
        "inline-flex shrink-0 items-center",
        tone === "light" && "rounded-2xl bg-white p-2 shadow-card",
        className,
      )}
    >
      <Image
        src="/brand/insight360-logo-480.webp"
        alt="Insight.360° – Better Insight. Better Business."
        width={480}
        height={480}
        priority
        className={cn("w-auto", size === "md" ? "h-12 sm:h-16" : "h-20", tone === "dark" && "mix-blend-multiply")}
      />
    </Link>
  );
}
