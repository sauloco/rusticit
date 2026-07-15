# Rustic IT

Site for Rustic IT — Saulo Vargas' senior full-stack product engineering & AI integration practice for B2B SaaS.

Built with **Astro 5**, **Tailwind CSS v4**, **Vue 3**, and **React 19**.

## Stack

- **Framework:** Astro 5 (SSG)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`
- **UI Frameworks:** Vue 3, React 19
- **Animations:** Framer Motion, Motion-V, GSAP
- **3D:** Three.js, React Three Fiber, TresJS
- **Content:** Markdown/MDX via content collections (`beyond-code`)
- **Locale:** English only

## Project Structure

```
src/
├── components/
│   ├── react/          # React components (BookerIframe, etc.)
│   ├── vue/bits/        # Vue components (BlurText, Carousel, ProfileCard, etc.)
│   ├── ui/               # Shared UI primitives
│   ├── Hero.astro
│   ├── Problem.astro
│   ├── Outcomes.astro
│   ├── AIIntegration.astro
│   ├── SelectedWork.astro
│   ├── Proof.astro
│   ├── HowWeWork.astro
│   ├── IdealFit.astro
│   ├── About.astro
│   ├── FinalCTA.astro
│   ├── Contact.astro
│   ├── Header.astro
│   └── Footer.astro
├── content/beyond-code/  # Long-form posts (.md / .mdx)
├── layouts/              # Base.astro, BlogPost.astro
├── pages/                # Routes: index, beyond-code, resume, presentador, refined-jw, RSS
└── styles/global.css     # Global styles and @font-face declarations
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

Hero → Problem → Outcomes → AI Integration → Selected Work → Proof → How We Work → Ideal Fit → About → Final CTA → Contact → Footer

## License

MIT
