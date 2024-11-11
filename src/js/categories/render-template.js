import { FILTERS_MAPPER } from '../../main';

import { getExercisesLimit } from '../services/limit';
export const createCard = ({ filter, name, imgURL }) => {
  const dataFilter = `data-${FILTERS_MAPPER[filter]}="${name}"`;
  return `
  <li class="category-card">
    <a href="/" class="router-link category-link"
      ${dataFilter}
      data-page="1"
      data-limit="${getExercisesLimit()}"
      data-name=${name}
    >
      <div class="category-card-description">
        <span class="category-card-title">${name}</span>
        <span class="category-card-filter">${filter}</span>
      </div>
      <img class="category-image" src="${imgURL}" alt="${name}" />
    </a>
  </li>
`;
};
