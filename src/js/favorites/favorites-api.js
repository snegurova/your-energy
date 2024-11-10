import axios from 'axios';
import { handleRemoveFromFavorites } from '../modal/exerciseHelpers.js'
import { createExerciseCard } from '../renderExercises.js'

const favoritesData = localStorage.getItem('favorites');
const favoritesHTML = document.querySelector('.favorites')

axios.defaults.baseURL = 'https://your-energy.b.goit.study/api';

export const remove = async (event) => {
  const dataId = event.currentTarget.dataset.id;
  handleRemoveFromFavorites(dataId)
  const arrEl = event.target.closest('.exercises-card');
  arrEl.remove()
};

const displayData = async (objects) => {
  const requests = objects.map(item => axios.get(`/exercises/${item}`).then(response => response.data));
    const exercisesData = await Promise.all(requests)
    const cards = exercisesData.map((card) => createExerciseCard(card, true)).join('');
    favoritesHTML.innerHTML = `<ul class="favorites-section card-set">${cards}</ul>`;
}

export const getFavorites = async (params) => {
  const page = params.page;
  const elemPerPage = 6;
  const objects = JSON.parse(favoritesData);

  if (objects.length > 0) {
    const sorted = objects.toSorted();

    if (page !== undefined) {
      if (page === 1) {
        const chunk = sorted.slice(0, elemPerPage)
        displayData(chunk)
      }

      if (page !== 1) {
        const startIndex = page - 1 * elemPerPage
        const chunk = sorted.slice(startIndex, startIndex + elemPerPage)
        displayData(chunk)
      }
    }

    const requests = sorted.map(item => axios.get(`/exercises/${item['_id']}`).then(response => response.data));
    const exercisesData = await Promise.all(requests)
    const cards = exercisesData.map((card) => createExerciseCard(card, true)).join('');
    favoritesHTML.innerHTML = `<ul class="favorites-section card-set">${cards}</ul>`;

  } else {
    favoritesHTML.innerHTML = `<p class="not-exist">It appears that you haven't added any exercises to your favorites yet.
    To get started, you can add exercises that you like to your favorites for easier access in the future.
    </p>`
  }

  const buttons = document.querySelectorAll('.exercises-delete-btn');

  buttons.forEach(button => {
    button.addEventListener('click', remove);
  })
};
