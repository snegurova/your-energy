export const createCard = ({ filter, name, imgURL }) => `
  <li class="category-card">
    <a href="/" class="router-link category-link"
      data-filter=${filter}
      data-page="1"
      data-limit="12"
      data-name=${name}
    >
      <div class="category-card-description">
        <span class="category-card-title">${name}</span>
        <span class="category-card-filter">${filter}</span>
      </div>
      <img lass="category-image" src="${imgURL}" alt="${name}" />
    </a>
  </li>
`;
