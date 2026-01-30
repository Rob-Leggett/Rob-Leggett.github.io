// app/blog/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { MDXRemote } from "next-mdx-remote/rsc";
import BlogLayout from "@/components/portfolio/blog/[slug]/blog-layout";
import CodeBlock from "@/components/common/code-block";
import CloudComparisonTable from "@/components/common/cloud-comparison-table";
import cloudData from "@/content/data/cloud-services.json";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { ComponentPropsWithoutRef } from "react";

const PUBLISH_DIR = path.join(process.cwd(), "content/publish");

export async function generateStaticParams() {
  return fs
    .readdirSync(PUBLISH_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => ({ slug: file.replace(/\.mdx?$/, "") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(PUBLISH_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) notFound();

  const src = fs.readFileSync(filePath, "utf8");
  const { data } = matter(src);

  const meta = data.meta ?? {};
  const og = data.og ?? {};
  const twitter = data.twitter ?? {};

  return {
    title: meta.title || data.title,
    description: meta.description,
    keywords: meta.keywords as string[] | undefined,
    authors: meta.author ? [{ name: meta.author }] : undefined,
    alternates: meta.canonical ? { canonical: meta.canonical } : undefined,
    openGraph: {
      type: og.type || "article",
      title: og.title || meta.title || data.title,
      description: og.description || meta.description,
      url: og.url || meta.canonical,
      images: og.image || meta.image ? [{ url: og.image || meta.image }] : undefined,
    },
    twitter: {
      card: twitter.card || "summary_large_image",
      title: twitter.title || meta.title || data.title,
      description: twitter.description || meta.description,
      images: twitter.image || meta.image ? [twitter.image || meta.image] : undefined,
    },
  };
}

const mdxComponents = {
  h1: (p: ComponentPropsWithoutRef<"h1">) => <h1 {...p} className="mt-10 mb-4 text-3xl font-extrabold leading-tight" />,
  h2: (p: ComponentPropsWithoutRef<"h2">) => <h2 {...p} className="mt-8 mb-3 text-2xl font-bold leading-snug" />,
  h3: (p: ComponentPropsWithoutRef<"h3">) => <h3 {...p} className="mt-6 mb-2 text-xl font-semibold" />,
  code: (p: ComponentPropsWithoutRef<"code">) => <code {...p} />,
  pre: (p: ComponentPropsWithoutRef<"pre"> & { children?: React.ReactElement<{ className?: string; children?: React.ReactNode }> }) => {
    // Defensive extraction
    const child = p?.children?.props ?? {};
    const rawLang = child.className || "";
    const lang = rawLang.startsWith("language-")
      ? rawLang.replace("language-", "")
      : "plaintext";

    const rawCode = child.children;
    const code =
      typeof rawCode === "string"
        ? rawCode
        : Array.isArray(rawCode)
          ? rawCode.join("")
          : typeof rawCode === "number"
            ? String(rawCode)
            : "";

    // Safety: return a React element explicitly
    return <CodeBlock key={lang + code.slice(0, 20)} language={lang} value={code || ""} />;
  },
  // expose your table to MDX
  CloudComparisonTable: () => <CloudComparisonTable data={cloudData} />,
};

function readPostFile(slug: string) {
  const mdx = path.join(PUBLISH_DIR, `${slug}.mdx`);
  const md  = path.join(PUBLISH_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null;
  if (!filePath) notFound();
  return fs.readFileSync(filePath, "utf8");
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const src = readPostFile(slug);
  const { data, content } = matter(src);

  const normalized = content
    .replace(/\r\n/g, "\n")
    .replace(/([^\n])\n(#{1,6}\s)/g, "$1\n\n$2")
    .replace(/\n{3,}/g, "\n\n");

  const sanitized = normalized
    .replace(/<\/?text>/gi, "`text`")
    .replace(/<\s*>/g, "&lt;&gt;");

  return (
    <BlogLayout title={data.title} date={data.date} feature_image={data.feature_image}>
      <article
        className="
          prose prose-neutral dark:prose-invert max-w-none
          prose-pre:bg-gray-900 prose-pre:text-gray-100
          prose-code:before:content-none prose-code:after:content-none
          [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1.5
          [&_p]:my-4 prose-headings:mt-8 prose-headings:mb-3

          /* Always-visible link styling */
          [&_p>a]:text-blue-600 [&_li>a]:text-blue-600
          dark:[&_p>a]:text-blue-400 dark:[&_li>a]:text-blue-400
          [&_p>a]:font-medium [&_li>a]:font-medium
          [&_p>a]:underline [&_li>a]:underline
          [&_p>a]:underline-offset-4 [&_li>a]:underline-offset-4
          [&_p>a]:decoration-blue-500/40 [&_li>a]:decoration-blue-500/40
          [&_p>a:hover]:decoration-blue-500 [&_li>a:hover]:decoration-blue-500
          [&_p>a:hover]:text-blue-700 [&_li>a:hover]:text-blue-700
          dark:[&_p>a:hover]:text-blue-300 dark:[&_li>a:hover]:text-blue-300
          transition-colors duration-200
        "
      >
        <MDXRemote
          source={sanitized}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: "wrap" }],
              ],
              format: "mdx",
            },
          }}
        />
      </article>
    </BlogLayout>
  );
}