import { getContentElement, getFilters } from '../pages/home';
import { getMainExercises, getExercises } from '../pages/exercises';

const basePath = import.meta.env.BASE_URL.slice(0, -1);

export const route = (event) => {
  event.preventDefault();
  const {
    target: { href },
  } = event;

  const { pathname } = new URL(href);
  console.log(pathname);

  window.history.pushState({}, '', `${basePath}${pathname}`);
  handleLocation();
};

const routes = {
  '/': {
    route: `${basePath}/home.html`,
    domCallBack: getContentElement,
    apiCallBack: getFilters,
  },
  '/favorites': {
    route: `${basePath}/favorites.html`,
    domCallBack: () => console.log('your element'),
    apiCallBack: (params) => console.log(`your data and ${params}`),
  },
  '/exercises': {
    route: '/pages/exercises.html',
    domCallBack: getMainExercises,
    apiCallBack: getExercises,
  },
};

export const handleLocation = async () => {
  const { pathname, search } = window.location;
  const urlParams = new URLSearchParams(search);

  const path = pathname.replace(basePath, '');

  const { route, domCallBack, apiCallBack } = routes[path];
  if (path === '/' && !urlParams.size) {
    urlParams.set('filter', 'Muscles');
    urlParams.set('limit', '10');
    urlParams.set('page', '1');
  }
  const html = await fetch(route).then((data) => data.text());

  document.getElementById('main-page').innerHTML = html;

  domCallBack();
  apiCallBack(urlParams);
};

window.onpopstate = handleLocation;
window.route = route;
