import { refs } from '../refs';
import api from '../api';
import spriteUrl from '../../images/sprite.svg';

refs.startModal.addEventListener('click', handleOpenRateModal);

const createRateBtn = (rate) => {
  return `<li class="rate-modal-star-item"><input required class="rate-modal-radio" type="radio" id="star${rate}" name="rate" value="${rate}">
  <label for="star${rate}" class="rate-modal-label">
        <svg class="star-icon" aria-hidden="true">
          <use href="${spriteUrl}#icon-star"></use>
        </svg>
      </label></li>`;
};

function handleOpenRateModal(event) {
  if (!event.target.closest('.open-exercise-rate-modal')) return;
  const exerciseId = event.target
    .closest('.open-exercise-rate-modal')
    .getAttribute('data-id');

  refs.rateBackdrop.classList.remove('is-hidden');
  refs.rateBackdrop.addEventListener('click', handleBackdropClick);
  refs.rateCloseModalBtn.addEventListener('click', handleCloseRateModal);
  window.addEventListener('keydown', handleEscKey);

  let markup = '';

  for (let i = 1; i <= 5; i++) {
    markup += createRateBtn(i);
  }

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
  document.body.style.overflow = 'auto';
  refs.rateModalEl.reset();
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

const handleRateSubmit = async (e) => {
  e.preventDefault();
  const exerciseId = refs.rateModalEl.getAttribute('data-id');

  const body = {
    rate: Number(e.target.elements.rate.value),
    email: e.target.elements.email.value,
    review: e.target.elements.review.value,
  };

  const res = await api.exercises.addExerciseRatingById(exerciseId, body);

  if (res) {
    e.target.reset();

    handleCloseRateModal();
  }
};

refs.rateModalEl.addEventListener('submit', handleRateSubmit);
