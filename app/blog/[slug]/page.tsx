import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import PostLayout from "../post-layout";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

// Pre-render all slugs for static export
export async function generateStaticParams() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(/\.mdx?$/, ""),
    }));
}

// Render each post
export default async function PostPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(POSTS_DIR, `${params.slug}.mdx`);
  const src = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(src);

  return (
    <PostLayout
      title={data.title}
      date={data.date}
      feature_image={data.feature_image}
    >
      <MDXRemote source={content} />
    </PostLayout>
  );
}