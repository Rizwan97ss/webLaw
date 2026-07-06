# Civitas Law — Developer Documentation

Complete reference for the Civitas Law firm website.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Packages & Versions](#packages--versions)
4. [Project Structure](#project-structure)
5. [Pages & Routes](#pages--routes)
6. [Home Sections](#home-sections)
7. [Features](#features)
8. [CSS Variables](#css-variables)
9. [Animation System](#animation-system)
10. [Going Live](#going-live)

---

## Project Overview

| Field | Value |
|---|---|
| Project Name | Civitas Law |
| Framework | Astro 7 (SSR via Netlify adapter) |
| UI Library | React 19 |
| Language | TypeScript 6 |
| Node Required | ≥ 22.12.0 |
| Primary Adapter | Netlify |

A multi-page law firm website with a fully designed home page (15 sections), blog with MDX support, case studies, practice areas, contact forms, FAQ, gallery, and attorney profiles. The design system is driven by CSS custom properties in `variables.css` — change a token there to update the entire site's visual identity.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | `astro` | File-based routing, component islands, MDX, image optimization |
| UI Library | `react` + `react-dom` | Interactive sliders, carousels, accordions |
| Language | `typescript` | Type safety across all `.astro`, `.tsx`, `.ts` files |
| Icons | `lucide-react` · `lucide-astro` | SVG icon library |
| Content | `@astrojs/mdx` | Blog posts written in MDX with React component support |
| Images | `sharp` | Image optimization and format conversion at build time |
| Fonts | Google Fonts | Bitter, Cabin, Inter — loaded via `<link>` in `MainLayout.astro` |
| Animations | CSS + IntersectionObserver | `data-reveal` scroll-reveal system — no external animation lib |
| Hosting | Netlify (primary) | SSR adapter configured in `astro.config.mjs` |
| Sitemap | `@astrojs/sitemap` | Auto-generates `/sitemap-index.xml` at build |
| RSS | `@astrojs/rss` | Blog RSS feed at `/rss.xml` |
| Frontmatter | `gray-matter` | Parses YAML frontmatter from Markdown/MDX files |
| Reading Time | `reading-time` | Estimated read time for blog posts |
| Linting | `eslint` + `eslint-plugin-astro` | Code quality enforcement |
| Formatting | `prettier` | Consistent code formatting |

---

## Packages & Versions

### Dependencies

| Package | Version | Role |
|---|---|---|
| `astro` | ^7.0.3 | Core framework |
| `@astrojs/react` | ^6.0.0 | React integration |
| `@astrojs/mdx` | ^7.0.0 | MDX content support |
| `@astrojs/sitemap` | ^3.7.3 | Sitemap generation |
| `@astrojs/rss` | ^4.0.18 | RSS feed |
| `@astrojs/netlify` | ^8.1.1 | Netlify SSR adapter |
| `@astrojs/vercel` | ^11.0.2 | Vercel SSR adapter (alternative) |
| `@astrojs/check` | ^0.9.9 | TypeScript type checking |
| `react` | ^19.2.7 | UI library |
| `react-dom` | ^19.2.7 | React DOM renderer |
| `@types/react` | ^19.2.16 | React type definitions |
| `@types/react-dom` | ^19.2.3 | ReactDOM type definitions |
| `lucide-react` | ^1.17.0 | Icons for React components |
| `lucide-astro` | ^0.556.0 | Icons for Astro components |
| `motion` | ^12.40.0 | Animation library (available for advanced use) |
| `gray-matter` | ^4.0.3 | Frontmatter parsing |
| `reading-time` | ^1.5.0 | Blog read-time estimation |
| `sharp` | ^0.34.3 | Image processing |
| `typescript` | ^6.0.3 | Type system |

### Dev Dependencies

| Package | Version | Role |
|---|---|---|
| `eslint` | ^9.39.4 | JavaScript linter |
| `eslint-plugin-astro` | ^1.7.0 | Astro-specific lint rules |
| `prettier` | ^3.8.3 | Code formatter |

### NPM Scripts

```bash
npm run dev       # start dev server → http://localhost:4321
npm run build     # production build → dist/
npm run preview   # preview built output locally
npm run astro     # run any Astro CLI command
```

---

## Project Structure

```
src/
├── assets/
│   └── fonts/                  # local font files (Atkinson)
├── components/
│   ├── cards/                  # BlogCard, CaseStudyCard, FAQItem, PracticeAreaCard, TestimonialCard
│   ├── common/                 # Breadcrumb, Button, CTASection, CardGrid, PageHero, Pagination, ScrollTop, SectionHeading
│   ├── home/                   # all 15 home page section components
│   └── layout/                 # Header.astro, Footer.astro
├── layouts/
│   ├── MainLayout.astro        # root HTML shell, Google Fonts link, IntersectionObserver script
│   ├── Header.astro
│   ├── Footer.astro
│   └── TopBar.astro
├── pages/
│   ├── index.astro             # home page
│   ├── about.astro
│   ├── attorney-profile.astro
│   ├── faq.astro
│   ├── gallery.astro
│   ├── privacy.astro
│   ├── disclaimer.astro
│   ├── 404.astro
│   ├── blog/                   # index, [...slug], blog-details, category/[category]
│   ├── case-study/             # index, [slug], case_study_details
│   ├── contact/                # index, contact_1, contact_2, contact-2
│   ├── faq/                    # faq.astro
│   ├── gallery/                # gallery.astro
│   ├── practice-areas/         # index, [slug], practice-details
│   ├── privacy/                # privacy.astro
│   ├── disclaimer/             # disclaimer.astro
│   └── testimonials/           # index, testimonial_1, testimonial_2
└── styles/
    ├── global.css              # master entry point — imports everything
    ├── variables.css           # all CSS custom properties (design tokens)
    ├── animations.css          # data-reveal system + hero keyframes
    ├── components.css          # main component styles (~4300 lines)
    ├── cards.css
    ├── pages.css
    ├── reset.css
    ├── components/             # approach, cta-banner, team, testimonials-grid,
    │                           # sidebar-widgets, form-validation, page-hero-deco
    └── pages/                  # attorney-profile, blog-*, contact-*, faq-page,
                                # gallery, error, privacy, disclaimer, testimonials-2,
                                # practice-slug, case-study-details, blog-category
```

> **CSS entry point:** `global.css` is imported once in `MainLayout.astro` and cascades all styles globally. Scope page-specific CSS under a unique parent class (e.g. `.faq-page`) to prevent cross-page collisions.

---

## Pages & Routes

| Route | File | Notes |
|---|---|---|
| `/` | `pages/index.astro` | Home — all 15 section components |
| `/about` | `pages/about.astro` | Firm overview |
| `/attorney-profile` | `pages/attorney-profile.astro` | Single attorney bio |
| `/blog` | `pages/blog/index.astro` | Blog listing |
| `/blog/[slug]` | `pages/blog/[...slug].astro` | Dynamic MDX blog post |
| `/blog/category/[category]` | `pages/blog/category/[category].astro` | Category filtered listing |
| `/case-study` | `pages/case-study/index.astro` | All case studies |
| `/case-study/[slug]` | `pages/case-study/[slug].astro` | Dynamic case study detail |
| `/contact` | `pages/contact/index.astro` | Primary contact page |
| `/contact/contact_1` | `pages/contact/contact_1.astro` | Contact style variant 1 |
| `/contact/contact_2` | `pages/contact/contact_2.astro` | Contact style variant 2 |
| `/faq/faq` | `pages/faq/faq.astro` | Full FAQ page |
| `/gallery/gallery` | `pages/gallery/gallery.astro` | Media gallery |
| `/practice-areas` | `pages/practice-areas/index.astro` | All practice areas |
| `/practice-areas/[slug]` | `pages/practice-areas/[slug].astro` | Dynamic practice area detail |
| `/testimonials` | `pages/testimonials/index.astro` | Testimonials style 1 |
| `/testimonials/testimonial-2` | `pages/testimonials/testimonial-2.astro` | Testimonials style 2 |
| `/privacy/privacy` | `pages/privacy/privacy.astro` | Privacy policy |
| `/disclaimer/disclaimer` | `pages/disclaimer/disclaimer.astro` | Legal disclaimer |
| `/404` | `pages/404.astro` | Custom 404 error page |

---

## Home Sections

The home page assembles 15 independent components from `src/components/home/`. Each is self-contained with its own data, markup, and styles.

| # | Component | Description | Animation |
|---|---|---|---|
| 1 | `Hero.astro` | Full-screen hero — headline, subheading, CTA buttons, stat strip | CSS keyframes on load (left/right) |
| 2 | `About.astro` | Firm intro — image, credentials list, body copy | `data-reveal="right"` |
| 3 | `Stats.astro` | Animated number counters (cases won, years, etc.) | Counter animation on scroll |
| 4 | `PracticeAreas.astro` | 6-card grid — icon, number badge, description, link | Cards: staggered bottom reveal |
| 5 | `WhyChooseUs.astro` | 3-column — left cards, center image + play button, right cards | Cards: left/right; image: zoom |
| 6 | `Process.astro` | 3-step consultation process — icon and description | None |
| 7 | `CaseStudies.astro` | 4-card grid — image, category badge, overlay, detail link | None |
| 8 | `OurApproach.astro` | Firm values and methodology cards | `data-reveal` |
| 9 | `Testimonials.astro` | Client testimonial slider with arrows and star ratings | Slider: bottom reveal |
| 10 | `Team.astro` | Attorney team slider with social links | Slider cards |
| 11 | `BlogPreview.astro` | Horizontal blog card carousel with prev/next arrows | Slider JS |
| 12 | `FAQ.astro` | 2-column accordion — image left, questions right | `data-reveal="left"` / `"right"` |
| 13 | `CTABanner.astro` | Full-width call-to-action banner | `data-reveal` |
| 14 | `ContactCTA.astro` | Split contact card — image left, form right | Card reveal |
| 15 | `Clients.astro` | Client logo strip | Static |

---

## Features

- **Dynamic Routing** — Blog posts, case studies, and practice areas use `[slug].astro` file-based dynamic routes
- **MDX Support** — Blog posts support MDX: write in Markdown with embedded React components
- **Image Optimization** — Sharp processes images at build time via Astro's `<Image>` component
- **Sitemap** — Auto-generated `/sitemap-index.xml` via `@astrojs/sitemap` (set `site` in `astro.config.mjs`)
- **RSS Feed** — Blog RSS feed at `/rss.xml`
- **Reading Time** — Estimated read time displayed on blog posts
- **Scroll Animations** — IntersectionObserver-driven scroll reveal. Add `data-reveal` to any element
- **Lucide Icons** — Scale, Building2, Gavel, and 500+ SVG icons via `lucide-react`
- **CSS Design Tokens** — Full design system in `variables.css` — colors, type scale, spacing, radii, shadows
- **Multiple Page Variants** — Two contact styles, two testimonial styles
- **Blog Categories** — Filter posts by category at `/blog/category/[category]`
- **Contact Forms** — Two layouts with client-side validation
- **Responsive Design** — Mobile-first breakpoints; sliders collapse, grids stack
- **Reduced Motion** — `prefers-reduced-motion` disables all transitions automatically
- **Custom 404** — Branded error page
- **SSR via Netlify** — Server-side rendering with dynamic routes and server endpoints

---

## CSS Variables

All design tokens live in `src/styles/variables.css` under `:root`. Change a token here to update every component that references it — no component code changes needed.

### Brand Colors

| Variable | Value | Usage |
|---|---|---|
| `--color-primary` | `#ffc342` | Golden yellow — CTA buttons, kicker labels, icon backgrounds, active states |
| `--color-primary-soft` | `#fff1b8` | Pale yellow — soft accent backgrounds |
| `--color-primary-dark` | `#101932` | Dark navy — button backgrounds, icon container fill |
| `--color-primary-bg` | `#ffeecc` | Brand strip / announcement banner background |
| `--color-dark` | `#0f1a34` | Deep navy — hero background, dark sections |
| `--color-dark-2` | `#1d2947` | Mid navy — cards on dark backgrounds |
| `--color-text` | `#242424` | Primary body text |
| `--color-muted` | `#6b6b6b` | Secondary / supporting text |
| `--color-white` | `#ffffff` | Text on dark backgrounds, card fills |
| `--color-cream` | `#fff9df` | Warm cream — alternating section backgrounds |
| `--color-cream-warm` | `#fff9e8` | Warmer cream — card and section backgrounds |
| `--color-cream-soft` | `#fff1cf` | Soft cream — FAQ and blog card backgrounds |
| `--color-border` | `#eeeeee` | Light divider lines |
| `--color-error` | `#ef4444` | Form validation error state |
| `--color-card-hover` | `#ffe3a3` | Testimonial card hover background |
| `--color-practice-card` | `#feefcf` | Practice area card background |

### Typography

| Variable | Value | Usage |
|---|---|---|
| `--font-heading` | `"Bitter", Georgia, serif` | All h1–h4 headings, section titles, card titles |
| `--font-body` | `'Cabin'` | Body text (used in `body` rule in `global.css`) |
| `--font-cabin` | `"Cabin", Helvetica, Arial, Lucida, sans-serif` | Cabin with full fallback stack — used in component CSS |
| `--fs-xs` | `13px` | Extra-small — badges, fine print |
| `--fs-sm` | `14px` | Small — metadata labels |
| `--fs-base` | `16px` | Base body text size |
| `--fs-md` | `17px` | Medium — kicker labels, nav links |
| `--fs-h4` | `20px` | Card subtitle size |
| `--fs-h3` | `24px` | Sub-section headings |
| `--fs-h2` | `38px` | Section headings |
| `--fs-h1` | `50px` | Hero headline |
| `--fw-normal` | `400` | Normal weight |
| `--fw-medium` | `500` | Medium — nav, body emphasis |
| `--fw-semibold` | `600` | Semibold — headings, kickers, card titles |
| `--fw-bold` | `700` | Bold — stat numbers, strong emphasis |
| `--fw-heavy` | `800` | Heavy — counter numbers |
| `--lh-tight` | `1em` | Tight — display type, large numbers |
| `--lh-heading` | `1.2em` | Heading line height |
| `--lh-body` | `1.6em` | Body paragraph line height |
| `--lh-loose` | `1.8em` | Loose — intro paragraphs |

### Spacing Scale

| Variable | Value | Usage |
|---|---|---|
| `--sp-2` | `0.5rem` (8px) | Tight gap — icon to label, tag padding |
| `--sp-3` | `0.75rem` (12px) | Small gap — button inner vertical |
| `--sp-4` | `1rem` (16px) | Base unit — standard padding |
| `--sp-5` | `1.25rem` (20px) | Card inner padding (`--pad-card`) |
| `--sp-6` | `1.5rem` (24px) | Medium gap |
| `--sp-7` | `1.75rem` (28px) | Standard grid/flex gap (`--gap-grid`) |
| `--sp-8` | `2rem` (32px) | Section inner spacing |
| `--sp-10` | `2.5rem` (40px) | Larger component gap |
| `--sp-12` | `3rem` (48px) | Wide layout gap (`--gap-section`) |
| `--sp-14` | `3.5rem` (56px) | Large layout gap |
| `--sp-16` | `4rem` (64px) | Largest spacing unit |

### Layout & UI

| Variable | Value | Usage |
|---|---|---|
| `--container-max` | `1280px` | Maximum content width |
| `--container-gutter` | `2rem` | Horizontal padding on `.container` (1.5rem below 480px) |
| `--section-padding` | `clamp(4rem, 8vw, 7rem)` | Vertical padding on all sections — fluid 64px → 112px |
| `--pad-card` | `var(--sp-5)` = 20px | Standard card inner padding |
| `--gap-grid` | `var(--sp-7)` = 28px | Standard grid and flex gap |
| `--gap-section` | `var(--sp-12)` = 48px | Wide multi-column layout gap |
| `--radius-sm` | `10px` | Standard card and input corners |
| `--radius-md` | `18px` | Medium radius — larger cards |
| `--radius-lg` | `28px` | Large radius — hero cards |
| `--radius-section` | `22px` | Large section card radius |
| `--radius-pill` | `999px` | Full pill — buttons, tags |
| `--shadow-card` | `0 20px 50px rgba(16,26,54,0.08)` | Resting card shadow |
| `--shadow-hover` | `0 24px 60px rgba(16,26,54,0.12)` | Elevated card shadow on hover |
| `--transition` | `0.3s ease` | Standard hover transition speed |
| `--transition-slow` | `0.45s cubic-bezier(.22,.61,.36,1)` | Smooth ease-out for larger transforms |

### Common Customizations

| Goal | Change this token |
|---|---|
| Rebrand accent color | `--color-primary` |
| Change hero / dark section background | `--color-dark` |
| Swap heading font | `--font-heading` |
| Swap body font | `--font-body` and `--font-cabin` |
| Increase section breathing room | `--section-padding` |
| Narrow or widen content column | `--container-max` |
| Adjust all card corners | `--radius-sm` |
| Make transitions faster / slower | `--transition` |

---

## Animation System

### Scroll Reveal — `data-reveal`

Add `data-reveal` to any element to animate it in when it scrolls into view. The global IntersectionObserver in `MainLayout.astro` watches all `[data-reveal]` elements at a threshold of 0.15 (15% visible) and adds `.is-visible`.

| Attribute | Effect |
|---|---|
| `data-reveal` | Slides up from 52px below + fades in |
| `data-reveal="left"` | Slides in from 60px left + fades in |
| `data-reveal="right"` | Slides in from 60px right + fades in |
| `data-reveal="zoom"` | Scales from 0.92 + slides up 18px + fades in |

**Stagger multiple siblings** using the `--reveal-delay` custom property:

```astro
{items.map((item, i) => (
  <article data-reveal style={`--reveal-delay: ${i * 80}ms`}>
    ...
  </article>
))}
```

### Hero Keyframes

The hero is above the fold and already intersecting on load, so `data-reveal` fires instantly with no visible transition. Instead, the hero uses CSS keyframe animations (`revealFromLeft` / `revealFromRight`) on `.hero-anim-left` and `.hero-anim-right` classes.

### Reduced Motion

Both systems respect `prefers-reduced-motion` in `animations.css`. All transitions and animations are disabled automatically for users who have this set in their OS.

### Where animations are NOT used

Section heading containers (`.case-heading`, `.process-heading`, `.practice-head`, etc.) have no `data-reveal`. Only content blocks and cards animate — this prevents headings appearing late and causing visual flow issues.

---

## Going Live

### Prerequisites

```bash
node --version    # must be ≥ 22.12.0
npm --version     # any recent version
```

### Step 1 — Update your site URL

Open `astro.config.mjs` and set the `site` property to your production domain. This is required for the sitemap to generate correct URLs.

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://your-domain.com',   // ← change this
  ...
})
```

### Step 2 — Install and build locally

```bash
npm install
npm run build     # output written to dist/
npm run preview   # verify build at http://localhost:4321
```

### Deploy to Netlify (Recommended)

The project is pre-configured with the Netlify adapter. SSR is enabled — dynamic routes and server endpoints work out of the box.

**Option A — Connect via GitHub (recommended):**

1. Push code to GitHub: `git push origin main`
2. Go to **netlify.com → Add new site → Import an existing project**
3. Select your repository
4. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: set `NODE_VERSION=22` in Environment Variables
5. Click Deploy — every push to `main` triggers a redeploy automatically

**Option B — Netlify CLI:**

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

### Deploy to Vercel (Alternative)

The Vercel adapter is already installed. Switch adapters in `astro.config.mjs`:

```js
import vercel from '@astrojs/vercel';

export default defineConfig({
  adapter: vercel(),
  ...
})
```

Then deploy:

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Deploy as Static (GitHub Pages / Cloudflare Pages)

Remove the adapter and add `output: 'static'`. Note: dynamic routes (`[slug].astro`) require `getStaticPaths()` to pre-render all pages at build time.

```js
export default defineConfig({
  output: 'static',
  // remove adapter: netlify()
  ...
})
```

### Environment Variables

Create a `.env` file in the project root. Prefix public variables with `PUBLIC_` to expose them to client-side code.

```env
PUBLIC_CONTACT_FORM_URL=https://formspree.io/f/your-id
SOME_SECRET_KEY=xxxx
```

> **Never commit `.env` to git.** Add it to `.gitignore`. Set the same variables in Netlify Dashboard → Site Settings → Environment Variables for production.

### Post-Deploy Checklist

| Item | Where to change |
|---|---|
| Update `site` URL | `astro.config.mjs` |
| Replace placeholder images | Component data arrays (e.g. `Hero.astro`, `CaseStudies.astro`) |
| Update firm name, address, phone | `layouts/Footer.astro`, `layouts/Header.astro` |
| Set real contact form action | `components/home/ContactCTA.astro` |
| Add Google Analytics / Tag Manager | `layouts/MainLayout.astro` `<head>` |
| Verify sitemap | Visit `/sitemap-index.xml` after deploy |
| Verify RSS feed | Visit `/rss.xml` after deploy |
| Submit sitemap to Google Search Console | search.google.com/search-console |
