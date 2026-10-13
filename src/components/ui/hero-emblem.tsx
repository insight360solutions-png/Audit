import Image from "next/image";
import { Gear } from "@/components/ui/gear";
import { RingMark } from "@/components/ui/ring-mark";
import { cn } from "@/lib/utils";

/**
 * The signature hero graphic: the outer 360° ring, a light grey cog turning
 * anticlockwise, and the Insight.360° logo held upright in the centre.
 * Used on the home hero and on every page hero so the brand mark is identical
 * everywhere. Text scales with the emblem via container-query units.
 *
 * The caller positions it (add `relative` or `absolute`) and sizes it.
 */
export function HeroEmblem({
  className,
  labelClassName = "flex",
}: {
  className?: string;
  /** Display classes for the centre logo, e.g. "hidden xl:flex" to hide it where space is tight (the cog still turns). */
  labelClassName?: string;
}) {
  return (
    <div className={cn("@container aspect-square", className)} aria-hidden>
      <RingMark className="drop-shadow-[0_24px_40px_rgb(7_54_101/0.18)]" />
      <div className="absolute inset-[19%] flex items-center justify-center">
        <Gear className="absolute inset-0 origin-center animate-spin-slow [animation-direction:reverse] [animation-duration:28s] drop-shadow-[0_10px_24px_rgb(7_54_101/0.18)] motion-reduce:animate-none" />
        {/* Logo (transparent) held upright inside the turning cog */}
        <div className={cn("relative w-[66%] items-center justify-center", labelClassName)}>
          <Image
            src="/brand/insight360-logo-transparent-480.webp"
            alt=""
            width={480}
            height={480}
            sizes="(min-width: 1024px) 320px, 60vw"
            className="size-full object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
