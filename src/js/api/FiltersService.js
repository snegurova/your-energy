/**
 * Service class to interact with filters API.
 */
export default class FiltersService {
  #basePath = '/filters';
  #axios;
  #page = 1;
  #filter = '';

  static FilterTypes = {
    BODY_PARTS: 'Body parts',
    MUSCLES: 'Muscles',
    EQUIPMENT: 'Equipment',
  };

  /**
   * Creates an instance of FiltersService.
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
   * Sets the filter string. Only allows specific enum values.
   * @param {string} value - The new filter string.
   */
  set filter(value) {
    if (Object.values(FiltersService.FilterTypes).includes(value)) {
      this.#filter = value;
    } else {
      console.warn(
        `Invalid filter value. Allowed values are: ${Object.values(
          FiltersService.FilterTypes
        ).join(', ')}`
      );
    }
  }

  /**
   * Fetches filters for exercises based on the current filter and pagination.
   * @returns {Promise<Object>} The data of filters fetched from the API.
   * @throws {Error} Throws an error if the request fails.
   */
  async getFilters(params) {
    try {
      const { data } = await this.#axios.get(this.#basePath, params);
      // console.log('FiltersService getFilters data:', data);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
