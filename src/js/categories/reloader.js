let resizeTimeout;
import { getFilterLimitOption, getPageLimitOption } from '../services/limit';
import { pushState } from '../../main';

function updateLinkParams(limit) {
  const filterLinks = document.querySelectorAll('.filter-link');
  if (filterLinks) {
    filterLinks.forEach((link) => {
      link.dataset.limit = limit;
    });
  }
}

const defaultParams = '?filter=Muscles&page=1&limit=';

export function categoriesCardReload(cardCount) {
  const limit = getPageLimitOption();
  if (cardCount === limit) {
    // console.log('Funtion not reqired to update cards');
    return;
  }
  const urlParams = new URLSearchParams(window.location.search);
  //
  if (
    urlParams.toString() === '' ||
    (urlParams.get('page') && !urlParams.get('filter'))
  ) {
    // console.log('Params not contain any options');
    updateLinkParams(limit);
    pushState(defaultParams + limit);
    return;
  }
  urlParams.set('limit', limit);
  urlParams.set('page', 1);
  // console.log('OK>>>Reload with params', urlParams.toString());
  updateLinkParams(limit);
  pushState('?' + urlParams);
}

function exercisesCardReloader(cardCount) {
  console.log('exercisesCardReloader', cardCount);
  const limit = getFilterLimitOption();
  if (cardCount === limit) {
    return;
  }
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.toString() === '') {
    return;
  }
  urlParams.set('limit', limit);
  urlParams.set('page', 1);
  updateLinkParams(getPageLimitOption());
  pushState('?' + urlParams);
}
export function handlePageReloader() {
  addEventListener('resize', (e) => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const categoriesCardCount =
        document.querySelectorAll('.category-card').length;
      const exercisesCardCount =
        document.querySelectorAll('.exercises-card').length;
      if (categoriesCardCount != 0) {
        return categoriesCardReload(categoriesCardCount);
      }
      if (exercisesCardCount != 0) {
        return exercisesCardReloader();
      }
    }, 100);
  });
}
