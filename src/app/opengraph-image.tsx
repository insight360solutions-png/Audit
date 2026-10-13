import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} – ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(path.join(process.cwd(), "public/brand/insight360-logo-light-512.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
          padding: 80,
          background: "linear-gradient(135deg, #041f3d 0%, #073665 55%, #0a4a84 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <img src={logoSrc} width={380} height={380} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 620 }}>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.8)", lineHeight: 1.3 }}>
            Independent business advisory in Mauritius
          </div>
          <div style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.15 }}>{siteConfig.tagline}</div>
          <div style={{ fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: "#2ec4d4", marginTop: 8 }}>
            Business Advisory · Governance · Risk · Compliance
          </div>
        </div>
      </div>
    ),
    size,
  );
}
