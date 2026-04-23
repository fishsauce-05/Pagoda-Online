import { createRescueHandlers } from './rescue-handlers.js';

export function initRescue() {
  const handlers = createRescueHandlers();

  handlers.initializeRescueAnimals();
  handlers.initEventListeners();

  return handlers;
}
