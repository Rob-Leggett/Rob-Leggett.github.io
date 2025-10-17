// scripts/generate-rss.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ROOT = process.cwd();
const PUBLISH_DIR = path.join(ROOT, "content/publish");
const RSS_DIR = path.join(ROOT, "public/rss");

// ---- customize these ----
const siteUrl = "https://robertleggett.com.au";
const siteTitle = "Rob Leggett — Blog";
const siteDescription = "Technology strategy, engineering, and AI platform insights.";
// -------------------------

function toAbsUrl(p) {
  if (!p) return null;
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  return siteUrl + (p.startsWith("/") ? p : `/${p}`);
}

function escapeXml(s = "") {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function stripMd(md = "") {
  // super light “good enough” excerpt
  return md
    .replace(/```[\s\S]*?```/g, "")      // code fences
    .replace(/`([^`]*)`/g, "$1")         // inline code
    .replace(/$begin:math:display$([^$end:math:display$]+)\]$begin:math:text$[^)]+$end:math:text$/g, "$1") // links
    .replace(/[#>*_~`]/g, "")            // markdown tokens
    .replace(/\n{2,}/g, " ")
    .trim();
}

function getAllPosts() {
  if (!fs.existsSync(PUBLISH_DIR)) return [];
  return fs
    .readdirSync(PUBLISH_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((file) => {
      const filePath = path.join(PUBLISH_DIR, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);

      const slug = data.slug || file.replace(/\.mdx?$/, "");
      const title = data.title || "Untitled";
      const date = data.date ? new Date(data.date) : null;
      const description =
        data.description ||
        data.excerpt ||
        stripMd(content).slice(0, 300);

      // feature_image from your frontmatter
      const featureImage = data.feature_image ? toAbsUrl(data.feature_image) : null;

      return {
        slug,
        title,
        date,
        description,
        featureImage,
      };
    })
    .sort((a, b) => {
      const ad = a.date ? a.date.getTime() : 0;
      const bd = b.date ? b.date.getTime() : 0;
      return bd - ad;
    });
}

function buildRss(posts) {
  const lastBuild = new Date().toUTCString();

  const items = posts
    .map((p) => {
      const link = `${siteUrl}/blog/${p.slug}/`;
      const pubDate = p.date ? p.date.toUTCString() : lastBuild;
      const enclosure = p.featureImage
        ? `<enclosure url="${escapeXml(p.featureImage)}" type="image/${p.featureImage.split('.').pop()}" />`
        : "";
      return `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${p.description}]]></description>
      ${enclosure}
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${siteTitle}]]></title>
    <link>${siteUrl}/blog</link>
    <description><![CDATA[${siteDescription}]]></description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    ${items}
  </channel>
</rss>`;
}

(function main() {
  const posts = getAllPosts();
  const rss = buildRss(posts);

  if (!fs.existsSync(RSS_DIR)) {
    fs.mkdirSync(RSS_DIR, { recursive: true });
  }
  const out = path.join(RSS_DIR, "feed.xml");
  fs.writeFileSync(out, rss);
  console.log(`✅ Generated RSS → ${out} (${posts.length} posts)`);
})();