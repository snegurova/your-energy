import spriteUrl from '../../images/sprite.svg';

export const createCard = ({
   bodyPart,
   target,
   equipment,
   burnedCalories,
   name,
   time,
   _id
}) => `<li class="exercises-card" data-id="${_id}">
      <div class="exercises-top">
        <div class="exercises-top-group">
            <span class="exercises-equipment">${equipment}</span>
            <button class="exercises-delete-btn" data-id="${_id}" type="button">
            <svg>
              <use href="${spriteUrl}#icon-trash"></use>
            </svg>
          </button>
          </div>
        <button type="button" class="exercises-btn start-btn" data-id="${_id}">
          Start
          <svg width="13" height="13">
            <use href="${spriteUrl}#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div class="exercises-content">
        <span class="exercises-icon">
          <svg width="14" height="16">
            <use href="${spriteUrl}#icon-man"></use>
          </svg>
        </span>
        <p class="exercises-name name">${name}</p>
      </div>
      <ul class="exercises-attributes">
        <li><p><span class="exercises-attributes-label">Burned calories:</span><span class="exercises-attributes-value">${burnedCalories} / ${time} min</></p></li>
        <li><p><span class="exercises-attributes-label">Body part:</span><span class="exercises-attributes-value">${bodyPart}</></p></li>
        <li><p><span class="exercises-attributes-label">Target:</span><span class="exercises-attributes-value">${target}</></p></li>
      </ul>
    </li>
    `;
  