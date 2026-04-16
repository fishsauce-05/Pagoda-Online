export function initBackgroundMusic(options) {
    const backgroundMusic = document.getElementById(options.audioId);
    const startMusicBtn = document.getElementById(options.startButtonId);

    if (!backgroundMusic || !startMusicBtn) {
        return;
    }

    const startMusic = function startMusic() {
        backgroundMusic.volume = options.volume;
        backgroundMusic.play().catch(function() {
            console.log("Web ngu");
        });
    };

    startMusicBtn.addEventListener("click", function() {
        startMusic();
    });
}
