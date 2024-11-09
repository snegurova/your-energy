import { refs } from '../refs';
import { api } from './subscription-api';

const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export function handleSubscription() {
  const subscribeForm = refs.subscribeForm;
  const emailInput = refs.emailInput;
  const submitButton = refs.submitButton;

  if (!subscribeForm) {
    console.error('Subscription form element not found in DOM.');
    return;
  }

  subscribeForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailValue = emailInput.value.trim();
    console.log('Submitting email:', emailValue);

    if (!emailPattern.test(emailValue)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      const response = await api.subscription.subscribe(emailValue);
      console.log('Subscription response:', response);

      if (response && response.status === 200) {
        alert(response.message || 'Subscription successful!'); 
        emailInput.value = ''; 
      } else if (response && response.status === 409) {
        alert('This email is already subscribed.'); 
      } else if (response && response.message) {
        alert(response.message); 
      } else {
        alert('Failed to subscribe. Please try again.'); 
      }
    } catch (error) {
      console.error('Error during subscription:', error);
      alert('An error occurred. Please try again later.'); 
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  handleSubscription(); 
});
