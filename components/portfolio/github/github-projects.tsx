"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork, ArrowUpRight, RefreshCw } from "lucide-react";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork?: boolean;
};

export default function GitHubProjects({
                                         username,
                                         perPage = 9,
                                         hideForks = true,
                                       }: {
  username: string;
  perPage?: number;
  hideForks?: boolean;
}) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchRepos() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.github.com/users/${encodeURIComponent(
            username
          )}/repos?sort=updated&per_page=${perPage}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );

        if (!res.ok) throw new Error(`${res.statusText}`);
        const data = (await res.json()) as Repo[];
        const filtered = data
          .filter((r) => (hideForks ? !r.fork : true))
          .sort((a, b) => b.stargazers_count - a.stargazers_count);

        if (!cancelled) setRepos(filtered);
      } catch (err: any) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRepos();
    return () => {
      cancelled = true;
    };
  }, [username, perPage, hideForks]);

  if (loading) return <SkeletonGrid />;
  if (error)
    return (
      <div className="flex items-center justify-between rounded-md border border-red-300/30 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-950/20 dark:text-red-300">
        <span>Error loading repositories: {error}</span>
        <button
          onClick={() => location.reload()}
          className="inline-flex items-center gap-1 text-xs hover:underline"
        >
          <RefreshCw className="h-4 w-4" /> Retry
        </button>
      </div>
    );
  if (!repos.length)
    return (
      <p className="text-sm text-muted-foreground">
        No repositories found. Perhaps make a few public?
      </p>
    );

  return (
    <section>
      <header className="mb-5 flex items-center justify-between">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          GitHub Projects
        </h3>
        <Link
          href={`https://github.com/${encodeURIComponent(username)}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          View all <ArrowUpRight className="h-4 w-4" />
        </Link>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((r) => (
          <Card
            key={r.id}
            className="group relative h-full border border-border/40 bg-card/80 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md"
          >
            <CardContent className="flex h-full flex-col justify-between p-5">
              <div>
                <Link
                  href={r.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {r.name}
                </Link>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                  {r.description || "No description provided."}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1" title="Stars">
                    <Star className="h-3.5 w-3.5" /> {r.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1" title="Forks">
                    <GitFork className="h-3.5 w-3.5" /> {r.forks_count}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {r.language && (
                    <Badge
                      variant="outline"
                      className="border-border/50 text-muted-foreground"
                    >
                      {r.language}
                    </Badge>
                  )}
                  <span className="text-[11px] text-muted-foreground">
                    {relativeTime(r.updated_at)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ---------- States ---------- */

function SkeletonGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-40 animate-pulse rounded-lg bg-muted/30 dark:bg-muted/10"
        />
      ))}
    </div>
  );
}

/* ---------- Utils ---------- */

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.floor(mo / 12)}y ago`;
}