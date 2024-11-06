// render-template.js
export const createCard = ({ filter, name, imgURL }) => `
<li>
  <div class="category-card">
    <img src="${imgURL}" alt="${name}" class="category-card-img" />
    <div class="category-card-description">
      <span class="category-card-title">${name}</span>
      <span class="category-card-filter">${filter}</span>
    </div>
  </div>
</li>
`;
