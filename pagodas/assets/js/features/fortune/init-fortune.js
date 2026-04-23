import { createFortuneHandlers } from './fortune-handlers.js';

export function initFortune() {
  const handlers = createFortuneHandlers();
  handlers.initEventListeners();

  return handlers;
}
