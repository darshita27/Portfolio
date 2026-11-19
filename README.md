# Darshita Singh — Portfolio

Cinematic, story-driven personal portfolio built with **Next.js 16 (App Router) · TypeScript · SCSS · GSAP · Lenis · Framer Motion · Three.js · Zustand**.

---

## Editing content

**All copy, links, project data, experience, and skills live in one file:**

```
app/lib/content.ts
```

Open it and edit the exported objects. No other file needs to change for copy updates.

| What you want to change | Object in `content.ts` |
|---|---|
| Name, tagline, location, links | `person` |
| Quick-facts strip under hero | `person.quickFacts` |
| About story paragraph | `about.story` |
| Philosophy quote | `about.philosophy` |
| Skill groups (desk objects) | `skillGroups` |
| Projects (problem/approach/outcome) | `projects` |
| Experience bullets | `experience` |
| Education | `education` |
| Contact copy + steps | `contact` |
| Page metadata / OG / SEO | `meta` |
| Nav clock chapter times | `chapters` |

---

## Swapping photos

1. Place your new portrait at **`public/images/portrait.jpg`** (or `.png`).
2. If you have a transparent cut-out, name it `portrait-cutout.png` and update the `src` in `app/components/Hero/Hero.tsx` and `app/lib/content.ts` (`person.portrait`).
3. The `width` and `height` props on the `<Image>` in `Hero.tsx` should match the actual image dimensions for best CLS performance.
4. Update `person.portraitAlt` in `content.ts` with accurate alt text.

No AI face retouching — only use your own photos.

---

## Run locally

```bash
cd darshita-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Build & deploy

```bash
npm run build   # production build
npm run start   # preview production build locally
```

**Deploy to Vercel (recommended):**

```bash
# Install Vercel CLI once
npm i -g vercel

# From the project root
vercel
```

Vercel automatically detects Next.js and deploys with edge CDN, Brotli compression, and immutable cache headers for hashed assets.

---

## Performance verification

After deploying, verify these targets:

| Metric | Target | How to check |
|---|---|---|
| LCP | < 1.2 s | Chrome DevTools → Lighthouse (Mobile profile) |
| FCP | < 0.8 s | Lighthouse |
| CLS | < 0.02 | Lighthouse |
| INP | < 150 ms | Lighthouse / CrUX |
| TBT | < 100 ms | Lighthouse |
| Lighthouse Performance | 95+ | Lighthouse |
| Lighthouse Accessibility | 95+ | Lighthouse |
| Lighthouse SEO | 95+ | Lighthouse |

The LCP element should be the **hero headline text** (server-rendered `<h1>`), not the portrait image.

Run Lighthouse from Chrome DevTools → Lighthouse tab → Mobile → Analyze. Or use:

```bash
npx @lhci/cli@latest autorun --collect.url=http://localhost:3000
```

---

## Project structure

```
app/
  components/
    BokehCanvas/   Three.js animated background
    Contact/       Chapter 06 — Morning
    Cursor/        Custom amber dot cursor
    Experience/    Chapter 05 — The Room
    Hero/          Chapter 01 — 2:47 AM
    Loader/        Terminal boot loader
    Nav/           Fixed navigation with clock
    Projects/      Chapter 04 — The Build
    Shell/         Client orchestration wrapper
    Skills/        Chapter 03 — The Desk (SVG illustration)
    About/         Chapter 02 — Obsession
  lib/
    content.ts     ← EDIT THIS for all copy
  motion/
    orchestrator.ts  GSAP + Lenis setup
  store/
    useAppStore.ts   Zustand global state
  styles/
    _tokens.scss   CSS custom properties
    _mixins.scss   Reusable SCSS mixins
    globals.scss   Reset + global styles
  layout.tsx       Root layout, metadata, JSON-LD, fonts
  page.tsx         Root page (renders Shell)
  robots.ts        robots.txt (allows all bots incl. AI crawlers)
  sitemap.ts       sitemap.xml
public/
  images/
    portrait.jpg   Your photo
  Darshita_Singh_Resume.pdf
  favicon.svg      Amber dot
  llms.txt         AI/LLM summary (short)
  llms-full.txt    AI/LLM full profile
  index.md         Markdown mirror of homepage
```

---

## Adding a new project

1. Open `app/lib/content.ts`.
2. Add an object to the `projects` array following the existing shape.
3. Add a live URL and GitHub URL to the object.
4. The Projects component (`app/components/Projects/Projects.tsx`) renders the array automatically.

---

## TODOs (things still needed from Darshita)

- [ ] `meta.ogImage` — a 1200×630 Open Graph image. Place at `public/og-image.png`.
- [ ] `meta.twitterHandle` — Twitter/X handle if you have one.
- [ ] `projects[0].githubUrl` — Vrinda Valley Resort GitHub URL (if public).
- [ ] `projects[1].githubUrl` — DevJobsBoard GitHub URL (if public).
- [ ] `projects[1].liveUrl` — Manova Mental Wellness live URL (if deployed).
- [ ] `projects[2].githubUrl` — Manova Mental Wellness GitHub URL (if public).
- [ ] Live URL verification — confirm all three project live URLs are still active.
- [ ] Public speaking / presentation highlights — not in the master profile; add to `content.ts` if you want them showcased.
- [ ] Languages spoken — not in the master profile; add to `person` in `content.ts` if relevant.
- [ ] Personal interests ("beyond coding") — only "teaching, reading, and dancing" mentioned in the old portfolio. Add richer detail to the About story if desired.
