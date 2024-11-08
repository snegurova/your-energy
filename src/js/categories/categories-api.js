// categories-api.js
import axios from 'axios';
import { createCard } from './render-template';
import { route } from '../router/router';

axios.defaults.baseURL = 'https://your-energy.b.goit.study/api';

export const renderCards = async () => {
  try {
    // Запит до API для отримання реальних даних
    const response = await axios.get(`/filters?filter=Muscles&page=1&limit=12`);
    const data = response.data.results;

    // Перевіряємо, що елемент існує
    const categoriesContainer = document.querySelector('.categories');
    if (!categoriesContainer) {
      console.error("Елемент '.categories' не знайдено.");
      return;
    }

    // Створюємо HTML карток на основі отриманих даних
    const cards = data.map(createCard).join('');
    categoriesContainer.innerHTML = `<ul class="category-list">${cards}</ul>`;
    document.querySelectorAll('.category-card.router-link').forEach((link) => {
      link.addEventListener('click', route);
    });
  } catch (error) {
    console.error('Помилка при отриманні даних:', error);
  }
};
