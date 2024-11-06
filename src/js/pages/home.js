import api from '../api';

let contentElement;
let filters;

export const getContentElement = () => {
  contentElement = document.querySelector('.content');
  console.log(contentElement);
};

export const getFilters = async (params) => {
  api.filters.page = 2;
  api.filters.filter = 'Muscle';
  filters = await api.filters.getFilters();
  console.log(filters);
  const markup = filters.results.reduce((acc, { filter, name, imgURL }) => {
    return `${acc}<li><div>${filter}</div><div>${name}</div>`;
  }, '');

  contentElement.innerHTML = `<ul>${markup}</ul>`;
};
