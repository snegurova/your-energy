import api from './js/api';

async function getExercises() {
  api.exercises.page = 2;
  api.exercises.filter = 'bodypart';
  api.exercises.name = 'back';
  await api.exercises.getExercises();
}

async function getExercisesById(id) {
  await api.exercises.getExercisesById(id);
}

async function addExerciseRatingById(id, body) {
  await api.exercises.addExerciseRatingById(id, body);
}

async function search(value) {
  await api.exercises.search(value);
}

async function getFilters() {
  api.filters.page = 2;
  api.filters.filter = 'Muscle';
  await api.filters.getFilters();
}

async function getQuote() {
  await api.quotes.getQuote();
}

async function subscribe(email) {
  api.subscription.subscribe(email);
}

// getExercises();
// getExercisesById('64f389465ae26083f39b17af');
// addExerciseRatingById('64f389465ae26083f39b17af', {
//   email: 'test22222@gmail.com', // Need change email
//   rate: 5,
//   review: 'Thanks for your exercise!',
// });
// search('body');

// getFilters();
// getQuote();
// subscribe('test2222222222aa@gmail.com'); // Need change email
