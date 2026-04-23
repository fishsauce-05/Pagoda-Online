import { createFortuneHandlers } from './fortune-handlers.js';

export function initFortune() {
  const handlers = createFortuneHandlers();

  window.openFortuneModal = handlers.openFortuneModal;
  window.selectFortuneQuestion = handlers.selectFortuneQuestion;
  window.proceedFortunePayment = handlers.proceedFortunePayment;
  window.completeFortunePayment = handlers.completeFortunePayment;

  return handlers;
}
