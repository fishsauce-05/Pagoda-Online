import { appendHtml, removeIfExists } from '../../core/utils/dom.js';

export function showReactionImage(imagePath) {
  const reactionHtml = `
    <div class="modal fade" id="reactionImageModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-body p-2 p-md-3 text-center">
            <img src="${imagePath}" class="img-fluid rounded-3" alt="Reply" style="max-width: 100%; max-height: 70vh; object-fit: cover;">
          </div>
        </div>
      </div>
    </div>
  `;

  removeIfExists(document.getElementById('reactionImageModal'));
  appendHtml(document.body, reactionHtml);

  if (!window.bootstrap || !window.bootstrap.Modal) {
    return;
  }

  const reactionElement = document.getElementById('reactionImageModal');
  const modal = new window.bootstrap.Modal(reactionElement);
  modal.show();

  window.setTimeout(() => {
    const activeModal = window.bootstrap.Modal.getInstance(reactionElement);
    if (activeModal) {
      activeModal.hide();
    }
  }, 2500);
}