export const createCard = ({ filter, name, imgURL }) => {
  return `
  <li class="category-card">
    <a href="/" class="router-link category-link"
      data-filter="${filter}"
      data-page="1"
      data-limit="12"
      data-name="${name}"
      data-category="${getCategoryName(filter)}"
    >
      <div class="category-card-description">
        <span class="category-card-title">${name}</span>
        <span class="category-card-filter">${filter}</span>
      </div>
      <img lass="category-image" src="${imgURL}" alt="${name}" />
    </a>
  </li>
`;
};

function getCategoryName(category) {
  switch (category.toLowerCase()) {
    case 'body parts':
      return 'bodypart';
    case 'muscles':
      return 'muscles';
    case 'equipment':
      return 'equipment';
    default:
      return 'unknown';
  }
}
