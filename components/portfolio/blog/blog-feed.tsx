"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type LocalPost = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  feature_image?: string | null;
};

export default function BlogFeed() {
  const [posts, setPosts] = useState<LocalPost[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetch("/metadata/blog-posts.json", { cache: "no-store" });
        const data: LocalPost[] = await res.json();

        // ensure consistent date parsing
        const sorted = [...data].sort((a, b) => {
          const da = Date.parse(a.date);
          const db = Date.parse(b.date);
          return db - da; // newest first
        });

        setPosts(sorted);
      } catch (err) {
        console.error("Failed to load or sort posts:", err);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <Card key={p.slug} className="hover:shadow-md transition-shadow overflow-hidden">
          {p.feature_image && (
            <img
              src={p.feature_image}
              alt={p.title}
              className="w-full h-40 object-cover"
            />
          )}
          <CardHeader>
            <a
              href={`/blog/${p.slug}`}
              className="text-lg font-medium hover:underline"
            >
              {p.title}
            </a>
          </CardHeader>
          <CardContent>
            {p.excerpt && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {p.excerpt}
              </p>
            )}
            <div className="mt-4 flex items-center justify-between">
              <Badge variant="secondary">MDX</Badge>
              <time className="text-xs text-gray-500">
                {new Date(p.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}