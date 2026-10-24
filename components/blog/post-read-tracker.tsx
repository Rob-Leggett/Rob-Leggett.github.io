'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

type Props = {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  targetId: string;
};

const MILESTONES = [25, 50, 75, 100];
// Readers who reach the end in less time than this were skimming.
const MIN_READ_SECONDS = 30;

/** Tracks how far through a post someone reads, and whether they finish it. */
export default function PostReadTracker({ slug, title, date, tags = [], targetId }: Props) {
  useEffect(() => {
    const article = document.getElementById(targetId);
    if (!article) return;

    const base = {
      post_slug: slug,
      post_title: title,
      post_date: date,
      post_tags: tags.filter((t) => t !== 'Robert Leggett').slice(0, 10).join(','),
    };
    const start = Date.now();
    const reached = new Set<number>();
    let completed = false;

    track('post_view', base);

    const check = () => {
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const percent = total <= 0 ? 100 : Math.min(100, Math.max(0, (-rect.top / total) * 100));

      for (const m of MILESTONES) {
        if (percent >= m && !reached.has(m)) {
          reached.add(m);
          track('read_progress', { ...base, percent_scrolled: m });
        }
      }

      const seconds = Math.round((Date.now() - start) / 1000);
      if (!completed && reached.has(100) && seconds >= MIN_READ_SECONDS) {
        completed = true;
        track('post_read_complete', { ...base, read_time_seconds: seconds });
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        check();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Re-check periodically so a reader who reaches the end quickly still completes once enough time passes.
    const interval = setInterval(check, 5000);
    check();

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearInterval(interval);
    };
  }, [slug, title, date, tags, targetId]);

  return null;
}
