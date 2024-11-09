import { createCard } from './render-template';

export const renderCards = async (data) => {
  //const results = data.results;
  return data.results.map(createCard).join('');
};
