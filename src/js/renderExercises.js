import { fetchExercises } from './api/fetchExercises';

const createExerciseCard = ({
  bodyPart,
  equipment,
  gifUrl,
  name,
  target,
  description,
  rating,
  burnedCalories,
  time,
  popularity,
  _id,
}) => {
  return `
     <li>
      <div class="">
        <div class="">
            <span>${equipment}</span>
            <span>${rating}</span>
        </div>
        <button type="button">Start</button>
      </div>
      <div class="">
        <span>icon</span>
        <h3>${name}</h3>
      </div>
      <ul class="">
        <li>Burned calories: <span>${burnedCalories}</span></li>
        <li>Body part: <span>${bodyPart}</span></li>
        <li>Target: <span>${target}</span></li>
      </ul>
    </li>
    `;
};

export const renderExercises = async options => {
  const res = await fetchExercises(options);
  const exercises = res.results;
  console.log(exercises);

  const cards = exercises.reduce((acc, exercise) => {
    return acc + createExerciseCard(exercise);
  }, '');

  const container = document.querySelector('.main-exercises');
  container.innerHTML = cards;
};
