import { getFilters } from './js/pages/home';
import { getExercises } from './js/pages/exercises';
import { getFavorites } from './js/favorites/favorites-api';

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
  KEYWORD: 'keyword',
  BODY_PART: 'bodypart',
  MUSCLES: 'muscles',
  EQUIPMENT: 'equipment',
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

export const getUrl = (stringUrl) => {
  const url = new URL(stringUrl);

  url.pathname = `${basePath}${url.pathname}`;
  return url;
};

export const setParams = (queries = {}, url) => {
  const searchKeys = Object.values(SEARCH_PARAMS);
  Object.keys(queries).forEach((key) => {
    if (searchKeys.includes(key)) {
      url.searchParams.set(key, queries[key]);
    }
  });
};

export const handleLocation = async () => {
  const { search } = window.location;
  const urlParams = new URLSearchParams(search);
  if (!urlParams.has('filter')) {
    const searchEl = document.querySelector('.search-exercises');
    if (!searchEl) appendSearch(urlParams);
    getExercises(urlParams);
    return;
  }
  getFilters(urlParams);
  getFavorites(urlParams);
  removeSearch();
};

export const pushState = (url) => {
  window.history.pushState({}, '', url);
  handleLocation();
};

export const handleClickFilter = (event) => {
  event.preventDefault();
  const url = getUrl(event.currentTarget.href);
  setParams(event.currentTarget.dataset, url);
  pushState(url);
};

export const handleClickCategory = (event) => {
  event.preventDefault();
  const url = getUrl(window.location.origin);
  setParams(
    {
      [event.currentTarget.dataset.category]: event.currentTarget.dataset.name,
      [SEARCH_PARAMS.PAGE]: 1,
      [SEARCH_PARAMS.LIMIT]: 12,
    },
    url
  );
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

function debounce(f, t) {
  return function (args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall && this.lastCall - previousCall <= t) {
      clearTimeout(this.lastCallTimer);
    }
    this.lastCallTimer = setTimeout(() => f(args), t);
  };
}

function onSearch(e) {
  const searchQuery = e.target.value.trim();
  const url = getUrl(window.location.href);
  setParams({ keyword: searchQuery }, url);
  pushState(url);
}

const appendSearch = (urlParams) => {
  const filtersContainerEl = document.querySelector('.main-filters-container');
  if (filtersContainerEl) {
    const searchContainerEl = document.createElement('div');
    searchContainerEl.classList.add('search-container');
    searchContainerEl.innerHTML = `<input class="search-exercises" type="text" id="search" name="search" placeholder="Search" /><svg class="search-icon" width="18" height="18"><use href="./images/sprite.svg#icon-search"></use></svg>`;
    filtersContainerEl.prepend(searchContainerEl);
    const searchEl = document.querySelector('.search-exercises');
    searchEl.value = urlParams.get('keyword') || '';
    searchEl.addEventListener('input', debounce(onSearch, 500));
  }
};

const removeSearch = () => {
  const searchContainerEl = document.querySelector('.search-container');
  if (searchContainerEl) {
    searchContainerEl.remove();
  }
};

window.addEventListener('popstate', handleLocation);
