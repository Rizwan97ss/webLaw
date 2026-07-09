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
8. [Site Identity & Firm Info](#site-identity--firm-info)
9. [SEO — Meta, Open Graph, JSON-LD](#seo--meta-open-graph-json-ld)
10. [Sitemap](#sitemap)
11. [RSS Feed](#rss-feed)
12. [Content Management](#content-management)
13. [Navigation](#navigation)
14. [Global Changes — Where & How](#global-changes--where--how)
15. [CSS Variables](#css-variables)
16. [Animation System](#animation-system)
17. [Site Config — Behavior Settings](#site-config--behavior-settings)
18. [TypeScript Script Modules](#typescript-script-modules)
19. [Customization Guide — What You Can Change](#customization-guide--what-you-can-change)
20. [Going Live](#going-live)

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
├── config/
│   └── site.config.ts          # ★ central behavior config — all user-tweakable values
├── scripts/                    # ★ TypeScript modules — all interactive behavior
│   ├── scrollReveal.ts         # IntersectionObserver scroll-reveal setup
│   ├── counter.ts              # Stats count-up animation
│   ├── slider.ts               # Shared slider factory (testimonials + blog)
│   ├── accordion.ts            # FAQ accordion factory
│   ├── scrollTop.ts            # Back-to-top button visibility + scroll
│   └── infiniteCarousel.ts     # Team section infinite-loop carousel
├── components/
│   ├── cards/                  # BlogCard, CaseStudyCard, FAQItem, PracticeAreaCard, TestimonialCard
│   ├── common/                 # Breadcrumb, Button, CTASection, CardGrid, PageHero, Pagination, ScrollTop, SectionHeading
│   ├── home/                   # all 15 home page section components
│   └── layout/                 # Header.astro, Footer.astro
├── layouts/
│   ├── MainLayout.astro        # root HTML shell, Google Fonts, imports scrollReveal.ts
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

## Site Identity & Firm Info

All firm-specific text that appears across the entire site (browser tab titles, SEO descriptions, Open Graph previews, JSON-LD schema, RSS feed, canonical URLs) is driven by a single file:

```
src/consts.ts
```

```ts
export const SITE_TITLE       = 'Civitas Law';
export const SITE_DESCRIPTION = 'Civitas Law offers experienced legal counsel...';
export const SITE_URL         = 'https://example.com';   // ← your production domain
export const SITE_OG_IMAGE    = '/og-image.jpg';         // ← 1200×630 image in /public/

export const FIRM_NAME    = 'Civitas Law';
export const FIRM_PHONE   = '+01 23456789';
export const FIRM_EMAIL   = 'contact@example.com';
export const FIRM_ADDRESS = '123 Legal Ave, City, State 00000';
```

**Where each constant is used:**

| Constant | Used in |
|---|---|
| `SITE_TITLE` | `<title>` on every page, RSS feed title, JSON-LD `name` |
| `SITE_DESCRIPTION` | `<meta name="description">` default, RSS feed description, JSON-LD `description` |
| `SITE_URL` | Canonical URL fallback, sitemap base URL, OG image absolute URL |
| `SITE_OG_IMAGE` | `og:image` and `twitter:image` on all pages |
| `FIRM_NAME` | `<meta name="author">`, JSON-LD `name`, footer, header |
| `FIRM_PHONE` | JSON-LD `telephone`, topbar, footer |
| `FIRM_EMAIL` | JSON-LD `email`, topbar, footer |
| `FIRM_ADDRESS` | JSON-LD `PostalAddress.streetAddress`, footer |

> The OG image must be placed at `public/og-image.jpg`. It appears when the site is shared on social media. Recommended size: **1200 × 630 px**.

**Page-specific title format:**

```
Home page:    "Civitas Law — Justice Driven by Experience"
Other pages:  "Page Title | Civitas Law"
```

The `|` separator and `SITE_TITLE` suffix are appended automatically in `MainLayout.astro`. Each page passes its own `title` prop to override the left side.

---

## SEO — Meta, Open Graph, JSON-LD

All SEO tags are rendered inside `src/layouts/MainLayout.astro`. Every page that uses `MainLayout` gets the full SEO treatment automatically.

### Meta Tags

```html
<title>{pageTitle}</title>
<meta name="description" content={description} />
<meta name="robots"      content="index, follow, ..." />
<meta name="author"      content={FIRM_NAME} />
<link rel="canonical"    href={canonicalURL} />
```

The canonical URL is built from `Astro.url.pathname` + your `site` value in `astro.config.mjs`. No manual canonical management needed.

### Robots / noIndex

Any page can be excluded from search engine indexing by passing `noIndex={true}` to `MainLayout`:

```astro
<MainLayout title="Thank You" noIndex={true}>
```

This renders `<meta name="robots" content="noindex, nofollow" />` instead of the index rule. Use it for thank-you pages, error pages, and duplicate/demo routes.

### Open Graph

Automatically rendered on every page:

```html
<meta property="og:type"        content="website" />
<meta property="og:url"         content={canonicalURL} />
<meta property="og:title"       content={pageTitle} />
<meta property="og:description" content={description} />
<meta property="og:image"       content={ogImage} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name"   content={SITE_TITLE} />
<meta property="og:locale"      content="en_US" />
```

Blog post pages pass `type="article"` and `pubDate` to `MainLayout`, which also adds:

```html
<meta property="article:published_time" content={pubDate} />
```

### Twitter Card

```html
<meta name="twitter:card"        content="summary_large_image" />
<meta name="twitter:title"       content={pageTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image"       content={ogImage} />
```

### JSON-LD Structured Data (LegalService Schema)

The homepage injects a `LegalService` JSON-LD block, which Google uses for rich results (knowledge panel, local pack, etc.). It is only active when `isHome={true}` is passed:

```astro
<!-- src/pages/index.astro -->
<MainLayout isHome={true} ...>
```

The schema is populated entirely from `src/consts.ts`:

```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Civitas Law",
  "url": "https://your-domain.com",
  "logo": "https://your-domain.com/favicon.svg",
  "image": "https://your-domain.com/og-image.jpg",
  "description": "...",
  "telephone": "+01 23456789",
  "email": "contact@example.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Legal Ave, City, State 00000"
  },
  "openingHoursSpecification": {
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "$$"
}
```

**To update JSON-LD opening hours or price range**, edit the schema object directly inside `MainLayout.astro` (the `jsonLd` const). All other fields come from `consts.ts`.

**To add `sameAs` social profiles** (recommended for local SEO), add URLs to the `sameAs` array:

```ts
sameAs: [
  "https://www.facebook.com/yourfirm",
  "https://www.linkedin.com/company/yourfirm",
],
```

### Per-Page SEO Props

`MainLayout` accepts these props for per-page SEO customization:

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `title` | `string` | `SITE_TITLE` | Left side of the `<title>` tag |
| `description` | `string` | `SITE_DESCRIPTION` | `<meta name="description">` |
| `image` | `string` | `SITE_OG_IMAGE` | OG and Twitter card image |
| `type` | `string` | `"website"` | `og:type` — use `"article"` for blog posts |
| `noIndex` | `boolean` | `false` | Adds `noindex, nofollow` |
| `pubDate` | `string` | — | ISO date for `article:published_time` |
| `isHome` | `boolean` | `false` | Enables JSON-LD LegalService schema |

---

## Sitemap

The sitemap is auto-generated at build time by `@astrojs/sitemap`. It is available at `/sitemap-index.xml` after deployment.

**Configuration is in `astro.config.mjs`:**

```js
sitemap({
  filter: (page) =>
    !page.includes('/error/') &&
    !page.includes('/blog/blog-details') &&
    !page.includes('/case-study/case_study_details') &&
    !page.includes('/practice-areas/practice-details'),
  changefreq: 'weekly',
  priority: 0.7,
  lastmod: new Date(),
}),
```

**What each option does:**

| Option | Value | Purpose |
|---|---|---|
| `filter` | function | Excludes demo/placeholder pages from the sitemap |
| `changefreq` | `'weekly'` | Tells crawlers how often pages change |
| `priority` | `0.7` | Page priority hint (0.0–1.0) for crawlers |
| `lastmod` | `new Date()` | Sets last-modified to the build date on every page |

**Pages excluded from the sitemap** (demo routes you'll replace or remove):

- `/error/` and all sub-paths
- `/blog/blog-details`
- `/case-study/case_study_details`
- `/practice-areas/practice-details`

**To exclude additional pages**, add them to the `filter` function:

```js
filter: (page) =>
  !page.includes('/error/') &&
  !page.includes('/thank-you'),   // ← add your exclusion
```

**Required:** The `site` property in `astro.config.mjs` must be set to your production domain for the sitemap to generate correct absolute URLs:

```js
export default defineConfig({
  site: 'https://your-domain.com',   // ← required for sitemap
  ...
})
```

**After deploying**, submit the sitemap URL to Google Search Console:
`https://your-domain.com/sitemap-index.xml`

---

## RSS Feed

The blog RSS feed is at `/rss.xml`. It is implemented in `src/pages/rss.xml.js` and includes all published (non-draft) blog posts sorted newest first.

```js
// src/pages/rss.xml.js
return rss({
  title: `${SITE_TITLE} — Legal Insights`,
  description: SITE_DESCRIPTION,
  site: context.site,
  items: sorted.map((post) => ({
    title:       post.data.title,
    description: post.data.description,
    pubDate:     post.data.pubDate,
    author:      post.data.author,
    categories:  [post.data.category, ...(post.data.tags ?? [])],
    link:        `/blog/${post.id}/`,
  })),
  customData: `<language>en-us</language>`,
});
```

**To change the RSS feed title:** edit the `title:` string in `rss.xml.js`.

**To change the feed language:** edit `<language>en-us</language>` in `customData`.

**Draft posts** (`draft: true` in frontmatter) are automatically excluded from the feed — the collection query filters them out before building the item list.

**The feed is autodiscovered** by browsers and RSS readers via this tag in `MainLayout.astro`:

```html
<link rel="alternate" type="application/rss+xml" title="Civitas Law Blog" href="/rss.xml" />
```

---

## Content Management

### Blog Posts

Blog posts are MDX files in `src/content/blog/`. Each file becomes a route at `/blog/[filename]`.

**To add a blog post**, create a new `.md` or `.mdx` file:

```md
---
title:       "Your Post Title"
description: "One-sentence summary for SEO and cards."
pubDate:     2026-01-15
author:      "By Jane Smith"
image:       "/images/blog/your-image.jpg"
category:    "Business Law"
tags:        ["contracts", "LLC"]
draft:       false
---

Your content here. MDX files can also import and use React components.
```

**Frontmatter fields:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | Yes | Displayed on card, page title, and RSS |
| `description` | string | Yes | SEO meta description and card excerpt |
| `pubDate` | date | Yes | ISO date — used for sorting and RSS |
| `author` | string | No | Defaults to `"By Civitas Law"` |
| `image` | string | Yes | Path to image in `/public/` |
| `category` | string | Yes | Shown on card; used for category filter page |
| `tags` | string[] | No | Defaults to `[]`; included in RSS categories |
| `draft` | boolean | No | Defaults to `false`; `true` hides post everywhere |

**Draft posts** are excluded from the blog listing, RSS feed, and sitemap. Use `draft: true` while writing a post you're not ready to publish.

---

### Practice Areas

Practice areas are defined in `src/data/practiceAreas.ts` as a TypeScript array. Each entry appears as a card on the home page and generates a detail page at `/practice-areas/[slug]`.

```ts
{
  id: 1,
  slug: "corporate-business-law",        // ← URL: /practice-areas/corporate-business-law
  title: "Corporate & Business Law",
  icon: Building2,                        // ← Lucide icon component
  description: "Short card description.",
  featured: true,                         // ← shows on home page cards
}
```

**To add a practice area:** add a new object to the array with a unique `id` and `slug`.
**To change icons:** import any icon from `lucide-react` at the top of the file and assign it to `icon`.

---

### Case Studies

Case studies are defined in `src/data/caseStudies.ts`. Each entry appears in the home page grid and has a detail page at `/case-study/[slug]`.

```ts
{
  id: 1,
  slug: "personal-injury-settlement",
  title: "$2.4M Personal Injury Settlement",
  category: "Personal Injury",
  image: "/images/case-studies/case-1.jpg",
  excerpt: "Short summary for the card.",
  result: "$2.4 Million Settlement",
}
```

Place images in `public/images/case-studies/`.

---

### Testimonials

Testimonials are defined in `src/data/testimonials.ts` and displayed in the home slider and testimonials pages.

```ts
{
  id: 1,
  name: "Sarah L.",
  role: "Family Law Client",
  image: "/images/testimonials/sarah.jpg",
  rating: 5,                              // 1–5
  quote: "During the most difficult period...",
}
```

Place images in `public/images/testimonials/`.

---

### FAQs

FAQs are defined in `src/data/faqs.ts` and used on the home FAQ accordion and the standalone FAQ page.

```ts
{
  id: 1,
  question: "How much will legal representation cost?",
  answer: "Our fee structures are transparent...",
}
```

Add, remove, or reorder objects to update every FAQ instance site-wide at once.

---

## Navigation

The navigation menu is defined directly in the Header component:

```
src/components/layout/Header.astro  →  navLinks array (top of the file)
```

```ts
const navLinks = [
  { label: "Home",     href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Practice Areas",
    href: "#",
    children: [
      { label: "Practice Area",         href: "/practice-areas" },
      { label: "Practice Area Details", href: "/practice-areas/practice-details" },
    ],
  },
  // ... more items
];
```

**To add a top-level link:** add `{ label: "...", href: "..." }` to the array.

**To add a dropdown:** add a `children` array to any top-level item.

**To remove an item:** delete its object from the array.

The mobile hamburger breakpoint (default: 1024px) is controlled by `siteConfig.nav.mobileBreakpoint` in `site.config.ts`.

### Topbar Contact Info & Social Links

The topbar phone number, email, and social icons are hardcoded in `src/components/layout/Header.astro`. Search for the `topbar__contact` section and update the `href` and displayed text values directly.

---

## Global Changes — Where & How

This section is the fastest way to make site-wide changes. Each row below tells you **exactly which file to edit** and **which line/rule to change** — no hunting through components needed.

---

### Button Typography (font-family · font-size · font-weight)

**Single rule controls every button on every page:**

```
src/styles/global.css  →  lines ~48–55
```

```css
button, [type="button"], [type="submit"], [type="reset"],
.btn, .btn-fill-hover, .practice-view-btn, .header-cta,
.hcta-btn, .c2-tab {
  cursor: pointer;
  font-family: var(--font-cabin);   /* ← swap font here */
  font-size:   var(--fs-base);      /* ← swap size here */
  font-weight: var(--fw-medium);    /* ← swap weight here */
}
```

The variables themselves live in `src/styles/variables.css`:

| Variable | Current value | What it controls |
|---|---|---|
| `--font-cabin` | `"Cabin", Helvetica, Arial, Lucida, sans-serif` | Button font family |
| `--fs-base` | `16px` | Button font size |
| `--fw-medium` | `500` | Button font weight |

**To change all button text at once:** edit the three variable values in `variables.css`. The `global.css` rule picks them up automatically — no component edits needed.

> Individual button rules in `cards.css` and `components.css` deliberately repeat `font-family`, `font-size`, and `font-weight` using the same variables. If you ever need one button class to differ, override just those properties in its own rule.

---

### Button Arrow Icon (MoveRight)

All buttons and links use the Lucide `MoveRight` icon instead of a plain text `→`. The icon is rendered as `<MoveRight size={16} />`.

**Where icons are imported (by file type):**

| File location | Icon package | Import syntax |
|---|---|---|
| `src/components/home/*.astro` | `lucide-react` | `import { MoveRight } from 'lucide-react'` |
| `src/components/cards/*.astro` | `lucide-react` | `import { MoveRight } from 'lucide-react'` |
| `src/components/common/Button.astro` | `lucide-react` | `import { MoveRight } from 'lucide-react'` |
| `src/components/layout/Header.astro` | `lucide-astro` | `import { ..., MoveRight } from 'lucide-astro'` |
| `src/pages/**/*.astro` | `lucide-astro` | `import { ..., MoveRight } from 'lucide-astro'` |

**To change the icon globally:** replace `<MoveRight size={16} />` with any other Lucide icon component across all files. A project-wide find-and-replace for `MoveRight` covers every instance.

**To change the icon size:** the `size` prop is set per-call. Button arrows use `size={16}`, sidebar category arrows use `size={14}`.

---

### Brand / Accent Color

```
src/styles/variables.css  →  --color-primary
```

```css
--color-primary: #ffc64a;   /* ← one change updates buttons, badges, kickers, icons */
```

Every element using `var(--color-primary)` or `var(--gcid-primary-color)` updates instantly — CTA buttons, kicker labels, practice area cards, badge backgrounds, hover states.

---

### Heading Font

```
src/styles/variables.css  →  --font-heading
```

```css
--font-heading: "Bitter", Georgia, serif;   /* ← replace "Bitter" */
```

Also update the Google Fonts `<link>` in `src/layouts/MainLayout.astro` to load the new font.

---

### Body / UI Font

```
src/styles/variables.css  →  --font-body  +  --font-cabin
```

```css
--font-body:  'Cabin';
--font-cabin: "Cabin", Helvetica, Arial, Lucida, sans-serif;
```

Both must be changed together. `--font-body` is applied to the `<body>` element in `global.css`. `--font-cabin` is the full fallback stack used in component CSS and the global button rule.

---

### Section Vertical Spacing

```
src/styles/variables.css  →  --section-padding
```

```css
--section-padding: clamp(4rem, 8vw, 7rem);   /* 64px → 112px, fluid */
```

This one variable controls the top/bottom padding of every section on every page.

---

### Container Width & Padding

```
src/styles/variables.css  →  --container-max · --container-gutter
src/styles/global.css     →  .container / .header-container / .hero-container rule
```

The container system uses three coordinated rules:

```css
/* 1. Base — applies on all screens above 1024px */
.container,
.header-container,
.hero-container {
  max-width: 1440px;           /* content never exceeds this; section backgrounds still bleed full-width */
  margin-inline: auto;         /* centers the container within the full-width section */
  padding-inline: clamp(1rem, calc((100% - var(--container-max)) / 2), var(--container-gutter));
  /*              └─ scales from 1rem → 80px as viewport grows 1280px → 1440px, then caps at 80px */
}

/* 2. Tablet — flat 2rem gutter */
@media (max-width: 1024px) {
  .container, .header-container, .hero-container { padding-inline: 2rem; }
}

/* 3. Mobile — tighter gutter */
@media (max-width: 480px) {
  .container, .header-container, .hero-container { padding-inline: 1.25rem; }
}
```

**Gutter at each breakpoint:**

| Viewport | Padding each side | Content width |
|---|---|---|
| 480px | 1.25rem (20px) | ~440px |
| 768px | 2rem (32px) | ~704px |
| 1024px | 2rem (32px) | ~960px |
| 1360px | 40px (auto-scaled) | 1280px |
| 1440px | 80px | **1280px** |
| 1920px+ | 80px (capped) | **1280px** |

**Key behavior:** section backgrounds (dark navy, cream, white) always span the full viewport width. Only the content block inside each section is capped at 1440px and centered — no blank body margins on ultrawide screens.

**To change the max content width:** edit `--container-max` in `variables.css`.  
**To change the desktop gutter:** edit `--container-gutter` in `variables.css`.  
**To change the overall cap:** edit `max-width: 1440px` in the `.container` rule in `global.css`.

---

### Card Corners (Border Radius)

```
src/styles/variables.css  →  --radius-sm  (and siblings)
```

```css
--radius-sm:      10px;    /* standard cards, inputs */
--radius-md:      18px;
--radius-section: 22px;    /* large section cards like the contact card */
--radius-pill:    999px;   /* all buttons */
```

---

### Scroll Animations (Enable / Disable / Speed)

```
src/config/site.config.ts  →  scrollReveal
```

```ts
scrollReveal: {
  enabled:   true,   // ← false = no scroll animations site-wide
  threshold: 0.15,   // ← 0–1, fraction of element visible before it fires
}
```

---

### Quick Global Change Reference

| What to change | File | Token / Setting |
|---|---|---|
| Firm name, phone, email, address | `src/consts.ts` | `FIRM_NAME`, `FIRM_PHONE`, `FIRM_EMAIL`, `FIRM_ADDRESS` |
| Site title and SEO description | `src/consts.ts` | `SITE_TITLE`, `SITE_DESCRIPTION` |
| Production domain / canonical URL | `astro.config.mjs` + `src/consts.ts` | `site:` + `SITE_URL` |
| Social share image (OG image) | `public/og-image.jpg` + `src/consts.ts` | Replace file + `SITE_OG_IMAGE` |
| JSON-LD opening hours / price range | `src/layouts/MainLayout.astro` | `jsonLd` const object |
| JSON-LD social profiles (sameAs) | `src/layouts/MainLayout.astro` | `sameAs: [...]` array |
| Navigation menu items | `src/components/layout/Header.astro` | `navLinks` array |
| Topbar phone / email / social links | `src/components/layout/Header.astro` | `topbar__contact` section |
| Blog posts | `src/content/blog/*.md` | Add / edit MDX files |
| Practice areas | `src/data/practiceAreas.ts` | Edit the array |
| Case studies | `src/data/caseStudies.ts` | Edit the array |
| Testimonials | `src/data/testimonials.ts` | Edit the array |
| FAQs | `src/data/faqs.ts` | Edit the array |
| Sitemap excluded pages | `astro.config.mjs` | `sitemap({ filter: ... })` |
| RSS feed title | `src/pages/rss.xml.js` | `title:` string |
| All button font family | `variables.css` | `--font-cabin` |
| All button font size | `variables.css` | `--fs-base` |
| All button font weight | `variables.css` | `--fw-medium` |
| All button arrow icon | all `.astro` files | Replace `MoveRight` import + JSX |
| Accent / brand color | `variables.css` | `--color-primary` |
| Heading font | `variables.css` | `--font-heading` |
| Body / UI font | `variables.css` | `--font-body` + `--font-cabin` |
| Section vertical padding | `variables.css` | `--section-padding` |
| Max content width | `variables.css` | `--container-max` |
| Card corner radius | `variables.css` | `--radius-sm` |
| Hover / transition speed | `variables.css` | `--transition` |
| Disable scroll animations | `site.config.ts` | `scrollReveal.enabled: false` |
| Slider cards per screen | `site.config.ts` | `testimonials.visibleCards` |
| Team autoplay speed | `site.config.ts` | `team.autoplayInterval` |

---

## CSS Variables

All design tokens live in `src/styles/variables.css` under `:root`. Change a token here to update every component that references it — no component code changes needed.

### Brand Colors

| Variable | Value | Usage |
|---|---|---|
| `--color-primary` | `#ffc342` | Golden yellow — CTA buttons, kicker labels, icon backgrounds, active states |
| `--color-primary-soft` | `#fff1b8` | Pale yellow — soft accent backgrounds |
| `--color-primary-dark` | `#242424` | Dark navy — button backgrounds, icon container fill |
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
| `--fw-normal` | `500` | Buttons, body text default |
| `--fw-medium` | `500` | Nav links, body emphasis |
| `--fw-semibold` | `600` | Kickers, card titles, subheadings |
| `--fw-bold` | `700` | Stat numbers, strong emphasis |
| `--fw-heavy` | `800` | Counter numbers, display headings |
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
| `--container-max` | `1280px` | Max inner content width used in the container clamp formula |
| `--container-gutter` | `80px` | Desktop gutter cap — padding tops out at this value (reached at 1440px viewport) |
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

## Site Config — Behavior Settings

All interactive behavior is controlled from a single file: **`src/config/site.config.ts`**. Change a value here and it propagates to every component that uses it — no component code needs to be touched.

```ts
// src/config/site.config.ts
export const siteConfig = { ... } as const;
```

### Scroll Reveal

| Key | Default | What it does |
|---|---|---|
| `scrollReveal.threshold` | `0.15` | 0–1 fraction of element visible before animation fires |
| `scrollReveal.enabled` | `true` | Set `false` to disable ALL `data-reveal` animations site-wide |

### Hero Section

| Key | Default | What it does |
|---|---|---|
| `hero.imageRotateInterval` | `3000` | ms between hero background image rotations. Set `0` to disable |

### Stats Counter

| Key | Default | What it does |
|---|---|---|
| `stats.animationDuration` | `2200` | ms — total duration of the count-up animation |
| `stats.threshold` | `0.35` | 0–1 fraction of stat visible before counter starts |

### Testimonials Slider

| Key | Default | What it does |
|---|---|---|
| `testimonials.visibleCards.mobile` | `1` | Cards shown on screens ≤ 640px |
| `testimonials.visibleCards.tablet` | `2` | Cards shown on screens ≤ 1024px |
| `testimonials.visibleCards.desktop` | `3` | Cards shown on larger screens |
| `testimonials.breakpoints.mobileMaxWidth` | `640` | px — upper bound for "mobile" count |
| `testimonials.breakpoints.tabletMaxWidth` | `1024` | px — upper bound for "tablet" count |

### Blog Slider

Same structure as testimonials — controls the blog preview carousel cards per breakpoint.

| Key | Default |
|---|---|
| `blog.visibleCards.mobile` | `1` |
| `blog.visibleCards.tablet` | `2` |
| `blog.visibleCards.desktop` | `3` |
| `blog.breakpoints.mobileMaxWidth` | `640` |
| `blog.breakpoints.tabletMaxWidth` | `1024` |

### Team Carousel

| Key | Default | What it does |
|---|---|---|
| `team.autoplayInterval` | `1000` | ms between auto-advances. Set `0` to disable autoplay |
| `team.animationDuration` | `420` | ms — slide transition speed |
| `team.cardGap` | `20` | px — gap between team cards |
| `team.visibleCards.mobile` | `1` | Cards shown on mobile |
| `team.visibleCards.tablet` | `2` | Cards shown on tablet |
| `team.visibleCards.desktop` | `4` | Cards shown on desktop |
| `team.breakpoints.mobileMaxWidth` | `640` | px |
| `team.breakpoints.tabletMaxWidth` | `1024` | px |

### FAQ Accordion

| Key | Default | What it does |
|---|---|---|
| `faq.keepOneOpen` | `true` | `true` — closing the last open item re-opens the first (home FAQ). `false` — collapse fully (standalone FAQ page uses `false` directly) |

### Scroll-to-top Button

| Key | Default | What it does |
|---|---|---|
| `scrollTop.showAfterPx` | `500` | px scrolled before the back-to-top button becomes visible |

### Contact

| Key | Default | What it does |
|---|---|---|
| `contact.revealThreshold` | `0.25` | 0–1 fraction of contact card visible before it animates in |
| `contact.successMessageDuration` | `5000` | ms — how long the form success message stays on screen |

### Navigation

| Key | Default | What it does |
|---|---|---|
| `nav.mobileBreakpoint` | `1024` | px — viewport width below which the hamburger menu activates |
| `nav.stickyEnabled` | `true` | `true` — navbar sticks to top after scrolling past the topbar |

---

## TypeScript Script Modules

All interactive JavaScript has been extracted from Astro `<script>` blocks into typed TypeScript modules in `src/scripts/`. Each Astro component's `<script>` block is now a thin 2–4 line import + call. This keeps logic centralized, typed, and testable.

### `scrollReveal.ts`

Watches all `[data-reveal]` elements with an IntersectionObserver and adds `.is-visible` when they enter the viewport. Reads `siteConfig.scrollReveal`.

**Used by:** `MainLayout.astro`

```ts
import { setupScrollReveal } from '../scripts/scrollReveal';
setupScrollReveal();
```

---

### `counter.ts`

Animates `.counter` elements from `0` to their target value using an `easeOutExpo` curve. Supports `+`, `%`, and decimal suffixes (e.g. `"98%"`, `"500+"`, `"4.9"`). Reads `siteConfig.stats`.

**Used by:** `Stats.astro`

```ts
import { initCounters } from '../../scripts/counter';
initCounters();
```

---

### `slider.ts` — `createSlider(options)`

Generic slider factory. Accepts a config object so the same function drives both the testimonials and blog preview carousels. Handles prev/next clicks, responsive visible-card count, and resize.

**Options:**

| Option | Type | Description |
|---|---|---|
| `trackSelector` | `string` | CSS selector for the slide track element |
| `slideSelector` | `string` | CSS selector for individual slide elements |
| `prevSelector` | `string` | CSS selector for the previous button |
| `nextSelector` | `string` | CSS selector for the next button |
| `visibleCards` | `{ mobile, tablet, desktop }` | Cards visible per breakpoint |
| `breakpoints` | `{ mobileMaxWidth, tabletMaxWidth }` | px breakpoints |

**Used by:** `Testimonials.astro`, `BlogPreview.astro`

```ts
import { createSlider } from '../../scripts/slider';
import { siteConfig } from '../../config/site.config';
createSlider({
  trackSelector: '.testimonial-track',
  slideSelector: '.testimonial-card',
  prevSelector: '.testimonial-prev',
  nextSelector: '.testimonial-next',
  visibleCards: siteConfig.testimonials.visibleCards,
  breakpoints: siteConfig.testimonials.breakpoints,
});
```

---

### `accordion.ts` — `createAccordion(options?)`

Generic accordion factory. All selectors and behavior are configurable. The `keepOneOpen` flag controls whether collapsing all items is allowed.

**Options (all optional):**

| Option | Default | Description |
|---|---|---|
| `itemSelector` | `'.faq-item'` | Selector for accordion item containers |
| `triggerSelector` | `'.faq-question'` | Selector for the clickable trigger button |
| `iconSelector` | `'.faq-question strong'` | Selector for the `+` / `−` icon element |
| `openClass` | `'is-open'` | Class added to open items |
| `keepOneOpen` | `false` | `true` — always keep at least one item open |

**Used by:** `FAQ.astro` (home), `faq/faq.astro`, `practice-areas/[slug].astro`, `case-study/[slug].astro`

---

### `scrollTop.ts`

Shows/hides the `.scroll-top` button based on scroll position. Adds smooth scroll to top on click. Reads `siteConfig.scrollTop`.

**Used by:** `ScrollTop.astro`

```ts
import { setupScrollTop } from '../../scripts/scrollTop';
setupScrollTop();
```

---

### `infiniteCarousel.ts`

Full infinite-loop carousel for the Team section. Clones all cards and appends them — when the index reaches the end, it silently jumps back to the matching real position (no visible snap). Supports autoplay with pause-on-hover. Reads `siteConfig.team`.

**Used by:** `Team.astro`

```ts
import { createInfiniteCarousel } from '../../scripts/infiniteCarousel';
createInfiniteCarousel();
```

**Key behavior:**
- Autoplay pauses when the mouse enters the carousel wrapper
- Manual prev/next resets the autoplay timer
- Resize recalculates card step size without animation

---

## Customization Guide — What You Can Change

Everything a user or client might want to customize is controlled by exactly **two files**. You never need to touch any component code.

| File | Controls |
|---|---|
| `src/styles/variables.css` | All visual appearance — colors, fonts, spacing, radii, shadows |
| `src/config/site.config.ts` | All interactive behavior — animations, sliders, timings, breakpoints |

---

### Visual Changes → `src/styles/variables.css`

#### Rebrand the Accent Color

The golden yellow used across buttons, kickers, badges, icon backgrounds, and active states.

```css
--color-primary: #ffc342;   /* ← change this to your brand color */
```

Everything that uses the accent color — CTA buttons, kicker labels, practice area cards, arrow backgrounds, hover states — updates automatically.

---

#### Change the Dark / Navy Color

Used in the hero background, dark section backgrounds, and button fills.

```css
--color-dark:         #0f1a34;   /* hero / dark section background */
--color-primary-dark: #242424;   /* button bg, icon container fill */
--color-dark-2:       #1d2947;   /* cards placed on dark backgrounds */
```

---

#### Swap the Heading Font

```css
--font-heading: "Bitter", Georgia, serif;   /* ← replace "Bitter" with any font */
```

After changing, also update the Google Fonts `<link>` in `src/layouts/MainLayout.astro` to load the new font.

---

#### Swap the Body Font

```css
--font-body:  'Cabin';
--font-cabin: "Cabin", Helvetica, Arial, Lucida, sans-serif;
```

Both variables must be updated together — `--font-body` is used in `global.css`, `--font-cabin` is used in component CSS with fallbacks.

---

#### Adjust the Type Scale

| Variable | Value | Where it shows |
|---|---|---|
| `--fs-h1` | `50px` | Hero headline |
| `--fs-h2` | `38px` | All section headings |
| `--fs-h3` | `24px` | Card and sub-section headings |
| `--fs-h4` | `20px` | Card titles |
| `--fs-md` | `17px` | Kicker labels, nav links |
| `--fs-base` | `16px` | Body copy |
| `--fs-sm` | `14px` | Metadata, badges, fine print |
| `--fs-xs` | `13px` | Extra-small labels |

---

#### Adjust Font Weights

| Variable | Value | Where it shows |
|---|---|---|
| `--fw-heavy` | `800` | Stat counter numbers |
| `--fw-bold` | `700` | Headings, strong emphasis |
| `--fw-semibold` | `600` | Kickers, card titles, subheadings |
| `--fw-medium` | `500` | Nav links, body emphasis |
| `--fw-normal` | `500` | Buttons, standard body text |

---

#### Control Section Breathing Room

```css
--section-padding: clamp(4rem, 8vw, 7rem);   /* fluid 64px → 112px */
```

Increase both values to add more vertical space between sections. This applies to every section on every page.

---

#### Narrow or Widen the Content Column

```css
--container-max:    1280px;   /* inner content width used in the clamp formula */
--container-gutter: 80px;     /* desktop gutter — padding on each side at 1440px+ */
```

Containers are capped at `1440px` total width (`max-width` in `global.css`) and auto-centered within each section. Section backgrounds always bleed full-width regardless of viewport size. To change the hard cap, edit `max-width: 1440px` directly in the `.container` rule in `src/styles/global.css`.

---

#### Card Padding and Grid Gaps

```css
--pad-card:    var(--sp-5);   /* 20px — inner padding on all cards */
--gap-grid:    var(--sp-7);   /* 28px — gap between grid/flex items */
--gap-section: var(--sp-12);  /* 48px — gap in wide two-column layouts */
```

---

#### Border Radius (Corners)

| Variable | Value | Used on |
|---|---|---|
| `--radius-sm` | `10px` | Standard cards, inputs, buttons |
| `--radius-md` | `18px` | Larger cards |
| `--radius-lg` | `28px` | Hero and feature cards |
| `--radius-section` | `22px` | Large section-level cards |
| `--radius-pill` | `999px` | Buttons, tags, pill shapes |

To make the whole site feel more rectangular, lower all values. To make it rounder, increase them.

---

#### Shadows

```css
--shadow-card:  0 20px 50px rgba(16, 26, 54, 0.08);   /* resting card */
--shadow-hover: 0 24px 60px rgba(16, 26, 54, 0.12);   /* card on hover */
```

Increase the alpha (`0.08` / `0.12`) for more dramatic shadows, or set to `none` for a flat look.

---

#### Hover and Transition Speed

```css
--transition:      0.3s ease;                            /* standard hover speed */
--transition-slow: 0.45s cubic-bezier(.22, .61, .36, 1); /* larger transforms */
```

---

#### Background Color Tones

| Variable | Value | Used on |
|---|---|---|
| `--color-cream` | `#fff9df` | Alternating section backgrounds |
| `--color-cream-warm` | `#fff9e8` | Card and section backgrounds |
| `--color-cream-soft` | `#fff1cf` | FAQ and blog card backgrounds |
| `--color-practice-card` | `#feefcf` | Practice area card background |
| `--color-card-hover` | `#ffe3a3` | Testimonial card hover state |

---

#### Text Colors

| Variable | Value | Used on |
|---|---|---|
| `--color-text` | `#242424` | Primary body text |
| `--color-muted` | `#6b6b6b` | Supporting / secondary text |
| `--color-text-on-dark` | `rgba(255,255,255,0.75)` | Body text on dark backgrounds |
| `--color-white` | `#ffffff` | Text on dark backgrounds, card fills |

---

### Quick Visual Rebrand Checklist

To fully rebrand the site visually, change only these tokens in `variables.css`:

| # | What to change | Variable |
|---|---|---|
| 1 | Accent / brand color | `--color-primary` |
| 2 | Hero / dark section background | `--color-dark` |
| 3 | Heading typeface | `--font-heading` |
| 4 | Body typeface | `--font-body` + `--font-cabin` |
| 5 | Section vertical spacing | `--section-padding` |
| 6 | Card corner roundness | `--radius-sm` |

Everything else inherits from these six.

---

### Behavioral Changes → `src/config/site.config.ts`

#### Turn Off All Scroll Animations

```ts
scrollReveal: {
  enabled: false,   // no elements will animate on scroll
}
```

---

#### Slow Down or Speed Up Scroll Reveal Trigger

```ts
scrollReveal: {
  threshold: 0.15,  // 0 = fires as soon as element touches screen edge
                    // 1 = fires only when element is fully visible
}
```

---

#### Change Hero Image Rotation Speed

```ts
hero: {
  imageRotateInterval: 3000,  // ms — lower = faster, 0 = stop rotation
}
```

---

#### Change Stats Counter Speed

```ts
stats: {
  animationDuration: 2200,  // ms — total time to count from 0 to target
  threshold: 0.35,          // how much of the counter must be visible before it starts
}
```

---

#### Change Slider Cards Per Screen Size

For both Testimonials and Blog sliders:

```ts
testimonials: {
  visibleCards: {
    mobile:  1,   // cards on phone screens
    tablet:  2,   // cards on tablet screens
    desktop: 3,   // cards on desktop
  },
  breakpoints: {
    mobileMaxWidth: 640,    // px — anything ≤ this is "mobile"
    tabletMaxWidth: 1024,   // px — anything ≤ this is "tablet"
  },
}
```

Same structure applies to `blog: { visibleCards, breakpoints }`.

---

#### Control the Team Carousel

```ts
team: {
  autoplayInterval:  1000,  // ms — set 0 to disable autoplay entirely
  animationDuration: 420,   // ms — how fast the slide transition plays
  cardGap:           20,    // px — gap between team member cards
  visibleCards: { mobile: 1, tablet: 2, desktop: 4 },
}
```

---

#### Change FAQ Behavior

```ts
faq: {
  keepOneOpen: true,   // true  = always one item stays open (home FAQ)
                       // false = click to fully close all items
}
```

The standalone FAQ page (`/faq/faq`) always uses `false` directly, regardless of this value.

---

#### Change When the Scroll-to-Top Button Appears

```ts
scrollTop: {
  showAfterPx: 500,   // px scrolled before the ↑ button appears
}
```

---

#### Contact Form Behavior

```ts
contact: {
  revealThreshold:        0.25,  // fraction of contact card visible before it animates in
  successMessageDuration: 5000,  // ms — how long "message sent" stays on screen
}
```

---

#### Navigation

```ts
nav: {
  mobileBreakpoint: 1024,   // px — below this width, hamburger menu activates
  stickyEnabled:    true,   // false = nav scrolls with the page (not sticky)
}
```

---

### Complete One-Line Change Reference

| Goal | File | What to edit |
|---|---|---|
| Change brand / accent color | `variables.css` | `--color-primary` |
| Change hero / dark background | `variables.css` | `--color-dark` |
| Swap heading font | `variables.css` | `--font-heading` |
| Swap body font | `variables.css` | `--font-body` + `--font-cabin` |
| More space between sections | `variables.css` | `--section-padding` |
| Rounder or sharper card corners | `variables.css` | `--radius-sm` |
| Faster or slower hover effects | `variables.css` | `--transition` |
| Narrow or widen the content column | `variables.css` | `--container-max` |
| Change the desktop side gutter | `variables.css` | `--container-gutter` |
| Disable all scroll animations | `site.config.ts` | `scrollReveal.enabled: false` |
| Change when animations fire | `site.config.ts` | `scrollReveal.threshold` |
| Speed up stats counters | `site.config.ts` | `stats.animationDuration` |
| Show more cards in sliders | `site.config.ts` | `testimonials.visibleCards.desktop` |
| Stop team carousel autoplay | `site.config.ts` | `team.autoplayInterval: 0` |
| Make team slide faster | `site.config.ts` | `team.animationDuration` |
| Stop hero image rotating | `site.config.ts` | `hero.imageRotateInterval: 0` |
| Back-to-top button appears earlier | `site.config.ts` | `scrollTop.showAfterPx` |
| Change mobile nav breakpoint | `site.config.ts` | `nav.mobileBreakpoint` |

---

## Going Live

### Prerequisites

```bash
node --version    # must be ≥ 22.12.0
npm --version     # any recent version
```

### Step 1 — Update firm identity

Open `src/consts.ts` and replace every placeholder with real values:

```ts
export const SITE_TITLE       = 'Your Firm Name';
export const SITE_DESCRIPTION = 'Your firm tagline for SEO.';
export const SITE_URL         = 'https://your-domain.com';
export const SITE_OG_IMAGE    = '/og-image.jpg';  // place 1200×630 image in /public/

export const FIRM_NAME    = 'Your Firm Name';
export const FIRM_PHONE   = '+1 555-000-0000';
export const FIRM_EMAIL   = 'info@yourfirm.com';
export const FIRM_ADDRESS = '123 Main St, City, State 00000';
```

### Step 2 — Update your site URL in Astro config

Open `astro.config.mjs` and set `site` to your production domain. This is required for the sitemap and canonical URLs to be correct.

```js
export default defineConfig({
  site: 'https://your-domain.com',   // ← must match SITE_URL in consts.ts
  ...
})
```

### Step 3 — Install and build locally

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

| # | Item | Where to change |
|---|---|---|
| 1 | Update firm name, phone, email, address | `src/consts.ts` |
| 2 | Update production domain | `astro.config.mjs` → `site:` + `src/consts.ts` → `SITE_URL` |
| 3 | Replace OG image | Place 1200×630 file at `public/og-image.jpg` |
| 4 | Update JSON-LD opening hours + social profiles | `src/layouts/MainLayout.astro` → `jsonLd` const |
| 5 | Replace nav menu links | `src/components/layout/Header.astro` → `navLinks` |
| 6 | Update topbar phone, email, social icons | `src/components/layout/Header.astro` → `topbar__contact` |
| 7 | Replace placeholder images | `public/images/` — hero, team, case studies, testimonials |
| 8 | Add real blog posts | `src/content/blog/*.md` — delete placeholder posts |
| 9 | Update practice areas | `src/data/practiceAreas.ts` |
| 10 | Update case studies | `src/data/caseStudies.ts` |
| 11 | Update testimonials | `src/data/testimonials.ts` |
| 12 | Update FAQs | `src/data/faqs.ts` |
| 13 | Set real contact form action | `src/components/home/ContactCTA.astro` |
| 14 | Add Google Analytics / Tag Manager | `src/layouts/MainLayout.astro` → `<head>` |
| 15 | Verify sitemap | Visit `/sitemap-index.xml` after deploy |
| 16 | Verify RSS feed | Visit `/rss.xml` after deploy |
| 17 | Submit sitemap to Google Search Console | search.google.com/search-console |
| 18 | Test social sharing preview | pastes.io/ogp or opengraph.xyz with your URL |
