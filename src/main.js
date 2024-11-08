import { route, handleLocation } from './js/router/router';

import { renderExercises } from './js/renderExercises';

import './js/pagination';
import { updateQuote } from './js/quote/quote';

import './api-example';
import './js/burger-menu';
import './js/modal/modal';

const links = document.querySelectorAll('.router-link');
links.forEach((link) => link.addEventListener('click', route));
links.forEach((link) => {
  link.addEventListener('click', route);
});

handleLocation();

document.addEventListener('routeUpdated', () => {
  renderExercises({ page: 1, limit: 10 });
});
