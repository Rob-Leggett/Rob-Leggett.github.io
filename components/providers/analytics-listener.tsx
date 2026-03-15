'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

function getContentGroup(pathname: string): string {
  if (pathname.startsWith('/blog/') && pathname !== '/blog/') return 'blog_post';
  if (pathname === '/blog' || pathname === '/blog/') return 'blog_index';
  if (pathname === '/' || pathname === '') return 'home';
  return 'other';
}

function sendPageView(pathname: string, qs: string) {
  if (typeof window.gtag !== 'function') return;
  const path = pathname + (qs ? `?${qs}` : '');
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: document.title,
    page_location: window.location.href,
    content_group: getContentGroup(pathname),
  });
}

export default function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  // Track pageviews on route changes
  useEffect(() => {
    const qs = searchParams.toString();

    if (isFirstRender.current) {
      // On first render, gtag may not be ready yet — wait for it
      isFirstRender.current = false;
      if (typeof window.gtag === 'function') {
        sendPageView(pathname, qs);
      } else {
        // Poll briefly until gtag is available
        const interval = setInterval(() => {
          if (typeof window.gtag === 'function') {
            clearInterval(interval);
            sendPageView(pathname, qs);
          }
        }, 200);
        // Give up after 5 seconds
        setTimeout(() => clearInterval(interval), 5000);
      }
      return;
    }

    sendPageView(pathname, qs);
  }, [pathname, searchParams]);

  // Report Web Vitals (CLS, LCP, FID, TTFB, INP)
  useEffect(() => {
    import('web-vitals').then(({ onCLS, onLCP, onFID, onTTFB, onINP }) => {
      const sendToGA = ({ name, delta, id }: { name: string; delta: number; id: string }) => {
        if (typeof window.gtag !== 'function') return;
        window.gtag('event', name, {
          value: Math.round(name === 'CLS' ? delta * 1000 : delta),
          event_label: id,
          non_interaction: true,
        });
      };
      onCLS(sendToGA);
      onLCP(sendToGA);
      onFID(sendToGA);
      onTTFB(sendToGA);
      onINP(sendToGA);
    }).catch(() => {});
  }, []);

  return null;
}
