import { siteConfig } from '../config/site.config';

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function parseValue(raw: string): { target: number; display: (n: number) => string } {
  const number = parseFloat(raw.replace(/[^\d.]/g, ''));
  const suffix = raw.replace(/[\d.,]/g, '');
  if (raw.toLowerCase().includes('k')) {
    return { target: number * 1000, display: (n) => `${Math.round(n / 1000)}K+` };
  }
  return { target: number, display: (n) => `${Math.round(n)}${suffix}` };
}

function animateCounter(el: HTMLElement, duration: number): void {
  const raw = el.dataset.count ?? '0';
  const { target, display } = parseValue(raw);
  const start = performance.now();

  function frame(now: number): void {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = display(target * easeOutExpo(progress));
    if (progress < 1) requestAnimationFrame(frame);
    else el.textContent = raw;
  }

  requestAnimationFrame(frame);
}

export function initCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target as HTMLElement, siteConfig.stats.animationDuration);
        observer.unobserve(entry.target);
      });
    },
    { threshold: siteConfig.stats.threshold }
  );

  counters.forEach((counter) => observer.observe(counter));
}
