export function createSlideResetRule(resetDelayMs, onResetSlide) {
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