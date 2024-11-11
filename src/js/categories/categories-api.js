import { createCard } from './render-template';
import { addListener, handleClick } from '../../main';

export const renderCards = (data, element) => {
  if (!element) {
    return;
  }
  const markup = data.results.map(createCard).join('');
  element.innerHTML = `<ul class="category-list">${markup}</ul>`;
  addListener('.category-link', (event) =>
    handleClick(event, {
      isInitPagination: true,
    })
  );
};
