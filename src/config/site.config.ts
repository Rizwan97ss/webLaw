/**
 * ─────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION
 *  src/config/site.config.ts
 *
 *  Change values here — they propagate to every component that uses
 *  them automatically. No component code needs to be touched.
 * ─────────────────────────────────────────────────────────────────
 */

export const siteConfig = {

  // ── Scroll Reveal (data-reveal animations) ───────────────────
  scrollReveal: {
    /** 0–1 — fraction of element visible before animation triggers */
    threshold: 0.15,
    /** Set false to disable ALL data-reveal scroll animations site-wide */
    enabled: true,
  },

  // ── Hero Section ─────────────────────────────────────────────
  hero: {
    /** ms — how often the hero image rotates. Set 0 to disable rotation. */
    imageRotateInterval: 3000,
  },

  // ── Stats Counter ─────────────────────────────────────────────
  stats: {
    /** ms — total duration of the count-up animation */
    animationDuration: 2200,
    /** 0–1 — fraction of counter visible before animation starts */
    threshold: 0.35,
  },

  // ── Testimonials Slider ───────────────────────────────────────
  testimonials: {
    visibleCards: {
      /** Cards shown on screens ≤ mobileMaxWidth px */
      mobile: 1,
      /** Cards shown on screens ≤ tabletMaxWidth px */
      tablet: 2,
      /** Cards shown on larger screens */
      desktop: 3,
    },
    breakpoints: {
      /** px — upper limit for "mobile" card count */
      mobileMaxWidth: 640,
      /** px — upper limit for "tablet" card count */
      tabletMaxWidth: 1024,
    },
  },

  // ── Blog Slider ───────────────────────────────────────────────
  blog: {
    visibleCards: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
    },
    breakpoints: {
      mobileMaxWidth: 640,
      tabletMaxWidth: 1024,
    },
  },

  // ── Team Carousel ─────────────────────────────────────────────
  team: {
    /** ms — interval between auto-advances. Set 0 to disable autoplay. */
    autoplayInterval: 1000,
    /** ms — duration of the slide transition animation */
    animationDuration: 420,
    /** px — gap between cards */
    cardGap: 20,
    visibleCards: {
      mobile: 1,
      tablet: 2,
      desktop: 4,
    },
    breakpoints: {
      mobileMaxWidth: 640,
      tabletMaxWidth: 1024,
    },
  },

  // ── FAQ Accordion ─────────────────────────────────────────────
  faq: {
    /**
     * true  — closing the last open item re-opens the first (always one visible).
     * false — closing an item collapses everything.
     * Home FAQ section uses true; standalone FAQ page uses false.
     */
    keepOneOpen: true,
  },

  // ── Scroll-to-top Button ──────────────────────────────────────
  scrollTop: {
    /** px of scroll before the back-to-top button becomes visible */
    showAfterPx: 500,
  },

  // ── Contact Card Reveal ───────────────────────────────────────
  contact: {
    /** 0–1 — fraction of contact card visible before it animates in */
    revealThreshold: 0.25,
    /** ms — how long the form success message stays visible */
    successMessageDuration: 5000,
  },

  // ── Navigation ────────────────────────────────────────────────
  nav: {
    /** px — viewport width below which the mobile hamburger menu activates */
    mobileBreakpoint: 1024,
    /** true — navbar sticks to top after scrolling past the topbar */
    stickyEnabled: true,
  },

} as const;

export type SiteConfig = typeof siteConfig;
