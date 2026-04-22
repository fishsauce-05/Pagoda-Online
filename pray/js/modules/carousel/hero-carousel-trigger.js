export function initHeroCarouselTrigger(options) {
    if (!window.jQuery) {
        return;
    }

    const carouselElement = document.querySelector(options.carouselSelector);

    window.jQuery(options.triggerSelector).on('click', function(event) {
        event.preventDefault();

        if (!carouselElement || !window.bootstrap || !window.bootstrap.Carousel) {
            return;
        }

        const carouselInstance = window.bootstrap.Carousel.getOrCreateInstance(carouselElement, {
            interval: false,
            ride: false,
            touch: false,
            pause: false
        });

        carouselInstance.next();
    });
}