import { PATHS } from '../../core/config/paths.js';

export const lifeRescueAnimals = [
  { name: 'Cá', icon: 'fa-fish', price: 50000, image: PATHS.fishRescue },
  { name: 'Chim', icon: 'fa-dove', price: 100000, image: PATHS.birdRescue },
  { name: 'Hoàng tử ếch', icon: 'fa-frog', price: 900000, image: PATHS.frogRescue }
];

export function computeTotalPrice(selectedIndexes) {
  return selectedIndexes.reduce((sum, index) => sum + lifeRescueAnimals[index].price, 0);
}

export function getSingleSelectedIndex(selectedIndexes) {
  return selectedIndexes[0];
}
