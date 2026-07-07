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
  const slides = document.querySelectorAll<HTMLElement>(options.slideSelector);
  const prev  = document.querySelector<HTMLElement>(options.prevSelector);
  const next  = document.querySelector<HTMLElement>(options.nextSelector);

  if (!track || !slides.length) return;

  // Narrowed references so inner closures stay typed as HTMLElement
  const safeTrack: HTMLElement = track;
  const firstSlide: HTMLElement = slides[0];

  let index = 0;

  function getVisible(): number {
    if (window.innerWidth <= options.breakpoints.mobileMaxWidth) return options.visibleCards.mobile;
    if (window.innerWidth <= options.breakpoints.tabletMaxWidth) return options.visibleCards.tablet;
    return options.visibleCards.desktop;
  }

  function update(): void {
    const maxIndex = Math.max(slides.length - getVisible(), 0);
    if (index > maxIndex) index = maxIndex;
    safeTrack.style.transform = `translateX(-${index * firstSlide.getBoundingClientRect().width}px)`;
  }

  next?.addEventListener('click', () => {
    const maxIndex = Math.max(slides.length - getVisible(), 0);
    index = index >= maxIndex ? 0 : index + 1;
    update();
  });

  prev?.addEventListener('click', () => {
    const maxIndex = Math.max(slides.length - getVisible(), 0);
    index = index <= 0 ? maxIndex : index - 1;
    update();
  });

  window.addEventListener('resize', update, { passive: true });
  update();
}
