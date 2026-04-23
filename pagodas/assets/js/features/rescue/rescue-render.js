import { formatPrice } from '../../core/utils/format.js';
import { appendHtml, removeIfExists } from '../../core/utils/dom.js';
import { showModalById } from '../../shared/modals/modal-adapter.js';

export function renderRescueAnimals(animals) {
  const rescueContainer = document.getElementById('rescue-animals-list');
  if (!rescueContainer) return;

  rescueContainer.innerHTML = animals
    .map(
      (animal, index) => `
      <div class="col-md-4">
        <div class="rescue-animal-card card text-center p-3 h-100 js-rescue-animal-item" data-index="${index}">
          <div class="mb-2">
            <span class="rescue-animal-icon fs-3"><i class="fa-solid ${animal.icon}"></i></span>
          </div>
          <h5 class="card-title mb-1">${animal.name}</h5>
          <p class="card-text text-muted mb-3">${formatPrice(animal.price)}</p>
          
          <button type="button" class="btn btn-sm btn-outline-primary js-rescue-btn-label">
            Chọn phóng sinh
          </button>
        </div>
      </div>
    `
    )
    .join('');
}

export function renderRescueSelection(animals, selectedIndexes) {
  const container = document.getElementById('rescue-animals-list');
  if (!container) return;

  animals.forEach((_, index) => {
    const card = container.querySelector(`.js-rescue-animal-item[data-index="${index}"]`);
    if (!card) return;

    const button = card.querySelector('.js-rescue-btn-label');
    const isSelected = selectedIndexes.includes(index);

    card.classList.toggle('is-selected', isSelected);

    if (button) {
      button.textContent = isSelected ? 'Hủy phóng sinh' : 'Chọn phóng sinh';
      button.classList.toggle('btn-danger', isSelected);
      button.classList.toggle('btn-outline-primary', !isSelected);
    }
  });

  //Mỗi lần chỉ được chọn 1 con để phóng sinh
  const price = document.getElementById('rescue-total-price');
  if (price) {
    //Chỉ phải tính giá duy nhất của 1 con đó, không phải cộng dồn nhiều con vì chỉ được chọn 1 con
    const totalPrice = selectedIndexes.length > 0 ? animals[selectedIndexes[0]].price : 0;
    price.textContent = `${formatPrice(totalPrice)}`;
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
            <button type="button" class="btn btn-secondary js-rescue-qr-cancel-btn">Thoát</button>
            <button type="button" class="btn btn-primary js-rescue-qr-complete-btn">Tôi đã chuyển khoản</button>
          </div>
        </div>
      </div>
    </div>
  `;

  removeIfExists(document.getElementById('rescueQRModal'));
  appendHtml(document.body, qrHtml);
  showModalById('rescueQRModal', { backdrop: 'static', keyboard: false });
}
