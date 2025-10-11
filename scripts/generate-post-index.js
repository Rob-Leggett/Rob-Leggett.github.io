import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const OUT_FILE = path.join(process.cwd(), "public/blog/posts.json");

function extractExcerpt(content) {
  // take the first non-empty lines (up to ~3)
  const lines = content
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .slice(0, 3);
  return lines.join(" ").substring(0, 280).trim() + "…";
}

function extractFeatureImage(content, frontmatterImage) {
  if (frontmatterImage) return frontmatterImage;
  const imgMatch = content.match(/!\[.*?\]\((.*?)\)/); // Markdown image
  if (imgMatch) return imgMatch[1];
  const htmlMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i); // HTML image
  if (htmlMatch) return htmlMatch[1];
  return null;
}

const posts = fs
  .readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
  .map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);

    const excerpt = extractExcerpt(content);
    const feature_image = extractFeatureImage(content, data.feature_image);

    return {
      slug: data.slug || file.replace(/\.mdx?$/, ""),
      title: data.title || "Untitled",
      date: data.date || "",
      excerpt,
      feature_image,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(posts, null, 2));

console.log(`✅ Generated ${posts.length} posts → ${OUT_FILE}`);