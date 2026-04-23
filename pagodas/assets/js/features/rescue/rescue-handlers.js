import { PATHS } from '../../core/config/paths.js';
import { emit } from '../../core/events/event-bus.js';
import { EVENTS } from '../../core/events/event-types.js';
import { activityState } from '../../core/state/activity-state.js';
import { hideModalById, showModalById } from '../../shared/modals/modal-adapter.js';
import { showReactionImage } from '../../shared/modals/modal-img.js';
import { getPrice, lifeRescueAnimals } from './rescue-logic.js';
import { renderRescueAnimals, renderRescueQr, renderRescueSelection } from './rescue-render.js';

export function createRescueHandlers() {

  function openRescueModal() {
    const nextSelectedIndex = -1;
    activityState.update({ selectedRescueIndex: nextSelectedIndex });

    renderRescueAnimals(lifeRescueAnimals);
    renderRescueSelection(lifeRescueAnimals, nextSelectedIndex);
    emit(EVENTS.RESCUE_SELECTION_CHANGED, { selectedIndex: nextSelectedIndex });
    showModalById('rescueModal');
  }

  function toggleRescueAnimal(index) {
    const clickedIndex = parseInt(index, 10);
    const currentSelectedIndex = activityState.getState().selectedRescueIndex;

    const nextSelectedIndex = currentSelectedIndex === clickedIndex ? -1 : clickedIndex;

    activityState.update({ selectedRescueIndex: nextSelectedIndex });
    renderRescueSelection(lifeRescueAnimals, nextSelectedIndex);

    emit(EVENTS.RESCUE_SELECTION_CHANGED, { selectedIndex: nextSelectedIndex });
  }

  function proceedRescuePayment() {
    const selectedIndex = activityState.getState().selectedRescueIndex;

    if (selectedIndex < 0) {
      window.alert('Vui lòng chọn một con vật để phóng sinh');
      return;
    }

    const animal = lifeRescueAnimals[selectedIndex];
    hideModalById('rescueModal');

    renderRescueQr({
      qrImage: animal.image,
      animalNames: animal.name,
      totalPrice: getPrice(selectedIndex)
    });
  }

  function onRescueCancelled() {
    hideModalById('rescueQRModal');
    emit(EVENTS.RESCUE_CANCELLED, { source: 'qr' });
    showReactionImage(PATHS.reactionSad);
  }

  function completeRescuePayment() {
    hideModalById('rescueQRModal');
    emit(EVENTS.RESCUE_PAYMENT_COMPLETED, {
      selectedIndex: activityState.getState().selectedRescueIndex
    });
    showReactionImage(PATHS.reactionHappy);
  }

  function cancelRescue() {
    hideModalById('rescueModal');
    const nextSelectedIndex = -1;
    activityState.update({ selectedRescueIndex: nextSelectedIndex });
    renderRescueSelection(lifeRescueAnimals, nextSelectedIndex);
    emit(EVENTS.RESCUE_SELECTION_CHANGED, { selectedIndex: nextSelectedIndex });
    emit(EVENTS.RESCUE_CANCELLED, { source: 'modal' });
    showReactionImage(PATHS.reactionSad);
  }

  function initEventListeners() {
    document.addEventListener('click', (e) => {
      const target = e.target;

      if (target.closest('.js-rescue-animal-btn')) {
        openRescueModal();
        e.preventDefault();
        return;
      }

      //Sử dụng js-rescue-animal-item và data-index
      const animalItem = target.closest('.js-rescue-animal-item');
      if (animalItem) {
        const index = parseInt(animalItem.dataset.index, 10);
        toggleRescueAnimal(index);
        return;
      }

      if (target.closest('.js-rescue-proceed-btn')) {
        proceedRescuePayment();
        return;
      }

      if (target.closest('.js-rescue-cancel-btn')) {
        cancelRescue();
        return;
      }

      if (target.closest('.js-rescue-qr-cancel-btn')) {
        onRescueCancelled();
        return;
      }

      if (target.closest('.js-rescue-qr-complete-btn')) {
        completeRescuePayment();
        return;
      }

    });
  }
  return {
    initEventListeners
  };
}
