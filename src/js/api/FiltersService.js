import { hideLoader, showLoader } from '../loader';

/**
 * Service class to interact with filters API.
 */
export default class FiltersService {
  #basePath = '/filters';
  #axios;

  constructor(axios) {
    this.#axios = axios;
  }

  async getFilters(params) {
    try {
      showLoader();
      const { data } = await this.#axios.get(this.#basePath, { params });
      return data;
    } catch (error) {
      throw error;
    } finally {
      hideLoader();
    }
  }
}
