import api from '../api';
import { renderExercises } from '../renderExercises';
import { renderPagination, paginationCallback } from '../pagination';
import { SEARCH_PARAMS } from '../../main';

const cardsContainer = document.querySelector('.cards-container');

export const getExercises = async (params, isInitPagination) => {
  const paginationContainerEl = document.querySelector('.pagination-container');
  const exercises = await api.exercises.getExercises(params);

  if (exercises.results.length) {
    const markup = renderExercises(exercises);
    cardsContainer.innerHTML = `<ul class="main-exercises">${markup}</ul>`;
    renderPagination(
      paginationCallback,
      params.get(SEARCH_PARAMS.PAGE),
      exercises.totalPages,
      isInitPagination
    );
    if (paginationContainerEl) {
      paginationContainerEl.classList.remove('hidden');
    }
  } else {
    if (paginationContainerEl) {
      paginationContainerEl.classList.add('hidden');
    }
    cardsContainer.innerHTML =
      '<p class="search-empty-placeholder">No Exercises Found. It looks like there are no exercises available at the moment. Please try again later or explore other categories.</p>';
  }
};
