import axios from 'axios';
import storageService from '../services/storage';
import spriteUrl from '../../images/sprite.svg';

axios.defaults.baseURL = 'https://your-energy.b.goit.study/api/';

export const getExerciseById = (id) =>
  axios.get(`/exercises/${id}`).then((res) => res.data);

export function generateStarRating(rating) {
  const maxStars = 5;
  let starsMarkup = '<ul class="star-rating">';
  const roundedRating = Math.round(rating);

  for (let i = 1; i <= maxStars; i++) {
    if (roundedRating >= i) {
      starsMarkup += `<li class="star full"><svg class="rate-star-icon" width="18" height="18"><use href="${spriteUrl}#icon-star"></use></svg></li>`;
    } else {
      starsMarkup += `<li class="star empty"><svg class="rate-star-icon" width="18" height="18"><use href="${spriteUrl}#icon-star"></use></svg></li>`;
    }
  }

  starsMarkup += '</ul>';
  return starsMarkup;
}

export function isExerciseFavorite(exerciseId) {
  const favorites = storageService.load('favorites') || [];
  return favorites.some((exercise) => exercise._id === exerciseId);
}

export function handleAddToRemoveToggle(event) {
  const button = event.target;
  const exerciseId = button.getAttribute('data-id');
  const isFavorite = button.innerHTML.includes('Remove from favorites');

  if (isFavorite) {
    handleRemoveFromFavorites(exerciseId);
  } else {
    handleAddToFavorites(exerciseId);
  }
}

export function handleAddToFavorites(exerciseId) {
  getExerciseById(exerciseId).then((exercise) => {
    storageService.save('favorites', exercise);

    const button = document.querySelector('.modal-btn');
    if (button) {
      button.innerHTML = `Remove from favorites
        <svg width="18" height="18"><use href="${spriteUrl}#icon-trash"></use></svg>`;
    }
  });
}

export function handleRemoveFromFavorites(exerciseId) {
  storageService.remove('favorites', exerciseId);

  const button = document.querySelector('.modal-btn');
  if (button) {
    button.innerHTML = `Add to favorites
      <svg width="18" height="18"><use href="${spriteUrl}#icon-heart"></use></svg>`;
  }
}
