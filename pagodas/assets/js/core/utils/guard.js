export function isFunction(value) {
  return typeof value === 'function';
}

export function exists(value) {
  return value !== null && value !== undefined;
}
