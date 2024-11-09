import axios from 'axios';

import ExercisesService from './ExercisesService';
import FiltersService from './FiltersService';
import QuotesService from './QuotesService';
import SubscriptionService from './SubscriptionService';

const initAPI = ({ host }) => {
  const config = {
    baseURL: host,
    timeout: 1000 * 60 * 20,
    headers: {
      common: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  };

  const instance = axios.create(config);
  // instance.get('https://your-energy.b.goit.study/api/filters', { params });

  return {
    axiosInstance: instance,
    exercises: new ExercisesService(instance),
    filters: new FiltersService(instance),
    quotes: new QuotesService(instance),
    subscription: new SubscriptionService(instance),
  };
};

const options = {
  host: 'https://your-energy.b.goit.study/api/',
};

const api = initAPI(options);

export default api;
