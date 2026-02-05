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
- `/` -> `src/app/page.tsx` (renders `src/views/MalaysianAI.tsx`)
- `/residency` -> `src/app/residency/page.tsx` (renders `src/views/Index.tsx`)
- `/canvas` -> `src/app/canvas/page.tsx` (renders `src/views/CanvasOverview.tsx`)
- `/book-demo` -> `src/app/book-demo/page.tsx` (renders `src/views/BookDemo.tsx`)
- `/blog` -> `src/app/blog/page.tsx` (renders `src/views/Blog.tsx`)
- `/blog/:slug` -> `src/app/blog/[slug]/page.tsx` (renders `src/views/BlogPost.tsx`)
- `/company` -> `src/app/company/page.tsx` (renders `src/views/Company.tsx`)
- `/community` -> `src/app/community/page.tsx` (renders `src/views/CommunityDirectory.tsx`)
- `/residents` -> `src/app/residents/page.tsx` (renders `src/views/ResidentsDirectory.tsx`)
- `/contact` -> `src/app/contact/page.tsx` (renders `src/views/Contact.tsx`)
- `/showandtell` -> `src/app/showandtell/page.tsx` (renders `src/views/ShowAndTell.tsx`)
- `/privacy` -> `src/app/privacy/page.tsx` (renders `src/views/Privacy.tsx`)
- `/terms` -> `src/app/terms/page.tsx` (renders `src/views/Terms.tsx`)
- `*` -> `src/app/not-found.tsx`

## Key Content Sources
- Blog content and categories: `src/lib/blog-data.ts`
- Resident companies and logos: `src/lib/residents.ts` and `src/components/ResidentLogos.tsx`
- Community partner directory data: `src/data/communityPartners.ts`

## Core Page Files
- Main landing and initiative overview: `src/views/MalaysianAI.tsx`
- Residency landing: `src/views/Index.tsx`
- Blog list and filtering: `src/views/Blog.tsx`
- Blog detail view: `src/views/BlogPost.tsx`
- Residents directory: `src/views/ResidentsDirectory.tsx`
- Community directory: `src/views/CommunityDirectory.tsx`

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
- For a route or page: check `src/app`, then open the referenced file in `src/views`.
- For a section on a page: search within the page file for the section heading or component name.
- For data displayed on a page: check `src/lib/*` and `src/data/*`.
- For reusable UI: look in `src/components` and `src/components/ui`.
- For styling rules: check `claude.md` first, then `src/index.css`.

## Conventions and Guardrails
- Do not edit `dist/` or `node_modules/`.
- Prefer design-system classes from `claude.md` over ad-hoc styling.
- When adding a new UI pattern, document it in `claude.md`.
- Keep copy changes close to the relevant page or data file rather than scattering content across components.
