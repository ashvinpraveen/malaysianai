# What this site was

A snapshot of Malaysian AI as it existed before the Astro rewrite. This is the content and product brief for a new app. Nothing here is a migration plan. The old Next.js app, Supabase leftovers, and component library are not coming with us.

The live site is [malaysian.ai](https://malaysian.ai). Initiated by 500 Global, managed by AI SEA.

---

## What the product actually is

Malaysian AI is a public-facing hub for people in Malaysia who want to learn and build with AI. The site does three jobs:

1. Point people at events and communities so they can start.
2. Sell the residency as a structured programme for founders.
3. Promote AI Malaysia Takeover (AIMTO), a two-day public event at The Campus, Ampang on 11–12 August 2026.

Those jobs live in one repo, but they are two different sites in practice. The hub (cream, Inter, Newsreader, batik photography) and AIMTO (near-black, mono type, lime accents, event photography) do not share a visual language. The new app should treat them as two content brands, not one theme with a dark mode.

---

## Pages that were public

### Hub

| URL | Title / job | Notes |
| --- | --- | --- |
| `/` | Home. "Driving Malaysia's AI progress." | Events embed, four support pillars, community cards, residency teaser, testimonials, CTA to Luma |
| `/community` | Community partners directory | Same eight partners as the homepage, with searchless cards |
| `/residency` | Residency landing. "Build in Malaysia. Ship for the World." | Programme benefits, Show and Tell, 500 Global, venue, residents, community logos, apply CTA |
| `/residency/apply` | Apply to the residency | Airtable embed, not a custom form |
| `/residency/showandtell` | Show and Tell Thursday signup | Form opens WhatsApp with a prefilled message |
| `/residents` | Residents directory | Search by name, description, tags |
| `/venue` | 500 Global KL space | Address, Waze, Google Maps, three highlights |
| `/blog` | Blog index | Filter by category via query string |
| `/blog/applications-open-2026` | Applications open for the 2026 cohort | Announcement |
| `/blog/inside-the-curriculum` | Inside the residency curriculum | Curriculum |
| `/contact` | Get in touch | Form opens WhatsApp (`60109847954`) |
| `/privacy` | Privacy policy | Last updated 3 February 2026 |
| `/terms` | Terms of service | Last updated 3 February 2026 |

Nav on the hub: Events (`/#events`), Communities, Residency. Primary CTA: "Join the next AI event" to Luma.

Footer: View events, Communities, Residency, AI Takeover (external `aitakeover.co`), Blog, Residents, Contact.

### AIMTO

| URL | Title / job | Notes |
| --- | --- | --- |
| `/aimto` | AI Malaysia Takeover 2026 | Canonical event page |
| `/aimalaysiatakeover` | Redirect | Sends people to `/aimto` |
| `/aimto/learnathon` | The Malaysian Learn-a-thon | Public Learn-a-thon page, day 2 of AIMTO |

Tickets: `https://event.aimto.my/concierge-menu/registration`. Side events and speakers live on `aimto.my`, not on this site.

`/aimto/learnathon2`, `/aimto/learnathon3`, and `/aimto/learnathon4` are design iterations of the same Learn-a-thon page. They were not the canonical public URL. Take the content from `/aimto` and `/aimto/learnathon`. Treat the numbered routes as discarded drafts unless someone explicitly wants a variant back.

### Internal, not for the public site

| URL | What it is | robots.txt |
| --- | --- | --- |
| `/start` | Show and Tell session timer. 5 minutes sharing, 2 minutes Q&A, fullscreen, audio cues | Disallowed |
| `/canvas` | Zoomable sitemap of the old site | Disallowed |

These are studio tools. They do not belong in the CMS and they do not need to ship in the first public Astro app.

Sitemap also omitted `/aimto` and the Learn-a-thon. Worth including them in the new site.

---

## Home page content

Hero: "Driving Malaysia's AI progress." Subcopy: the home of AI builders in Malaysia. Workshops, events, communities. CTA: join the next AI event. Background: batik KL sunrise. Credit line: initiated by 500 Global, managed by AI SEA.

Events: Luma calendar embed (`cal-pPgkuwCFrycSv1Z`) plus a link to `https://luma.com/malaysianai`.

Mission: "Your first step into AI starts here." Supporting line about workshops, events, and a mixed-skill community.

Four support pillars:

- Events and talks
- Connecting communities
- AI residency
- Content and education (Instagram `@malaysianai`)

Then: 500 Global host blurb, community partner cards, residency teaser with a logo ticker, six community testimonials, closing CTA "Start building today."

Testimonials (keep the wording):

- "SF vibes and atmosphere, one-of-a-kind place in Malaysia"
- "You guys brought all the big guns…" (includes strong language)
- "I felt the pulse of the community. It inspired me to build with AI. I went home and learnt Claude Code…"
- "One of the few sessions where we had a serious discussion about AI…"
- "Gave me hope about the state of Malaysian youth and builders"
- Someone wanting to run a similar vibe-coding programme for school students

---

## Residency content

Hero: "Build in Malaysia. Ship for the World." A residency for AI-native builders to go all-in and launch globally. Apply CTA.

Programme:

- Weekly show and tells, Thursday 4pm
- Co-working space
- Support across technical, fundraising, product, GTM, content

Show and Tell Thursdays: open day. Cowork from 11am. Session at 4pm. Signup page fields: name, email, social, referral, what they are working on, what they learned this week. Submit goes to WhatsApp.

500 Global: VC firm, $2.1B+ AUM, 80+ countries, early investor in Grab, Carsome, Carousell, Canva, Udemy. 3000+ companies, 35+ unicorns, 270+ exits.

Venue (residency home, not the AIMTO venue):

- 500 Global, Bangunan AICB, 10 Jalan Dato' Onn, 50480 Kuala Lumpur
- Near Bandaraya LRT
- Permanent daily base, fast internet, meeting rooms
- Highlights: permanent base, heart of KL, built for builders
- Photo currently hotlinked from The Star CMS. Do not keep that URL. Host a licensed image or drop the photo.

Application: Airtable form `appBgmnpu1bJljnxX` / `pagEZn6n60tDty3lP`. The new site can keep embedding that, or editors can swap the URL in the CMS.

---

## Residents

Seven companies. Fields: name, description, focus, location, cohort, status, tags, website, logo.

| Name | Focus | Location | Cohort | Website |
| --- | --- | --- | --- | --- |
| ReplyrAI | Customer Experience | Kuala Lumpur | 02 | https://replyr.ai |
| Cleve | Knowledge Systems | Penang | 01 | https://cleve.ai |
| DocuAsk | Document AI | Johor Bahru | 02 | https://docuask.com |
| Blue Bolt Labs | Industry 4.0 | Shah Alam | 02 | https://blueboltlabs.com |
| Seavoice | Voice & Speech | Kota Kinabalu | 01 | https://seavoice.ai |
| Klovr | Education | Petaling Jaya | 02 | https://klovr.co/ |
| Kelas Sekejap | Education | Kuala Lumpur | 01 | https://kelassekejap.com |

All were marked Active. ReplyrAI, Cleve, and DocuAsk used inline SVG logos. The others used image files. In the new CMS, every resident should be an image upload. No special-case logo components.

---

## Community partners

Eight partners. Fields: name, URL, logo, short summary.

- Build Club
- Build with AI
- AI Tinkerers
- AI Hackerdorm
- AI SEA
- Rakan Tutor
- CoderPuffs (calendar link, not a homepage)
- Cursor Community (Instagram)

The homepage duplicated this list in the page file. The residency page read `src/data/communityPartners.ts`. One list in the CMS is enough.

---

## Blog

Keep the blog as Markdown files in the new Astro app. Two posts is not a CMS problem. Astro content collections give you a Zod schema, typed frontmatter, and `getCollection('blog')` without Sanity.

Three categories existed: Announcements, Cohort Stories, Curriculum. Cohort Stories has no posts.

Two posts, both dated 3 February 2026, both by "Residency Team":

**Applications open for the 2026 cohort** (`applications-open-2026`)
Who should apply, what to expect. Quote: "We're focused on shipping meaningful AI products with local impact."

**Inside the residency curriculum** (`inside-the-curriculum`)
Sprint cadence, deliverables (problem statement, prototype and pilot plan, demo day narrative).

Posts were structured as heading / paragraphs / bullets / quote blocks. In the new app those become ordinary Markdown. Frontmatter can hold title, slug, category, author, date, summary, and cover. Move the blog into Sanity later if non-devs start publishing weekly. Not now.

---

## AIMTO content

Event: AI Malaysia Takeover 2026. 11–12 August 2026. The Campus, Ampang, Kuala Lumpur. Free public registration. Organised with Ludic (`hello@ludic.asia` for contribution, exhibitor, partnership). Registration at `event.aimto.my`.

Headline: "Learn, Build & Experience Malaysian AI."

Ticker: keynotes + panels, learn-a-thon, workshops + live demos, AI Open House, The Campus Ampang, beginners welcome, meet the AI community.

Experience zones:

| Label | Days | Title |
| --- | --- | --- |
| BUILD AI_ | Day 2 | Learn-a-thon |
| THE WAR ROOM_ | Day 1–2 | Keynotes & Panels |
| THE SANDBOX_ | Day 1–2 | Workshops & Live Demos |
| PASAR AI_ | Day 1–2 | AI Open House |

Named trainers on the page: Timothy Tiah (Colony), Jon Lai (Atomic Group), Warren Leow (AITraining2U), Danial Hadi (KrackedDevs). Photos in `public/aimto-assets/trainers/`.

FAQs: free event, no coding required, bring a laptop if you want to build, both days optional, experienced builders welcome, venue is The Campus Ampang.

Inclusive title scramble (keep `AI FOR` fixed, rotate the audience): THE RAKYAT, ALL MALAYSIANS, THE PEOPLE, KITA SEMUA, 人民, மக்கள், KITAI SEMUA, THE AUNTIES, THE UNCLES, THE PAKCIKS, THE MAKCIKS, THE TEENAGERS, THE STUDENTS, THE RETIREES.

About 30 partner logos lived as numbered PNGs in `public/aimto-assets/partners/`.

Contact paths on the event page: Instagram `@malaysianai`, mailto Ludic, maps query for The Campus Ampang.

---

## Learn-a-thon content

Public page: `/aimto/learnathon`. One-day public AI build on 12 August 2026, same venue as AIMTO. Beginners welcome. Take the build home.

Headline family: "Learn AI. Build Something." / "Make Something With AI." Manifesto from the later draft: a first-of-its-kind public AI learning event for Malaysians from teenagers to retirees.

How it works / floor journey (the useful version):

1. Arrive. Builder Pass, WiFi, setup help.
2. Choose. Build Wall, prompts, teammates.
3. Build. Shared floor, mixed skill levels.
4. Get help. Mentors, helpdesk, guides.
5. Ship. Debug & Deploy Bar.
6. Share. Gallery and rolling five-minute show and tell.

Zones: starter kits, inspiration wall, builder floor, mentors, debug/deploy, gallery.

Project idea cards (prompts people can actually make):

- Ordering website for home-cooked cinnamon rolls
- Family trip planner
- Personal money tracker
- Boss-battle study game
- Wedding planner
- Invoice automation
- Personal AI assistant
- Fitness and calorie coach
- Family care organiser

Learn-a-thon FAQs: no coding needed, borrow a mission if you have no idea, bring a laptop and charger.

Visual note from the old design system: after the shared AIMTO hero, the Learn-a-thon page switched to warm cream, pastel cards, sentence-case sans headings. Mono type stayed on metadata only.

---

## Two venues

Do not collapse these.

**Residency / hub space:** 500 Global KL, Bangunan AICB, 10 Jalan Dato' Onn, 50480 Kuala Lumpur. Daily coworking home.

**AIMTO / Learn-a-thon:** The Campus, Ampang. Two-day public event in August 2026.

---

## Visual systems to remember

Not for copying code. For knowing there were two looks.

**Hub.** Cream background, dark teal text, Inter body, Newsreader headings. Batik illustrations of KL, paddy, Kinabalu, a robot. Rounded cards, light type, generous space. Logo: `/logo-ai-residency.png`.

**AIMTO.** Near-black, lime, hot pink / magenta hibiscus ASCII on the inclusive intro. Large mono labels (`BUILD AI_`). Event photography of The Campus, war room, sandbox, pasar booths. Separate favicon at `/aimto-assets/favicon.png`.

Fonts that were loaded: Inter, Newsreader, JetBrains Mono, Rethink Sans, Space Grotesk.

---

## Outside services the old site leaned on

These are content/ops facts, not backends to recreate.

| Service | Used for |
| --- | --- |
| Luma | Event calendar and registration (`luma.com/malaysianai`) |
| Airtable | Residency application embed |
| WhatsApp | Contact form and Show and Tell form (`wa.me/60109847954`) |
| Vercel Analytics | Page analytics |
| Google Fonts | Type |
| Google Maps / Waze | Venue directions |
| `event.aimto.my` | AIMTO ticket concierge |
| `aimto.my` | Side events and speakers (off-site) |
| Instagram `@malaysianai` | Content and education CTA |
| Ludic email | AIMTO partnerships |

Supabase had a `demo_bookings` table and an edge function. The live apply page no longer used it. Do not rebuild that.

---

## What was not really "the site"

A large shadcn/Radix kit, React Query, a multi-step form hook, and auto-save. Almost none of that powered public pages. The public site was mostly hardcoded TypeScript content plus a few embeds.

OG images were generated per route. Sitemap and robots existed. `public/llms.txt` listed the hub pages for crawlers and omitted AIMTO.

---

## CMS recommendation: Sanity

Use Sanity.

Editors (non-devs) get a real Studio: forms, image uploads, portable text, references between residents and posts. They do not need GitHub. Devs get TypeScript schemas in the repo. Vercel stays simple. Astro builds the site from Sanity's API. A webhook rebuilds on publish. Sanity hosts the content. You do not run a database.

Studio can live in the Bun monorepo as `apps/studio` and also be deployed on Vercel, or you use Sanity's hosted Studio. Either way, the Astro app on Vercel is just a site. No Studio SSR requirement if you split them.

Free tier is enough for this amount of content.

**Keystatic** is the only close alternative. Content would live as files in git, the admin UI would sit on the site, and Vercel would need nothing extra. Non-dev editors then become GitHub users, and every copy change is a commit. Fine for a two-person team. Awkward once programme staff are updating residents and event copy every week. That is why I would not start there.

Skip Strapi, Payload, and WordPress. They add hosting you do not want. Skip Contentful unless you already pay for it. Storyblok is strong for visual page building and costs more than this site needs.

### Content types the new Studio should have

Singletons:

- Site settings (nav, footer, SEO, WhatsApp number, Luma URL, Airtable apply URL)
- Home page
- Residency page
- Venue (500 Global KL)
- AIMTO event page
- Learn-a-thon page
- Legal pages (privacy, terms)

Collections:

- Resident (name, slug, description, focus, location, cohort, status, tags, website, logo)
- Community partner (name, url, logo, summary)
- Testimonial
- AIMTO trainer
- AIMTO FAQ
- Learn-a-thon project idea
- Partner logo (or a gallery on the event singleton)

Keep page-specific motion and layout in the Astro app. Put people, logos, FAQs, and dates that staff will change in Sanity. Blog posts live as Markdown under `apps/web/src/content/blog/` until that workflow actually hurts.

---

## Suggested shape of the new app

Fresh Bun monorepo. No Next.js. No shared backend with the old repo.

```
apps/web      Astro site, Vercel
apps/studio   Sanity Studio
```

Package manager: Bun. Hosting: Vercel for `apps/web`. Sanity Cloud for content. Optional second Vercel project for Studio.

Take the copy, lists, and images listed above. Redesign in Astro. Do not import the old components.
