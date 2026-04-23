import { createPackageHandlers } from './package-handlers.js';

export function initPackage() {
  const handlers = createPackageHandlers();
  handlers.initPackageButtons();

  window.addEventListener('click', (event) => {
    if (!event.target.matches('#qr-package-paid-btn')) {
      return;
    }
    handlers.handlePackagePaid();
  });

  return handlers;
}
