import { PATHS } from '../../core/config/paths.js';
import { emit } from '../../core/events/event-bus.js';
import { EVENTS } from '../../core/events/event-types.js';
import { activityState } from '../../core/state/activity-state.js';
import { hideModalById, showModalById } from '../../shared/modals/modal-adapter.js';
import { showReactionImage } from '../../shared/modals/modal-img.js';
import { computeTotalPrice, lifeRescueAnimals } from './rescue-logic.js';
import { renderRescueAnimals, renderRescueQr, renderRescueSelection } from './rescue-render.js';

export function createRescueHandlers() {
  function initializeRescueAnimals() {
    renderRescueAnimals(lifeRescueAnimals);
    renderRescueSelection(lifeRescueAnimals, activityState.getState().selectedRescueAnimals);
  }

  function openRescueModal() {
    const nextSelection = [];
    activityState.update({ selectedRescueAnimals: nextSelection });
    renderRescueSelection(lifeRescueAnimals, nextSelection);
    emit(EVENTS.RESCUE_SELECTION_CHANGED, { selectedIndexes: nextSelection });
    showModalById('rescueModal');
  }

  function toggleRescueAnimal(index) {
    const clickedIndex = parseInt(index, 10);
    const selectedIndexes = activityState.getState().selectedRescueAnimals || [];

    const isAlreadySelected = selectedIndexes.includes(clickedIndex);
    const nextSelection = isAlreadySelected ? [] : [clickedIndex];

    activityState.update({ selectedRescueAnimals: nextSelection });
    renderRescueSelection(lifeRescueAnimals, nextSelection);

    emit(EVENTS.RESCUE_SELECTION_CHANGED, { selectedIndexes: nextSelection });
  }

  function proceedRescuePayment() {
    const selectedIndexes = activityState.getState().selectedRescueAnimals || [];

    if (selectedIndexes.length === 0) {
      window.alert('Vui lòng chọn một con vật để phóng sinh');
      return;
    }

    const selectedIndex = selectedIndexes[0];
    const animal = lifeRescueAnimals[selectedIndex];
    hideModalById('rescueModal');

    renderRescueQr({
      qrImage: animal.image,
      animalNames: animal.name,
      totalPrice: computeTotalPrice(selectedIndexes)
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
      selectedIndexes: activityState.getState().selectedRescueAnimals
    });
    showReactionImage(PATHS.reactionHappy);
  }

  function cancelRescue() {
    hideModalById('rescueModal');
    const nextSelection = [];
    activityState.update({ selectedRescueAnimals: nextSelection });
    renderRescueSelection(lifeRescueAnimals, nextSelection);
    emit(EVENTS.RESCUE_SELECTION_CHANGED, { selectedIndexes: nextSelection });
    emit(EVENTS.RESCUE_CANCELLED, { source: 'modal' });
    showReactionImage(PATHS.reactionSad);
  }

  function initEventListeners() {
    document.addEventListener('click', (e) => {
      const target = e.target;

      if (target.closest('.js-rescue-animal-btn')) {
        openRescueModal();
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
    initializeRescueAnimals,
    initEventListeners
  };
}
