# RusticIT

Consulting portfolio and Beyond Code writing site for Saulo Vargas.

Built with **Astro 5**, **Tailwind CSS v4**, **Vue 3**, and **React 19**.

## Stack

- **Framework:** Astro 5 (SSG)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`
- **UI Frameworks:** Vue 3, React 19
- **Animations:** Framer Motion
- **3D:** Three.js, React Three Fiber
- **Content:** Markdown/MDX with Astro content collections
- **i18n:** English

## Project Structure

```
src/
├── assets/             # Images, logos, and Open Graph assets
├── components/
│   ├── react/          # React island components
│   ├── vue/bits/       # Vue components (ProfileCard, GradualBlur, etc.)
│   ├── Hero.astro
│   ├── Problem.astro
│   ├── Outcomes.astro
│   ├── AIIntegration.astro
│   ├── SelectedWork.astro
│   ├── Proof.astro
│   ├── HowWeWork.astro
│   ├── IdealFit.astro
│   ├── About.astro
│   ├── Contact.astro
│   ├── FinalCTA.astro
│   ├── Header.astro
│   └── Footer.astro
├── content/beyond-code/ # Beyond Code posts (.md / .mdx)
├── layouts/            # Base.astro, BlogPost.astro
├── lib/                # Shared utilities
├── pages/              # Routes (index, Beyond Code, resume, RSS)
└── styles/global.css   # Global styles and @font-face declarations
```

## Commands

| Command | Action |
|:--------|:-------|
| `yarn install` | Install dependencies |
| `yarn dev` | Start dev server at `localhost:4321` |
| `yarn build` | Build production site to `./dist/` |
| `yarn check:spelling` | Check project-authored source and metadata with cspell |
| `yarn preview` | Preview production build locally |
| `yarn astro` | Run Astro CLI commands |

## Landing Page Sections

Hero -> Problem -> Outcomes -> AI Integration -> Selected Work -> Proof -> How We Work -> Ideal Fit -> About -> Final CTA -> Contact -> Footer

## License

MIT
