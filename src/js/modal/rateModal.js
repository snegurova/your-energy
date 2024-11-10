import { refs } from '../refs';
import api from '../api';
import spriteUrl from '../../images/sprite.svg';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { handleCloseModal, openModal } from './modal';

refs.startModal.addEventListener('click', handleOpenRateModal);

const createRateBtn = (rate) => {
  return `<li class="rate-modal-star-item"><input class="rate-modal-radio" type="radio" id="star${rate}" name="rate" value="${rate}">
  <label for="star${rate}" class="rate-modal-label">
        <svg class="star-icon" aria-hidden="true">
          <use href="${spriteUrl}#icon-star"></use>
        </svg>
      </label></li>`;
};

let isEnteredFromModal = false;

async function handleOpenRateModal(event) {
  if (!event.target.closest('.open-exercise-rate-modal')) return;
  const exerciseId = event.target
    .closest('.open-exercise-rate-modal')
    .getAttribute('data-id');

  isEnteredFromModal = !refs.backdrop.classList.contains('is-hidden');
  if (isEnteredFromModal) {
    handleCloseModal();
  }
  refs.rateBackdrop.classList.remove('is-hidden');
  refs.rateBackdrop.addEventListener('click', handleBackdropClick);
  refs.rateCloseModalBtn.addEventListener('click', handleCloseRateModal);
  window.addEventListener('keydown', handleEscKey);

  let markup = '';

  for (let i = 1; i <= 5; i++) {
    markup += createRateBtn(i);
  }

  const res = await api.exercises.getExercisesById(exerciseId);
  refs.rateValue.textContent = res.rating.toFixed(1);

  const container = document.querySelector('.rate-modal-stars');
  refs.rateModalEl.setAttribute('data-id', exerciseId);

  document.body.style.overflow = 'hidden';
  container.innerHTML = markup;
}

function handleCloseRateModal() {
  refs.rateBackdrop.classList.toggle('is-hidden');
  refs.rateBackdrop.removeEventListener('click', handleBackdropClick);
  refs.rateCloseModalBtn.removeEventListener('click', handleCloseRateModal);
  window.removeEventListener('keydown', handleEscKey);

  if (isEnteredFromModal) {
    openModal(refs.rateModalEl.getAttribute('data-id'));
  }

  refs.rateModalEl.reset();
  document.body.style.overflow = 'auto';
}

function handleBackdropClick(event) {
  if (event.target === event.currentTarget) {
    handleCloseRateModal();
  }
}

function handleEscKey(event) {
  if (event.code === 'Escape') {
    handleCloseRateModal();
  }
}

const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const handleRateSubmit = async (e) => {
  e.preventDefault();
  const email = e.target.elements.email.value.trim();
  const rate = e.target.elements.rate.value;
  const review = e.target.elements.review.value;
  if (!rate) {
    iziToast.error({
      title: 'Error',
      message: 'Please rate the exercise.',
      position: 'bottomRight',
      maxWidth: '400px',
    });
    return;
  }
  if (!review) {
    iziToast.error({
      title: 'Error',
      message: 'Please leave a review.',
      position: 'bottomRight',
      maxWidth: '400px',
    });
    return;
  }
  if (!email || !emailPattern.test(email)) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a valid email address.',
      position: 'bottomRight',
      maxWidth: '400px',
    });
    return;
  }
  const exerciseId = refs.rateModalEl.getAttribute('data-id');

  const body = {
    rate: Number(rate),
    email,
    review,
  };

  const res = await api.exercises.addExerciseRatingById(exerciseId, body);

  if (res) {
    e.target.reset();

    handleCloseRateModal();
  }
};

refs.rateModalEl.addEventListener('submit', handleRateSubmit);
