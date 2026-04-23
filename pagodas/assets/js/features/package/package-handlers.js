import { activityState } from '../../core/state/activity-state.js';
import { emit } from '../../core/events/event-bus.js';
import { EVENTS } from '../../core/events/event-types.js';
import { hideModalById } from '../../shared/modals/modal-adapter.js';
import { isFreePackage, getPackageSelection } from './package-logic.js';
import { showPackageQrModal, showPackageSuccessModal } from './package-render.js';

export function createPackageHandlers() {
  function openPackageFromButton(button) {
    const { packageType, packageLabel, qrImagePath, startLink } = getPackageSelection(button);

    emit(EVENTS.PACKAGE_SELECTED, {
      packageType,
      packageLabel,
      startLink
    });

    activityState.update({
      selectedPackageLabel: packageLabel,
      selectedStartLink: startLink
    });

    showPackageQrModal({
      packageLabel,
      qrImagePath,
      showPaidButton: !isFreePackage(packageType)
    });

    if (isFreePackage(packageType)) {
      hideModalById('qr-package-modal');
      emit(EVENTS.PACKAGE_PAYMENT_COMPLETED, {
        packageType,
        packageLabel,
        isFreeFlow: true
      });
      showPackageSuccessModal({
        selectedPackageLabel: packageLabel,
        selectedStartLink: startLink,
        isFreeFlow: true
      });
    }
  }

  function initPackageButtons() {
    document.querySelectorAll('.js-package-btn').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        openPackageFromButton(button);
      });
    });
  }

  function handlePackagePaid() {
    const state = activityState.getState();
    hideModalById('qr-package-modal');
    emit(EVENTS.PACKAGE_PAYMENT_COMPLETED, {
      packageLabel: state.selectedPackageLabel,
      isFreeFlow: false
    });
    showPackageSuccessModal({
      selectedPackageLabel: state.selectedPackageLabel,
      selectedStartLink: state.selectedStartLink,
      isFreeFlow: false
    });
  }

  return {
    initPackageButtons,
    handlePackagePaid
  };
}
