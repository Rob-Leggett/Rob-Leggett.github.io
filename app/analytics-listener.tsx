'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      const qs = searchParams.toString();
      const hash = window.location.hash || '';
      const path = pathname + (qs ? `?${qs}` : '') + hash;

      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || 'G-G9GHB37RTG', {
        page_path: path,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams]);

  return null;
}