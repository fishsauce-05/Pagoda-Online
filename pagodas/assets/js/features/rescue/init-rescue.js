import { createRescueHandlers } from './rescue-handlers.js';

export function initRescue() {
  const handlers = createRescueHandlers();
  handlers.initEventListeners();

  return handlers;
}
