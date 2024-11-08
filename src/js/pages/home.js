import api from '../api';
import updateUrlParams from '../services/updateUrlParams';
import renderCategories from '../components/renderCategories';
import homeTemplate from '../../home.html?raw';
import heroTemplate from '../../partials/hero.html?raw';
import categoriesTemplate from '../../partials/categories.html?raw';
import quoteTemplate from '../../partials/quote.html?raw';
import paginationTemplate from '../../partials/pagination.html?raw';

let contentElement;
let filterButtonList;

export const getContentElement = () => {
  contentElement = document.querySelector('.categories');
  filterButtonList = document.querySelector('.main-exercises-links');

  if (filterButtonList) {
    filterButtonList.addEventListener('click', onChangeFilter);
    const filter = localStorage.getItem('filter');

    Array.from(filterButtonList.children).forEach((button) => {
      if (button.dataset.name === (JSON.parse(filter) || 'Muscles')) {
        button.classList.add('active');
      }
    });
  }
};

let categoriesContainer;
export const getFilters = async (params) => {
  const filters = await api.filters.getFilters(params);
  renderCategories(filters.results);
};

function onChangeFilter(e) {
  const filter = e.target.dataset.name;
  localStorage.setItem('filter', JSON.stringify(filter));
  Array.from(filterButtonList.children).forEach((button) => {
    button.classList.remove('active');
  });
  e.target.classList.add('active');
  updateUrlParams({ filter }, getFilters);
}

export const homeElement = document.createElement('div');
homeElement.innerHTML = homeTemplate;
homeElement.querySelector('.fitness-hero-section').innerHTML = heroTemplate;
homeElement.querySelector('.quote-exercises-container').innerHTML =
  categoriesTemplate + quoteTemplate;
homeElement.querySelector('.pagination').innerHTML = paginationTemplate;
