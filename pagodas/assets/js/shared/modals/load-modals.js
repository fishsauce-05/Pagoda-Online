import { SELECTORS } from '../../core/config/selectors.js';
import { emit } from '../../core/events/event-bus.js';
import { EVENTS } from '../../core/events/event-types.js';
import { isFunction } from '../../core/utils/guard.js';

export async function loadModals(modalPaths, onLoaded) {
  const container = document.querySelector(SELECTORS.modalsContainer);
  if (!container || !Array.isArray(modalPaths) || modalPaths.length === 0) {
    if (isFunction(onLoaded)) {
      onLoaded();
    }
    return;
  }

  const responses = await Promise.all(
    modalPaths.map((modalPath) =>
      fetch(modalPath)
        .then((response) => response.text())
        .catch((error) => {
          console.error('Error loading modal:', modalPath, error);
          return '';
        })
    )
  );

  responses.forEach((html) => {
    if (!html) {
      return;
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    Array.from(tempDiv.children).forEach((child) => {
      container.appendChild(child);
    });
  });

  emit(EVENTS.MODALS_LOADED, {
    loadedCount: responses.filter(Boolean).length,
    requestedCount: modalPaths.length,
    modalPaths
  });

  if (isFunction(onLoaded)) {
    onLoaded();
  }
}
