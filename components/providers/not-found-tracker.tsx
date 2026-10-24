'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/** Records broken links so they can be found and fixed. */
export default function NotFoundTracker() {
  useEffect(() => {
    track('page_not_found', {
      page_path: window.location.pathname,
      page_referrer: document.referrer || '(direct)',
    });
  }, []);
  return null;
}
