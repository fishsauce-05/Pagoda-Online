export const prayPageConfig = {
  heroNavbarSync: {
    carouselSelector: '#heroCarousel',
    navbarBrandSelector: '.navbar-brand',
    titles: ['BAN THỜ ĐỨC ÔNG', 'BAN THỜ TAM BẢO', 'BAN THỜ THÁNH MẪU']
  },

  heroCarouselTrigger: {
    carouselSelector: '#heroCarousel',
    triggerSelector: '.buy-ticket-carousel-trigger'
  },
  
  incenseExperience: {
    triggerSelector: '.incense-trigger',
    slideSelector: '.hero-slide',
    incenseImageSelector: '.hero-incense',
    incenseImageClass: 'hero-incense',
    incenseImageSrc: '../assets/img/pagodas/index/lu-huong.png',
    incenseImageAlt: 'Lư hương',
    audioSrc: '../assets/audio/chu-dai-bi.mp3',
    resetDelayMs: 5 * 60 * 1000
  }
};
