export function initHeroNavbarSync(options) {
    const carouselElement = document.querySelector(options.carouselSelector);
    const navbarBrand = document.querySelector(options.navbarBrandSelector);
    const templeTitles = options.titles || [];

    function syncNavbarBrand(index) {
        if (!navbarBrand) {
            return;
        }

        let targetIndex = index;

        if (typeof targetIndex !== 'number') {
            if (!carouselElement) {
                targetIndex = 0;
            } else {
                const activeSlide = carouselElement.querySelector('.carousel-item.active');
                const slides = carouselElement.querySelectorAll('.carousel-item');

                if (!activeSlide || !slides.length) {
                    targetIndex = 0;
                } else {
                    targetIndex = Array.prototype.indexOf.call(slides, activeSlide);
                }
            }
        }

        navbarBrand.textContent = templeTitles[targetIndex] || templeTitles[0] || '';
    }

    syncNavbarBrand();

    if (carouselElement) {
        carouselElement.addEventListener('slid.bs.carousel', function(event) {
            syncNavbarBrand(event.to);
        });
    }
}
