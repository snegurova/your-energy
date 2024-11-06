export const route = event => {
  event.preventDefault();
  window.history.pushState({}, '', event.target.href);
  handleLocation();
};

const routes = {
  '/': '/pages/home.html',
  '/favorites': '/pages/favorites.html',
  '/exercises': '/pages/exercises.html',
};

const event = new Event('routeUpdated');

export const handleLocation = async () => {
  const { pathname: path, search } = window.location;
  const urlParams = new URLSearchParams(search);
  console.log(`${urlParams}`);

  const route = routes[path];
  const html = await fetch(route).then(data => data.text());

  document.getElementById('main-page').innerHTML = html;

  document.dispatchEvent(event);
};

window.onpopstate = handleLocation;
window.route = route;
