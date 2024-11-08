/**
 * Service class to interact with quotes API.
 */
export default class QuotesService {
  #basePath = '/quote';
  #axios;

  /**
   * Creates an instance of QuotesService.
   * @param {Object} axios - Axios instance for making HTTP requests.
   */
  constructor(axios) {
    this.#axios = axios;
  }

  /**
   * Fetches the quote of the day.
   * @returns {Promise<Object>} The data of the quote fetched from the API.
   * @throws {Error} Throws an error if the request fails.
   */
  async getQuote() {
    try {
      const { data } = await this.#axios.get(this.#basePath);
      // console.log('QuotesService getQuote data:', data);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
