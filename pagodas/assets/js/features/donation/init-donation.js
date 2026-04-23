import { createDonationHandlers } from './donation-handlers.js';

export function initDonation() {
  const handlers = createDonationHandlers();
  window.openDonationModal = handlers.openDonationModal;
  window.submitDonationForm = handlers.submitDonationForm;
  window.closeDonationModal = handlers.closeDonationModal;
  window.cancelDonation = handlers.cancelDonation;

  return handlers;
}
