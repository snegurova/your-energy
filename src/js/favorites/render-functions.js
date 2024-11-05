
export const createCard = ({
  bodyPart,
  target,
  burnedCalories,
  name
}) => `
<li>
    <div class="card-description">
      <span <span>Body part:</span> ${bodyPart}</span>
      <span ><span>Target:</span> ${target}</span>
      <span ><span>Name:</span> ${name}</span>
      <span ><span>Burned calories: </span> ${burnedCalories}</span>
    </div>
</li>
  `;