import api from '../api';
import { initPagination } from '../pagination';



let contentElement;


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
   initPagination(getFilters)


  // filters = await api.filters.getFilters(params);
  // // console.log(filters);
  // const markup = filters.results.reduce((acc, { filter, name, imgURL }) => {
  //   return `${acc}<li><div>${filter}</div><div>${name}</div>`;
  // }, '');
  // contentElement.innerHTML = `<ul>${markup}</ul>`;
};
