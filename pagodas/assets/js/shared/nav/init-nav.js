import { FLAGS } from '../../core/config/flags.js';
import { SELECTORS } from '../../core/config/selectors.js';
import { qsa, qs } from '../../core/utils/dom.js';

export function initNav() {
  const body = qs(SELECTORS.body);
  const header = qs(SELECTORS.header);
  const mobileNavToggleBtn = qs(SELECTORS.mobileNavToggle);
  const navLinks = qsa(SELECTORS.navLinks);

  function toggleScrolled() {
    if (!body || !header) {
      return;
    }

    if (
      !header.classList.contains('scroll-up-sticky') &&
      !header.classList.contains('sticky-top') &&
      !header.classList.contains('fixed-top')
    ) {
      return;
    }

    body.classList.toggle('scrolled', window.scrollY > FLAGS.scrollTopOffset);
  }

  function mobileNavToggle() {
    if (!body || !mobileNavToggleBtn) {
      return;
    }

    body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  function navmenuScrollspy() {
    navLinks.forEach((link) => {
      if (!link.hash) {
        return;
      }

      const section = qs(link.hash);
      if (!section) {
        return;
      }

      const position = window.scrollY + FLAGS.scrollSpyOffset;
      const isActive = position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight);
      link.classList.toggle('active', isActive);
    });
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (qs('.mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  window.addEventListener('load', toggleScrolled);
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', toggleScrolled);
  document.addEventListener('scroll', navmenuScrollspy);

  window.addEventListener('load', () => {
    if (!window.location.hash) {
      return;
    }

    const section = qs(window.location.hash);
    if (!section) {
      return;
    }

    setTimeout(() => {
      const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
      window.scrollTo({
        top: section.offsetTop - Number.parseInt(scrollMarginTop, 10),
        behavior: 'smooth'
      });
    }, 100);
  });
}
