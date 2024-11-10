import { getFilters } from './js/pages/home';
import { getExercises } from './js/pages/exercises';
import { getFavorites } from './js/favorites/favorites-api';

import './js/pagination';

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
  const { search } = window.location;
  const urlParams = new URLSearchParams(search);
  if (urlParams.has('name')) {
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
  const url = new URL(window.location.href);
  url.searchParams.set('keyword', searchQuery);
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
