import { route, handleLocation } from './js/router/router';
import { renderExercises } from './js/renderExercises';

const links = document.querySelectorAll('.router-link');
links.forEach(link => link.addEventListener('click', route));

handleLocation();

renderExercises({ page: 1, limit: 10 });
