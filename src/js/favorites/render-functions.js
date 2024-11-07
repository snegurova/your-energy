u
export const createCard = ({
  bodyPart,
  target,
  burnedCalories,
  name
}) => `
    <li class="set-item list-item">
    <div class="favorite-header">
    <p class="workout">Workout</p>
    <svg class="favorites-icon" width="64" height="64">
      <use href="./images/favorites.svg#icon-icon"></use>
    </svg>
    <div class="start">
      <p class="workout">Start</p>
      <svg class="favorites-icon" width="32" height="32">
        <use href="./images/favorites.svg#icon-arrow"></use>
      </svg>
    </div>
    </div>

    <div class="start">
      <svg class="favorites-icon" width="32" height="32">
        <use href="./images/favorites.svg#icon-group"></use>
      </svg>
      <p class="name">${name}</p>
    </div>

    <div class="card-description">
      <p ><span>Body part:</span> ${bodyPart}</p>
      <p ><span>Target:</span> ${target}</p>
      <p ><span>Burned calories: </span> ${burnedCalories}</p>
    </div>
    </div>
</li>
  `;