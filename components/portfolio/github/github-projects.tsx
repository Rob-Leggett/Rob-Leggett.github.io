"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork } from "lucide-react";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

export default function GitHubProjects({ username }: { username: string }) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `https://api.github.com/users/${encodeURIComponent(
      username
    )}/repos?sort=updated&per_page=12`;
    fetch(url)
      .then((r) => r.json())
      .then((data: Repo[]) => {
        // Filter out forks rarely used as showcase, sort by stars then recent update
        const clean = data
          .filter((r) => true) // tweak if you want to hide forks: !r.fork
          .sort((a, b) => {
            if (b.stargazers_count !== a.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          });
        setRepos(clean);
      })
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <div className="text-sm text-gray-500">Loading projects…</div>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((r) => (
        <Card key={r.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <a href={r.html_url} target="_blank" rel="noreferrer" className="font-medium hover:underline">
              {r.name}
            </a>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400 min-h-[48px]">
              {r.description ?? "No description"}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4" /> {r.stargazers_count}
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitFork className="h-4 w-4" /> {r.forks_count}
                </span>
              </div>
              {r.language && <Badge variant="outline">{r.language}</Badge>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}