// import storageService from '../services/storage';
import { refs } from '../refs';
import renderExerciseById from './render-exercise';

refs.startModal.addEventListener('click', handleOpenModal);

async function handleOpenModal(event) {
  if (!event.target.closest('.start-btn')) return;
  const exerciseId = event.target.closest('.start-btn').getAttribute('data-id');

  refs.backdrop.classList.remove('is-hidden');
  refs.backdrop.addEventListener('click', handleBackdropClick);
  refs.closeModalBtn.addEventListener('click', handleCloseModal);
  window.addEventListener('keydown', handleEscKey);

  await renderExerciseById(exerciseId);
}

function handleCloseModal() {
  refs.backdrop.classList.toggle('is-hidden');
  refs.backdrop.removeEventListener('click', handleBackdropClick);
  refs.closeModalBtn.removeEventListener('click', handleCloseModal);
  window.removeEventListener('keydown', handleEscKey);

  refs.modalEl.innerHTML = '';
}

function handleBackdropClick(event) {
  if (event.target === event.currentTarget) {
    handleCloseModal();
  }
}

function handleEscKey(event) {
  if (event.code === 'Escape') {
    handleCloseModal();
  }
}
