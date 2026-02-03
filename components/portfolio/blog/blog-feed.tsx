"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

        // Sort newest first
        const sorted = [...data].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPosts(sorted);
      } catch (err) {
        console.error("Failed to load posts:", err);
      }
    };
    loadPosts();
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
      {posts.map((p) => (
        <Card
          key={p.slug}
          className="flex flex-col justify-between hover:shadow-md transition-shadow overflow-hidden"
        >
          {/* Image */}
          {p.feature_image && (
            <div className="relative w-full h-40">
              <Image
                src={p.feature_image}
                alt={p.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Body */}
          <div className="flex flex-col flex-1">
            <CardHeader className="flex-grow">
              <a
                href={`/blog/${p.slug}`}
                className="text-lg font-medium hover:underline line-clamp-2"
              >
                {p.title}
              </a>
            </CardHeader>

            <CardContent className="flex flex-col justify-between flex-1">
              {/* Excerpt with fixed height */}
              <p className="text-sm text-muted-foreground line-clamp-4 min-h-[5rem]">
                {p.excerpt || ""}
              </p>

              {/* Footer aligned bottom */}
              <div className="mt-4 flex items-center justify-between pt-2 border-t border-border">
                <Badge variant="secondary">MDX</Badge>
                <time className="text-xs text-muted-foreground">
                  {new Date(p.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}