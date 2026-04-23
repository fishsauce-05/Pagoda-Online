import { PATHS } from '../../core/config/paths.js';
import { emit } from '../../core/events/event-bus.js';
import { EVENTS } from '../../core/events/event-types.js';
import { hideModalById, showModalById } from '../../shared/modals/modal-adapter.js';
import { showReactionImage } from '../../shared/modals/modal-img.js';
import { validateDonationFormData } from './donation-logic.js';
import { resetDonationForm } from './donation-render.js';

function getDonationPayload() {
  return {
    name: document.getElementById('donation-name')?.value.trim(),
    amount: document.getElementById('donation-amount')?.value.trim(),
    address: document.getElementById('donation-address')?.value.trim(),
    message: document.getElementById('donation-message')?.value.trim()
  };
}

export function createDonationHandlers() {
  function openDonationModal() {
    showModalById('donationModal');
  }

  function closeDonationModal() {
    hideModalById('donationModal');
    resetDonationForm();
  }

  function submitDonationForm() {
    const payload = getDonationPayload();
    if (!validateDonationFormData(payload)) {
      showReactionImage(PATHS.reminder);
      return;
    }

    closeDonationModal();
    emit(EVENTS.DONATION_SUBMITTED, payload);
    showReactionImage(PATHS.reactionHappy);
  }

  function cancelDonation() {
    closeDonationModal();
    emit(EVENTS.DONATION_CANCELLED);
    showReactionImage(PATHS.reactionSad);
  }

  return {
    openDonationModal,
    submitDonationForm,
    closeDonationModal,
    cancelDonation,
  };
}
