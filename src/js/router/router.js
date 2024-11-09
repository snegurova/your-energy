import { getContentElement, getFilters, homeElement } from '../pages/home';
import { favoritesElement } from '../pages/favorites';
import {
  getMainExercises,
  getExercises,
  exercisesElement,
} from '../pages/exercises';

import { updateQuote } from '../quote/quote';
import { getFavoritesHTML, getFavorites } from "../favorites/favorites-api";

const basePath = import.meta.env.BASE_URL.slice(0, -1);

export const route = (event) => {
  event.preventDefault();
  const {
    target: { href },
  } = event;

  const { pathname } = new URL(href);

  window.history.pushState({}, '', `${basePath}${pathname}`);
  handleLocation();
};

const routes = {
  '/': {
    route: `${basePath}/home.html`,
    domCallBack: getContentElement,
    apiCallBack: getFilters,
    htmlElement: homeElement,
  },
  '/favorites': {
    route: `${basePath}/favorites.html`,
    domCallBack: getFavoritesHTML,
    apiCallBack: getFavorites,
    htmlElement: favoritesElement,
  },
  '/exercises': {
    route: `${basePath}/exercises.html`,
    domCallBack: getMainExercises,
    apiCallBack: getExercises,
    htmlElement: exercisesElement,
  },
};

export const handleLocation = async () => {
  const { pathname, search } = window.location;
  const urlParams = new URLSearchParams(search);

  const path = pathname.replace(basePath, '');

  const { route, domCallBack, apiCallBack, htmlElement } = routes[path];
  if (path === '/' && !urlParams.size) {
    urlParams.set('filter', 'Muscles');
    urlParams.set('limit', '10');
    urlParams.set('page', '1');
  }
  const mainElement = document.getElementById('main-page');
  mainElement.innerHTML = '';
  mainElement.appendChild(htmlElement);

  domCallBack();
  apiCallBack(urlParams);
  updateQuote();
};

window.onpopstate = handleLocation;
window.route = route;
