import { route, handleLocation } from './js/router/router';

const links = document.querySelectorAll('.router-link');
links.forEach(link => link.addEventListener('click', route));

handleLocation();
