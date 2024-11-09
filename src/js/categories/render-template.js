export const createCard = ({ filter, name, imgURL }) => `
  <li class="category-card">
    <a href="/exercises?filter=${filter}&name=${name}" class="router-link">
      <div class="category-card-description">
        <span class="category-card-title">${name}</span>
        <span class="category-card-filter">${filter}</span>
      </div>
      <img src="${imgURL}" alt="${name}" />
    </a>
  </li>
`;
