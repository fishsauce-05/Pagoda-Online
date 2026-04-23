import { createDonationHandlers } from './donation-handlers.js';

export function initDonation() {
  const handlers = createDonationHandlers();
  handlers.initEventListeners();

  return handlers;
}
