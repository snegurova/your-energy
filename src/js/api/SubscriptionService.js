/**
 * Service class to handle subscription functionality via email.
 */
export default class SubscriptionService {
  #basePath = '/subscription';
  #axios;

  /**
   * Creates an instance of SubscriptionService.
   * @param {Object} axios - Axios instance for making HTTP requests.
   */
  constructor(axios) {
    this.#axios = axios;
  }

  /**
   * Subscribes a user to the service using their email.
   * @param {string} email - The email address of the user to subscribe.
   * @returns {Promise<Object>} The data returned from the API after subscribing.
   * @throws {Error} Throws an error if the email is invalid or the request fails.
   */
  async subscribe(email) {
    try {
      this.#validateEmail(email);
      const { data } = await this.#axios.post(this.#basePath, { email });
      console.log('SubscriptionService subscribe data:', data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Validates the email address.
   * @param {string} email - The email address to validate.
   * @throws {Error} Throws an error if the email is invalid.
   * @private
   */
  #validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      const error = new Error('A valid email is required');
      error.code = 'INVALID_EMAIL';
      throw error;
    }
  }
}
