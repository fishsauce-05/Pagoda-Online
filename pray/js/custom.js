
  (function ($) {
  
  "use strict";

    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });
    
    // HERO NAVBAR TITLE SYNC
    var carouselElement = document.querySelector('#heroCarousel');
    var navbarBrand = document.querySelector('.navbar-brand');
    var templeTitles = ['BAN THỜ ĐỨC ÔNG', 'BAN THỜ TAM BẢO', 'BAN THỜ THÁNH MẪU'];

    function updateNavbarBrandByIndex(index) {
      if (!navbarBrand || typeof index !== 'number') {
        return;
      }

      navbarBrand.textContent = templeTitles[index] || templeTitles[0];
    }

    function getActiveSlideIndex() {
      if (!carouselElement) {
        return 0;
      }

      var activeSlide = carouselElement.querySelector('.carousel-item.active');
      var slides = carouselElement.querySelectorAll('.carousel-item');

      if (!activeSlide || !slides.length) {
        return 0;
      }

      return Array.prototype.indexOf.call(slides, activeSlide);
    }

    updateNavbarBrandByIndex(getActiveSlideIndex());

    if (carouselElement) {
      carouselElement.addEventListener('slid.bs.carousel', function (event) {
        updateNavbarBrandByIndex(event.to);
      });
    }

    var incenseResetTimers = new WeakMap();
    var INCENSE_RESET_DELAY_MS = 5 * 60 * 1000;
    var prayerMusic = new Audio('../assets/audio/chu-dai-bi.mp3');
    var hasStartedPrayerMusic = false;

    prayerMusic.loop = true;
    prayerMusic.preload = 'auto';

    function startPrayerMusicOnce() {
      if (hasStartedPrayerMusic) {
        return;
      }

      hasStartedPrayerMusic = true;
      prayerMusic.play().catch(function () {
        // If playback fails unexpectedly, allow retry on next click.
        hasStartedPrayerMusic = false;
      });
    }

    function resetSlideToDefault(slideElement) {
      slideElement.classList.remove('is-incense-active');

      var incenseImage = slideElement.querySelector('.hero-incense');
      if (incenseImage) {
        incenseImage.remove();
      }
    }
    
    // HERO CAROUSEL TRIGGER
    $('.buy-ticket-carousel-trigger').on('click', function (event) {
      event.preventDefault();

      if (!carouselElement || !window.bootstrap || !window.bootstrap.Carousel) {
        return;
      }

      var carouselInstance = window.bootstrap.Carousel.getOrCreateInstance(carouselElement, {
        interval: false,
        ride: false,
        touch: false,
        pause: false
      });

      carouselInstance.next();
    });

    // INCENSE TRIGGER PER SLIDE
    $('.incense-trigger').on('click', function () {
      startPrayerMusicOnce();

      var slideElement = this.closest('.hero-slide');

      if (!slideElement) {
        return;
      }

      slideElement.classList.add('is-incense-active');

      if (!slideElement.querySelector('.hero-incense')) {
        var incenseImage = document.createElement('img');
        incenseImage.src = '../assets/img/pagodas/index/lu-huong.png';
        incenseImage.alt = 'Lư hương';
        incenseImage.className = 'hero-incense';

        slideElement.appendChild(incenseImage);
      }

      var currentTimerId = incenseResetTimers.get(slideElement);
      if (currentTimerId) {
        clearTimeout(currentTimerId);
      }

      var nextTimerId = window.setTimeout(function () {
        resetSlideToDefault(slideElement);
        incenseResetTimers.delete(slideElement);
      }, INCENSE_RESET_DELAY_MS);

      incenseResetTimers.set(slideElement, nextTimerId);
    });
  
  })(window.jQuery);


