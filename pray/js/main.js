import { initMenuCollapse } from './modules/menu/menu-collapse.js';
import { initHeroNavbarSync } from './modules/navbar/hero-navbar-sync.js';
import { initHeroCarouselTrigger } from './modules/carousel/hero-carousel-trigger.js';
import { initIncenseExperience } from './modules/incense/incense-experience.js';
import { prayPageConfig } from './config.js';

window.addEventListener('DOMContentLoaded', function() {
  initMenuCollapse();

  initHeroNavbarSync(prayPageConfig.heroNavbarSync);

  initHeroCarouselTrigger(prayPageConfig.heroCarouselTrigger);

  initIncenseExperience(prayPageConfig.incenseExperience);
});
