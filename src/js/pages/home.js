import api from '../api';
import homeTemplate from '../../home.html?raw';
import heroTemplate from '../../partials/hero.html?raw';
import categoriesTemplate from '../../partials/categories.html?raw';
import quoteTemplate from '../../partials/quote.html?raw';
import paginationTemplate from '../../partials/pagination.html?raw';
import { renderCards } from '../categories/categories-api';
//import { initPagination  } from '../pagination';

let contentElement;
let categoriesContainer;


export const getContentElement = () => {
  contentElement = document.querySelector('.content');
  
  console.log(contentElement);
};

//example for function for pagination

// async function getExercises(page = 1) {
//   api.exercises.page = page;
//   const data = await api.exercises.getExercises();
//   console.log("Fetched Data for Page", page, ":", data);
//   return data;
// } 

// async function fetchAndRenderExercises(page) {
//   const data = await getExercises(page);
//   console.log("Current Page Data:", data.results);
//   return data;
// }


export const apiCallbackFilters = async (params) => {
// initPagination gets callback and one argument page number {param: {page}}
   //initPagination(callback)


  // filters = await api.filters.getFilters(params);
  // // console.log(filters);
  // const markup = filters.results.reduce((acc, { filter, name, imgURL }) => {
  //   return `${acc}<li><div>${filter}</div><div>${name}</div>`;
  // }, '');
  // contentElement.innerHTML = `<ul>${markup}</ul>`;

  filters = await api.filters.getFilters(params);
  const markup = await renderCards(filters);
  categoriesContainer = document.querySelector('.categories');
  categoriesContainer.innerHTML = `<ul class="category-list">${markup}</ul>`;
  
};

export const homeElement = document.createElement('div');
homeElement.innerHTML = homeTemplate;
homeElement.querySelector('.fitness-hero-section').innerHTML = heroTemplate;
homeElement.querySelector('.quote-exercises-container').innerHTML =
  categoriesTemplate + quoteTemplate;
homeElement.querySelector('.pagination').innerHTML = paginationTemplate;
