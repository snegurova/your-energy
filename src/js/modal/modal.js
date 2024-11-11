import { refs } from '../refs';
import renderExerciseById from './renderExercise';
import { getFavorites } from '../favorites/favorites-api';
refs.startModal.addEventListener('click', handleOpenModal);

function handleOpenModal(event) {
  if (!event.target.closest('.start-btn')) return;
  const exerciseId = event.target.closest('.start-btn').getAttribute('data-id');

  openModal(exerciseId);
}

export function openModal(exerciseId) {
  refs.backdrop.classList.remove('is-hidden');
  refs.backdrop.addEventListener('click', handleBackdropClick);
  refs.closeModalBtn.addEventListener('click', handleCloseModal);
  window.addEventListener('keydown', handleEscKey);

  document.body.style.overflow = 'hidden';
  renderExerciseById(exerciseId);
}

export function handleCloseModal() {
  refs.backdrop.classList.toggle('is-hidden');
  refs.backdrop.removeEventListener('click', handleBackdropClick);
  refs.closeModalBtn.removeEventListener('click', handleCloseModal);
  window.removeEventListener('keydown', handleEscKey);

  refs.modalEl.innerHTML = '';
  document.body.style.overflow = 'auto';
  const favorites = document.querySelector('.favorites');
  if (favorites) {
    getFavorites();
  }
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
