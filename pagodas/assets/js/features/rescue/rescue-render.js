import { formatPrice } from '../../core/utils/format.js';
import { appendHtml, removeIfExists } from '../../core/utils/dom.js';
import { showModalById } from '../../shared/modals/modal-adapter.js';

export function renderRescueAnimals(animals, onToggle) {
  const rescueContainer = document.getElementById('rescue-animals-list');
  if (!rescueContainer) {
    return;
  }

  rescueContainer.innerHTML = animals
    .map(
      (animal, index) => `
      <div class="col-md-4">
        <div id="rescue-animal-${index}" class="rescue-animal-card card text-center p-3 h-100">
          <div class="mb-2">
            <span class="rescue-animal-icon fs-3"><i class="fa-solid ${animal.icon}"></i></span>
          </div>
          <h5 class="card-title mb-1">${animal.name}</h5>
          <p class="card-text text-muted mb-3">${formatPrice(animal.price)}</p>
          <button id="rescue-btn-${index}" type="button" class="btn btn-sm btn-outline-primary">Chọn phóng sinh</button>
        </div>
      </div>
    `
    )
    .join('');

  animals.forEach((_, index) => {
    const button = document.getElementById(`rescue-btn-${index}`);
    if (button) {
      button.addEventListener('click', () => onToggle(index));
    }
  });
}

export function renderRescueSelection(animals, selectedIndexes) {
  animals.forEach((_, index) => {
    const card = document.getElementById(`rescue-animal-${index}`);
    const button = document.getElementById(`rescue-btn-${index}`);
    const isSelected = selectedIndexes.includes(index);

    if (card) {
      card.classList.toggle('is-selected', isSelected);
    }

    if (button) {
      button.textContent = isSelected ? 'Hủy phóng sinh' : 'Chọn phóng sinh';
      button.classList.toggle('btn-danger', isSelected);
      button.classList.toggle('btn-outline-primary', !isSelected);
    }
  });

  const totalElement = document.getElementById('rescue-total-price');
  if (totalElement) {
    const totalPrice = selectedIndexes.reduce((sum, index) => sum + animals[index].price, 0);
    totalElement.textContent = formatPrice(totalPrice);
  }
}

export function renderRescueQr({ qrImage, animalNames, totalPrice }) {
  const qrHtml = `
    <div class="modal fade" id="rescueQRModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thanh toán phóng sinh - ${animalNames}</h5>
          </div>
          <div class="modal-body text-center">
            <img src="${qrImage}" class="img-fluid rounded-3" alt="QR thanh toán" style="max-width: 100%; max-height: 400px;">
            <p class="mt-3 text-muted">Tổng tiền: <strong>${formatPrice(totalPrice)}</strong></p>
            <p class="text-muted">Quét mã QR để thanh toán</p>
          </div>
          <div class="modal-footer justify-content-center gap-3">
            <button type="button" class="btn btn-secondary" onclick="onRescueCancelled()">Thoát</button>
            <button type="button" class="btn btn-primary" onclick="completeRescuePayment()">Tôi đã chuyển khoản</button>
          </div>
        </div>
      </div>
    </div>
  `;

  removeIfExists(document.getElementById('rescueQRModal'));
  appendHtml(document.body, qrHtml);
  showModalById('rescueQRModal', { backdrop: 'static', keyboard: false });
}
