const listenersByType = new Map();

export { EVENTS, EVENTS_TYPES, EVENT_TYPES } from './event-types.js';

export function on(type, handler) {
  if (!listenersByType.has(type)) {
    listenersByType.set(type, new Set());
  }
  listenersByType.get(type).add(handler);

  return function off() {
    listenersByType.get(type).delete(handler);
  };
}

export function emit(type, payload) {
  const listeners = listenersByType.get(type);
  if (!listeners) {
    return;
  }

  listeners.forEach((handler) => {
    handler(payload);
  });
}
