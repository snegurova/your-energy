import { createCard } from './render-template';
import { addListener, handleClickCategory } from '../../main';

export const renderCards = (data, element) => {
  const markup = data.results.map(createCard).join('');
  element.innerHTML = `<ul class="category-list">${markup}</ul>`;
  addListener('.category-link', handleClickCategory);
};
