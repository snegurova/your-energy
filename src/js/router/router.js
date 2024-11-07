import { getContentElement, getFilters } from '../pages/home';

export const route = (event) => {
  event.preventDefault();
  window.history.pushState({}, '', event.target.href);
  handleLocation();
};

const routes = {
  '/': {
    route: '/pages/home.html',
    domCallBack: getContentElement,
    apiCallBack: getFilters,
  },
  '/favorites': {
    route: '/pages/favorites.html',
    domCallBack: () => console.log('your element'),
    apiCallBack: (params) => console.log(`your data and ${params}`),
  },
  '/exercises': {
    route: '/pages/exercises.html',
    domCallBack: () => console.log('your element'),
    apiCallBack: (params) => console.log(`your data and ${params}`),
  },
};

export const handleLocation = async () => {
  const { pathname: path, search } = window.location;
  const urlParams = new URLSearchParams(search);

  const { route, domCallBack, apiCallBack } = routes[path];
  if (path === '/' && !urlParams.size) {
    urlParams.set('filter', 'Muscles');
    urlParams.set('limit', '10');
    urlParams.set('page', '1');
  }
  console.log(`${urlParams}`);
  const html = await fetch(route).then((data) => data.text());

  document.getElementById('main-page').innerHTML = html;

  domCallBack();
  apiCallBack(urlParams);
};

window.onpopstate = handleLocation;
window.route = route;
