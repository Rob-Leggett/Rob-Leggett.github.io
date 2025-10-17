import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React, { Suspense } from 'react';
import Script from "next/script";
import UnregisterSW from "@/app/unregister-sw";
import AnalyticsListener from "@/app/analytics-listener";

import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-G9GHB37RTG";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rob Leggett Portfolio",
  description: "Portfolio of Rob Leggett — Technology Strategy, Engineering, and AI Platforms",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <head>
      {/* GA4 – load after hydration */}
      <Script
        id="ga-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            if (!window.gtagInitialized) {
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              window.gtagInitialized = true;
            }
          `}
      </Script>
    </head>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}

      <UnregisterSW />
      <Suspense fallback={null}>
        <AnalyticsListener />
      </Suspense>
    </body>
    </html>
  );
}