import { getFilters } from './js/pages/home';

import './js/pagination';

import './api-example';
import './js/burger-menu';
// import './js/modal/modal';
import './js/footer/subscription';
import './js/footer/animation';
// import './js/modal/rateModal';

const SEARCH_PARAMS = {
  FILTER: 'filter',
  PAGE: 'page',
  LIMIT: 'limit',
};

const FILTERS = {
  MUSCLES: 'Muscles',
  BODY_PARTS: 'Body parts',
  EQUIPMENT: 'Equipment',
};

const defaultParams = new URLSearchParams([
  [SEARCH_PARAMS.FILTER, FILTERS.MUSCLES],
  [SEARCH_PARAMS.PAGE, 1],
  [SEARCH_PARAMS.LIMIT, 10],
]);

document.addEventListener('DOMContentLoaded', () => {
  const { pathname, search } = window.location;
  if (pathname === '/' && !search) {
    console.log(defaultParams.toString());

    getFilters(defaultParams);
  }
});
