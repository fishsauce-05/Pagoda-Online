import { SELECTORS } from '../../core/config/selectors.js';

export function initVendorIntegrations() {
  if (typeof window.AOS !== 'undefined') {
    window.AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  if (typeof window.GLightbox !== 'undefined') {
    window.GLightbox({ selector: SELECTORS.glightbox });
  }

  if (typeof window.PureCounter !== 'undefined') {
    new window.PureCounter();
  }
}
