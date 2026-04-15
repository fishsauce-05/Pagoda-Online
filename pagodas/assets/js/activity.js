function initializeRescueAnimals() {
  const rescueContainer = document.getElementById('rescue-animals-list');
  if (rescueContainer) {
    rescueContainer.innerHTML = lifeRescueAnimals.map((animal, index) => `
      <div class="col-md-4">
        <div id="rescue-animal-${index}" class="rescue-animal-card card text-center p-3 h-100">
          <div class="mb-2">
            <span class="rescue-animal-icon fs-3"><i class="fa-solid ${animal.icon}"></i></span>
          </div>
          <h5 class="card-title mb-1">${animal.name}</h5>
          <p class="card-text text-muted mb-3">${formatPrice(animal.price)}</p>
          <button id="rescue-btn-${index}" type="button" class="btn btn-sm btn-outline-primary" onclick="toggleRescueAnimal(${index}); return false;">Chọn phóng sinh</button>
        </div>
      </div>
    `).join('');
  }
}

function showReactionImage(imagePath) {
  const reactionHtml = `
    <div class="modal fade" id="reactionImageModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-body p-2 p-md-3 text-center">
            <img src="${imagePath}" class="img-fluid rounded-3" alt="Phản hồi" style="max-width: 100%; max-height: 70vh; object-fit: cover;">
          </div>
        </div>
      </div>
    </div>
  `;

  const oldModal = document.getElementById('reactionImageModal');
  if (oldModal) oldModal.remove();

  document.body.insertAdjacentHTML('beforeend', reactionHtml);
  const reactionElement = document.getElementById('reactionImageModal');
  const modal = new bootstrap.Modal(reactionElement);
  modal.show();

  setTimeout(() => {
    const activeModal = bootstrap.Modal.getInstance(reactionElement);
    if (activeModal) {
      activeModal.hide();
    }
  }, 2500);
}

/**
 * Activity handlers for Chua Ha spiritual activities
 * Handles: Donation box, Releasing life (Phóng sinh), Fortune telling (Xem bói)
 */

// Donation Box Modal Handler
function openDonationModal() {
  const modal = new bootstrap.Modal(document.getElementById('donationModal'));
  modal.show();
}

function submitDonationForm() {
  const name = document.getElementById('donation-name').value.trim();
  const amount = document.getElementById('donation-amount').value.trim();
  const address = document.getElementById('donation-address').value.trim();

  if (!name || !amount || !address) {
    alert('Vui lòng điền đầy đủ thông tin');
    return;
  }

  closeDonationModal();
  showReactionImage('../assets/img/reaction/phat-thank-you.jpg');
}

function closeDonationModal() {
  const modal = bootstrap.Modal.getInstance(document.getElementById('donationModal'));
  if (modal) modal.hide();
  document.getElementById('donationForm').reset();
}

function cancelDonation() {
  closeDonationModal();
  showReactionImage('../assets/img/reaction/phat-buon.jpg');
}

// Release Life Modal Handler
const lifeRescueAnimals = [
  { name: 'Cá', icon: 'fa-fish', price: 50000, image: '../assets/img/qr/rescue/fish-rescue.png' },
  { name: 'Chim', icon: 'fa-dove', price: 100000, image: '../assets/img/qr/rescue/bird-rescue.png' },
  { name: 'Hoàng tử ếch', icon: 'fa-frog', price: 900000, image: '../assets/img/qr/rescue/frog-rescue.png' }
];

let selectedRescueAnimals = [];

function openRescueModal() {
  selectedRescueAnimals = [];
  updateRescueSelection();
  const modal = new bootstrap.Modal(document.getElementById('rescueModal'));
  modal.show();
}

function toggleRescueAnimal(index) {
  const isSelected = selectedRescueAnimals.includes(index);

  if (isSelected) {
    selectedRescueAnimals = [];
  } else {
    selectedRescueAnimals = [index];
  }

  updateRescueSelection();
}

function updateRescueSelection() {
  lifeRescueAnimals.forEach((animal, index) => {
    const card = document.getElementById(`rescue-animal-${index}`);
    const button = document.getElementById(`rescue-btn-${index}`);
    const isSelected = selectedRescueAnimals.includes(index);
    
    if (card) {
      if (isSelected) {
        card.classList.add('is-selected');
      } else {
        card.classList.remove('is-selected');
      }
    }

    // Update button text and style
    if (button) {
      if (isSelected) {
        button.textContent = 'Hủy phóng sinh';
        button.classList.remove('btn-outline-primary');
        button.classList.add('btn-danger');
      } else {
        button.textContent = 'Chọn phóng sinh';
        button.classList.remove('btn-danger');
        button.classList.add('btn-outline-primary');
      }
    }
  });

  // Update total price
  const totalPrice = selectedRescueAnimals.reduce((sum, index) => sum + lifeRescueAnimals[index].price, 0);
  document.getElementById('rescue-total-price').textContent = formatPrice(totalPrice);
}

function proceedRescuePayment() {
  if (selectedRescueAnimals.length === 0) {
    alert('Vui lòng chọn ít nhất một loại động vật để phóng sinh');
    return;
  }

  // Show QR code based on selection
  const modal = bootstrap.Modal.getInstance(document.getElementById('rescueModal'));
  if (modal) modal.hide();

  const qrImage = lifeRescueAnimals[selectedRescueAnimals[0]].image;

  // Show QR payment
  showRescueQR(qrImage);
}

function showRescueQR(qrImage) {
  const totalPrice = selectedRescueAnimals.reduce((sum, index) => sum + lifeRescueAnimals[index].price, 0);
  const animalNames = selectedRescueAnimals.map(i => lifeRescueAnimals[i].name).join(', ');

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

  // Remove old QR modal if exists
  const oldModal = document.getElementById('rescueQRModal');
  if (oldModal) oldModal.remove();

  // Add new QR modal
  document.body.insertAdjacentHTML('beforeend', qrHtml);

  const modal = new bootstrap.Modal(document.getElementById('rescueQRModal'), {
    backdrop: 'static',
    keyboard: false
  });
  modal.show();
}

function onRescueCancelled() {
  const qrModal = bootstrap.Modal.getInstance(document.getElementById('rescueQRModal'));
  if (qrModal) qrModal.hide();
  showReactionImage('../assets/img/reaction/phat-buon.jpg');
}

function completeRescuePayment() {
  const qrModal = bootstrap.Modal.getInstance(document.getElementById('rescueQRModal'));
  if (qrModal) qrModal.hide();
  showReactionImage('../assets/img/reaction/phat-thank-you.jpg');
}

function cancelRescue() {
  const modal = bootstrap.Modal.getInstance(document.getElementById('rescueModal'));
  if (modal) modal.hide();
  selectedRescueAnimals = [];
  updateRescueSelection();
  showReactionImage('../assets/img/reaction/phat-buon.jpg');
}

// Fortune Telling Modal Handler
let selectedFortuneQuestion = null;

function openFortuneModal() {
  selectedFortuneQuestion = null;
  document.querySelectorAll('[id^="question-"]').forEach((el) => {
    el.classList.remove('is-selected');
  });
  const modal = new bootstrap.Modal(document.getElementById('fortuneModal'));
  modal.show();
}

function selectFortuneQuestion(index) {
  selectedFortuneQuestion = index;
  // Update UI to show selection
  document.querySelectorAll('[id^="question-"]').forEach((el, i) => {
    if (i === index) {
      el.classList.add('is-selected');
    } else {
      el.classList.remove('is-selected');
    }
  });
}

function proceedFortunePayment() {
  if (selectedFortuneQuestion === null) {
    alert('Vui lòng chọn 1 trong 3 câu hỏi');
    return;
  }

  const modal = bootstrap.Modal.getInstance(document.getElementById('fortuneModal'));
  if (modal) modal.hide();

  // Show QR payment
  showFortuneQR();
}

function showFortuneQR() {
  const qrHtml = `
    <div class="modal fade" id="fortuneQRModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thanh toán xem bói - 50,000 VND</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center">
            <img src="../assets/img/qr/fortune-telling.png" class="img-fluid rounded-3" alt="QR thanh toán" style="max-width: 100%; max-height: 400px;">
            <p class="mt-3 text-muted">Quét mã QR để thanh toán</p>
            <p class="text-muted"><strong>50,000 VND</strong> / lần xem bói</p>
          </div>
          <div class="modal-footer justify-content-center gap-3">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
            <button type="button" class="btn btn-primary" onclick="completeFortunePayment()">Đã thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Remove old QR modal if exists
  const oldModal = document.getElementById('fortuneQRModal');
  if (oldModal) oldModal.remove();

  // Add new QR modal
  document.body.insertAdjacentHTML('beforeend', qrHtml);

  const modal = new bootstrap.Modal(document.getElementById('fortuneQRModal'));
  modal.show();
}

function completeFortunePayment() {
  // Use the selected question
  const questionIndex = selectedFortuneQuestion;
  const question = fortuneQueries[questionIndex].question;
  const response = getRandomResponse(questionIndex);

  const resultHtml = `
    <div class="modal fade" id="fortuneResultModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Quẻ của bạn</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <h6 class="mb-3"><strong>Câu hỏi:</strong> ${question}</h6>
            <div class="alert alert-info">
              <p class="mb-0"><strong>Lời tiên tri:</strong></p>
              <p class="mb-0 mt-2 fst-italic">"${response}"</p>
            </div>
            <p class="text-muted mt-3 small">Kính chúc bạn có được những gì tốt đẹp sớm nhất.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Close payment modal
  const paymentModal = bootstrap.Modal.getInstance(document.getElementById('fortuneQRModal'));
  if (paymentModal) paymentModal.hide();

  // Remove old result modal if exists
  const oldModal = document.getElementById('fortuneResultModal');
  if (oldModal) oldModal.remove();

  // Add and show result modal
  document.body.insertAdjacentHTML('beforeend', resultHtml);

  const resultModal = new bootstrap.Modal(document.getElementById('fortuneResultModal'));
  resultModal.show();
}

// Utility function
function formatPrice(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeRescueAnimals();
});
