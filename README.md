# Robert Leggett — Portfolio & Blog

This is a [Next.js](https://nextjs.org) project powering [robertleggett.com.au](https://robertleggett.com.au), a personal portfolio and blog showcasing work, writing, and projects.

Built with:
- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript**
- **MDX for blog content**
- **Tailwind CSS v4**
- **Framer Motion** for animations
- **Google Analytics 4**

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Content

Blog posts are written in Markdown/MDX and stored under `content/publish/`.

Each post includes standard frontmatter fields like:
```yaml
---
title: "Post title"
date: "2025-01-10"
slug: "post-slug"
feature_image: "/blog/post/feature-image.png"
---
```

## 🛠️ Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Generate RSS, sitemap, post index, and build for production |
| `npm run lint` | Run ESLint |
| `npm run start` | Start production server |
| `npm run ping-search-engines` | Notify Bing and Yandex of sitemap updates |

## 🏷️ Versioning

This project uses [Semantic Release](https://semantic-release.gitbook.io/) for automated versioning and changelog generation.

### Commit Convention

Commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

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

Examples:
```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix: resolve mobile navigation issue"
git commit -m "feat!: redesign blog layout"
```

Releases are automatically created on push to `main` when commits trigger a version bump.

## 🚢 Deployment

The site is statically exported and automatically deployed with GitHub Pages.

Build output is generated to `out/` directory.

## 📊 Analytics

Google Analytics 4 is used to measure engagement and traffic insights.
