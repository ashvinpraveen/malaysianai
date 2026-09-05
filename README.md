# Malaysian AI

The public Malaysian AI community site, built with Astro and Bun. It generates static pages for the homepage, residency, residents, contact details, and blog, plus an RSS feed and sitemap.

## Development

Use Node.js 24 LTS and Bun 1.3.13. The supported Node.js minimum is 22.22.3.

```sh
bun install --frozen-lockfile
bun dev
```

Astro prints the local URL. No environment variables or database are required.

## Checks

Install Chromium once for browser tests:

```sh
bunx playwright install chromium
bun run verify
```

`verify` runs Astro type checking, ESLint, a production build, a local link and asset audit, and Playwright tests on desktop and mobile Chromium. The browser tests cover public routes, dialog focus, client navigation, reduced motion, and offscreen animation cleanup. They block external requests to keep third-party embeds out of the test run.

Individual commands:

| Command | Purpose |
| --- | --- |
| `bun run check` | Check Astro and TypeScript diagnostics |
| `bun run lint` | Lint source, scripts, and tests |
| `bun run build` | Generate the static site in `dist/` |
| `bun run check:links` | Audit built local links, anchors, assets, and the hero image budget |
| `bun run test` | Run browser tests against an existing build on port 4325 |
| `bun run preview` | Preview the production build |

GitHub Actions runs the same checks for pushes and pull requests.

## Editing content

- `src/content/blog/` contains Markdown and MDX stories. Required frontmatter is defined in `src/content.config.ts`: title, description, publication date, author, and category. Images, image descriptions, and updated dates are optional.
- `src/data/residents.ts` and `src/data/voices.ts` are the shared resident and testimonial lists.
- `src/consts.ts` contains the site description, application, event, WhatsApp, and venue URLs.
- `src/pages/` defines public routes. Layouts and section components live in `src/layouts/` and `src/components/`.
- The hero source lives in `src/assets/hero-fibonacci.png`. Astro generates responsive WebP variants during the build. Other public assets live in `public/`.

The Luma calendar loads from an external iframe. Applications open the configured Airtable form, and contact links open WhatsApp. This repository does not process submissions.

`docs/site-inventory.md` records the previous site's content and routes. It is historical context, not a list of currently implemented pages.

## Styling

`src/styles/tokens.css` owns shared fonts, text sizes, colors, and button values. Its default theme preserves the homepage and blog palette. `Layout` accepts `neutral` for residency, residents, and contact; the `html.neutral-page` overrides define their white text and neutral backgrounds. Change these values here when updating several pages together.

`src/styles/global.css` loads the tokens and fonts, then defines resets, shared buttons, and page transitions. Keep section layout, responsive rules, and animation styles in their Astro component. Hero and calendar styles live in `HeroSection.astro` and `MissionSection.astro`; `src/pages/index.astro` composes the homepage sections.

Use the shared text sizes for ordinary page headings and copy. Keep intentional homepage display sizes and illustration colors local. Edit an existing selector before adding another override, and group mobile and reduced-motion rules at the end of the component stylesheet.

## Deployment

Run `bun run build` and serve `dist/` with a static host that resolves directory URLs to `index.html`. The canonical site URL is configured in `astro.config.mjs`. No server runtime is needed after the build.
