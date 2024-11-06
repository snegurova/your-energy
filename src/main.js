import { route, handleLocation } from './js/router/router';
import { updateQuote } from './js/quote/quote';
import { renderCards } from './js/categories/categories-api';
import './api-example';
const links = document.querySelectorAll('.router-link');
links.forEach(link => link.addEventListener('click', route));

handleLocation();
updateQuote();
renderCards();
