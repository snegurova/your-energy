export const appendBreadcrumbs = (categoryName) => {
  const breadcrumbEl = document.querySelector('.main-exercises-breadcrumbs');
  if (breadcrumbEl) {
    const searchContainerEl = document.createElement('div');
    searchContainerEl.classList.add('main-breadcrumb-title');
    searchContainerEl.innerHTML = ` / <span>${categoryName}</span>`;
    breadcrumbEl.append(searchContainerEl);
  }
};

export const removeBreadcrumbs = () => {
  const breadcrumbTitleEl = document.querySelector('.main-breadcrumb-title');
  if (breadcrumbTitleEl) {
    breadcrumbTitleEl.remove();
  }
};
