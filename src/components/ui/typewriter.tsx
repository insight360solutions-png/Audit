"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type TypewriterSegment = { text: string; className?: string };

type Word = { kind: "word"; chars: string[] } | { kind: "space" };
type PreparedSegment = { className?: string; words: Word[] };

function prepare(segments: TypewriterSegment[]): PreparedSegment[] {
  return segments.map((segment) => ({
    className: segment.className,
    words: segment.text
      .split(/(\s+)/)
      .filter(Boolean)
      .map<Word>((chunk) => (/^\s+$/.test(chunk) ? { kind: "space" } : { kind: "word", chars: [...chunk] })),
  }));
}

const hidden: CSSProperties = { visibility: "hidden" };

/**
 * Letter-by-letter "typing" reveal. The full text is server-rendered (SEO,
 * no layout shift) and a screen-reader copy is always available; the visible
 * letters are revealed one at a time by timers after hydration. Honours
 * prefers-reduced-motion and shows the text immediately without JavaScript.
 */
export function Typewriter({
  segments,
  stepMs = 30,
  startMs = 0,
  className,
}: {
  segments: TypewriterSegment[];
  stepMs?: number;
  startMs?: number;
  className?: string;
}) {
  const fullText = segments.map((s) => s.text).join("");
  const prepared = prepare(segments);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const chars = Array.from(root.querySelectorAll<HTMLElement>(".type-char"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];

    if (reduce) {
      chars.forEach((c) => (c.style.visibility = "visible"));
      return;
    }

    // Reveal one letter at a time; the blinking caret (CSS ::after) rides on
    // the most recently revealed letter and disappears shortly after the end.
    chars.forEach((c, i) => {
      timers.push(
        window.setTimeout(() => {
          chars[i - 1]?.classList.remove("type-current");
          c.classList.add("type-current");
          c.style.visibility = "visible";
        }, startMs + i * stepMs),
      );
    });
    timers.push(
      window.setTimeout(() => chars.at(-1)?.classList.remove("type-current"), startMs + chars.length * stepMs + 1400),
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [startMs, stepMs]);

  return (
    <span className={cn("typewriter", className)}>
      <span className="sr-only">{fullText}</span>
      <noscript>
        <style>{`.typewriter .type-char{visibility:visible!important}`}</style>
      </noscript>
      <span ref={ref} aria-hidden>
        {prepared.map((segment, s) => (
          <span key={s} className={segment.className}>
            {segment.words.map((word, w) =>
              word.kind === "space" ? (
                <span key={w}> </span>
              ) : (
                // Keep each word unbreakable so letters never wrap mid-word.
                <span key={w} className="whitespace-nowrap">
                  {word.chars.map((char, i) => (
                    <span key={i} className="type-char" style={hidden}>
                      {char}
                    </span>
                  ))}
                </span>
              ),
            )}
          </span>
        ))}
      </span>
    </span>
  );
}
