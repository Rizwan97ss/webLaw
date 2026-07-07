import { siteConfig } from '../config/site.config';

const cfg = siteConfig.team;

export function createInfiniteCarousel(): void {
  const track    = document.querySelector<HTMLElement>('.team-track');
  const origCards = Array.from(document.querySelectorAll<HTMLElement>('.team-card'));
  const prevBtn  = document.querySelector<HTMLElement>('.team-prev');
  const nextBtn  = document.querySelector<HTMLElement>('.team-next');
  const wrap     = document.querySelector<HTMLElement>('.team-track-outer');

  if (!track || !origCards.length || !wrap) return;

  const total = origCards.length;

  // Clone slides to enable seamless infinite loop: [real…, clone…]
  origCards.forEach((card) => {
    const clone = card.cloneNode(true) as HTMLElement;
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  let current     = 0;
  let isAnimating = false;
  let autoTimer: ReturnType<typeof setInterval> | null = null;

  function getVisible(): number {
    if (window.innerWidth <= cfg.breakpoints.mobileMaxWidth) return cfg.visibleCards.mobile;
    if (window.innerWidth <= cfg.breakpoints.tabletMaxWidth) return cfg.visibleCards.tablet;
    return cfg.visibleCards.desktop;
  }

  function stepSize(): number {
    return (wrap.clientWidth - cfg.cardGap * (getVisible() - 1)) / getVisible() + cfg.cardGap;
  }

  function moveTo(index: number, animate: boolean): void {
    track.style.transition = animate
      ? `transform ${cfg.animationDuration}ms cubic-bezier(0.22, 0.61, 0.36, 1)`
      : 'none';
    track.style.transform = `translateX(-${index * stepSize()}px)`;
  }

  function next(): void {
    if (isAnimating) return;
    isAnimating = true;
    moveTo(++current, true);
    setTimeout(() => {
      if (current >= total) { current -= total; moveTo(current, false); }
      isAnimating = false;
    }, cfg.animationDuration + 20);
  }

  function prev(): void {
    if (isAnimating) return;
    isAnimating = true;
    if (current <= 0) {
      current = total;
      moveTo(current, false);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        moveTo(--current, true);
        setTimeout(() => { isAnimating = false; }, cfg.animationDuration + 20);
      }));
    } else {
      moveTo(--current, true);
      setTimeout(() => { isAnimating = false; }, cfg.animationDuration + 20);
    }
  }

  function startAuto(): void {
    if (cfg.autoplayInterval <= 0) return;
    stopAuto();
    autoTimer = setInterval(next, cfg.autoplayInterval);
  }

  function stopAuto(): void {
    if (autoTimer !== null) { clearInterval(autoTimer); autoTimer = null; }
  }

  nextBtn?.addEventListener('click', () => { next(); stopAuto(); startAuto(); });
  prevBtn?.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });
  wrap.addEventListener('mouseenter', stopAuto);
  wrap.addEventListener('mouseleave', startAuto);
  window.addEventListener('resize', () => moveTo(current, false), { passive: true });

  moveTo(0, false);
  startAuto();
}
