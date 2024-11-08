import api from '../api';
import homeTemplate from '../../home.html?raw';
import heroTemplate from '../../partials/hero.html?raw';
import categoriesTemplate from '../../partials/categories.html?raw';
import quoteTemplate from '../../partials/quote.html?raw';

let contentElement;
let filters;

export const getContentElement = () => {
  contentElement = document.querySelector('.content');
  // console.log(contentElement);
};

export const getFilters = async (params) => {
  filters = await api.filters.getFilters(params);
  // console.log(filters);
  const markup = filters.results.reduce((acc, { filter, name, imgURL }) => {
    return `${acc}<li><div>${filter}</div><div>${name}</div>`;
  }, '');

  contentElement.innerHTML = `<ul>${markup}</ul>`;
};

export const homeElement = document.createElement('div');
homeElement.innerHTML = homeTemplate;
homeElement.querySelector('.fitness-hero-section').innerHTML = heroTemplate;
homeElement.querySelector('.quote-exercises-container').innerHTML =
  categoriesTemplate + quoteTemplate;
console.log(homeElement);
