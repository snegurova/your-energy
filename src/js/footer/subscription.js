import { refs } from '../refs';
import api from '../api';

const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export function handleSubscription() {
  const subscribeForm = refs.subscribeForm;
  const emailInput = refs.emailInput;
  const submitButton = refs.submitButton;

  if (!subscribeForm) {
    return;
  }

  subscribeForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailValue = emailInput.value.trim();

    if (!emailPattern.test(emailValue)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      const response = await api.subscription.subscribe(emailValue);

      if (response.status === 200) {
        alert('Subscription successful!');
        emailInput.value = '';
      } else {
        alert('Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Error during subscription:', error);
      alert('An error occurred. Please try again later.');
    }
  });
}
