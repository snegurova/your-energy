import api from '../api';
import { renderExercises } from '../renderExercises';
import exercisesTemplate from '../../exercises.html?raw';

const cardsContainer = document.querySelector('.cards-container');
export const exercisesElement = document.createElement('div');
exercisesElement.innerHTML = exercisesTemplate;

const categoryMap = {
  'body parts': 'bodypart',
  muscles: 'muscles',
  equipment: 'equipment',
};

export const getExercises = async (params) => {
  const exercises = await api.exercises.getExercises(normalizeParams(params));
  cardsContainer.innerHTML = `<ul class="main-exercises">${await renderExercises(
    exercises
  )}</ul>`;
};

function normalizeParams(params) {
  const category = params.get('filter')?.toLowerCase() || 'unknown';
  return {
    [categoryMap[category] || 'unknown']: params.get('name'),
    page: params.get('page'),
    limit: params.get('limit'),
    keyword: params.get('keyword'),
  };
}
