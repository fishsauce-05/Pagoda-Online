export function getModalInstanceById(id) {
  const element = document.getElementById(id);
  if (!element || !window.bootstrap || !window.bootstrap.Modal) {
    return null;
  }
  return window.bootstrap.Modal.getOrCreateInstance(element);
}

export function hideModalById(id) {
  const element = document.getElementById(id);
  if (!element || !window.bootstrap || !window.bootstrap.Modal) {
    return;
  }
  const modal = window.bootstrap.Modal.getInstance(element);
  if (modal) {
    modal.hide();
  }
}

export function showModalById(id, options) {
  const element = document.getElementById(id);
  if (!element || !window.bootstrap || !window.bootstrap.Modal) {
    return null;
  }
  const modal = new window.bootstrap.Modal(element, options || {});
  modal.show();
  return modal;
}
