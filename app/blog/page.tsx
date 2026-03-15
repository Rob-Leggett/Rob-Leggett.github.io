import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Footer from "@/components/layout/footer";

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <div className="flex items-center justify-between mb-8 border-b border-border pb-2">
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            ← Home
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
          {posts.map((p) => (
            <Card
              key={p.slug}
              className="flex flex-col justify-between hover:shadow-md transition-shadow overflow-hidden"
            >
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

              <div className="flex flex-col flex-1">
                <CardHeader className="flex-grow">
                  <Link
                    href={`/blog/${p.slug}/`}
                    className="text-lg font-medium hover:underline line-clamp-2"
                  >
                    {p.title}
                  </Link>
                </CardHeader>

                <CardContent className="flex flex-col justify-between flex-1">
                  {p.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-3 min-h-[4rem]">
                      {p.excerpt}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between pt-2 border-t border-border">
                    <Badge variant="secondary">MDX</Badge>
                    {p.date && (
                      <time className="text-xs text-muted-foreground">
                        {new Date(p.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}