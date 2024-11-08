import api from '../api';
import updateUrlParams from '../services/updateUrlParams';
import renderCategories from '../components/renderCategories';

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
