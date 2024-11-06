import { route, handleLocation } from './js/router/router';
import { renderExercises } from './js/renderExercises';
import { updateQuote } from './js/quote/quote';
import './api-example';

const links = document.querySelectorAll('.router-link');
links.forEach(link => link.addEventListener('click', route));

handleLocation();

renderExercises({ page: 1, limit: 10 });
updateQuote();
