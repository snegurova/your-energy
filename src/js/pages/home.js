import api from '../api';
// import homeTemplate from '../../home.html?raw';
// import heroTemplate from '../../partials/hero.html?raw';
// import categoriesTemplate from '../../partials/categories.html?raw';
// import quoteTemplate from '../../partials/quote.html?raw';
// import paginationTemplate from '../../partials/pagination.html?raw';
import { renderCards } from '../categories/categories-api';
import { getContentPagination } from '../pagination';

let contentElement;
let filters;
let categoriesContainer;

export const getContentElement = () => {
  contentElement = document.querySelector('.content');
  getContentPagination();
};

export const getFilters = async (params) => {
  console.log(params);

  filters = await api.filters.getFilters(params);
  const markup = await renderCards(filters);
  categoriesContainer = document.querySelector('.categories');
  categoriesContainer.innerHTML = `<ul class="category-list">${markup}</ul>`;
};

// export const homeElement = document.createElement('div');
// homeElement.innerHTML = homeTemplate;
// homeElement.querySelector('.fitness-hero-section').innerHTML = heroTemplate;
// homeElement.querySelector('.quote-exercises-container').innerHTML =
//   categoriesTemplate + quoteTemplate;
// homeElement.querySelector('.pagination').innerHTML = paginationTemplate;
