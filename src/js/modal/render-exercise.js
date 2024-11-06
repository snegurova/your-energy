import axios from 'axios';
import { refs } from '../refs';

// API services
axios.defaults.baseURL = 'https://your-energy.b.goit.study/api/';

// const getExercise = () => axios.get('/exercises').then(res => res.data);

const getExerciseById = id =>
  axios.get(`/exercises/${id}`).then(res => res.data);
// console.log(data);

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
    const buttonLabel = isFavorite ? 'Remove from favorites' : 'Add to favorites';

    const modalMarkup = `<div class="modal-info">
  <img src="${gifUrl}" alt="${name}" srcset="" />
  <div class="modal-info-box">
    <h2 class="exercise-title">${name}</h2>
    <div class="exercise-rating">${rating}</div>
    <ul class="exercise-set">
      <li class="exercise-set-item">
        <h3 class="item-title">Target</h3>
        <p class="item-description">${target}</p>
      </li>
      <li class="exercise-set-item">
        <h3 class="item-title">Body Part</h3>
        <p class="item-description">${bodyPart}</p>
      </li>
      <li class="exercise-set-item">
        <h3 class="item-title">Equipment</h3>
        <p class="item-description">${equipment}</p>
      </li>
      <li class="exercise-set-item">
        <h3 class="item-title">Popular</h3>
        <p class="item-description">${popularity}</p>
      </li>
      <li class="exercise-set-item">
        <h3 class="item-title">Burned Calories</h3>
        <p class="item-description">${burnedCalories}</p>
      </li>
    </ul>
    <p class="exercise-description">${
      description || 'We hope you will enjoy it'
    }</p>
  </div>
  <button type="button" class="add-btn" data-id="${_id}">
    ${buttonLabel}
  </button>
  <button type="button" class="rate-btn">
    Give a rating
  </button>
</div>`;
    refs.modalEl.innerHTML = modalMarkup;

    const addToFavoritesBtn = refs.modalEl.querySelector('.add-btn');
    addToFavoritesBtn.addEventListener('click', () =>
      toggleFavorite(_id, addToFavoritesBtn)
    );
  } catch (error) {
    console.error(error);
  }
}

function isExerciseFavorite(exerciseId) {
  const favorites = storageService.load('favorites') || [];
  return favorites.includes(exerciseId);
}

function toggleFavorite(exerciseId, button) {
  let favorites = storageService.load('favorites') || [];

  if (favorites.includes(exerciseId)) {
    favorites = favorites.filter(id => id !== exerciseId);
    button.textContent = 'Add to favorites';
  } else {
    favorites.push(exerciseId);
    button.textContent = 'Remove from favorites';
  }

  storageService.save('favorites', favorites);
}
