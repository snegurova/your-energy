import { pushState } from '../../main';
import icons from '../../images/sprite.svg';

function debounce(f, t) {
  return function (args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (previousCall && this.lastCall - previousCall <= t) {
      clearTimeout(this.lastCallTimer);
    }
    this.lastCallTimer = setTimeout(() => f(args), t);
  };
}

function onSearch(e) {
  const searchQuery = e.target.value.trim();
  const url = new URL(window.location.href);
  url.searchParams.set('keyword', searchQuery);
  url.searchParams.set('page', 1);
  pushState(url, {
    isInitPagination: true,
  });
}

export const appendSearch = (urlParams) => {
  const filtersContainerEl = document.querySelector('.main-filters-container');
  if (filtersContainerEl) {
    const searchContainerEl = document.createElement('div');
    searchContainerEl.classList.add('search-container');
    searchContainerEl.innerHTML = `<input class="search-exercises" type="text" id="search" name="search" placeholder="Search" /><svg class="search-icon" width="18" height="18"><use href="${icons}#icon-search"></use></svg>`;
    filtersContainerEl.prepend(searchContainerEl);
    const searchEl = document.querySelector('.search-exercises');
    searchEl.addEventListener('input', debounce(onSearch, 500));
  }
};

export const removeSearch = () => {
  const searchContainerEl = document.querySelector('.search-container');
  if (searchContainerEl) {
    searchContainerEl.remove();
  }
};
