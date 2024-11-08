import { route, handleLocation } from './js/router/router';
import { renderExercises } from './js/renderExercises';
import { renderCards } from './js/categories/categories-api';
import {addToFavorites} from './js/favorites/favorites'
import './api-example';
import './js/burger-menu';
import './js/modal/modal';

const links = document.querySelectorAll('.router-link');
links.forEach((link) => link.addEventListener('click', route));
links.forEach((link) => {
  link.addEventListener('click', route);
});

handleLocation();

document.addEventListener('DOMContentLoaded', async () => {
  if (window.location.pathname === '/') {
    renderCards();
  }
});

document.addEventListener('routeUpdated', () => {
  renderExercises({ page: 1, limit: 10 });
});

 addToFavorites('64f389465ae26083f39b17a4')
 addToFavorites('64f389465ae26083f39b1b04')
 addToFavorites('64f389465ae26083f39b17a3')
 addToFavorites('64f389465ae26083f39b17a5')
