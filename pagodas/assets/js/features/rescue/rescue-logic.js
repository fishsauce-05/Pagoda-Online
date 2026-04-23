export const lifeRescueAnimals = [
  { name: 'Cá', icon: 'fa-fish', price: 50000, image: '../assets/img/qr/rescue/fish-rescue.png' },
  { name: 'Chim', icon: 'fa-dove', price: 100000, image: '../assets/img/qr/rescue/bird-rescue.png' },
  { name: 'Hoàng tử ếch', icon: 'fa-frog', price: 900000, image: '../assets/img/qr/rescue/frog-rescue.png' }
];

export function computeTotalPrice(selectedIndexes) {
  return selectedIndexes.reduce((sum, index) => sum + lifeRescueAnimals[index].price, 0);
}

export function getSingleSelectedIndex(selectedIndexes) {
  return selectedIndexes[0];
}
