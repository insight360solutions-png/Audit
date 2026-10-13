import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/config/site";
import "./globals.css";

/**
 * Fonts are self-hosted (variable WOFF2 from Google Fonts) so builds never
 * depend on an external download and there are no third-party font requests.
 */
const inter = localFont({
  src: [{ path: "../fonts/inter-latin.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const jakarta = localFont({
  src: [{ path: "../fonts/jakarta-latin.woff2", weight: "600 800", style: "normal" }],
  variable: "--font-jakarta",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48 32x32 16x16" },
      { url: "/icon.png", type: "image/png", sizes: "256x256" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  category: "business",
  // Search Console / Bing Webmaster ownership tokens, set per environment.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },
  // Geographic targeting hints for the Mauritius market.
  other: {
    "geo.region": "MU",
    "geo.placename": "Mauritius",
    "content-language": "en",
  },
};

export const viewport: Viewport = {
  themeColor: "#073665",
  width: "device-width",
  initialScale: 1,
};

/**
 * Root layout: fonts + global styles only. Route groups own their chrome:
 *   (site)      – public marketing website (Stage 1)
 *   (shop)      – tools marketplace (Stage 2, future)
 *   (platform)  – authenticated client workspace (Stage 3, future)
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
