import { siteConfig } from '../config/site.config';

export function setupScrollTop(): void {
  const button = document.querySelector<HTMLElement>('.scroll-top');
  if (!button) return;

  window.addEventListener(
    'scroll',
    () => button.classList.toggle('is-visible', window.scrollY > siteConfig.scrollTop.showAfterPx),
    { passive: true }
  );

  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
