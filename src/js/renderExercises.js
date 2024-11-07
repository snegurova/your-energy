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
     <li class="exercises-card">
      <div class="exercises-top">
        <div class="exercises-top-group">
            <span class="exercises-equipment">${equipment}</span>
            <span class="exercises-rating-group">
              <span class="exercises-rating">${rating.toFixed(1)}</span>
              <button class="exercises-favorite-btn" type="button">
                <svg>
                  <use href="./images/sprite.svg#icon-star"></use>
                </svg>
              </button>
            </span>
        </div>
        <button type="button" class="exercises-btn start-btn" data-id="${_id}">
          Start
          <svg width="13" height="13">
            <use href="./images/sprite.svg#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div class="exercises-content">
        <span class="exercises-icon">
          <svg width="14" height="16">
            <use href="./images/sprite.svg#icon-man"></use>
          </svg>
        </span>
        <h3 class="exercises-name">${name}</h3>
      </div>
      <ul class="exercises-attributes">
        <li><p><span class="exercises-attributes-label">Burned calories:</span><span class="exercises-attributes-value">${burnedCalories} / ${time} min</></p></li>
        <li><p><span class="exercises-attributes-label">Body part:</span><span class="exercises-attributes-value">${bodyPart}</></p></li>
        <li><p><span class="exercises-attributes-label">Target:</span><span class="exercises-attributes-value">${target}</></p></li>
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
