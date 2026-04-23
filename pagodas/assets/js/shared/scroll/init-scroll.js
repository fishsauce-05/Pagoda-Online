import { FLAGS } from '../../core/config/flags.js';
import { SELECTORS } from '../../core/config/selectors.js';
import { qs } from '../../core/utils/dom.js';

export function initScroll() {
  const scrollTop = qs(SELECTORS.scrollTopButton);
  const progressPath = qs(SELECTORS.scrollTopProgressPath);
  let pathLength = 0;

  if (progressPath) {
    pathLength = progressPath.getTotalLength();
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = `${pathLength}`;
  }

  function toggleScrollTop() {
    const scrollTopValue = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop) {
      const isActive = scrollTopValue > FLAGS.scrollTopOffset;
      scrollTop.classList.toggle('active', isActive);
      scrollTop.classList.toggle('is-active', isActive);
    }

    if (progressPath) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? scrollTopValue / scrollHeight : 0;
      progressPath.style.strokeDashoffset = `${pathLength * (1 - progress)}`;
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  window.addEventListener('resize', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);
}
