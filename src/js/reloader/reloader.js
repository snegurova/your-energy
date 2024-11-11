let resizeTimeout;
import { getExercisesLimit, getCategoriesLimit } from '../services/limit';
import {
  defaultParams,
  pushState,
  SEARCH_PARAMS,
  updateParameter,
} from '../../main';
import { getFilters } from '../pages/home';

const handleResize = () => {
  const { search } = window.location;
  if (!search) {
    const limit = getCategoriesLimit();
    defaultParams.set(SEARCH_PARAMS.LIMIT, limit);
    getFilters(defaultParams, true);
    return;
  }
  if (search.includes(SEARCH_PARAMS.FILTER)) {
    const limit = getCategoriesLimit();
    const url = updateParameter(SEARCH_PARAMS.LIMIT, limit);
    pushState(url, {
      isInitPagination: true,
    });
  }
  const limit = getExercisesLimit();
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
