import { PATHS } from '../../core/config/paths.js';
import { FLAGS } from '../../core/config/flags.js';
import { emit } from '../../core/events/event-bus.js';
import { EVENTS } from '../../core/events/event-types.js';
import { createWishAdState } from './wish-ad-logic.js';
import { revealWishContent, resetWishAdVideo } from './wish-ad-render.js';
import { hideModalById, showModalById } from '../../shared/modals/modal-adapter.js';

export function createWishAdHandlers() {
  const state = createWishAdState();

  function resetWishAdState() {
    const wishAdVideo = document.getElementById('wishAdVideo');
    const wishAdSkipBtn = document.getElementById('wishAdSkipBtn');

    state.activeTargetId = '';
    state.activeTrigger = null;
    state.closable = false;
    state.maxWatchedTime = 0;
    state.skipEnabled = false;

    resetWishAdVideo(wishAdVideo, wishAdSkipBtn);
  }

  function closeWishAdModal(unlockContent) {
    state.closable = true;

    if (unlockContent) {
      revealWishContent(state.activeTargetId, state.activeTrigger);
      emit(EVENTS.WISH_UNLOCKED, {
        targetId: state.activeTargetId
      });
    }

    hideModalById('wishAdModal');
  }

  function openWishAdModal(videoPath, targetId, triggerButton) {
    const wishAdVideo = document.getElementById('wishAdVideo');
    const wishAdSkipBtn = document.getElementById('wishAdSkipBtn');
    const wishAdModalElement = document.getElementById('wishAdModal');

    if (!wishAdVideo || !wishAdSkipBtn || !wishAdModalElement) {
      return;
    }

    state.activeTargetId = targetId;
    state.activeTrigger = triggerButton;
    state.closable = false;
    state.maxWatchedTime = 0;
    state.skipEnabled = false;

    emit(EVENTS.WISH_AD_STARTED, {
      targetId,
      videoPath
    });

    wishAdSkipBtn.disabled = true;
    wishAdSkipBtn.textContent = `Bỏ qua sau ${FLAGS.wishAdSkipSeconds}s`;

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
      if (!state.closable) {
        const playPromise = wishAdVideo.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      }
    };
    wishAdVideo.onseeking = () => {
      if (wishAdVideo.currentTime > state.maxWatchedTime + 0.25) {
        wishAdVideo.currentTime = state.maxWatchedTime;
      }
    };
    wishAdVideo.ontimeupdate = () => {
      if (wishAdVideo.currentTime > state.maxWatchedTime) {
        state.maxWatchedTime = wishAdVideo.currentTime;
      }

      if (!state.skipEnabled && wishAdVideo.currentTime >= FLAGS.wishAdSkipSeconds) {
        state.skipEnabled = true;
        wishAdSkipBtn.disabled = false;
      }
    };
    wishAdVideo.onended = () => {
      closeWishAdModal(true);
    };

    wishAdModalElement.addEventListener('hidden.bs.modal', resetWishAdState, { once: true });
    showModalById('wishAdModal');
  }

  function initWishAdButtons() {
    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('.js-wish-ad-btn');
      if (!trigger) {
        return;
      }

      event.preventDefault();
      const targetId = trigger.dataset.wishTarget || '';
      const videoPath = trigger.dataset.wishVideo || '';
      if (!targetId || !videoPath) {
        return;
      }

      openWishAdModal(videoPath, targetId, trigger);
    });

    document.addEventListener('click', (event) => {
      if (!event.target.matches('#wishAdSkipBtn')) {
        return;
      }
      if (!state.skipEnabled) {
        return;
      }
      closeWishAdModal(true);
    });
  }

  return {
    initWishAdButtons,
    openWishAdModal,
    closeWishAdModal,
    resetWishAdState,
    revealWishContent
  };
}
