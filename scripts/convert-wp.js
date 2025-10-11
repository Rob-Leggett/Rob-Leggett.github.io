import fs from "fs";
import path from "path";
import { XMLParser } from "fast-xml-parser";
import TurndownService from "turndown";
import { compile } from "@mdx-js/mdx";
import https from "https";

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

function fenceAllCode(content) {
  // Force wrap known code keywords into fences if missing
  const pattern =
    /(^|\n)(\s*)(import\s+.+;|export\s+.+;|package\s+.+;|class\s+.+{|public\s+.+{|private\s+.+{|protected\s+.+{|static\s+.+;|void\s+.+\(|def\s+.+\(|function\s+.+\(|const\s+.+=|let\s+.+=|var\s+.+=)/g;
  return content.replace(pattern, (_, pre, indent, code) => {
    return `${pre}${indent}\`\`\`text\n${code.trim()}\n\`\`\`\n`;
  });
}

function escapeAllDangerousSyntax(str) {
  // Escape braces and backticks globally
  return str
    .replace(/`/g, "\\`")
    .replace(/{/g, "&#123;")
    .replace(/}/g, "&#125;")
    .replace(/<(?!\/?br|\/?img|\/?a)/g, "&lt;")
    .replace(/>(?!\s|$)/g, "&gt;");
}

// --- download helper ---
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
  const outDir = path.join(process.cwd(), "content/posts");
  const skipDir = path.join(process.cwd(), "content/skipped");
  const logDir = path.join(process.cwd(), "content/logs");
  const imgDir = path.join(process.cwd(), "public/images/blog");

  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(skipDir, { recursive: true });
  fs.mkdirSync(logDir, { recursive: true });
  fs.mkdirSync(imgDir, { recursive: true });

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

  let exported = 0;
  let skipped = 0;

  for (const item of items) {
    if (item["wp:post_type"] !== "post") continue;

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

    // Remove common WP wrappers
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

    // Fix malformed fences
    content = content
      .replace(/(```+)\s*(\w+)?\s*(```+)?/g, "```text")
      .replace(/```(\w+)?\s*```/g, "```text");

    // Force fence all codey lines
    content = fenceAllCode(content);

    // Escape inline code braces
    content = content.replace(/`([^`]+)`/g, (_, inner) => "`" + escapeAllDangerousSyntax(inner) + "`");

    // Ensure all ``` blocks close
    if ((content.match(/```/g) || []).length % 2 !== 0) content += "\n```";

    // --- Find featured image ---
    let feature_image_url = null;
    const parentAttachments = attachments[postId];
    if (parentAttachments?.length) {
      feature_image_url = parentAttachments.sort().reverse()[0];
    }

    // --- Download local feature image ---
    let feature_image_local = "";
    if (feature_image_url) {
      const extMatch = feature_image_url.match(/\.(jpg|jpeg|png|gif|webp)$/i);
      const ext = extMatch ? extMatch[1].toLowerCase() : "jpg";
      const localFile = `${slug}-feature-image.${ext}`;
      const localPath = path.join(imgDir, localFile);
      const publicPath = `/images/blog/${localFile}`;
      const success = await downloadImage(feature_image_url, localPath);
      if (success) feature_image_local = publicPath;
    }

    // Convert HTML to Markdown
    const markdown = turndown.turndown(content);

    const full = `---
title: "${safeTitle}"
date: "${date}"
slug: "${slug}"
${feature_image_local ? `feature_image: "${feature_image_local}"` : ""}
---

${markdown}
`;

    try {
      await compile(full, { jsx: false });
      fs.writeFileSync(path.join(outDir, `${slug}.mdx`), full);
      exported++;
    } catch (err) {
      fs.writeFileSync(path.join(skipDir, `${slug}.mdx`), full);
      fs.writeFileSync(path.join(logDir, `${slug}.log`), err.stack || err.message);
      console.warn(`⚠️  Skipped invalid MDX for: ${slug} (${err.message})`);
      skipped++;
    }
  }

  console.log(`✅ Exported ${exported} posts to ${outDir}`);
  console.log(`⚠️  Skipped ${skipped} invalid posts (logs in ${logDir})`);
}

await main();