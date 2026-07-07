interface AccordionOptions {
  itemSelector?: string;
  triggerSelector?: string;
  iconSelector?: string;
  openClass?: string;
  keepOneOpen?: boolean;
}

export function createAccordion(options: AccordionOptions = {}): void {
  const {
    itemSelector    = '.faq-item',
    triggerSelector = '.faq-question',
    iconSelector    = '.faq-question strong',
    openClass       = 'is-open',
    keepOneOpen     = false,
  } = options;

  const items = document.querySelectorAll<HTMLElement>(itemSelector);
  if (!items.length) return;

  function closeItem(item: HTMLElement): void {
    item.classList.remove(openClass);
    const icon = item.querySelector<HTMLElement>(iconSelector);
    if (icon) icon.textContent = '+';
  }

  function openItem(item: HTMLElement): void {
    item.classList.add(openClass);
    const icon = item.querySelector<HTMLElement>(iconSelector);
    if (icon) icon.textContent = '−';
  }

  items.forEach((item) => {
    item.querySelector(triggerSelector)?.addEventListener('click', () => {
      const isOpen = item.classList.contains(openClass);
      items.forEach(closeItem);
      if (!isOpen) {
        openItem(item);
      } else if (keepOneOpen && items[0]) {
        openItem(items[0]);
      }
    });
  });
}
