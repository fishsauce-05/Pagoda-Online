import { hasRequiredOptions } from './validation.js';
import { createPrayerMusicController } from './music-controller.js';
import { createSlideVisualController } from './slide-visual-controller.js';
import { createSlideResetRule } from './slide-reset-rule.js';

export function initIncenseExperience(options) {
  if (!window.jQuery || !hasRequiredOptions(options)) {
    return;
  }

  const jq = window.jQuery;
  const musicController = createPrayerMusicController(options.audioSrc);
  const slideVisualController = createSlideVisualController(options);
  const slideResetScheduler = createSlideResetRule(options.resetDelayMs, slideVisualController.reset);

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