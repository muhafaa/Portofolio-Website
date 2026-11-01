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

## Medina POS overview

`medina-pos-overview/` is a separate static page (plain HTML, CSS, and JavaScript, no build step) that shows the screens and features of Medina POS while the product itself is not launched. It is served at `https://medina-pos-overview.pages.dev` and linked from the Personal projects section. It is temporary: once Medina POS is live, point the project link in `src/data/profile.ts` at the real site and delete the folder and the Pages project.

It is deployed by hand only. The Cloudflare Pages project `medina-pos-overview` has no Git connection, so pushes never publish it, and the GitHub Pages workflow ignores the folder. To publish a change, with Wrangler logged in (`npx wrangler login`):

```bash
npm run deploy:medina
```

The screenshots in `medina-pos-overview/shots/` come from a development build with demo data (store "Toko Awal").
