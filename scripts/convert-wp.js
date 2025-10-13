import fs from "fs";
import path from "path";
import { XMLParser } from "fast-xml-parser";
import TurndownService from "turndown";
import { compile } from "@mdx-js/mdx";
import https from "https";
import sharp from "sharp";

const turndown = new TurndownService({
  headingStyle: "atx",
  hr: "---",
  codeBlockStyle: "fenced",
  emDelimiter: "_",
});

function decodeEntities(str = "") {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, "…");
}

function stripWpComments(html) {
  return html.replace(/<!--\s*\/?wp:[^>]*-->\s*/gi, "");
}

function normalizeFences(s) {
  let out = stripWpComments(s);
  out = out.replace(/```([a-z0-9_+-]+)(?=\S)/gi, "```$1\n");
  out = out.replace(/```text(?=\S)/gi, "```text\n");
  out = out.replace(/([^\n])```/g, "$1\n```");
  const ticks = (out.match(/```/g) || []).length;
  if (ticks % 2 !== 0) out += "\n```";
  return out;
}

function fenceAllCode(content) {
  const pattern =
    /(^|\n)(\s*)(import\s+.+;|export\s+.+;|package\s+.+;|class\s+.+{|public\s+.+{|private\s+.+{|protected\s+.+{|static\s+.+;|void\s+.+\(|def\s+.+\(|function\s+.+\(|const\s+.+=|let\s+.+=|var\s+.+=)/g;
  return content.replace(pattern, (_, pre, indent, code) => {
    return `${pre}${indent}\`\`\`text\n${code.trim()}\n\`\`\`\n`;
  });
}

function escapeAllDangerousSyntax(str) {
  return str
    .replace(/{/g, "&#123;")
    .replace(/}/g, "&#125;")
    .replace(/<(?!\/?br|\/?img|\/?a)/g, "&lt;")
    .replace(/>(?!\s|$)/g, "&gt;");
}

function htmlToPlainText(s = "") {
  return s.replace(/<br\s*\/?>/gi, "\n").replace(/<\/?[^>]+>/g, "");
}

function guessLangFromSnippet(snippet = "") {
  const s = snippet;
  if (/\bpackage\s+main\b/.test(s) || /\bfunc\s+main\s*\(/.test(s)) return "go";
  if (/\b#include\s*<.*>/.test(s) || /\bint\s+main\s*\(/.test(s)) return "c";
  if (/\bpublic\s+class\b/.test(s) || /\bSystem\.out\.println\b/.test(s)) return "java";
  if (/\bdef\s+.+\(/.test(s) || (/\bimport\s+\w+/.test(s) && s.includes("python"))) return "python";
  if (/\bfunction\b|\bconst\b|\blet\b|\bvar\b/.test(s)) return "javascript";
  return "text";
}

function convertWpPreBlocks(html = "") {
  return html.replace(
    /<!--\s*wp:preformatted[\s\S]*?-->\s*<pre[^>]*>([\s\S]*?)<\/pre>\s*<!--\s*\/wp:preformatted\s*-->/gi,
    (_, inner) => {
      const decoded = decodeEntities(inner).trim();
      const lang = /\bpackage\s+main\b|\bfunc\s+main\b/.test(decoded) ? "go" : "text";
      return `\n\`\`\`${lang}\n${decoded}\n\`\`\`\n`;
    }
  );
}

function convertWpPreToFences(html = "") {
  return html.replace(
    /<pre[^>]*class=["'][^"']*wp-block-preformatted[^"']*["'][^>]*>([\s\S]*?)<\/pre>/gi,
    (_, inner) => {
      const raw = htmlToPlainText(inner);
      const decoded = decodeEntities(raw).trim();
      const lang = guessLangFromSnippet(decoded);
      return `\n\`\`\`${lang}\n${decoded}\n\`\`\`\n`;
    }
  );
}

function stripInvisibleSpaces(s = "") {
  return s.replace(/[\u00A0\u1680\u180E\u2000-\u200D\u202F\u205F\u3000]/g, " ");
}

/* ✅ Enhanced fence cleaner — handles escaped backticks, invisible spaces, and split language names */
function cleanCodeFences(md = "") {
  // Step 1: unescape any escaped backticks (\`\`\` → ```)
  md = md.replace(/\\```/g, "```");

  // Step 2: remove stray invisible spaces between ``` and language
  md = md.replace(
    /(^|\n)```[ \t\u00A0\u200B\u200C\u200D]*([A-Za-z0-9+_.-]+)[ \t\u00A0\u200B\u200C\u200D]*(?=\n|$)/gm,
    "$1```$2"
  );

  // Step 3: fix split or broken language names
  md = md.replace(/```t\s*e\s*x\s*t/gi, "```text");
  md = md.replace(/```g\s*o/gi, "```go");
  md = md.replace(/```j\s*s\s*o\s*n/gi, "```json");
  md = md.replace(/```j\s*a\s*v\s*a/gi, "```java");

  // Step 4: remove escaped newlines after fence headers
  md = md.replace(/```([a-z0-9+_-]+)\s*\\n/gi, "```$1\n");

  return md;
}

function escapeMdxExpressions(str = "") {
  return str.replace(/{/g, "&#123;").replace(/}/g, "&#125;");
}

// --- image helpers ---
async function fetchImageBuffer(url) {
  return new Promise((resolve) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) return resolve(null);
        const chunks = [];
        response.on("data", (c) => chunks.push(c));
        response.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", () => resolve(null));
  });
}

async function saveAsPng(buffer, localPath) {
  const png = await sharp(buffer).png({ quality: 90 }).toBuffer();
  fs.writeFileSync(localPath, png);
}

async function downloadAndRewriteInlineImages(html, slug) {
  if (!html) return html;
  const imgDir = path.join(process.cwd(), `public/blog/${slug}`);
  fs.mkdirSync(imgDir, { recursive: true });
  html = html.replace(/\s+srcset="[^"]*"/gi, "");
  const seen = new Map();
  let index = 1;

  html = html.replace(/<img\b[^>]*?\bsrc=["']([^"']+)["'][^>]*>/gi, (m, src) => {
    if (!/^https?:\/\//i.test(src)) return m;
    if (!seen.has(src)) {
      const fileName = `inline-${index++}.png`;
      const localPath = path.join(imgDir, fileName);
      const publicPath = `/blog/${slug}/${fileName}`;
      seen.set(src, { localPath, publicPath });
    }
    const { publicPath } = seen.get(src);
    return m.replace(src, publicPath);
  });

  const promises = [];
  for (const [remote, { localPath }] of seen.entries()) {
    if (fs.existsSync(localPath)) continue;
    promises.push(
      (async () => {
        try {
          const buf = await fetchImageBuffer(remote);
          if (buf) await saveAsPng(buf, localPath);
        } catch (e) {
          console.warn(`⚠️  Inline image failed: ${remote} (${e?.message || e})`);
        }
      })()
    );
  }
  if (promises.length) await Promise.all(promises);
  return html;
}

async function main() {
  const xmlPath = path.join(process.cwd(), "scripts", "techinthecloud.WordPress.2025-10-11.xml");
  const baseContent = path.join(process.cwd(), "content");
  const skipDir = path.join(baseContent, "skipped");
  const logDir = path.join(baseContent, "logs");

  fs.mkdirSync(baseContent, { recursive: true });
  fs.mkdirSync(skipDir, { recursive: true });
  fs.mkdirSync(logDir, { recursive: true });

  const xml = fs.readFileSync(xmlPath, "utf8");
  const parser = new XMLParser({ ignoreAttributes: false });
  const data = parser.parse(xml);
  const items = data?.rss?.channel?.item || [];

  const attachments = {};
  for (const item of items) {
    if (item["wp:post_type"] === "attachment" && item["wp:attachment_url"]) {
      const parentId = item["wp:post_parent"];
      if (!parentId) continue;
      if (!attachments[parentId]) attachments[parentId] = [];
      attachments[parentId].push(item["wp:attachment_url"]);
    }
  }

  let counts = {};

  for (const item of items) {
    if (item["wp:post_type"] !== "post") continue;

    const status = (item["wp:status"] || "unknown").toLowerCase();
    const targetDir = path.join(baseContent, status);
    fs.mkdirSync(targetDir, { recursive: true });
    counts[status] = (counts[status] || 0) + 1;

    const postId = item["wp:post_id"];
    const rawTitle = (item.title || "Untitled").replace(/\r?\n/g, " ").trim();
    const safeTitle = rawTitle.replace(/"/g, "'").replace(/:/g, " -");
    const slug = (item["wp:post_name"] || rawTitle)
      .toLowerCase()
      .replace(/[^a-z0-9\-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    const date = (item["wp:post_date"] || "").split(" ")[0];

    let content = decodeEntities(item["content:encoded"] || "");
    content = convertWpPreBlocks(content);
    content = convertWpPreToFences(content);

    content = content
      .replace(/<[/]?[a-z0-9-]*--[a-z0-9-]*[^>]*>/gi, "")
      .replace(/<\/?wp-[^>]+>/gi, "")
      .replace(/<\/?div[^>]*>/gi, "")
      .replace(/<\/?figure[^>]*>/gi, "");

    content = content.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, inner) => {
      const safe = escapeAllDangerousSyntax(inner);
      return `\n\`\`\`text\n${safe.trim()}\n\`\`\`\n`;
    });

    if (status === "publish") {
      content = await downloadAndRewriteInlineImages(content, slug);
    } else {
      console.log(`ℹ️  Skipping inline image download for non-published post: ${slug}`);
    }

    content = stripInvisibleSpaces(content);
    content = normalizeFences(content);
    if (!/```/.test(content)) content = fenceAllCode(content);
    content = content.replace(/(?<!`)`([^`\n]+)`(?!`)/g, (_, inner) => "`" + escapeAllDangerousSyntax(inner) + "`");

    let feature_image_local = "";
    const parentAttachments = attachments[postId];
    if (parentAttachments?.length && status === "publish") {
      const imgDir = path.join(process.cwd(), `public/blog/${slug}`);
      fs.mkdirSync(imgDir, { recursive: true });
      const sortedUrls = [...parentAttachments].sort().reverse();
      for (let i = 0; i < sortedUrls.length; i++) {
        const imageUrl = sortedUrls[i];
        const isFeature = i === 0;
        const fileName = isFeature ? "feature-image.png" : `image-${i}.png`;
        const localPath = path.join(imgDir, fileName);
        const publicPath = `/blog/${slug}/${fileName}`;
        try {
          if (fs.existsSync(localPath)) {
            if (isFeature) feature_image_local = publicPath;
            continue;
          }
          const buf = await fetchImageBuffer(imageUrl);
          if (!buf) continue;
          await saveAsPng(buf, localPath);
          if (isFeature) feature_image_local = publicPath;
        } catch (err) {
          console.warn(`⚠️  Error downloading ${imageUrl}: ${err.message} from ${slug}`);
        }
      }
    } else {
      console.log(`ℹ️  Skipping attachment image download for non-published post: ${slug}`);
    }

    let markdown = turndown.turndown(content);

    // ✅ Fix Turndown backtick escaping
    markdown = markdown.replace(/\\`/g, "`");

    // ✅ Apply final cleanup
    markdown = cleanCodeFences(markdown);
    markdown = escapeMdxExpressions(markdown);

    const full = `---
title: "${safeTitle}"
date: "${date}"
slug: "${slug}"
status: "${status}"
${feature_image_local ? `feature_image: "${feature_image_local}"` : ""}
---

${markdown}
`;

    try {
      await compile(full, { jsx: false });
      fs.writeFileSync(path.join(targetDir, `${slug}.mdx`), full);
    } catch (err) {
      fs.writeFileSync(path.join(skipDir, `${slug}.mdx`), full);
      fs.writeFileSync(path.join(logDir, `${slug}.log`), err.stack || err.message);
      console.warn(`⚠️  Skipped invalid MDX for: ${slug} (${err.message})`);
    }
  }

  console.log("✅ Export complete:");
  Object.entries(counts).forEach(([status, count]) => {
    console.log(`  - ${status}: ${count} posts → content/${status}/`);
  });
}

await main();