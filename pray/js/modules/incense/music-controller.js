export function createPrayerMusicController(audioSrc) {
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