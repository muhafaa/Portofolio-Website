# Personal Website

Portfolio site for Muhammad Fajri, frontend engineer. Built with Vue 3, Vite, TypeScript, and Tailwind CSS, and deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev     # local dev server
npm test        # unit tests (Vitest)
npm run build   # type-check and build to dist/
```

## Edit the content

All text on the site (intro, products, experience, skills, contacts) lives in `src/data/profile.ts`. Change it there; the components only handle layout.

## Deploy

Every push to `master` runs `.github/workflows/deploy.yml`, which tests, builds, and publishes `dist/` to GitHub Pages.

One-time setup: in the repository, open **Settings > Pages** and set **Source** to **GitHub Actions**.

The site is served at `https://muhafaa.github.io/Portofolio-Website/`. If you move it to a custom domain, change `base` in `vite.config.ts` to `'/'`.
