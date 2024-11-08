import axios from 'axios';
import { refs } from '../refs'; 


const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const subscribeForm = refs.subscribeForm;
const emailInput = refs.emailInput;
const submitButton = refs.submitButton;

subscribeForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const emailValue = emailInput.value.trim();


  if (!emailPattern.test(emailValue)) {
    alert('Please enter a valid email address');
    return;
  }

  try {
    const response = await axios.post(
      'https://your-energy.b.goit.study/api/subscription',
      {
        email: emailValue,
      }
    );

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
