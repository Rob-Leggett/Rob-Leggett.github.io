export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export function track(event: string, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', event, params);
}

export function getContentGroup(pathname: string): string {
  if (pathname.startsWith('/blog/') && pathname !== '/blog/') return 'blog_post';
  if (pathname === '/blog' || pathname === '/blog/') return 'blog_index';
  if (pathname === '/' || pathname === '') return 'home';
  return 'other';
}

/** Where on the page a click happened, e.g. "blog_post:header". */
export function getLinkLocation(el: Element): string {
  const region = el.closest('[data-analytics-region]')?.getAttribute('data-analytics-region')
    ?? el.closest('header, footer, nav, article, section')?.tagName.toLowerCase()
    ?? 'body';
  return `${getContentGroup(window.location.pathname)}:${region}`;
}
