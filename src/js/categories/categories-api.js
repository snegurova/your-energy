// categories-api.js
import axios from 'axios';
import { createCard } from './render-template';
axios.defaults.baseURL = 'https://your-energy.b.goit.study/api';

export const renderCards = async (data) => {
  //const results = data.results;
  return data.results.map(createCard).join('');
};
