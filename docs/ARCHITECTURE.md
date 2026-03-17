# Architecture Overview

This document describes the technical architecture of [robertleggett.com.au](https://robertleggett.com.au) — a statically-generated portfolio and blog site.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Pages (CDN)                    │
│                 robertleggett.com.au                     │
├─────────────────────────────────────────────────────────┤
│                  Static HTML / CSS / JS                  │
│               Generated at build time by                 │
│              Next.js (output: "export")                  │
└──────────────────────┬──────────────────────────────────┘
                       │ Build
┌──────────────────────┴──────────────────────────────────┐
│                   GitHub Actions CI/CD                    │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────┐ │
│  │ Generate   │  │ Generate   │  │ Generate Post      │ │
│  │ RSS Feed   │  │ Sitemap    │  │ Index (JSON)       │ │
│  └─────┬──────┘  └─────┬──────┘  └────────┬───────────┘ │
│        └────────────────┼──────────────────┘             │
│                    next build                            │
│               (Static Export → /out)                     │
└──────────────────────┬──────────────────────────────────┘
                       │ Source
┌──────────────────────┴──────────────────────────────────┐
│                    Source Repository                      │
│  ┌──────────┐  ┌───────────┐  ┌───────────────────────┐ │
│  │ app/     │  │ content/  │  │ components/           │ │
│  │ (Routes) │  │ (MDX/MD)  │  │ (React Components)    │ │
│  └──────────┘  └───────────┘  └───────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.x |
| UI | React | 19.x |
| Styling | Tailwind CSS | 4.x |
| Components | shadcn/ui (Radix UI) | 0.9.x |
| Content | MDX + gray-matter | — |
| Syntax Highlighting | rehype-highlight + react-syntax-highlighter | — |
| Animations | Framer Motion | 12.x |
| Themes | next-themes (15 themes) | — |
| Analytics | Google Analytics 4 + Web Vitals | — |
| Image Processing | sharp (SVG → PNG) | 0.34.x |
| CI/CD | GitHub Actions | — |
| Versioning | semantic-release | 25.x |
| Hosting | GitHub Pages | — |

---

## Directory Structure

```
Rob-Leggett/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, GA, themes)
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles + theme variables
│   ├── not-found.tsx             # Custom 404 page
│   ├── blog/
│   │   ├── page.tsx              # Blog listing (grid of cards)
│   │   └── [slug]/
│   │       └── page.tsx          # Dynamic blog post renderer
│   └── favicon.ico
│
├── components/                   # React components (~18 files)
│   ├── ui/                       # shadcn/ui primitives
│   │   ├── card.tsx              # Card, CardHeader, CardContent
│   │   ├── badge.tsx             # Badge with variants
│   │   └── button.tsx            # Button with CVA variants
│   ├── blog/                     # Blog-specific components
│   │   ├── code-block.tsx        # Syntax-highlighted code blocks
│   │   ├── blog-feed.tsx         # Latest posts grid
│   │   ├── blog-layout.tsx       # Post wrapper layout
│   │   ├── share-bar.tsx         # Social share buttons
│   │   └── cloud-comparison-table.tsx
│   ├── layout/                   # Global layout components
│   │   ├── header.tsx            # Site header + navigation
│   │   ├── footer.tsx            # Site footer
│   │   ├── theme-switcher.tsx    # Theme dropdown (15 themes)
│   │   └── interactive-terminal.tsx
│   ├── home/
│   │   └── scrollable-section.tsx
│   ├── github/
│   │   └── github-projects.tsx   # GitHub repo cards
│   ├── providers/
│   │   ├── theme-provider.tsx    # next-themes wrapper
│   │   ├── analytics-listener.tsx # GA4 + Web Vitals
│   │   └── unregister-sw.tsx     # Service worker cleanup
│   └── seo/
│       └── json-ld.tsx           # Schema.org structured data
│
├── content/                      # Blog content
│   ├── publish/                  # 63 published MDX/MD posts
│   └── data/
│       └── cloud-services.json   # Cloud provider service mapping
│
├── lib/                          # Utilities
│   ├── posts.ts                  # Post reading + frontmatter parsing
│   ├── mdx-components.tsx        # MDX component overrides
│   ├── themes.ts                 # 15 theme definitions
│   └── utils.ts                  # Tailwind merge helpers
│
├── types/                        # TypeScript type definitions
│   └── blog.ts                   # PostMeta, PostData types
│
├── scripts/                      # Build-time generators
│   ├── generate-rss.js           # RSS 2.0 feed → public/rss/feed.xml
│   ├── generate-sitemap.js       # XML sitemap → public/sitemap.xml
│   └── generate-post-index.js    # Blog metadata → public/metadata/blog-posts.json
│
├── public/                       # Static assets
│   ├── blog/                     # Post images (feature + inline)
│   ├── avatar/                   # Profile photo
│   ├── resume/                   # Downloadable CV (PDF)
│   ├── rss/                      # Generated RSS feed
│   ├── metadata/                 # Generated post index
│   ├── og-image.png              # Default Open Graph image
│   ├── robots.txt                # Crawler directives
│   └── sitemap.xml               # Generated sitemap
│
├── docs/                         # Project documentation
├── .github/workflows/            # CI/CD pipelines
│   ├── pages.yml                 # Build + deploy to GitHub Pages
│   └── release.yml               # semantic-release versioning
│
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── components.json               # shadcn/ui configuration
├── eslint.config.mjs             # ESLint configuration
├── postcss.config.mjs            # PostCSS configuration
├── package.json                  # Dependencies + scripts
├── CNAME                         # GitHub Pages custom domain
├── CHANGELOG.md                  # Auto-generated changelog
└── README.md                     # Project README
```

---

## Request Flow

### Static Site Generation (Build Time)

```
1. GitHub Actions triggers on push to main
2. Pre-build scripts run:
   ├── generate-rss.js     → public/rss/feed.xml
   ├── generate-sitemap.js → public/sitemap.xml
   └── generate-post-index.js → public/metadata/blog-posts.json
3. next build runs:
   ├── Compiles TypeScript + React components
   ├── Processes 63 MDX/MD files via gray-matter + MDXRemote
   ├── Generates static HTML for each route (~68 pages)
   └── Outputs to /out directory
4. GitHub Pages deploys /out to CDN
```

### Page Render (Runtime)

```
User requests robertleggett.com.au/blog/deep-dive-dns/
  → GitHub Pages CDN serves pre-built HTML
  → Browser hydrates React components
  → Theme loaded from localStorage
  → GA4 page view event fired
  → Web Vitals measured and reported
```

---

## Content Pipeline

### Blog Post Lifecycle

```
1. Author writes MDX file in content/publish/
2. Frontmatter includes: title, date, slug, tags, meta, og, twitter
3. Feature image generated (sharp SVG→PNG) → public/blog/[slug]/
4. Inline diagrams generated → public/blog/[slug]/inline-N.png
5. Build processes MDX:
   ├── gray-matter extracts frontmatter
   ├── MDXRemote renders content with plugins:
   │   ├── remark-gfm (tables, strikethrough)
   │   ├── rehype-slug (heading IDs)
   │   ├── rehype-autolink-headings (anchor links)
   │   └── rehype-highlight (syntax highlighting)
   └── Custom components injected (CodeBlock, CloudComparisonTable)
6. JSON-LD structured data generated (Article + Breadcrumb schemas)
7. Static HTML output with full SEO metadata
```

### MDX Component Resolution

```
MDX Content → mdx-components.tsx mapping:
  <h1> → Styled heading component
  <h2> → Styled heading component
  <h3> → Styled heading component
  <pre><code> → <CodeBlock> (syntax highlighting + copy button)
  <code> → Inline code styling
  <CloudComparisonTable> → Cloud services comparison
```

---

## Theme System

The site supports 15 themes using CSS custom properties in oklch() colour space:

| Category | Themes |
|----------|--------|
| Default | Light, Dark, System |
| Developer | Catppuccin, Gruvbox, Rosé Pine, Solarized, GitHub Dark, One Dark, Everforest |
| Professional | Corporate Blue, Executive, Slate, Ocean, Minimal |

Theme variables are defined in `lib/themes.ts` and applied via `app/globals.css`. The `<ThemeSwitcher>` component persists selection to localStorage via next-themes.

---

## SEO Architecture

| Feature | Implementation |
|---------|---------------|
| Meta tags | Per-page via `generateMetadata()` in each route |
| Open Graph | Frontmatter `og` section → `<meta property="og:*">` |
| Twitter Cards | Frontmatter `twitter` section → `<meta name="twitter:*">` |
| JSON-LD | `components/seo/json-ld.tsx` → WebSite, Person, Article, Breadcrumb |
| Sitemap | `scripts/generate-sitemap.js` → `public/sitemap.xml` |
| RSS | `scripts/generate-rss.js` → `public/rss/feed.xml` |
| Robots | `public/robots.txt` (allows all crawlers) |
| Canonical URLs | Frontmatter `meta.canonical` field |
| `metadataBase` | Set in root layout for absolute URL resolution |

---

## Analytics

- **Google Analytics 4** (GA_ID: configurable via `NEXT_PUBLIC_GA_ID` env var)
- **Web Vitals** tracked: CLS, LCP, FID, TTFB, INP
- **Content grouping**: home, blog_index, blog_post, other
- **Route change detection** via `usePathname` + `useSearchParams`
- Implementation in `components/providers/analytics-listener.tsx`

---

## CI/CD Pipelines

### Deploy Pipeline (`.github/workflows/pages.yml`)

```
Trigger: push to main | manual dispatch
→ Checkout (fetch-depth: 0)
→ Setup Node 22 + npm cache
→ npm ci
→ npm run build (pre-build scripts + next build)
→ Upload /out as artifact
→ Deploy to GitHub Pages
```

### Release Pipeline (`.github/workflows/release.yml`)

```
Trigger: push to main
→ Checkout (fetch-depth: 0)
→ Setup Node 22
→ npm ci
→ npx semantic-release
→ Creates version tag, CHANGELOG entry, GitHub release
```

### Conventional Commits

| Prefix | Version Bump | Example |
|--------|-------------|---------|
| `feat:` | Minor (1.x.0) | `feat: add dark mode` |
| `fix:` | Patch (1.0.x) | `fix: broken image link` |
| `feat!:` | Major (x.0.0) | `feat!: redesign homepage` |
| `docs:` | No release | `docs: update README` |
| `chore:` | No release | `chore: update deps` |
