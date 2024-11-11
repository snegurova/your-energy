let resizeTimeout;
import { getExercisesLimit, getCategoriesLimit } from '../services/limit';
import {
  defaultParams,
  pushState,
  SEARCH_PARAMS,
  updateParameter,
} from '../../main';
import { getFilters } from '../pages/home';

function updateLinkParams(limit) {
  const filterLinks = document.querySelectorAll('.filter-link');
  if (filterLinks) {
    filterLinks.forEach((link) => {
      link.dataset.limit = limit;
    });
  }
}

const handleResize = () => {
  const { search } = window.location;
  if (!search) {
    const limit = getCategoriesLimit();
    defaultParams.set(SEARCH_PARAMS.LIMIT, limit);
    updateLinkParams(limit);
    getFilters(defaultParams, true);
    return;
  }
  if (search.includes(SEARCH_PARAMS.FILTER)) {
    const limit = getCategoriesLimit();
    const url = updateParameter(SEARCH_PARAMS.LIMIT, limit);
    updateLinkParams(limit);
    pushState(url, {
      isInitPagination: true,
    });
    return;
  }
  const limit = getExercisesLimit();
  updateLinkParams(getCategoriesLimit());
  const url = updateParameter(SEARCH_PARAMS.LIMIT, limit);
  pushState(url, {
    isInitPagination: true,
  });
};

export function handlePageReloader() {
  addEventListener('resize', (e) => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      handleResize();
    }, 100);
  });
}
