import { PATHS } from '../../core/config/paths.js';
import { appendHtml, removeIfExists } from '../../core/utils/dom.js';
import { showModalById } from '../../shared/modals/modal-adapter.js';

export function resetFortuneQuestionSelection() {
  document.querySelectorAll('[id^="question-"]').forEach((element) => {
    element.classList.remove('is-selected');
  });
}

export function renderFortuneQuestionOptions(indexes, fortuneQueries) {
  const questionElements = Array.from(document.querySelectorAll('[id^="question-"]'));

  questionElements.forEach((element, slotIndex) => {
    const questionIndex = indexes[slotIndex];
    const query = fortuneQueries[questionIndex];

    if (!query) {
      element.classList.add('d-none');
      element.dataset.questionIndex = '';
      element.removeAttribute('onclick');
      return;
    }

    const titleElement = element.querySelector('.fortune-question-title');
    const subtitleElement = element.querySelector('.fortune-question-subtitle');

    element.id = `question-${questionIndex}`;
    element.dataset.questionIndex = String(questionIndex);
    element.classList.remove('d-none');
    element.removeAttribute('onclick');

    if (titleElement) {
      titleElement.textContent = query.question;
    }

    if (subtitleElement) {
      subtitleElement.textContent = 'Nhận lời gợi mở cho câu hỏi này';
    }
  });
}

export function renderFortuneQuestionSelection(index) {
  document.querySelectorAll('[id^="question-"]').forEach((element) => {
    const elementIndex = Number(element.dataset.questionIndex);
    element.classList.toggle('is-selected', elementIndex === index);
  });
}

export function renderFortuneQrModal() {
  const qrHtml = `
    <div class="modal fade" id="fortuneQRModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Thanh toán xem bói - 50,000 VND</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center">
            <img src="${PATHS.fortuneQr}" class="img-fluid rounded-3" alt="QR thanh toán" style="max-width: 100%; max-height: 400px;">
            <p class="mt-3 text-muted">Quét mã QR để thanh toán</p>
            <p class="text-muted"><strong>50,000 VND</strong> / lần xem bói</p>
          </div>
          <div class="modal-footer justify-content-center gap-3">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Thoát</button>
            <button type="button" class="btn btn-primary js-fortune-telling-complete">Đã thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  `;

  removeIfExists(document.getElementById('fortuneQRModal'));
  appendHtml(document.body, qrHtml);
  showModalById('fortuneQRModal');
}

export function renderFortuneResultModal({ question, response }) {
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

  removeIfExists(document.getElementById('fortuneResultModal'));
  appendHtml(document.body, resultHtml);
  showModalById('fortuneResultModal');
}
