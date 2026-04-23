import { createRescueHandlers } from './rescue-handlers.js';

export function initRescue() {
  const handlers = createRescueHandlers();

  window.initializeRescueAnimals = handlers.initializeRescueAnimals;
  window.openRescueModal = handlers.openRescueModal;
  window.toggleRescueAnimal = handlers.toggleRescueAnimal;
  window.proceedRescuePayment = handlers.proceedRescuePayment;
  window.onRescueCancelled = handlers.onRescueCancelled;
  window.completeRescuePayment = handlers.completeRescuePayment;
  window.cancelRescue = handlers.cancelRescue;

  return handlers;
}
