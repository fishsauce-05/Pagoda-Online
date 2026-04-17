import { initMenuCollapse } from './modules/menu-collapse.js';
import { initHeroNavbarSync } from './modules/hero-navbar-sync.js';
import { initHeroCarouselTrigger } from './modules/hero-carousel-trigger.js';
import { initIncenseExperience } from './modules/incense-experience.js';
import { prayPageConfig } from './config.js';

window.addEventListener('DOMContentLoaded', function() {
  initMenuCollapse();

  initHeroNavbarSync(prayPageConfig.heroNavbarSync);

  initHeroCarouselTrigger(prayPageConfig.heroCarouselTrigger);

  initIncenseExperience(prayPageConfig.incenseExperience);
});
