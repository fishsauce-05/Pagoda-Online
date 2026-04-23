import { appendHtml, removeIfExists } from '../../core/utils/dom.js';
import { showModalById } from '../../shared/modals/modal-adapter.js';

export function showPackageSuccessModal({ selectedPackageLabel, selectedStartLink, isFreeFlow }) {
  const successMessage = document.getElementById('package-success-message');
  const startLink = document.getElementById('package-start-link');

  if (!successMessage || !startLink) {
    return;
  }

  successMessage.textContent = isFreeFlow
    ? `${selectedPackageLabel} đã sẵn sàng. Bắt đầu vào lễ thôi.`
    : `${selectedPackageLabel} đã thanh toán thành công. Bắt đầu vào lễ thôi.`;

  startLink.setAttribute('href', selectedStartLink);
  showModalById('package-success-modal');
}

export function showPackageQrModal({ packageLabel, qrImagePath, showPaidButton }) {
  const qrTitle = document.getElementById('qr-package-title');
  const qrImage = document.getElementById('qr-package-image');
  const qrMessage = document.getElementById('qr-package-message');
  const qrPaidButton = document.getElementById('qr-package-paid-btn');

  if (!qrTitle || !qrImage || !qrMessage) {
    return null;
  }

  if (qrImagePath) {
    qrImage.src = qrImagePath;
    qrImage.classList.remove('d-none');
    qrTitle.textContent = `Mã QR - ${packageLabel}`;
    qrMessage.textContent = 'Quét mã QR để chuyển khoản đúng gói bạn đã chọn.';
    if (qrPaidButton && showPaidButton) {
      qrPaidButton.classList.remove('d-none');
    }
  } else {
    qrImage.removeAttribute('src');
    qrImage.classList.add('d-none');
    qrTitle.textContent = packageLabel;
    qrMessage.textContent = 'Gói Free không cần thanh toán. Bạn có thể bắt đầu vào lễ ngay.';
    if (qrPaidButton) {
      qrPaidButton.classList.add('d-none');
    }
  }

  return showModalById('qr-package-modal');
}
