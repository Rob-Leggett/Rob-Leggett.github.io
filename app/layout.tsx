import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React, { Suspense } from 'react';
import UnregisterSW from "@/components/providers/unregister-sw";
import AnalyticsListener from "@/components/providers/analytics-listener";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { themes } from "@/lib/themes";

import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-G9GHB37RTG";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = "https://robertleggett.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rob Leggett — Cloud Architect, Engineering Leader & AI Platform Specialist",
    template: "%s | Robert Leggett",
  },
  description:
    "Rob Leggett — Technology strategist, cloud architect, and engineering leader specialising in AI platforms, cloud-native architecture, and platform engineering.",
  authors: [{ name: "Robert Leggett", url: SITE_URL }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Robert Leggett",
    title: "Rob Leggett — Cloud Architect, Engineering Leader & AI Platform Specialist",
    description:
      "Technology strategist, cloud architect, and engineering leader specialising in AI platforms, cloud-native architecture, and platform engineering.",
    url: SITE_URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Rob Leggett — Cloud Architect & Engineering Leader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rob Leggett — Cloud Architect & Engineering Leader",
    description:
      "Technology strategist specialising in AI platforms, cloud-native architecture, and platform engineering.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": [
        { url: "/rss/feed.xml", title: "Rob Leggett Blog RSS" },
      ],
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head>
      {/* GA4 — raw script tags so they render in static HTML, not behind hydration */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { send_page_view: false });
          `,
        }}
      />
    </head>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        themes={themes.map((t) => t.value)}
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>

      <UnregisterSW />
      <Suspense fallback={null}>
        <AnalyticsListener />
      </Suspense>
    </body>
    </html>
  );
}