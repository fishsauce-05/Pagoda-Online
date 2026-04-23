import { removeIfExists } from '../../core/utils/dom.js';
import { showModalById } from '../../shared/modals/modal-adapter.js';

export function revealWishContent(targetId, triggerButton) {
  if (!targetId) {
    return;
  }

  const target = document.getElementById(targetId);
  if (target) {
    target.classList.remove('d-none');
  }

  if (triggerButton) {
    triggerButton.classList.add('d-none');
  }

  const suffix = targetId.replace('wish-content-', '');
  const lockAlert = document.getElementById(`wish-lock-alert-${suffix}`);
  if (lockAlert) {
    lockAlert.classList.add('d-none');
  }
}

export function resetWishAdVideo(video, skipButton) {
  if (skipButton) {
    skipButton.disabled = true;
    skipButton.textContent = 'Bỏ qua sau 5s';
  }

  if (!video) {
    return;
  }

  video.pause();
  video.removeAttribute('src');
  video.load();
  video.onloadedmetadata = null;
  video.oncanplay = null;
  video.onpause = null;
  video.onseeking = null;
  video.ontimeupdate = null;
  video.onended = null;
}

export function renderWishAdModal() {
  const modal = document.getElementById('wishAdModal');
  if (modal) {
    showModalById('wishAdModal');
  }
}

export function removeWishAdModal() {
  removeIfExists(document.getElementById('wishAdModal'));
}
