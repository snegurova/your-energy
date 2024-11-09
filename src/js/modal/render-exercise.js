import axios from 'axios';
import { refs } from '../refs';
import storageService from '../services/storage';

axios.defaults.baseURL = 'https://your-energy.b.goit.study/api/';

const getExerciseById = (id) =>
  axios.get(`/exercises/${id}`).then((res) => res.data);

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
      <img class="exercise-img" src="${gifUrl}" alt="${name}" />
      <div class="modal-info-box">
        <h2 class="exercise-title">${name}</h2>
        <div class="exercise-rating">${rating}${starRatingMarkup}</div>
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
          <svg width="18" height="18"><use href="./images/sprite.svg#icon-trash"></use></svg>`
            : `Add to favorites
          <svg width="18" height="18"><use href="./images/sprite.svg#icon-heart"></use></svg>`
        }
      </button>
      <button type="button" class="modal-btn rate-btn">Give a rating</button>
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

function generateStarRating(rating) {
  const maxStars = 5;
  let starsMarkup = '<ul class="star-rating">';
  const roundedRating = Math.round(rating);

  for (let i = 1; i <= maxStars; i++) {
    if (roundedRating >= i) {
      starsMarkup += `<li class="star full"><svg class="rate-star-icon" width="18" height="18"><use href="./images/sprite.svg#icon-star"></use></svg></li>`;
    } else {
      starsMarkup += `<li class="star empty"><svg class="rate-star-icon" width="18" height="18"><use href="./images/sprite.svg#icon-star"></use></svg></li>`;
    }
  }

  starsMarkup += '</ul>';
  return starsMarkup;
}

function isExerciseFavorite(exerciseId) {
  const favorites = storageService.load('favorites') || [];
  return favorites.some((exercise) => exercise._id === exerciseId);
}

function handleAddToRemoveToggle(event) {
  const button = event.target;
  const exerciseId = button.getAttribute('data-id');
  const isFavorite = button.innerHTML.includes('Remove from favorites'); 

  if (isFavorite) {
    handleRemoveFromFavorites(exerciseId);
  } else {
    handleAddToFavorites(exerciseId);
  }
}

function handleAddToFavorites(exerciseId) {
  getExerciseById(exerciseId).then((exercise) => {
    storageService.save('favorites', exercise);

    const button = document.querySelector('.modal-btn');
    if (button) {
      button.innerHTML = `Remove from favorites
        <svg width="18" height="18"><use href="./images/sprite.svg#icon-trash"></use></svg>`;
    }
  });
}

function handleRemoveFromFavorites(exerciseId) {
  storageService.remove('favorites', exerciseId);

  const button = document.querySelector('.modal-btn');
  if (button) {
    button.innerHTML = `Add to favorites
      <svg width="18" height="18"><use href="./images/sprite.svg#icon-heart"></use></svg>`;
  }
}
