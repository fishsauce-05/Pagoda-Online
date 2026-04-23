import { createWishAdHandlers } from './wish-ad-handlers.js';

export function initWishAd() {
  const handlers = createWishAdHandlers();
  handlers.initWishAdButtons();
  return handlers;
}
