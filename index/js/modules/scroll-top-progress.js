window.IndexApp = window.IndexApp || {};

window.IndexApp.initScrollTopProgress = function initScrollTopProgress(options) {
    const scrollTopBtn = document.querySelector(options.buttonSelector);
    const progressPath = document.querySelector(options.pathSelector);

    if (!scrollTopBtn || !progressPath) {
        return;
    }

    const pathLength = progressPath.getTotalLength();
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = String(pathLength);

    const updateProgress = function updateProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
        const dashOffset = pathLength * (1 - progress);

        progressPath.style.strokeDashoffset = String(dashOffset);
        scrollTopBtn.classList.toggle("is-active", scrollTop > options.showAfter);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    scrollTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    updateProgress();
};
