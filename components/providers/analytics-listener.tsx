'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { getContentGroup, getLinkLocation, track } from '@/lib/analytics';

const SITE_HOST = 'robertleggett.com.au';

const SHARE_HOSTS: Record<string, string> = {
  'x.com': 'x',
  'twitter.com': 'x',
  'www.linkedin.com': 'linkedin',
  'www.facebook.com': 'facebook',
};

function sendPageView(pathname: string, qs: string) {
  const path = pathname + (qs ? `?${qs}` : '');
  track('page_view', {
    page_path: path,
    page_title: document.title,
    page_location: window.location.href,
    content_group: getContentGroup(pathname),
  });
}

/**
 * One delegated listener classifies meaningful link clicks so individual
 * components don't need analytics code. Generic outbound clicks are left to
 * GA4 enhanced measurement to avoid double counting.
 */
function handleLinkClick(e: MouseEvent) {
  const anchor = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
  if (!anchor) return;

  const href = anchor.getAttribute('href') ?? '';
  const link_location = getLinkLocation(anchor);
  const link_text = (anchor.textContent ?? anchor.title ?? '').trim().slice(0, 100);

  if (href.startsWith('mailto:')) {
    track('contact_click', { method: 'email', link_location });
    return;
  }

  let url: URL;
  try {
    url = new URL(anchor.href, window.location.href);
  } catch {
    return;
  }

  if (url.pathname.endsWith('.pdf')) {
    track('resume_download', { file_name: url.pathname.split('/').pop(), link_location });
    return;
  }

  const shareMethod = SHARE_HOSTS[url.hostname];
  if (shareMethod && /share|intent|sharer/.test(url.pathname)) {
    const slug = window.location.pathname.replace(/^\/blog\/|\/$/g, '');
    track('share', { method: shareMethod, content_type: 'blog_post', item_id: slug, link_location });
    return;
  }

  if (url.hostname === 'www.linkedin.com' && url.pathname.startsWith('/in/')) {
    track('social_click', { platform: 'linkedin', link_location });
    return;
  }

  if (url.hostname === 'github.com') {
    const [owner, repo] = url.pathname.split('/').filter(Boolean);
    if (owner && repo) {
      track('select_content', { content_type: 'github_repo', item_id: `${owner}/${repo}`, link_location });
    } else {
      track('social_click', { platform: 'github', link_location });
    }
    return;
  }

  const isInternal = url.hostname === window.location.hostname || url.hostname === SITE_HOST;
  if (isInternal) {
    const postMatch = url.pathname.match(/^\/blog\/([^/]+)\/?$/);
    if (postMatch) {
      track('select_content', { content_type: 'blog_post', item_id: postMatch[1], link_text, link_location });
    } else if (url.pathname.endsWith('.xml') && url.pathname.includes('rss')) {
      track('rss_click', { link_location });
    }
  }
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
        const interval = setInterval(() => {
          if (typeof window.gtag === 'function') {
            clearInterval(interval);
            sendPageView(pathname, qs);
          }
        }, 200);
        setTimeout(() => clearInterval(interval), 5000);
      }
      return;
    }

    sendPageView(pathname, qs);
  }, [pathname, searchParams]);

  // Classify link clicks (capture phase so it fires before navigation)
  useEffect(() => {
    document.addEventListener('click', handleLinkClick, true);
    return () => document.removeEventListener('click', handleLinkClick, true);
  }, []);

  // Report Core Web Vitals using GA4's recommended parameters
  useEffect(() => {
    import('web-vitals').then(({ onCLS, onLCP, onTTFB, onINP, onFCP }) => {
      const sendToGA = ({ name, delta, value, id, rating }: {
        name: string; delta: number; value: number; id: string; rating: string;
      }) => {
        track(name, {
          value: Math.round(name === 'CLS' ? delta * 1000 : delta),
          metric_id: id,
          metric_value: value,
          metric_delta: delta,
          metric_rating: rating,
          content_group: getContentGroup(window.location.pathname),
          non_interaction: true,
        });
      };
      onCLS(sendToGA);
      onLCP(sendToGA);
      onTTFB(sendToGA);
      onINP(sendToGA);
      onFCP(sendToGA);
    }).catch(() => {});
  }, []);

  return null;
}
