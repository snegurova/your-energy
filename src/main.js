import { getFilters } from './js/pages/home';
import { getExercises } from './js/pages/exercises';
// import { getFavorites } from './js/favorites/favorites-api';
import { updateQuote } from './js/quote/quote';
import { appendSearch, removeSearch } from './js/search/search';

import './api-example';
import './js/header/burger-menu';
import './js/modal/modal';
import './js/footer/subscription';
import './js/footer/animation';
import './js/modal/rateModal';

const basePath = import.meta.env.BASE_URL.slice(0, -1);

export const SEARCH_PARAMS = {
  FILTER: 'filter',
  PAGE: 'page',
  LIMIT: 'limit',
  NAME: 'name',
  KEYWORD: 'keyword',
};

export const FILTERS = {
  MUSCLES: 'Muscles',
  BODY_PARTS: 'Body parts',
  EQUIPMENT: 'Equipment',
};

export const FILTERS_MAPPER = {
  [FILTERS.MUSCLES]: 'muscles',
  [FILTERS.BODY_PARTS]: 'bodypart',
  [FILTERS.EQUIPMENT]: 'equipment',
};

export const defaultParams = new URLSearchParams([
  [SEARCH_PARAMS.FILTER, FILTERS.MUSCLES],
  [SEARCH_PARAMS.PAGE, 1],
  [SEARCH_PARAMS.LIMIT, 12],
]);

document.addEventListener('DOMContentLoaded', () => {
  const { pathname, search } = window.location;
  if (pathname === `${basePath}/` && !search) {
    getFilters(defaultParams, true);
    return;
  } else if (pathname === `${basePath}/favorites`) {
    return;
  }

  handleLocation(true);
});

export const getUrl = (event) => {
  event.preventDefault();
  const url = new URL(event.currentTarget.href);
  url.pathname = `${basePath}${url.pathname}`;
  return url;
};

export const setParams = (event, url) => {
  const dataset = event.currentTarget.dataset;
  const searchKeys = [
    ...Object.values(SEARCH_PARAMS),
    ...Object.values(FILTERS_MAPPER),
  ];
  Object.keys(dataset).forEach((key) => {
    if (searchKeys.includes(key)) {
      url.searchParams.set(key, dataset[key]);
    }
  });
};

export const handleLocation = async (isInitPagination) => {
  const { search } = window.location;
  const urlParams = new URLSearchParams(search);

  if (!urlParams.has(SEARCH_PARAMS.FILTER)) {
    const searchEl = document.querySelector('.search-exercises');
    if (!searchEl) {
      appendSearch(urlParams);
    }
    getExercises(urlParams, isInitPagination || history.state.isInitPagination);
    return;
  }
  getFilters(urlParams, isInitPagination || history.state.isInitPagination);
  // getFavorites(urlParams);
  removeSearch();
};

export const pushState = (url, state = {}) => {
  window.history.pushState(state, '', url);
  handleLocation();
};

export const handleClick = (event, state = {}) => {
  const url = getUrl(event);
  setParams(event, url);
  pushState(url, state);
};

export const addListener = (selector, callback) => {
  let elements;
  if (typeof selector === 'string') {
    elements = document.querySelectorAll(selector);
  } else {
    elements = selector;
  }

  elements.forEach((link) => {
    link.addEventListener('click', callback);
  });
  return elements;
};

export const updateParameter = (key, value) => {
  const { href, search } = window.location;
  const url = new URL(href);
  url.searchParams.set(key, value);
  return url;
};

updateQuote();
window.addEventListener('popstate', handleLocation);
