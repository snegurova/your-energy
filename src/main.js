import { getFilters } from './js/pages/home';
import { getExercises } from './js/pages/exercises';

import './js/pagination';

import './api-example';
import './js/burger-menu';
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
};

export const FILTERS = {
  MUSCLES: 'Muscles',
  BODY_PARTS: 'Body parts',
  EQUIPMENT: 'Equipment',
};

export const defaultParams = new URLSearchParams([
  [SEARCH_PARAMS.FILTER, FILTERS.MUSCLES],
  [SEARCH_PARAMS.PAGE, 1],
  [SEARCH_PARAMS.LIMIT, 12],
]);

document.addEventListener('DOMContentLoaded', () => {
  const { pathname, search } = window.location;
  if (pathname === `${basePath}/` && !search) {
    getFilters(defaultParams);
    return;
  }
  handleLocation();
});

export const getUrl = (event) => {
  event.preventDefault();
  const url = new URL(event.currentTarget.href);
  url.pathname = `${basePath}${url.pathname}`;
  return url;
};

export const setParams = (event, url) => {
  const dataset = event.currentTarget.dataset;
  const searchKeys = Object.values(SEARCH_PARAMS);
  Object.keys(dataset).forEach((key) => {
    if (searchKeys.includes(key)) {
      url.searchParams.set(key, dataset[key]);
    }
  });
};

export const handleLocation = async () => {
  const { pathname, search } = window.location;
  const urlParams = new URLSearchParams(search);
  if (urlParams.has('name')) {
    getExercises(urlParams);
    return;
  }
  getFilters(urlParams);
};

export const pushState = (url) => {
  window.history.pushState({}, '', url);
  handleLocation();
};

export const handleClick = (event) => {
  const url = getUrl(event);
  setParams(event, url);
  pushState(url);
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

window.addEventListener('popstate', handleLocation);
