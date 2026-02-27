# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
yarn dev        # Start dev server at localhost:4321
yarn build      # Build production site to ./dist/
yarn preview    # Preview production build locally
yarn astro check  # Type-check .astro files
```

## Architecture

This is an **Astro 5 blog/portfolio site** for "Rustic IT" (Frontend Developer personal site). Package manager is **yarn**.

### Key files
- `src/consts.ts` — Site-wide constants (`SITE_TITLE`, `SITE_DESCRIPTION`)
- `src/content.config.ts` — Blog collection schema (title, description, pubDate, updatedDate, heroImage)
- `astro.config.mjs` — Astro config with MDX and Sitemap integrations; `site` URL needs updating from `example.com`

### i18n
The site has an i18n system under `src/i18n/`:
- `ui.ts` — Translation strings keyed by locale (`en`, `es`); `en` is the default
- `utils.ts` — `getLangFromUrl(url)` and `useTranslations(lang)` helpers
- Language is detected from the URL path prefix (e.g. `/es/about`)

### Layouts
- `Base.astro` — Minimal shell that sets `lang` attribute via i18n; used for i18n-aware pages
- `BlogPost.astro` — Full blog post layout with `Header`, `Footer`, `BaseHead`, hero image, and formatted dates

### Pages
- `src/pages/index.astro` — Homepage; currently has several sections commented out (`Services`, `HowWeWork`, `CaseStudies`, `About`, `Contact`) that are planned but not yet implemented
- `src/pages/blog/index.astro` and `[...slug].astro` — Blog listing and detail pages
- `src/pages/rss.xml.js` — RSS feed

### Content
- Blog posts live in `src/content/blog/` as `.md` or `.mdx` files
- Frontmatter fields: `title`, `description`, `pubDate`, `updatedDate` (optional), `heroImage` (optional)

### Styling
- Global styles in `src/styles/global.css` using CSS custom properties (`--accent`, `--black`, `--gray`, etc.)
- Font: Atkinson (woff files in `public/fonts/`)
- No CSS framework — plain CSS with scoped `<style>` blocks in `.astro` files