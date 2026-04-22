import { initBackgroundMusic } from "./modules/music-controller.js";
import { initScrollTopProgress } from "./modules/scroll-top-progress.js";
import { indexPageConfig } from "./config.js";

window.addEventListener("DOMContentLoaded", function() {
    initBackgroundMusic(indexPageConfig.backgroundMusic);

    initScrollTopProgress(indexPageConfig.scrollTopProgress);
});