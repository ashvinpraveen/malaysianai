# Agents

## What This Site Is
Malaysia’s AI Residency and Hub website. It promotes the Malaysian AI initiative, highlights the residency program, showcases resident companies, shares community partners, and publishes program updates via a simple blog.

## High-Level Architecture
- Vite + React + TypeScript SPA.
- React Router for pages.
- Tailwind CSS with a documented design system in `claude.md`.
- Shadcn/Radix UI primitives in `src/components/ui`.
- React Query provider initialized in `src/App.tsx`.

## Entry Points
- `index.html`: Vite HTML entry.
- `src/main.tsx`: React root and global CSS import.
- `src/App.tsx`: Router, providers, global UI (toasters, tooltips, error boundary).

## Routes Map
- `/` -> `src/pages/MalaysianAI.tsx`
- `/residency` -> `src/pages/Index.tsx`
- `/canvas` -> `src/pages/CanvasOverview.tsx`
- `/book-demo` -> `src/pages/BookDemo.tsx`
- `/blog` -> `src/pages/Blog.tsx`
- `/blog/:slug` -> `src/pages/BlogPost.tsx`
- `/company` -> `src/pages/Company.tsx`
- `/community` -> `src/pages/CommunityDirectory.tsx`
- `/residents` -> `src/pages/ResidentsDirectory.tsx`
- `/contact` -> `src/pages/Contact.tsx`
- `/showandtell` -> `src/pages/ShowAndTell.tsx`
- `/privacy` -> `src/pages/Privacy.tsx`
- `/terms` -> `src/pages/Terms.tsx`
- `*` -> `src/pages/NotFound.tsx`

## Key Content Sources
- Blog content and categories: `src/lib/blog-data.ts`
- Resident companies and logos: `src/lib/residents.ts` and `src/components/ResidentLogos.tsx`
- Community partner directory data: `src/data/communityPartners.ts`

## Core Page Files
- Main landing and initiative overview: `src/pages/MalaysianAI.tsx`
- Residency landing: `src/pages/Index.tsx`
- Blog list and filtering: `src/pages/Blog.tsx`
- Blog detail view: `src/pages/BlogPost.tsx`
- Residents directory: `src/pages/ResidentsDirectory.tsx`
- Community directory: `src/pages/CommunityDirectory.tsx`

## Important Components
- Global layout: `src/components/Navbar.tsx`, `src/components/Footer.tsx`
- Residency highlights and sections: `src/components/Hero.tsx`, `src/components/Benefits.tsx`, `src/components/Residents.tsx`, `src/components/CTA.tsx`
- Application flow: `src/components/ApplicationForm.tsx` and hooks in `src/hooks`
- UX helpers: `src/components/ScrollToTop.tsx`, `src/components/ErrorBoundary.tsx`

## Styling System
- Design system spec: `claude.md` (follow it when changing typography, colors, or spacing).
- Global styles: `src/index.css` and `src/App.css`.
- Tailwind config: `tailwind.config.ts`.
- Shadcn config and aliases: `components.json`.

## Utilities and Aliases
- Path alias: `@/*` maps to `src/*` via `tsconfig.json`.
- Utility helpers: `src/lib/utils.ts` (class name helpers, etc).
- Custom hooks: `src/hooks/*`.

## Integrations
- Supabase client and types: `src/integrations/supabase/*`.
- Supabase config: `supabase/`.

## Assets
- App images and media: `public/` (served at root, used by `<img src="/...">`).
- Local static assets: `src/assets/*` (imported by components).

## Tests
- Vitest setup: `src/test/setup.ts`.
- Example test: `src/test/example.test.ts`.

## Tooling
- Vite config: `vite.config.ts`.
- ESLint: `eslint.config.js`.
- TypeScript configs: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`.
- Vercel deploy config: `vercel.json`.

## Common Commands
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run build:dev`
- `npm run preview`
- `npm run lint`
- `npm run test`
- `npm run test:watch`

## How To Find Things Fast
- For a route or page: check `src/App.tsx`, then open the referenced file in `src/pages`.
- For a section on a page: search within the page file for the section heading or component name.
- For data displayed on a page: check `src/lib/*` and `src/data/*`.
- For reusable UI: look in `src/components` and `src/components/ui`.
- For styling rules: check `claude.md` first, then `src/index.css`.

## Conventions and Guardrails
- Do not edit `dist/` or `node_modules/`.
- Prefer design-system classes from `claude.md` over ad-hoc styling.
- When adding a new UI pattern, document it in `claude.md`.
- Keep copy changes close to the relevant page or data file rather than scattering content across components.
