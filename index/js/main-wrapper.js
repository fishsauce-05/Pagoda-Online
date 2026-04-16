import { initBackgroundMusic } from "./modules/music-controller.js";
import { initScrollTopProgress } from "./modules/scroll-top-progress.js";

window.addEventListener("DOMContentLoaded", function() {
  initBackgroundMusic({
    audioId: "background-music",
    startButtonId: "start-music-btn",
    volume: 0.25
  });

  initScrollTopProgress({
    buttonSelector: ".gh-scroll-top-btn",
    pathSelector: ".gh-scroll-top-progress path",
    showAfter: 120
  });
});