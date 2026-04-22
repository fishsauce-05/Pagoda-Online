export function createSlideVisualController(options) {
  function ensureIncenseImage(slideElement) {
    if (slideElement.querySelector(options.incenseImageSelector)) {
      return;
    }

    const incenseImage = document.createElement('img');
    incenseImage.src = options.incenseImageSrc;
    incenseImage.alt = options.incenseImageAlt;
    incenseImage.className = options.incenseImageClass;

    slideElement.appendChild(incenseImage);
  }

  function activate(slideElement) {
    slideElement.classList.add('is-incense-active');
    ensureIncenseImage(slideElement);
  }

  function reset(slideElement) {
    slideElement.classList.remove('is-incense-active');

    const incenseImage = slideElement.querySelector(options.incenseImageSelector);
    if (incenseImage) {
      incenseImage.remove();
    }
  }

  return {
    activate: activate,
    reset: reset
  };
}