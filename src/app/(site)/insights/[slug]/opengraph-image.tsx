import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getInsight, insightTypeMeta } from "@/lib/content";

export const alt = "Insight.360° insight";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = await getInsight(slug);
  const title = insight?.title ?? "Insight.360°";
  const kicker = insight ? `${insightTypeMeta[insight.type].verb} · ${insight.category}` : "Better Insight. Better Business.";
  const logo = await readFile(path.join(process.cwd(), "public/brand/insight360-logo-512.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #041f3d 0%, #073665 55%, #0a4a84 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 96, height: 96, borderRadius: 20, background: "white", alignItems: "center", justifyContent: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={84} height={84} alt="" />
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>Insight.360° Insights</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#2ec4d4", fontWeight: 700 }}>{kicker}</div>
          <div style={{ fontSize: title.length > 70 ? 52 : 62, fontWeight: 800, lineHeight: 1.1, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.7)" }}>Better Insight. Better Business.</div>
      </div>
    ),
    size,
  );
}
