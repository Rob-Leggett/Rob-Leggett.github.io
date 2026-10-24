# Robert Leggett — Portfolio & Blog

[![Deploy Pages](https://github.com/Rob-Leggett/Rob-Leggett.github.io/actions/workflows/pages.yml/badge.svg?branch=main)](https://github.com/Rob-Leggett/Rob-Leggett.github.io/actions/workflows/pages.yml) [![Release](https://github.com/Rob-Leggett/Rob-Leggett.github.io/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/Rob-Leggett/Rob-Leggett.github.io/actions/workflows/release.yml) [![Node.js 26](https://img.shields.io/badge/Node.js-26-5FA04E?logo=nodedotjs&logoColor=white)](https://nodejs.org/) [![Next.js 16.4](https://img.shields.io/badge/Next.js-16.4-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/) [![React 19.3](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=white)](https://react.dev/) [![TypeScript 6.0](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Tailwind CSS 4.3](https://img.shields.io/badge/Tailwind%20CSS-4.3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

A personal portfolio and blog at [robertleggett.com.au](https://robertleggett.com.au), showcasing writing, projects, and technical leadership across cloud, AI, and software engineering.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router, Turbopack, static export) |
| **UI** | [React 19](https://react.dev), [TypeScript](https://www.typescriptlang.org) |
| **Styling** | [Tailwind CSS v4.2](https://tailwindcss.com) with 15 built-in themes (light, dark, developer & professional palettes) |
| **Components** | [shadcn/ui](https://ui.shadcn.com) (Radix UI primitives, CVA variants) |
| **Content** | MDX blog posts with [remark-gfm](https://github.com/remarkjs/remark-gfm), [rehype-slug](https://github.com/rehypejs/rehype-slug), and syntax highlighting |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Themes** | [next-themes](https://github.com/pacocoursey/next-themes) — 3 default + 7 developer + 5 professional themes |
| **Analytics** | Google Analytics 4 with route-change tracking |
| **Deployment** | GitHub Pages via GitHub Actions |
| **Versioning** | [Semantic Release](https://semantic-release.gitbook.io/) with conventional commits |

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site locally.

---

## 📝 Content

Blog posts are written in MDX and stored under `content/publish/`. Each post includes full SEO frontmatter:

```yaml
---
title: "Post title"
date: "2025-01-10"
slug: "post-slug"
status: "publish"
feature_image: "/blog/post-slug/feature-image.png"
tags: ["Cloud", "AI", "Architecture"]

meta:
  title: "Post title | Robert Leggett"
  description: "A brief description for SEO"
  keywords: ["keyword1", "keyword2"]
  author: "Robert Leggett"
  canonical: "https://robertleggett.com.au/blog/post-slug"
  image: "https://robertleggett.com.au/blog/post-slug/feature-image.png"

og:
  type: "article"
  title: "Post title"
  description: "Open Graph description"
  image: "https://robertleggett.com.au/blog/post-slug/feature-image.png"
  url: "https://robertleggett.com.au/blog/post-slug"

twitter:
  card: "summary_large_image"
  title: "Post title"
  description: "Twitter card description"
  image: "https://robertleggett.com.au/blog/post-slug/feature-image.png"
---
```

Feature images and inline images are stored under `public/blog/<slug>/`.

---

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router pages & layouts
│   ├── blog/[slug]/        # Dynamic blog post pages with MDX rendering
│   ├── layout.tsx          # Root layout (fonts, GA4, theme provider)
│   ├── header.tsx          # Hero section with avatar, bio, and CTAs
│   └── page.tsx            # Home page (blog feed + GitHub projects)
├── components/
│   ├── ui/                 # shadcn/ui primitives (Button, Card, Badge)
│   ├── common/             # CodeBlock, CloudComparisonTable
│   ├── portfolio/          # BlogFeed, GitHubProjects, BlogLayout
│   ├── theme-provider.tsx  # next-themes wrapper
│   └── theme-switcher.tsx  # 15-theme dropdown selector
├── content/
│   ├── publish/            # Published MDX blog posts
│   └── data/               # Static data (cloud-services.json)
├── lib/
│   ├── posts.ts            # Post reading & metadata utilities
│   ├── themes.ts           # Theme definitions (default, dev, professional)
│   └── utils.ts            # cn() Tailwind merge utility
├── scripts/                # Build-time generators
│   ├── generate-rss.js     # RSS 2.0 feed → public/rss/feed.xml
│   ├── generate-sitemap.js # Sitemap → public/sitemap.xml
│   ├── generate-post-index.js # Blog index JSON → public/metadata/blog-posts.json
│   └── convert-wp.js       # WordPress XML → MDX migration tool
├── public/
│   ├── blog/               # Post images organised by slug
│   ├── avatar/             # Profile headshot
│   ├── resume/             # Downloadable resume PDF
│   ├── rss/                # Generated RSS feed
│   └── sitemap.xml         # Generated sitemap
└── .github/workflows/
    ├── pages.yml           # Build & deploy to GitHub Pages
    └── release.yml         # Semantic release on push to main
```

---

## 🛠️ Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Generate RSS, sitemap, post index, then build for production |
| `npm run lint` | Run ESLint (flat config, Next.js rules) |
| `npm run start` | Start production server |
| `npm run script:generate-rss` | Generate RSS feed from published posts |
| `npm run script:generate-sitemap` | Generate sitemap.xml from published posts |
| `npm run script:generate-post-index` | Generate blog-posts.json metadata for the frontend |
| `npm run script:convert-wp` | Convert WordPress XML export to MDX files |
| `npm run ping-search-engines` | Notify Bing and IndexNow of sitemap updates |

---

## 🏷️ Versioning

This project uses [Semantic Release](https://semantic-release.gitbook.io/) for automated versioning and changelog generation.

### Commit Convention

Commits follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat:` | New feature | Minor |
| `fix:` | Bug fix | Patch |
| `docs:` | Documentation only | No release |
| `style:` | Code style (formatting) | No release |
| `refactor:` | Code refactoring | No release |
| `perf:` | Performance improvement | Patch |
| `test:` | Adding tests | No release |
| `chore:` | Maintenance tasks | No release |

**Breaking changes:** Add `BREAKING CHANGE:` in the commit body or `!` after the type (e.g., `feat!:`) for a major version bump.

```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix: resolve mobile navigation issue"
git commit -m "feat!: redesign blog layout"
```

Releases are automatically created on push to `main` when commits trigger a version bump.

---

## 🚢 Deployment

The site is statically exported (`output: "export"`) and deployed to GitHub Pages via GitHub Actions.

- **Build output**: `out/` directory
- **Custom domain**: `robertleggett.com.au` (configured via `CNAME`)
- **Node version**: 26 (`.nvmrc`)
- **Triggers**: push to `main` (Markdown/`docs/**`-only changes are skipped) or manual dispatch

### GitHub Pages Configuration

GitHub Pages must use **GitHub Actions** as the build source. If the site shows the README instead of the website:

1. Go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**

```bash
gh api repos/Rob-Leggett/Rob-Leggett.github.io/pages -X PUT -f build_type=workflow
```

---

## 🎨 Themes

The site supports 15 themes organised in three categories:

| Category | Themes |
|----------|--------|
| **Default** | Light, Dark, System |
| **Developer** | Catppuccin, Gruvbox, Rosé Pine, Solarized, GitHub Dark, One Dark, Everforest |
| **Professional** | Corporate Blue, Executive, Slate, Ocean, Minimal |

Themes are defined in `lib/themes.ts` with corresponding CSS custom properties in `app/globals.css`.

---

## 📊 Analytics

Google Analytics 4 tracks page views with automatic route-change detection via a client-side `AnalyticsListener` component.

Custom events (all sent through `lib/analytics.ts`):

| Event | When | Key parameters |
| --- | --- | --- |
| `page_view` | Every route change | `content_group` (home / blog_index / blog_post) |
| `post_view` | A blog post opens | `post_slug`, `post_title`, `post_date`, `post_tags` |
| `read_progress` | 25 / 50 / 75 / 100% of a post read | `percent_scrolled`, post params |
| `post_read_complete` | Post end reached after at least 30s | `read_time_seconds`, post params |
| `share` | Share button or copy link | `method`, `item_id` |
| `copy_code` | Code block copied | `language`, `post_slug`, `line_count` |
| `select_content` | Blog post or GitHub repo link clicked | `content_type`, `item_id`, `link_location` |
| `contact_click` / `social_click` / `resume_download` | Email, LinkedIn/GitHub profile, resume PDF | `link_location` |
| `rss_click` | RSS feed link | `link_location` |
| `theme_change` | Theme picked | `theme`, `previous_theme` |
| `terminal_command` | Command run in the home terminal (name only) | `command` |
| `page_not_found` | 404 page shown | `page_path`, `page_referrer` |
| `CLS` / `LCP` / `INP` / `TTFB` / `FCP` | Core Web Vitals | `metric_value`, `metric_rating` |

`link_location` comes from the nearest `data-analytics-region` attribute (or header/footer/article). Generic outbound clicks, scrolls and file downloads are left to GA4 enhanced measurement.

To report on custom parameters, register them in GA4 (Admin → Custom definitions) and mark `post_read_complete`, `share`, `contact_click` and `resume_download` as key events.
