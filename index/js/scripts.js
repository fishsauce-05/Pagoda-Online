/*!
* Start Bootstrap - One Page Wonder v6.0.6 (https://startbootstrap.com/theme/one-page-wonder)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-one-page-wonder/blob/master/LICENSE)
*/
window.addEventListener("DOMContentLoaded", () => {
	const scrollTopBtn = document.querySelector(".gh-scroll-top-btn");
	const progressPath = document.querySelector(".gh-scroll-top-progress path");
	const backgroundMusic = document.getElementById("background-music");
	const startMusicBtn = document.getElementById("start-music-btn");

	if (!scrollTopBtn || !progressPath) {
		return;
	}

	const startMusic = () => {
		if (!backgroundMusic) {
			return;
		}

		backgroundMusic.volume = 0.25;
		backgroundMusic.play().catch(() => {
			// Browsers may still block playback until a user gesture occurs.
		});
	};

	if (backgroundMusic) {
		if (startMusicBtn) {
			startMusicBtn.addEventListener("click", () => {
				startMusic();
			});
		}

		if (backgroundMusic.paused) {
			const resumeMusic = () => {
				startMusic();
				document.removeEventListener("click", resumeMusic);
				document.removeEventListener("keydown", resumeMusic);
				document.removeEventListener("touchstart", resumeMusic);
			};

			document.addEventListener("click", resumeMusic, { once: true });
			document.addEventListener("keydown", resumeMusic, { once: true });
			document.addEventListener("touchstart", resumeMusic, { once: true });
		}
	}

	const pathLength = progressPath.getTotalLength();
	progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
	progressPath.style.strokeDashoffset = `${pathLength}`;

	const updateProgress = () => {
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
		const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
		const dashOffset = pathLength * (1 - progress);

		progressPath.style.strokeDashoffset = `${dashOffset}`;
		scrollTopBtn.classList.toggle("is-active", scrollTop > 120);
	};

	window.addEventListener("scroll", updateProgress, { passive: true });
	window.addEventListener("resize", updateProgress);

	scrollTopBtn.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});

	updateProgress();
});