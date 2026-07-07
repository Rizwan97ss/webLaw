import { siteConfig } from '../config/site.config';

export function setupScrollReveal(): void {
  if (!siteConfig.scrollReveal.enabled) return;

  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: siteConfig.scrollReveal.threshold }
  );

  items.forEach((item) => observer.observe(item));
}
