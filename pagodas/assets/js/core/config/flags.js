const FORTUNE_INDEXES_BY_PAGE = {
  'chua-ha.html': [0, 1, 2],
  'chua-thanh-chua.html': [3, 4, 5]
};

function getFortuneAllowedIndexesByPage() {
  if (typeof window === 'undefined') {
    return FORTUNE_INDEXES_BY_PAGE['chua-ha.html'];
  }

  const currentPage = window.location.pathname.split('/').pop().toLowerCase();
  return FORTUNE_INDEXES_BY_PAGE[currentPage] || FORTUNE_INDEXES_BY_PAGE['chua-ha.html'];
}

export const FLAGS = {
  scrollTopOffset: 100,
  scrollSpyOffset: 200,
  fortuneAllowedIndexes_HaPagoda: [0, 1, 2],
  fortuneAllowedIndexes_ThanhChuaPagoda: [3, 4, 5],
  fortuneAllowedIndexes: getFortuneAllowedIndexesByPage(),
  wishAdSkipSeconds: 5
};
