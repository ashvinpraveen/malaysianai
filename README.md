# Malaysian AI

The public Malaysian AI community site, built with Astro and Bun. It generates static pages for the homepage, community profile, residency, residents, contact details, legal pages, and blog, plus an RSS feed and sitemap.

## Development

Use Node.js 24 LTS and Bun 1.3.13. The supported Node.js minimum is 22.22.3.

```sh
bun install --frozen-lockfile
bun dev
```

Astro prints the local URL. No database is required. The Timeless fonts are optional; without them the build uses the fallback stacks described below.

## Timeless fonts

Display type is Timeless Serif and body type is Timeless Sans, from the [Timeless](https://www.timeless.co/type) family published by Timeless Ventures. PP Mondwest stays as the pixel accent.

The [Timeless Free Font License](https://www.timeless.co/type/license) allows these fonts to be embedded in a website, and only as part of that website. It does not allow putting them on a font service, a public server, or a public repository, and it does not allow redistribution. This repository is public, so the font files are not in git. `.gitignore` rejects Timeless files (woff, woff2, otf, ttf, and the other font extensions) anywhere in the tree.

The files live in a private Vercel Blob store connected to the Vercel project, under `fonts/timeless/`:

- `fonts/timeless/TimelessSerifVF.woff2`
- `fonts/timeless/TimelessSerifItalicVF.woff2`
- `fonts/timeless/TimelessSansVF.woff2`

`scripts/fetch-fonts.mjs` runs at the start of `bun dev` and `bun run build`. It reads `BLOB_READ_WRITE_TOKEN`, which Vercel sets when a Blob store is connected, and downloads those three files into `src/assets/fonts/timeless/`. Astro's local font provider then bundles them into the site, so they are served only as part of the build under `/_astro/fonts/`. The script does not print Blob URLs.

To build with the fonts on your machine, link the Vercel project, pull its env, and build:

```sh
vercel link
vercel env pull .env.local
bun run build
```

If `BLOB_READ_WRITE_TOKEN` is missing, or the download fails and no local copies are already present, the build still succeeds. Display falls back to Georgia, "Iowan Old Style", "Times New Roman", serif. Body falls back to system-ui, sans-serif. The script logs one warning.

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

Upcoming Luma events render as ordinary page links, so the calendar has no nested scroll area. The build fetches a public calendar snapshot; browsers refresh it through `/api/luma-events` when the section approaches the viewport. Vercel proxies this fixed route to Luma, and the dev server uses the same route. The static production preview uses the build snapshot. Failed refreshes preserve unexpired snapshot events and the calendar link. This public Luma endpoint is also used by Luma's embed, but is not their versioned API. Applications open the configured application page, and contact links open WhatsApp. This repository does not process submissions.

`docs/site-inventory.md` records the previous site's content and routes. It is historical context, not a list of currently implemented pages.

## Styling

`src/styles/tokens.css` owns shared fonts, text sizes, colors, and button values. Appearance follows `prefers-color-scheme` by default; the footer appearance control can lock light or dark. Dark colors live on `:root` and `html[data-theme='dark']`. Light colors live in the light media query and on `html[data-theme='light']`, so Tizen can switch without `light-dark()`. `Layout` accepts `neutral` for residency, residents, and contact; the `html.neutral-page` overrides define those pages in both themes. Change these values here when updating several pages together.

`src/styles/global.css` loads the tokens and fonts, then defines resets, shared buttons, and page transitions. Keep section layout, responsive rules, and animation styles in their Astro component. Hero and calendar styles live in `HeroSection.astro` and `MissionSection.astro`; `src/pages/index.astro` composes the homepage sections.

Use the shared text sizes for ordinary page headings and copy. Keep intentional homepage display sizes and illustration colors local. Edit an existing selector before adding another override, and group mobile and reduced-motion rules at the end of the component stylesheet.

## Deployment

Run `bun run build` and serve `dist/` with a static host that resolves directory URLs to `index.html`. The canonical site URL is configured in `astro.config.mjs`. No server runtime is needed after the build.

`vercel.json` configures the Astro build, removes trailing slashes, and sends retired AIMTO URLs to `https://aimto.my/` with HTTP 301 redirects. The `/aimto/:path*` rule covers arbitrary subpaths. Other retired routes point to the residency page or the communities section. Keep `/residency`, `/residents`, and `/contact` as pages.

Astro reads the exact redirect entries from this same file to generate fallback HTML for local preview and other static hosts. These fallback files use meta refresh; `astro preview` does not provide Vercel's HTTP status codes, wildcard routing, or slash normalization. After deployment, check `/aimto`, `/aimto/learnathon`, an arbitrary `/aimto/` subpath, and `/blog/` against the production host. Check that an unknown URL serves the custom 404 with status 404. On a different host, port these redirect rules before switching traffic.

## SEO and page metadata

Set the production hostname in `astro.config.mjs`. `BaseHead.astro` uses it for canonical URLs, share metadata, and Organization/WebSite structured data. Blog posts also emit BlogPosting data. The shared `PageMetadata` type and default share image are in `src/lib/seo.ts`.

Search-only titles, descriptions and keyword targets live in `src/lib/seo-content.ts`, keeping SEO edits separate from visible page copy. See [the keyword research notes](docs/seo-keywords.md) for the ten niche targets, sources and search-volume limitations.

Blog authors default to `Organization` because the current posts are credited to editorial teams. Set `authorType: Person` for an individual author. When adding a cover image, supply `imageAlt`, `imageWidth`, and `imageHeight` in frontmatter so share metadata matches the asset. `updatedDate` is optional and should reflect a substantive content update.

`robots.txt` and `llms.txt` are generated endpoints; the latter gets blog URLs from the content collection. The sitemap excludes redirects and the 404 page. Browser checks cover canonical URLs, actual share-image dimensions, structured data, crawl documents, and metadata updates during navigation.

Privacy and terms copy was carried over from the published site and the former `src/views/Privacy.tsx` and `src/views/Terms.tsx` at commit `9f16a4a`, retaining the February 3, 2026 date and contact addresses. This migration changes their presentation, not their policy terms.
