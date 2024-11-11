import {
  updateParameter,
  pushState,
  SEARCH_PARAMS,
  handleLocation,
} from '../main';

let totalPages;
let currentPage;

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const firstBtn = document.getElementById('first-btn');
const lastBtn = document.getElementById('last-btn');
const pageInfo = document.getElementById('page-info');

export const initPagination = (callback, current, total) => {
  currentPage = +current;
  totalPages = total;

  renderPagination(callback);

  firstBtn.addEventListener('click', () => goToPage(1, callback));
  prevBtn.addEventListener('click', () =>
    goToPage(currentPage === 1 ? 1 : currentPage - 1, callback)
  );
  nextBtn.addEventListener('click', () =>
    goToPage(
      currentPage === totalPages ? totalPages : currentPage + 1,
      callback
    )
  );
  lastBtn.addEventListener('click', () => goToPage(totalPages, callback));
};

export const renderPagination = (
  callback,
  current,
  total,
  isInitPagination
) => {
  if (!pageInfo || (!current && !total) || !callback) {
    return;
  }

  if ((!currentPage && !totalPages) || isInitPagination) {
    initPagination(callback, current, total);
  }

  let pages = [];
  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage > 2) {
      pages.push(1);
      pages.push('...');
    }

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (currentPage === 1) {
      endPage = 3;
    } else if (currentPage === totalPages) {
      startPage = totalPages - 2;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 1) {
      pages.push('...');
      pages.push(totalPages);
    }
  }

  pageInfo.innerHTML = pages
    .map((page) => {
      if (page === '...') {
        return `<span class="dots">${page}</span>`;
      }
      return `<button value="${page}" class="pagination-btn page-number ${
        page === currentPage ? 'active' : ''
      }" data-page="${page}" value="${page}"><span class="numbers button-content ${
        page > 9 ? 'large' : ''
      }">${page}</span></button>`;
    })
    .join(' ');

  document.querySelectorAll('.page-number').forEach((button) => {
    button.addEventListener('click', (event) => {
      goToPage(Number(event.currentTarget.value), callback);
    });
  });
};

async function goToPage(page, callback) {
  currentPage = page;
  callback(page);
  renderPagination(callback);
}

export const paginationCallback = (page) => {
  const url = updateParameter(SEARCH_PARAMS.PAGE, page, true);
  pushState(url);
  handleLocation();
};
