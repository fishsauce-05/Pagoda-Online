/*!
* Main wrapper for index page interactions
*/
window.IndexApp = window.IndexApp || {};

window.addEventListener("DOMContentLoaded", function() {
  if (typeof window.IndexApp.initBackgroundMusic === "function") {
    window.IndexApp.initBackgroundMusic({
      audioId: "background-music",
      startButtonId: "start-music-btn",
      volume: 0.25
    });
  }

  if (typeof window.IndexApp.initScrollTopProgress === "function") {
    window.IndexApp.initScrollTopProgress({
      buttonSelector: ".gh-scroll-top-btn",
      pathSelector: ".gh-scroll-top-progress path",
      showAfter: 120
    });
  }
});
