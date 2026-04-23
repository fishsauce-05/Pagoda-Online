import { SELECTORS } from '../../core/config/selectors.js';
import { qsa } from '../../core/utils/dom.js';

export function initFaq() {
  const faqTriggers = qsa(SELECTORS.faqTriggers);

  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();

      // Find the closest faq-item
      const faqItem = trigger.closest('.faq-item');
      if (!faqItem) {
        return;
      }

      // Find the faq-content within this item
      const faqContent = faqItem.querySelector('.faq-content');
      if (!faqContent) {
        return;
      }

      // Toggle the active class
      faqItem.classList.toggle('faq-active');

      // Close other faq items (optional - for accordion behavior)
      const otherItems = qsa('.faq-item');
      otherItems.forEach((item) => {
        if (item !== faqItem) {
          item.classList.remove('faq-active');
        }
      });
    });
  });
}
