interface SliderOptions {
  trackSelector: string;
  slideSelector: string;
  prevSelector: string;
  nextSelector: string;
  visibleCards: { mobile: number; tablet: number; desktop: number };
  breakpoints: { mobileMaxWidth: number; tabletMaxWidth: number };
}

export function createSlider(options: SliderOptions): void {
  const track = document.querySelector<HTMLElement>(options.trackSelector);
  const originalSlides = Array.from(document.querySelectorAll<HTMLElement>(options.slideSelector));
  const prev = document.querySelector<HTMLElement>(options.prevSelector);
  const next = document.querySelector<HTMLElement>(options.nextSelector);

  if (!track || !originalSlides.length) return;

  const safeTrack: HTMLElement = track;
  const total = originalSlides.length;

  // Append clones for seamless infinite loop: [real…, clone…]
  originalSlides.forEach((slide) => {
    const clone = slide.cloneNode(true) as HTMLElement;
    clone.setAttribute('aria-hidden', 'true');
    safeTrack.appendChild(clone);
  });

  const firstReal: HTMLElement = originalSlides[0];

  let index = 0;
  let isAnimating = false;

  function getVisible(): number {
    if (window.innerWidth <= options.breakpoints.mobileMaxWidth) return options.visibleCards.mobile;
    if (window.innerWidth <= options.breakpoints.tabletMaxWidth) return options.visibleCards.tablet;
    return options.visibleCards.desktop;
  }

  function moveTo(i: number, animate: boolean): void {
    safeTrack.style.transition = animate ? '' : 'none';
    safeTrack.style.transform = `translateX(-${i * firstReal.getBoundingClientRect().width}px)`;
  }

  next?.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    moveTo(++index, true);
  });

  prev?.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    if (index <= 0) {
      // Instantly jump to clone zone at end, then animate backwards
      index = total;
      moveTo(index, false);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        moveTo(--index, true);
      }));
    } else {
      moveTo(--index, true);
    }
  });

  safeTrack.addEventListener('transitionend', (e: TransitionEvent) => {
    if (e.propertyName !== 'transform') return;
    // Seamlessly snap from clone zone back to real slides
    if (index >= total) {
      index -= total;
      moveTo(index, false);
    }
    isAnimating = false;
  });

  window.addEventListener('resize', () => moveTo(index, false), { passive: true });
  moveTo(0, false);
}
