import api from '../api';
import { getContentPagination } from '../pagination';

let contentElement;
let filters;

export const getContentElement = () => {

  contentElement = document.querySelector('.content');
  getContentPagination();
  console.log(contentElement);

};

export const getFilters = async (params) => {
  // filters = await api.filters.getFilters(params);
  // // console.log(filters);
  // const markup = filters.results.reduce((acc, { filter, name, imgURL }) => {
  //   return `${acc}<li><div>${filter}</div><div>${name}</div>`;
  // }, '');
  // contentElement.innerHTML = `<ul>${markup}</ul>`;
};
