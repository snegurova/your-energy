import { refs } from '../refs';
import api from '../api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
      iziToast.error({
        title: 'Error',
        message: 'Please enter a valid email address.',
        position: 'bottomRight',
        maxWidth: '400px',
      });
      return;
    }

    try {
      const response = await api.subscription.subscribe(emailValue);

      iziToast.success({
        title: 'Success',
        message: response.message,
        position: 'bottomRight',
        maxWidth: '400px',
      });
      event.target.reset();
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: error?.response?.data?.message ?? error.message,
        position: 'bottomRight',
        maxWidth: '400px',
      });
    }
  });
}

handleSubscription();
