export function validateDonationFormData({ name, amount, address }) {
  return Boolean(name && amount && address);
}
