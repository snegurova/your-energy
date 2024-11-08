import api from '../api';
import { renderCards } from '../categories/categories-api';
import { getContentPagination } from '../pagination';

let contentElement;
let filters;

export const getContentElement = () => {
  contentElement = document.querySelector('.content');
  getContentPagination();
  console.log(contentElement);
};

let categoriesContainer;
export const getFilters = async (params) => {
  filters = await api.filters.getFilters(params);
  const markup = await renderCards(filters);
  categoriesContainer = document.querySelector('.categories');
  categoriesContainer.innerHTML = `<ul class="category-list">${markup}</ul>`;
};
