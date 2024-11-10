import api from '../api';
import { renderCards } from '../categories/categories-api';
import { handleClick, SEARCH_PARAMS } from '../../main';
import { renderPagination, paginationCallback } from '../pagination';

const cardsContainer = document.querySelector('.cards-container');
const filterLinks = document.querySelectorAll('.filter-link');

const ACTIVE_CLASS = 'active';

const handleFilterClick = (event) => {
  handleClick(event, { isInitPagination: true });
  filterLinks.forEach((link) => {
    if (link.classList.contains(ACTIVE_CLASS)) {
      link.classList.toggle(ACTIVE_CLASS);
    }
  });
  event.target.classList.toggle(ACTIVE_CLASS);
};

filterLinks.forEach((link) => {
  link.addEventListener('click', handleFilterClick);
});

export const getFilters = async (params, isInitPagination) => {
  const categoriesData = await api.filters.getFilters(params);
  renderCards(categoriesData, cardsContainer);
  renderPagination(
    paginationCallback,
    params.get(SEARCH_PARAMS.PAGE),
    categoriesData.totalPages,
    isInitPagination
  );
};
