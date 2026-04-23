export function isFreePackage(packageType) {
  return packageType === 'free';
}

export function getPackageSelection(button) {
  return {
    packageType: button.dataset.package || '',
    packageLabel: button.dataset.packageLabel || 'Goi le',
    qrImagePath: button.dataset.qrImage || '',
    startLink: button.dataset.startLink || '#'
  };
}
