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

  // Insert newline after opening fences like ```textimport -> ```text\nimport
  out = out.replace(/```text(?=\S)/g, "```text\n");

  // Add newline after language if missing, e.g. ```javapublic -> ```java\npublic
  out = out.replace(/```([a-z0-9_+-]+)(?=\S)/gi, "```$1\n");

  // Add newline after plain ``` if directly followed by text
  out = out.replace(/```(?=\S)/g, "```\n");

  // Ensure closing fences are on their own line
  out = out.replace(/([^\n])```/g, "$1\n```");

  // Balance unmatched fences
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
    .replace(/`/g, "\\`")
    .replace(/{/g, "&#123;")
    .replace(/}/g, "&#125;")
    .replace(/<(?!\/?br|\/?img|\/?a)/g, "&lt;")
    .replace(/>(?!\s|$)/g, "&gt;");
}

// --- download helper ---

// fetch image as Buffer
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

// download image
async function downloadImage(url, destPath) {
  if (!url) return false;
  return new Promise((resolve) => {
    const file = fs.createWriteStream(destPath);
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          file.close();
          fs.unlinkSync(destPath);
          return resolve(false);
        }
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(true);
        });
      })
      .on("error", (err) => {
        console.warn(`⚠️  Failed to download ${url}: ${err.message}`);
        resolve(false);
      });
  });
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

  // --- Build attachment map ---
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

    // Clean WP wrappers
    content = content
      .replace(/<[/]?[a-z0-9-]*--[a-z0-9-]*[^>]*>/gi, "")
      .replace(/<\/?wp-[^>]+>/gi, "")
      .replace(/<\/?div[^>]*>/gi, "")
      .replace(/<\/?figure[^>]*>/gi, "");

    // Convert <pre><code> blocks
    content = content.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, inner) => {
      const safe = escapeAllDangerousSyntax(inner);
      return `\n\`\`\`text\n${safe.trim()}\n\`\`\`\n`;
    });

    // Normalize and fence code
    content = normalizeFences(content);
    if (!/```/.test(content)) content = fenceAllCode(content);

    // Escape inline code braces
    content = content.replace(/`([^`]+)`/g, (_, inner) => "`" + escapeAllDangerousSyntax(inner) + "`");

    // --- Image handling (feature + inline attachments) ---
    let feature_image_local = "";
    const parentAttachments = attachments[postId];

    if (parentAttachments?.length && status === "publish") {
      // Create the local image directory
      const imgDir = path.join(process.cwd(), `public/blog/${slug}`);
      fs.mkdirSync(imgDir, { recursive: true });

      // Sort so the last (usually largest / featured) image is feature
      const sortedUrls = [...parentAttachments].sort().reverse();

      for (let i = 0; i < sortedUrls.length; i++) {
        const imageUrl = sortedUrls[i];
        const isFeature = i === 0;
        const fileName = isFeature ? "feature-image.png" : `image-${i}.png`;
        const localPath = path.join(imgDir, fileName);
        const publicPath = `/blog/${slug}/${fileName}`;

        try {
          // Skip download if already exists (cache)
          if (fs.existsSync(localPath)) {
            if (isFeature) feature_image_local = publicPath;
            continue;
          }

          const buf = await fetchImageBuffer(imageUrl);
          if (!buf) {
            console.warn(`⚠️  Failed to fetch image: ${imageUrl}`);
            continue;
          }

          // Convert and save as PNG
          const png = await sharp(buf).png({ quality: 90 }).toBuffer();
          fs.writeFileSync(localPath, png);

          if (isFeature) feature_image_local = publicPath;
        } catch (err) {
          console.warn(`⚠️  Error downloading ${imageUrl}: ${err.message} from ${slug}`);
        }
      }
    } else if (status !== "publish") {
      console.log(`ℹ️  Skipping image download for non-published post: ${slug}`);
    }

    // Convert to Markdown
    const markdown = turndown.turndown(content);

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