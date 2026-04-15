/**
* Template Name: Medicio
* Template URL: https://bootstrapmade.com/medicio-free-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');
  let scrollTopProgressPath = document.querySelector('.gh-scroll-top-progress path');
  let scrollTopPathLength = 0;

  if (scrollTopProgressPath) {
    scrollTopPathLength = scrollTopProgressPath.getTotalLength();
    scrollTopProgressPath.style.strokeDasharray = `${scrollTopPathLength} ${scrollTopPathLength}`;
    scrollTopProgressPath.style.strokeDashoffset = `${scrollTopPathLength}`;
  }

  function toggleScrollTop() {
    if (scrollTop) {
      const isActive = window.scrollY > 100;
      scrollTop.classList.toggle('active', isActive);
      scrollTop.classList.toggle('is-active', isActive);
    }

    if (scrollTopProgressPath) {
      const scrollTopValue = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? scrollTopValue / scrollHeight : 0;
      const dashOffset = scrollTopPathLength * (1 - progress);
      scrollTopProgressPath.style.strokeDashoffset = `${dashOffset}`;
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);
  window.addEventListener('resize', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      new Swiper(swiperElement, config);
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Pricing package QR render
   */
  const packageButtons = document.querySelectorAll('.js-package-btn');

  function getPackageQRElements() {
    const qrModalElement = document.querySelector('#qr-package-modal');
    const qrTitle = document.querySelector('#qr-package-title');
    const qrImage = document.querySelector('#qr-package-image');
    const qrMessage = document.querySelector('#qr-package-message');
    const qrPaidButton = document.querySelector('#qr-package-paid-btn');
    const qrModal = qrModalElement ? bootstrap.Modal.getOrCreateInstance(qrModalElement) : null;

    return {
      qrModalElement,
      qrTitle,
      qrImage,
      qrMessage,
      qrPaidButton,
      qrModal
    };
  }

  let selectedPackageLabel = 'Gói lễ';
  let selectedStartLink = '#';

  function showSuccessModal(isFreeFlow) {
    const successModalElement = document.querySelector('#package-success-modal');
    const successMessage = document.querySelector('#package-success-message');
    const startLink = document.querySelector('#package-start-link');

    if (!successModalElement) {
      return;
    }

    const successModal = new bootstrap.Modal(successModalElement);

    if (!successModal || !successMessage || !startLink) {
      return;
    }

    successMessage.textContent = isFreeFlow
      ? `${selectedPackageLabel} đã sẵn sàng. Bắt đầu vào lễ thôi.`
      : `${selectedPackageLabel} đã thanh toán thành công. Bắt đầu vào lễ thôi.`;
    startLink.setAttribute('href', selectedStartLink);
    successModal.show();
  }

  if (packageButtons.length) {
    packageButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();

        const { qrTitle, qrImage, qrMessage, qrPaidButton, qrModal } = getPackageQRElements();
        if (!qrModal || !qrTitle || !qrImage || !qrMessage) {
          return;
        }

        const packageType = button.dataset.package || '';
        const packageLabel = button.dataset.packageLabel || 'Gói lễ';
        const qrImagePath = button.dataset.qrImage || '';
        const packageStartLink = button.dataset.startLink || '#';

        selectedPackageLabel = packageLabel;
        selectedStartLink = packageStartLink;

        if (qrImagePath) {
          qrImage.src = qrImagePath;
          qrImage.classList.remove('d-none');
          qrTitle.textContent = `Mã QR - ${packageLabel}`;
          qrMessage.textContent = 'Quét mã QR để chuyển khoản đúng gói bạn đã chọn.';
          if (qrPaidButton) {
            qrPaidButton.classList.remove('d-none');
          }
        } else {
          qrImage.removeAttribute('src');
          qrImage.classList.add('d-none');
          qrTitle.textContent = `${packageLabel}`;
          qrMessage.textContent = 'Gói Free không cần thanh toán. Bạn có thể bắt đầu vào lễ ngay.';
          if (qrPaidButton) {
            qrPaidButton.classList.add('d-none');
          }
        }

        qrModal.show();

        if (packageType === 'free') {
          qrModal.hide();
          showSuccessModal(true);
        }
      });
    });
  }

  document.addEventListener('click', (event) => {
    if (!event.target.matches('#qr-package-paid-btn')) return;

    const { qrModal } = getPackageQRElements();
    if (qrModal) {
      qrModal.hide();
    }
    showSuccessModal(false);
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Wish section ad gate
   */
  let wishAdActiveTargetId = '';
  let wishAdActiveTrigger = null;
  let wishAdClosable = false;
  let wishAdMaxWatchedTime = 0;
  let wishAdSkipEnabled = false;

  function getWishAdElements() {
    const wishAdModalElement = document.querySelector('#wishAdModal');
    const wishAdVideo = document.querySelector('#wishAdVideo');
    const wishAdSkipBtn = document.querySelector('#wishAdSkipBtn');
    const wishAdModal = wishAdModalElement ? bootstrap.Modal.getOrCreateInstance(wishAdModalElement) : null;

    return {
      wishAdModalElement,
      wishAdVideo,
      wishAdSkipBtn,
      wishAdModal
    };
  }

  function resetWishAdState() {
    const { wishAdVideo, wishAdSkipBtn } = getWishAdElements();

    wishAdActiveTargetId = '';
    wishAdActiveTrigger = null;
    wishAdClosable = false;
    wishAdMaxWatchedTime = 0;
    wishAdSkipEnabled = false;

    if (wishAdSkipBtn) {
      wishAdSkipBtn.disabled = true;
      wishAdSkipBtn.textContent = 'Bỏ qua sau 5s';
    }

    if (wishAdVideo) {
      wishAdVideo.pause();
      wishAdVideo.removeAttribute('src');
      wishAdVideo.load();
      wishAdVideo.onloadedmetadata = null;
      wishAdVideo.oncanplay = null;
      wishAdVideo.onpause = null;
      wishAdVideo.onseeking = null;
      wishAdVideo.ontimeupdate = null;
      wishAdVideo.onended = null;
    }
  }

  function revealWishContent() {
    if (!wishAdActiveTargetId) return;

    const target = document.getElementById(wishAdActiveTargetId);
    if (target) {
      target.classList.remove('d-none');
    }

    if (wishAdActiveTrigger) {
      wishAdActiveTrigger.classList.add('d-none');
    }

    const suffix = wishAdActiveTargetId.replace('wish-content-', '');
    const lockAlertId = `wish-lock-alert-${suffix}`;
    const lockAlert = document.getElementById(lockAlertId);
    if (lockAlert) {
      lockAlert.classList.add('d-none');
    }
  }

  function closeWishAdModal(unlockContent) {
    const { wishAdModal } = getWishAdElements();
    wishAdClosable = true;

    if (unlockContent) {
      revealWishContent();
    }

    if (wishAdModal) {
      wishAdModal.hide();
    }
  }

  function openWishAdModal(videoPath, targetId, triggerButton) {
    const { wishAdModalElement, wishAdVideo, wishAdSkipBtn, wishAdModal } = getWishAdElements();

    if (!wishAdModalElement || !wishAdVideo || !wishAdSkipBtn || !wishAdModal) {
      return;
    }

    wishAdActiveTargetId = targetId;
    wishAdActiveTrigger = triggerButton;
    wishAdClosable = false;
    wishAdMaxWatchedTime = 0;
    wishAdSkipEnabled = false;

    wishAdSkipBtn.disabled = true;
    wishAdSkipBtn.textContent = 'Bỏ qua sau 5s';

    wishAdVideo.controls = false;
    wishAdVideo.setAttribute('playsinline', 'playsinline');
    wishAdVideo.removeAttribute('controls');
    wishAdVideo.currentTime = 0;
    wishAdVideo.src = videoPath;

    const startPlayback = () => {
      const playPromise = wishAdVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    };

    wishAdVideo.onloadedmetadata = startPlayback;
    wishAdVideo.oncanplay = startPlayback;

    wishAdVideo.onpause = () => {
      if (!wishAdClosable) {
        const playPromise = wishAdVideo.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      }
    };

    wishAdVideo.onseeking = () => {
      if (wishAdVideo.currentTime > wishAdMaxWatchedTime + 0.25) {
        wishAdVideo.currentTime = wishAdMaxWatchedTime;
      }
    };

    wishAdVideo.ontimeupdate = () => {
      if (wishAdVideo.currentTime > wishAdMaxWatchedTime) {
        wishAdMaxWatchedTime = wishAdVideo.currentTime;
      }

      if (!wishAdSkipEnabled && wishAdVideo.currentTime >= 5) {
        wishAdSkipEnabled = true;
        wishAdSkipBtn.disabled = false;
      }
    };

    wishAdVideo.onended = () => {
      closeWishAdModal(true);
    };

    wishAdModalElement.addEventListener('hidden.bs.modal', resetWishAdState, { once: true });
    wishAdModal.show();
  }

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('.js-wish-ad-btn');
    if (!trigger) return;

    event.preventDefault();

    const targetId = trigger.dataset.wishTarget || '';
    const videoPath = trigger.dataset.wishVideo || '';

    if (!targetId || !videoPath) {
      return;
    }

    openWishAdModal(videoPath, targetId, trigger);
  });

  document.addEventListener('click', (event) => {
    if (!event.target.matches('#wishAdSkipBtn')) return;
    if (!wishAdSkipEnabled) return;
    closeWishAdModal(true);
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();