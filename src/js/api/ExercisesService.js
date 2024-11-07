/**
 * Service class to interact with exercises API.
 */
export default class ExercisesService {
  #basePath = '/exercises';
  #axios;
  #page = 1;
  #filter = '';
  #name = '';
 

  /**
   * Creates an instance of ExercisesService.
   * @param {Object} axios - Axios instance for making HTTP requests.
   */
  constructor(axios) {
    this.#axios = axios;
  }

  /**
   * Gets the current page number.
   * @returns {number} The current page number.
   */
  get page() {
    return this.#page;
  }

  /**
   * Sets the current page number.
   * @param {number} value - The new page number (must be a positive number).
   */
  set page(value) {
    if (typeof value === 'number' && value >= 1) {
      this.#page = value;
    } else {
      console.warn('Page must be a positive number. Setting to 1.');
      this.#page = 1;
    }
  }

  /**
   * Gets the current filter string.
   * @returns {string} The current filter string.
   */
  get filter() {
    return this.#filter;
  }

  /**
   * Sets the filter string.
   * @param {string} value - The new filter string.
   */
  set filter(value) {
    if (typeof value === 'string') {
      this.#filter = value;
    } else {
      console.warn('Filter must be a string');
    }
  }

  /**
   * Gets the current name string.
   * @returns {string} The current name string.
   */
  get name() {
    return this.#name;
  }

  /**
   * Sets the name string.
   * @param {string} value - The new name string.
   */
  set name(value) {
    if (typeof value === 'string') {
      this.#name = value;
    } else {
      console.warn('Name must be a string');
    }
  }

  /**
   * Fetches exercises based on the current filters, name, and pagination.
   * @returns {Promise<Object>} The data of exercises fetched from the API.
   * @throws {Error} Throws an error if the request fails.
   */
  async getExercises() {
    try {
      const { data } = await this.#axios.get(
        `${this.#basePath}?${
          this.#filter && this.#name ? `${this.#filter}=${this.#name}&` : ''
        }&page=${this.#page}&limit=10`
      );
      console.log('ExercisesService getExercises data:', data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetches a specific exercise by its ID.
   * @param {string|number} id - The ID of the exercise to fetch.
   * @returns {Promise<Object>} The data of the exercise fetched from the API.
   * @throws {Error} Throws an error if the request fails.
   */
  async getExercisesById(id) {
    try {
      const { data } = await this.#axios.get(`${this.#basePath}/${id}`);
      console.log('ExercisesService getExercisesById data:', data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Adds a rating to a specific exercise by its ID.
   * @param {string|number} id - The ID of the exercise to rate.
   * @param {Object} body - The body of the request containing rating information.
   * @param {number} body.rate - The rating value (must be between 1 and 5).
   * @param {string} body.email - The email of the user providing the rating.
   * @param {string} body.review - The review text (must be at least 5 characters).
   * @returns {Promise<Object>} The updated data of the exercise after adding the rating.
   * @throws {Error} Throws an error if the request fails or if validation fails.
   */
  async addExerciseRatingById(id, body) {
    try {
      this.#validateBodyForRating(body);
      const { data } = await this.#axios.patch(
        `${this.#basePath}/${id}/rating`,
        body
      );
      console.log('ExercisesService addExerciseRatingById data:', data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Performs a search based on the provided keyword.
   *
   * @param {string} value - The search keyword.
   * @returns {Promise<Object>} A promise containing the result of the request.
   * @throws {Error} If the request fails or if the search value is empty.
   */
  async search(value) {
    if (!value || value.trim() === '') {
      throw new Error('Search value cannot be an empty string.');
    }

    try {
      const { data } = await this.#axios.get(
        `${this.#basePath}?${this.#filter}=${this.#name}&keyword=${value}`
      );
      console.log('ExercisesService search data:', data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Validates the body of the request for adding a rating.
   * @param {Object} body - The body of the request containing rating information.
   * @param {number} body.rate - The rating value (must be between 1 and 5).
   * @param {string} body.email - The email of the user providing the rating.
   * @param {string} body.review - The review text (must be at least 5 characters).
   * @throws {Error} Throws an error if validation fails.
   * @private
   */
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
