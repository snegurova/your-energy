import api from '../api';
import { renderExercises } from '../renderExercises';
import exercisesTemplate from '../../exercises.html?raw';

const cardsContainer = document.querySelector('.cards-container');

export const getExercises = async (params) => {
  const exercises = await api.exercises.getExercises(params);
  const markup = await renderExercises(exercises);

  cardsContainer.innerHTML = `<ul class="main-exercises">${markup}</ul>`;
};

export const exercisesElement = document.createElement('div');
exercisesElement.innerHTML = exercisesTemplate;
