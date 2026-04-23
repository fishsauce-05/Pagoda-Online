import { SELECTORS } from '../../core/config/selectors.js';
import { qsa, qs } from '../../core/utils/dom.js';

export function initCarousel() {
  qsa(SELECTORS.carouselIndicators).forEach((carouselIndicator) => {
    const carousel = carouselIndicator.closest('.carousel');
    if (!carousel) {
      return;
    }

    qsa('.carousel-item', carousel).forEach((_, index) => {
      const activeClass = index === 0 ? ' class="active"' : '';
      carouselIndicator.innerHTML += `<li data-bs-target="#${carousel.id}" data-bs-slide-to="${index}"${activeClass}></li>`;
    });
  });

  qsa(SELECTORS.swiper).forEach((swiperElement) => {
    const configElement = qs(SELECTORS.swiperConfig, swiperElement);
    if (!configElement || typeof window.Swiper === 'undefined') {
      return;
    }

    const config = JSON.parse(configElement.innerHTML.trim());
    new window.Swiper(swiperElement, config);
  });
}
