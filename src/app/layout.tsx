import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  organizationSchema,
  websiteSchema,
  serviceSchema,
} from "@/components/seo/schemas";

const galano = localFont({
  src: [
    { path: "../../public/fonts/GalanoGrotesqueRegular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/GalanoGrotesqueMedium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/GalanoGrotesqueSemiBold.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/GalanoGrotesqueBold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-galano",
  display: "swap",
});

const awesomeSerif = localFont({
  src: [
    { path: "../../public/fonts/AwesomeSerif-ExtraTall.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/AwesomeSerifItalic-ExtraTall.otf", weight: "400", style: "italic" },
  ],
  variable: "--font-awesome-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://a2media.ca"),
  title: {
    default: "A2 Media — B2B SaaS video that turns viewers into pipeline.",
    template: "%s | A2 Media",
  },
  description:
    "B2B SaaS video content strategy and editing. We map video to your buyer journey, write scripts that move deals, and ship in 72 hours. Trusted by Okta, Shopify, and Crossbeam.",
  applicationName: "A2 Media",
  authors: [
    { name: "Ademola Adelakun", url: "https://www.linkedin.com/company/a2media" },
  ],
  creator: "Ademola Adelakun",
  publisher: "A2 Media",
  category: "Business",
  keywords: [
    "B2B SaaS video",
    "B2B SaaS video agency",
    "video content strategy",
    "video editing for B2B",
    "founder-led video",
    "LinkedIn video B2B",
    "YouTube strategy SaaS",
    "sales enablement video",
    "video that drives pipeline",
    "Content That Converts",
    "A2 Media",
  ],
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "A2 Media",
    title: "A2 Media — B2B SaaS video that turns viewers into pipeline.",
    description:
      "B2B SaaS video content strategy and editing. Strategy mapped to your buyer journey, scripts that move deals, 72-hour turnarounds. Trusted by Okta, Shopify, and Crossbeam.",
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "A2 Media — B2B SaaS video that turns viewers into pipeline.",
    description:
      "Strategy, scripts, and editing built for B2B SaaS pipeline. Trusted by Okta, Shopify, and Crossbeam.",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0536",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${galano.variable} ${awesomeSerif.variable}`}>
      <body>
        {children}
        <JsonLd data={[organizationSchema, websiteSchema, serviceSchema]} />
      </body>
    </html>
  );
}
