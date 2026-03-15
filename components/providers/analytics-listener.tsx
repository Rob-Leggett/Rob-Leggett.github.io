'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-G9GHB37RTG';

function getContentGroup(pathname: string): string {
  if (pathname.startsWith('/blog/') && pathname !== '/blog/') return 'blog_post';
  if (pathname === '/blog' || pathname === '/blog/') return 'blog_index';
  if (pathname === '/' || pathname === '') return 'home';
  return 'other';
}

export default function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  // Track pageviews on route changes
  useEffect(() => {
    if (typeof window.gtag !== 'function') return;

    const qs = searchParams.toString();
    const path = pathname + (qs ? `?${qs}` : '');

    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
      content_group: getContentGroup(pathname),
    });

    isFirstRender.current = false;
  }, [pathname, searchParams]);

  // Report Web Vitals (CLS, LCP, FID, TTFB, INP)
  useEffect(() => {
    if (typeof window.gtag !== 'function') return;

    import('web-vitals').then(({ onCLS, onLCP, onFID, onTTFB, onINP }) => {
      const sendToGA = ({ name, delta, id }: { name: string; delta: number; id: string }) => {
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
    }).catch(() => {
      // web-vitals not available — skip silently
    });
  }, []);

  return null;
}
