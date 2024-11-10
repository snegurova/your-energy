import api from '../api';
import { renderExercises } from '../renderExercises';
import { renderPagination, paginationCallback } from '../pagination';
import { SEARCH_PARAMS } from '../../main';

const cardsContainer = document.querySelector('.cards-container');

export const getExercises = async (params, isInitPagination) => {
  const exercises = await api.exercises.getExercises(params);
  const markup = renderExercises(exercises);
  cardsContainer.innerHTML = `<ul class="main-exercises">${markup}</ul>`;
  renderPagination(
    paginationCallback,
    params.get(SEARCH_PARAMS.PAGE),
    exercises.totalPages,
    isInitPagination
  );
};
