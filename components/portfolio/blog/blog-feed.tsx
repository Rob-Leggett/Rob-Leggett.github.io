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
    fetch("/blog/posts.json")
      .then((r) => r.json())
      .then((data) => setPosts(data));
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
                {new Date(p.date).toLocaleDateString()}
              </time>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}