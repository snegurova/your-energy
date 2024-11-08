import api from '../api';
import { renderExercises } from '../renderExercises';
import exercisesTemplate from '../../exercises.html?raw';

let contentElement;
let exercises;

export const getMainExercises = () => {
  contentElement = document.querySelector('.content');
};

export const getExercises = async (params) => {
  exercises = await api.exercises.getExercises(params);
  const markup = await renderExercises(exercises);

  contentElement.innerHTML = `<ul class="main-exercises">${markup}</ul>`;
};

export const exercisesElement = document.createElement('div');
exercisesElement.innerHTML = exercisesTemplate;
