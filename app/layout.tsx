import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rob Leggett Portfolio",
  description: "Portfolio of Rob Leggett — Technology Strategy, Engineering, and AI Platforms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      {/* Google Analytics */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-XT5ZS9WSG5"
      />
      <Script id="google-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XT5ZS9WSG5', {
              page_path: window.location.pathname,
            });
          `}
      </Script>
    </head>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    {children}
    </body>
    </html>
  );
}