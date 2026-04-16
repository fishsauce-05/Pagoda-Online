document.addEventListener('DOMContentLoaded', function() {
  const modalsToLoad = [
    'components/modal-donation.html',
    'components/modal-rescue.html',
    'components/modal-fortune.html',
    'components/modal-package-qr.html',
    'components/modal-package-success.html',
    'components/modal-wish-ad.html'
  ];

  const container = document.getElementById('modals-container');
  if (!container) {
    return;
  }

  let loadedCount = 0;

  modalsToLoad.forEach(function(modalPath) {
    fetch(modalPath)
      .then(function(response) {
        return response.text();
      })
      .then(function(data) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;
        Array.from(tempDiv.children).forEach(function(child) {
          container.appendChild(child);
        });

        loadedCount += 1;

        if (loadedCount === modalsToLoad.length) {
          console.log('All modals loaded successfully');
          if (typeof initializeRescueAnimals === 'function') {
            initializeRescueAnimals();
          }
        }
      })
      .catch(function(error) {
        console.error('Error loading modal:', modalPath, error);
      });
  });
});
