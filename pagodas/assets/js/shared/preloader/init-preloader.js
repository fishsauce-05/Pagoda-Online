import { qs } from '../../core/utils/dom.js';
import { SELECTORS } from '../../core/config/selectors.js';

export function initPreloader() {
  const preloader = qs(SELECTORS.preloader);
  if (!preloader) {
    return;
  }

  window.addEventListener('load', () => {
    preloader.remove();
  });
}
