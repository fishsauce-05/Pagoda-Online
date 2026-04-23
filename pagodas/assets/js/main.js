import { PATHS } from './core/config/paths.js';
import { initVendorIntegrations } from './shared/integrations/init-vendor.js';
import { initPreloader } from './shared/preloader/init-preloader.js';
import { initScroll } from './shared/scroll/init-scroll.js';
import { initNav } from './shared/nav/init-nav.js';
import { initCarousel } from './shared/carousel/init-carousel.js';
import { loadModals } from './shared/modals/load-modals.js';
import { showReactionImage } from './shared/modals/modal-img.js';
import { initFaq } from './shared/faq/init-faq.js';
import { initDonation } from './features/donation/init-donation.js';
import { initRescue } from './features/rescue/init-rescue.js';
import { initFortune } from './features/fortune/init-fortune.js';
import { initPackage } from './features/package/init-package.js';
import { initWishAd } from './features/wish-ad/init-wish-ad.js';

window.addEventListener('DOMContentLoaded', function() {
  initVendorIntegrations();
  initPreloader();
  initScroll();
  initNav();
  initCarousel();
  initFaq();

  loadModals(PATHS.modals, function() {
    initDonation();
    initRescue();
    initFortune();
    initPackage();
    initWishAd();

    if (typeof window.initializeRescueAnimals === 'function') {
      window.initializeRescueAnimals();
    }
  });
});
