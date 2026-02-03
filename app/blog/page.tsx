import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogIndex() {
  const posts = getAllPosts(); // reads content/publish
  return (
    <div className="container mx-auto px-6 py-10 min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}/`} className="text-primary hover:underline">
              {p.title}
            </Link>
            {p.date && (
              <p className="text-sm text-muted-foreground">
                {new Date(p.date).toDateString()}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}