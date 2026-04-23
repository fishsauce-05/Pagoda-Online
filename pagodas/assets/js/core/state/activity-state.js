import { createStore } from './create-store.js';

export const activityState = createStore({
  selectedRescueAnimals: [],
  selectedFortuneQuestion: null,
  selectedPackageLabel: 'Goi le',
  selectedStartLink: '#',
  wishAdActiveTargetId: '',
  wishAdActiveTrigger: null,
  wishAdClosable: false,
  wishAdMaxWatchedTime: 0,
  wishAdSkipEnabled: false
});
