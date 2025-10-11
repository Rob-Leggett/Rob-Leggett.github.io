import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type PostMeta = { slug: string; title: string; date: string; excerpt?: string; };

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(POSTS_DIR);
  const posts = files
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(POSTS_DIR, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);
      const excerpt = content.split("\n").slice(0, 3).join(" ");
      return {
        slug: data.slug || file.replace(/\.mdx$/, ""),
        title: data.title || "Untitled",
        date: data.date || "",
        excerpt,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts;
}

export function getPostContent(slug: string) {
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  return fs.readFileSync(file, "utf8");
}