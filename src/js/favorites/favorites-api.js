import axios from 'axios';
import { createCard } from './render-functions'
import { removeFromFavorites } from './favorites';

const favoritesData = localStorage.getItem('favorites');
let favoritesHTML;
export const getFavoritesHTML = () => { favoritesHTML = document.querySelector('.favorites') };

axios.defaults.baseURL = 'https://your-energy.b.goit.study/api';

export const remove = async (dataId) => {
  removeFromFavorites(dataId)
  const fData = localStorage.getItem('favorites');
  console.log('ddd', fData)

  if (fData) {
    const objects = JSON.parse(fData);
    const requests = objects.map(item =>
      axios.get(`/exercises/${item}`).then(response => response.data)
    );

    const exercisesData = await Promise.all(requests)
    const cards = exercisesData.map(createCard).join('');
    favoritesHTML.innerHTML = `<ul class="favorites-section card-set">${cards}</ul>`;
  }
};



export const getFavorites = async () => {
  if (favoritesData) {
    const objects = JSON.parse(favoritesData);
    const requests = objects.map(item =>
      axios.get(`/exercises/${item}`).then(response => response.data)
    );

    const exercisesData = await Promise.all(requests)
    const cards = exercisesData.map(createCard).join('');
    favoritesHTML.innerHTML = `<ul class="favorites-section card-set">${cards}</ul>`;
  } else {
    favoritesHTML.innerHTML = `<p>It appears that you haven't added any exercises to your favorites yet.
    To get started, you can add exercises that you like to your favorites for easier access in the future.
    </p>`
  }

  const buttons = document.querySelectorAll('.remove-from-favorites');
  console.log("buttons", buttons)


  buttons.forEach(button => {
    const dataIdValue = button.dataset.id;
    button.addEventListener('click', remove(dataIdValue));
  })

};
