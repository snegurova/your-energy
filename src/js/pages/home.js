import api from '../api';
import { renderCards } from '../categories/categories-api';
import { handleClick, addListener } from '../../main';

const cardsContainer = document.querySelector('.cards-container');
const filterLinks = document.querySelectorAll('.filter-link');

const ACTIVE_CLASS = 'active';

const handleFilterClick = (event) => {
  handleClick(event);
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

export const getFilters = async (params) => {
  const categoriesData = await api.filters.getFilters(params);
  renderCards(categoriesData, cardsContainer);
};
