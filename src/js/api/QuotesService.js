/**
 * Service class to interact with quotes API.
 */
export default class QuotesService {
  #basePath = '/quote';
  #axios;

  constructor(axios) {
    this.#axios = axios;
  }

  async getQuote() {
    try {
      const { data } = await this.#axios.get(this.#basePath);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
