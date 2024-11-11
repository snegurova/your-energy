/**
 * Service class to handle subscription functionality via email.
 */
export default class SubscriptionService {
  #basePath = '/subscription';
  #axios;

  constructor(axios) {
    this.#axios = axios;
  }

  async subscribe(email) {
    try {
      this.#validateEmail(email);
      const { data } = await this.#axios.post(this.#basePath, { email });
      return data;
    } catch (error) {
      throw error;
    }
  }

  #validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      const error = new Error('A valid email is required');
      error.code = 'INVALID_EMAIL';
      throw error;
    }
  }
}
