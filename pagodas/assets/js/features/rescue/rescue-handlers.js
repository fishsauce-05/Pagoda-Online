import { PATHS } from '../../core/config/paths.js';
import { emit } from '../../core/events/event-bus.js';
import { EVENTS } from '../../core/events/event-types.js';
import { activityState } from '../../core/state/activity-state.js';
import { hideModalById, showModalById } from '../../shared/modals/modal-adapter.js';
import { showReactionImage } from '../../shared/modals/modal-img.js';
import { computeTotalPrice, getSingleSelectedIndex, lifeRescueAnimals } from './rescue-logic.js';
import { renderRescueAnimals, renderRescueQr, renderRescueSelection } from './rescue-render.js';

export function createRescueHandlers() {
  function initializeRescueAnimals() {
    renderRescueAnimals(lifeRescueAnimals, toggleRescueAnimal);
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
    const selected = activityState.getState().selectedRescueAnimals;
    const nextSelection = selected.includes(index) ? [] : [index];
    activityState.update({ selectedRescueAnimals: nextSelection });
    renderRescueSelection(lifeRescueAnimals, nextSelection);
    emit(EVENTS.RESCUE_SELECTION_CHANGED, { selectedIndexes: nextSelection });
  }

  function proceedRescuePayment() {
    const selectedIndexes = activityState.getState().selectedRescueAnimals;
    if (selectedIndexes.length === 0) {
      window.alert('Vui lòng chọn ít nhất một loại động vật để phóng sinh');
      return;
    }

    hideModalById('rescueModal');
    const selectedIndex = getSingleSelectedIndex(selectedIndexes);
    renderRescueQr({
      qrImage: lifeRescueAnimals[selectedIndex].image,
      animalNames: selectedIndexes.map((i) => lifeRescueAnimals[i].name).join(', '),
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

  return {
    initializeRescueAnimals,
    openRescueModal,
    toggleRescueAnimal,
    proceedRescuePayment,
    onRescueCancelled,
    completeRescuePayment,
    cancelRescue
  };
}
