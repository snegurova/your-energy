import axios from 'axios';
import {createCard} from './render-functions'

const favoritesData = localStorage.getItem('favorites'); 
let favoritesHTML;
export const getFavoritesHTML = () => { favoritesHTML = document.querySelector('.favorites') };

axios.defaults.baseURL = 'https://your-energy.b.goit.study/api';

export const getFavorites = () => {
  if (favoritesData) {
    const objects = JSON.parse(favoritesData);
    const requests = objects.map(item => 
      axios.get(`/exercises/${item}`).then(response => response.data)
    );
    
    Promise.all(requests)
      .then(exercisesData => {
        const cards = exercisesData.map(createCard).join('');
        favoritesHTML.innerHTML = `<ul class="favorites-list">${cards}</ul>`;
      })
      .catch(error => {
        console.error('Error during one of the requests:', error);
      });
  } else {
    console.log('No data found in localStorage.');
  }
};
