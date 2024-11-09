export const createCard = ({
   bodyPart,
   target,
   equipment,
   burnedCalories,
   name,
   time,
   _id
}) => `
 <li class="exercises-card set-item">
      <div class="exercises-top">
        <div class="exercises-top-group">
            <span class="exercises-equipment">${equipment}</span>
        <button class="remove-from-favorites" type="button" data-id="${_id}">
            <svg class="favorites-icon"><use href="./images/sprite.svg#icon-trash"></use></svg>
        </button>
        </div>
        <button type="button" class="exercises-btn start-btn">
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
  