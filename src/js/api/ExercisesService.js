import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { hideLoader, showLoader } from '../loader';

/**
 * Service class to interact with exercises API.
 */
export default class ExercisesService {
  #basePath = '/exercises';
  #axios;

  constructor(axios) {
    this.#axios = axios;
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
