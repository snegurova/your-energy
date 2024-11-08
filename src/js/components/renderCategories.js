const categoryMarkup = ({ filter, name, imgURL }) => `
  <li>
    <a href="/exercises?filter=${filter}&name=${name}" class="category-card router-link">
      <div class="category-card-description">
        <span class="category-card-title">${name}</span>
        <span class="category-card-filter">${filter}</span>
      </div>
      <img src="${imgURL}" alt="${name}" />
    </a>
  </li>
`;

const renderCategories = async (data) => {
  const categoriesContainer = document.querySelector('.category-list');
  if (!categoriesContainer) {
    console.error("Елемент '.categories' не знайдено.");
    return;
  }
  const categoriesMarkup = data.map(categoryMarkup).join('');
  categoriesContainer.innerHTML = categoriesMarkup;
};

export default renderCategories;
