import { route, handleLocation } from './js/router/router';
import { updateQuote } from './js/quote/quote';
import './api-example';
import './js/burger-menu';
const links = document.querySelectorAll('.router-link');
links.forEach((link) => link.addEventListener('click', route));

handleLocation();

updateQuote();
