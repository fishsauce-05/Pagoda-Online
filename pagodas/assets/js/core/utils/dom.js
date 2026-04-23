export function qs(selector, root = document) {
  return root.querySelector(selector);
}

export function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

export function removeIfExists(element) {
  if (element) {
    element.remove();
  }
}

export function appendHtml(target, html) {
  target.insertAdjacentHTML('beforeend', html);
}
