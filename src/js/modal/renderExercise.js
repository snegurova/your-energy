import { refs } from '../refs';
import spriteUrl from '../../images/sprite.svg';
import {
  getExerciseById,
  generateStarRating,
  isExerciseFavorite,
  handleAddToRemoveToggle,
} from './exerciseHelpers';

export default async function renderExerciseById(exerciseId) {
  refs.modalEl.innerHTML = '';

  try {
    const exercise = await getExerciseById(exerciseId);
    const {
      _id,
      bodyPart,
      equipment,
      gifUrl,
      name,
      target,
      description,
      burnedCalories,
      popularity,
      rating,
    } = exercise;

    const isFavorite = isExerciseFavorite(_id);
    const starRatingMarkup = generateStarRating(rating);

    const modalMarkup = `<div class="modal-info">
      <img class="exercise-img" src="${gifUrl || 'Oops, there is no video for this exercise'}" alt="${name}" />
      <div class="modal-info-box">
        <h2 class="exercise-title">${name}</h2>
        <div class="exercise-rating">${rating.toFixed(
          1
        )}${starRatingMarkup}</div>
        <ul class="exercise-set">
          <li class="exercise-set-item"><h3 class="item-title">Target</h3><p class="item-description">${target}</p></li>
          <li class="exercise-set-item"><h3 class="item-title">Body Part</h3><p class="item-description">${bodyPart}</p></li>
          <li class="exercise-set-item"><h3 class="item-title">Equipment</h3><p class="item-description">${equipment}</p></li>
          <li class="exercise-set-item"><h3 class="item-title">Popular</h3><p class="item-description">${popularity}</p></li>
          <li class="exercise-set-item"><h3 class="item-title">Burned Calories</h3><p class="item-description">${burnedCalories}</p></li>
        </ul>
        <p class="exercise-description">${
          description || 'We hope you will enjoy it'
        }</p> 
      <div class="btn-wrap">
      <button type="button" class="modal-btn" data-id="${_id}">
        ${
          isFavorite
            ? `Remove from favorites
          <svg width="18" height="18"><use href="${spriteUrl}#icon-trash"></use></svg>`
            : `Add to favorites
          <svg width="18" height="18"><use href="${spriteUrl}#icon-heart"></use></svg>`
        }
      </button>
      <button type="button" class="modal-btn rate-btn open-exercise-rate-modal" data-id="${_id}">Give a rating</button>
      </div>
      </div>
    </div>`;

    refs.modalEl.innerHTML = modalMarkup;

    const button = document.querySelector('.modal-btn');
    if (button) {
      button.removeEventListener('click', handleAddToRemoveToggle);
      button.addEventListener('click', handleAddToRemoveToggle);
    }
  } catch (error) {
    console.error(error);
  }
}
