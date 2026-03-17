# Contributing Guide

This guide covers how to work with the codebase — adding blog posts, modifying components, and deploying changes.

---

## Prerequisites

- **Node.js** 22+
- **npm** 10+
- **Git** with conventional commit knowledge

---

## Getting Started

```bash
# Clone the repository
git clone git@github.com:Rob-Leggett/Rob-Leggett.git
cd Rob-Leggett

# Install dependencies
npm ci

# Start development server (Turbopack)
npm run dev
```

The site will be available at `http://localhost:3000`.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Full production build (generates RSS, sitemap, post index, then Next.js build) |
| `npm run lint` | Run ESLint checks |
| `npm start` | Start production server |
| `npm run ping-search-engines` | Notify Bing and Yandex of sitemap updates |

---

## Adding a New Blog Post

### 1. Create the MDX File

Create a new file in `content/publish/` with the slug as the filename:

```bash
touch content/publish/my-new-post.mdx
```

### 2. Add Frontmatter

Every post requires comprehensive frontmatter. Here is the minimum template:

```yaml
---
title: "My New Post Title"
date: "2025-07-20"
slug: "my-new-post"
status: "publish"
feature_image: "/blog/my-new-post/feature-image.png"
tags: ["Tag1", "Tag2", "Tag3", "Robert Leggett"]

meta:
  title: "My New Post Title | Robert Leggett"
  description: "A brief description of the post (150-160 characters)."
  keywords: ["keyword1", "keyword2", "Robert Leggett"]
  author: "Robert Leggett"
  canonical: "https://robertleggett.com.au/blog/my-new-post"
  image: "https://robertleggett.com.au/blog/my-new-post/feature-image.png"

og:
  type: "article"
  title: "My New Post Title"
  description: "A brief description for social sharing."
  image: "https://robertleggett.com.au/blog/my-new-post/feature-image.png"
  url: "https://robertleggett.com.au/blog/my-new-post"

twitter:
  card: "summary_large_image"
  title: "My New Post Title"
  description: "A concise summary for Twitter."
  image: "https://robertleggett.com.au/blog/my-new-post/feature-image.png"
---
```

### 3. Create the Image Directory

```bash
mkdir -p public/blog/my-new-post
```

Place your `feature-image.png` (1024×768 recommended) and any inline images (`inline-1.png`, `inline-2.png`, etc.) in this directory.

### 4. Write Content

Use standard Markdown with MDX extensions. Available features:

- **GitHub Flavored Markdown** — tables, strikethrough, task lists
- **Syntax-highlighted code blocks** — use fenced code with language identifier
- **Images** — reference from `/blog/[slug]/inline-N.png`
- **Custom components** — `<CloudComparisonTable />`

### 5. Verify Locally

```bash
npm run dev
# Visit http://localhost:3000/blog/my-new-post
```

### 6. Build and Check

```bash
npm run build
# Verify the post appears in the build output
```

---

## Adding a Deep-Dive Post

Deep-dive posts follow a specific structure and style. See `docs/DEEP-DIVE-MASTER-GUIDE.md` for the full reference.

Key requirements:

- **Title format**: `"Deep Dive - [Topic Name]"`
- **Slug format**: `deep-dive-[kebab-case-topic]`
- **Minimum length**: 4,000–6,000 words
- **Code snippets**: 10+ with language identifiers
- **Inline images**: 6+ diagrams
- **Required sections**: "Before you start", terminology glossary, "Finally, we made it"
- **Tone**: First-person plural, warm but authoritative, British/Australian English

See `docs/deep-dive-style-guide.md` for tone and voice details.

---

## Generating Feature Images

Feature images for deep-dive posts use a consistent dark gradient style. Generate them using sharp:

```bash
# The gen-identity-features.js script in the root is an example
node gen-identity-features.js
```

Image specifications:
- **Dimensions**: 1024×768 PNG
- **Style**: Dark gradient (#0f172a → #1e293b), subtle grid, "DEEP DIVE" pill badge, bold title, accent subtitle, "ROBERT LEGGETT" with underline
- **Output**: `public/blog/[slug]/feature-image.png`

---

## Modifying Components

### Component Location

| Type | Directory | Examples |
|------|-----------|---------|
| UI primitives | `components/ui/` | Button, Card, Badge |
| Blog components | `components/blog/` | CodeBlock, ShareBar, BlogFeed |
| Layout | `components/layout/` | Header, Footer, ThemeSwitcher |
| Providers | `components/providers/` | ThemeProvider, Analytics |
| SEO | `components/seo/` | JSON-LD schemas |

### Adding a shadcn/ui Component

```bash
npx shadcn@latest add [component-name]
```

This auto-installs the component into `components/ui/` with proper Tailwind + Radix configuration.

### MDX Component Mapping

To make a component available in MDX content, add it to `lib/mdx-components.tsx`:

```tsx
import { MyComponent } from "@/components/blog/my-component";

const mdxComponents = {
  // ... existing mappings
  MyComponent,
};
```

---

## Theme Customisation

Themes are defined in `lib/themes.ts`. Each theme is an object mapping CSS variable names to oklch() colour values.

To add a new theme:

1. Add the theme definition in `lib/themes.ts`
2. The `<ThemeSwitcher>` component auto-discovers themes from this file
3. CSS variables are applied via `app/globals.css`

---

## Deployment

### Automatic Deployment

Pushing to `main` triggers two GitHub Actions:

1. **pages.yml** — Builds and deploys to GitHub Pages
2. **release.yml** — Creates a semantic version release (if applicable)

### Manual Deployment

```bash
npm run build
# The /out directory contains the static site
```

---

## Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automated versioning:

```bash
# Feature (minor version bump)
git commit -m "feat: add newsletter signup form"

# Bug fix (patch version bump)
git commit -m "fix: resolve broken image on blog post"

# Breaking change (major version bump)
git commit -m "feat!: redesign navigation structure"

# Documentation (no version bump)
git commit -m "docs: update contributing guide"

# Chore (no version bump)
git commit -m "chore: update dependencies"
```

---

## Troubleshooting

### Build Fails on MDX Parsing

- Check frontmatter YAML syntax (colons in titles need quoting)
- Ensure all image paths exist in `public/`
- Check for unclosed HTML tags in MDX content

### Images Not Showing

- Verify the image exists at the correct path in `public/blog/[slug]/`
- Image paths in MDX are relative to the site root: `/blog/slug/inline-1.png`
- GitHub Pages requires `images: { unoptimized: true }` in Next.js config

### Theme Not Applying

- Check browser localStorage for stale theme values
- Try incognito window to bypass cache
- Verify theme definition exists in `lib/themes.ts`

### Share Buttons Not Visible

- Social share icons use custom filled SVGs (not Lucide stroke icons)
- If icons are invisible, check `fill="currentColor"` is set
- Static export requires build-time URL constant (`SITE_URL` in `share-bar.tsx`)
