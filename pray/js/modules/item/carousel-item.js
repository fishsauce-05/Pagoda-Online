import { getDomReader } from './data-config.js';
import { dataConfig } from './data-config.js';


function render(domReader, dataConfig) {
  return `
  <div class="hero-slide">
    <img src="${domReader.imageSrc}" class="hero-image" alt="${domReader.imageAlt}">
  </div>
  <div class="hero-slide-overlay"></div>
  <div class="container d-flex justify-content-center align-items-center h-100 position-relative hero-copy-wrap">
    <div class="row w-100">
      <div class="col-12 mt-auto mb-5 text-center hero-copy">
        <h1 class="text-white mb-5">${domReader.title}</h1>
        <p class="text-white mb-5 hero-description">${domReader.description}</p>

        <button type="button" class="btn custom-btn incense-trigger">${dataConfig.buttonText}</button>
      </div>

      <div class="col-lg-12 col-12 mt-auto d-flex flex-column flex-lg-row text-center hero-meta">
        <div class="date-wrap">
          <h5 class="text-white">
            <i class="custom-icon ${dataConfig.timeIcon} me-2"></i>
            ${dataConfig.time}
          </h5>
        </div>

        <div class="location-wrap mx-auto py-3 py-lg-0">
          <h5 class="text-white">
            <i class="custom-icon ${dataConfig.locationIcon} me-2"></i>
            ${dataConfig.location}
          </h5>
        </div>

        <div class="social-share">
          <ul class="social-icon d-flex align-items-center justify-content-center">
            <li class="text-white me-3 list-unstyled">Share:</li>

            <li class="social-icon-item">
              <a href="${dataConfig.facebookLink}" class="social-icon-link" target="_blank">
                <span class="${dataConfig.facebookIcon}"></span>
              </a>
            </li>

            <li class="social-icon-item">
              <a href="${dataConfig.instagramLink}" class="social-icon-link" target="_blank">
                <span class="${dataConfig.instagramIcon}"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  `;
}

export function renderCarouselItem() {
  document.querySelectorAll('.carousel-item').forEach(el => {
    const domReader = getDomReader(el);
    el.insertAdjacentHTML('beforeend', render(domReader, dataConfig));
  });
}