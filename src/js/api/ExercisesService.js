import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { hideLoader, showLoader } from '../loader';

/**
 * Service class to interact with exercises API.
 */
export default class ExercisesService {
  #basePath = '/exercises';
  #axios;
  #page = 1;
  #filter = '';
  #name = '';

  constructor(axios) {
    this.#axios = axios;
  }

  get page() {
    return this.#page;
  }

  set page(value) {
    if (typeof value === 'number' && value >= 1) {
      this.#page = value;
    } else {
      console.warn('Page must be a positive number. Setting to 1.');
      this.#page = 1;
    }
  }

  get filter() {
    return this.#filter;
  }

  set filter(value) {
    if (typeof value === 'string') {
      this.#filter = value;
    } else {
      console.warn('Filter must be a string');
    }
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (typeof value === 'string') {
      this.#name = value;
    } else {
      console.warn('Name must be a string');
    }
  }

  async getExercises(params) {
    try {
      showLoader();
      const { data } = await this.#axios.get(this.#basePath, { params });
      return data;
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: error?.response?.data?.message ?? error.message,
        position: 'bottomRight',
        maxWidth: '400px',
      });
    } finally {
      hideLoader();
    }
  }

  async getExercisesById(id) {
    try {
      showLoader();
      const { data } = await this.#axios.get(`${this.#basePath}/${id}`);
      return data;
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: error?.response?.data?.message ?? error.message,
        position: 'bottomRight',
        maxWidth: '400px',
      });
    } finally {
      hideLoader();
    }
  }

  async addExerciseRatingById(id, body) {
    try {
      showLoader();
      this.#validateBodyForRating(body);
      const { data } = await this.#axios.patch(
        `${this.#basePath}/${id}/rating`,
        body
      );
      iziToast.success({
        title: 'Success',
        message: 'Rating added successfully',
        position: 'bottomRight',
        maxWidth: '400px',
      });
      return data;
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: error?.response?.data?.message ?? error.message,
        position: 'bottomRight',
        maxWidth: '400px',
      });
    } finally {
      hideLoader();
    }
  }

  async search(value) {
    if (!value || value.trim() === '') {
      throw new Error('Search value cannot be an empty string.');
    }

    try {
      showLoader();
      const { data } = await this.#axios.get(
        `${this.#basePath}?${this.#filter}=${this.#name}&keyword=${value}`
      );
      // console.log('ExercisesService search data:', data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      hideLoader();
    }
  }

  #validateBodyForRating(body) {
    const { rate, email, review } = body;

    if (!rate || rate < 1 || rate > 5) {
      const error = new Error('Rate must be between 1 and 5');
      error.code = 'INVALID_RATE';
      throw error;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      const error = new Error('A valid email is required');
      error.code = 'INVALID_EMAIL';
      throw error;
    }

    if (!review || review.length < 5) {
      const error = new Error('Review must be at least 5 characters long');
      error.code = 'INVALID_REVIEW';
      throw error;
    }
  }
}
