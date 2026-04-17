function hasRequiredOptions(options) {
  if (!options) {
    return false;
  }

  const requiredKeys = [
    'triggerSelector',
    'slideSelector',
    'incenseImageSelector',
    'incenseImageClass',
    'incenseImageSrc',
    'incenseImageAlt',
    'audioSrc',
    'resetDelayMs'
  ];

  return requiredKeys.every(function(key) {
    return options[key] !== undefined && options[key] !== null;
  });
}

function createPrayerMusicController(audioSrc) {
  const prayerMusic = new Audio(audioSrc);
  let hasStartedPrayerMusic = false;

  prayerMusic.loop = true;
  prayerMusic.preload = 'auto';

  return {
    startOnce: function startOnce() {
      if (hasStartedPrayerMusic) {
        return;
      }

      hasStartedPrayerMusic = true;
      prayerMusic.play().catch(function() {
        // If playback fails unexpectedly, allow retry on next click.
        hasStartedPrayerMusic = false;
      });
    }
  };
}

function createSlideVisualController(options) {
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

function createSlideResetScheduler(resetDelayMs, onResetSlide) {
  const timersBySlide = new WeakMap();

  return {
    schedule: function schedule(slideElement) {
      const currentTimerId = timersBySlide.get(slideElement);
      if (currentTimerId) {
        clearTimeout(currentTimerId);
      }

      const nextTimerId = window.setTimeout(function() {
        onResetSlide(slideElement);
        timersBySlide.delete(slideElement);
      }, resetDelayMs);

      timersBySlide.set(slideElement, nextTimerId);
    }
  };
}

export function initIncenseExperience(options) {
  if (!window.jQuery || !hasRequiredOptions(options)) {
    return;
  }

  const jq = window.jQuery;
  const musicController = createPrayerMusicController(options.audioSrc);
  const slideVisualController = createSlideVisualController(options);
  const slideResetScheduler = createSlideResetScheduler(options.resetDelayMs, slideVisualController.reset);

  jq(options.triggerSelector).on('click', function() {
    musicController.startOnce();

    const slideElement = this.closest(options.slideSelector);
    if (!slideElement) {
      return;
    }

    slideVisualController.activate(slideElement);
    slideResetScheduler.schedule(slideElement);
  });
}
