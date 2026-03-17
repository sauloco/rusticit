# Rustic IT

Personal portfolio and blog site for Saulo Vargas — frontend developer.

Built with **Astro 5**, **Tailwind CSS v4**, **Vue 3**, and **React 19**.

## Stack

- **Framework:** Astro 5 (SSG)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`
- **UI Frameworks:** Vue 3, React 19
- **Animations:** Framer Motion, Motion-V, GSAP
- **3D:** Three.js, React Three Fiber
- **Blog:** Markdown/MDX with content collections
- **i18n:** English (default) + Spanish

## Project Structure

```
src/
├── components/
│   ├── react/bits/     # React components (Lamp, MagnetLines, etc.)
│   ├── vue/bits/       # Vue components (ProfileCard, GradualBlur, etc.)
│   ├── Hero.astro
│   ├── Problem.astro
│   ├── Services.astro
│   ├── SelectedWork.astro
│   ├── HowWeWork.astro
│   ├── IdealFit.astro
│   ├── About.astro
│   ├── FinalCTA.astro
│   ├── Header.astro
│   └── Footer.astro
├── content/blog/       # Blog posts (.md / .mdx)
├── i18n/               # Translation strings and helpers
├── layouts/            # Base.astro, BlogPost.astro
├── pages/              # Routes (index, blog, RSS)
└── styles/global.css   # Global styles and @font-face declarations
```

## Commands

| Command | Action |
|:--------|:-------|
| `yarn install` | Install dependencies |
| `yarn dev` | Start dev server at `localhost:4321` |
| `yarn build` | Build production site to `./dist/` |
| `yarn preview` | Preview production build locally |
| `yarn astro check` | Type-check `.astro` files |

## Landing Page Sections

Hero → Problem → Services → Selected Work → How We Work → Ideal Fit → About → Final CTA → Footer

## License

MIT