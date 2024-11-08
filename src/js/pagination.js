

let firstBtn;
let prevBtn;
let nextBtn;
let lastBtn;
let pageInfo;
let currentPage = 1;
let totalPages = 0;

export const getContentPagination = () => {
  firstBtn = document.getElementById("first-btn");
  prevBtn = document.getElementById("prev-btn");
  nextBtn = document.getElementById("next-btn");
  lastBtn = document.getElementById("last-btn");
  pageInfo = document.getElementById("page-info");

  console.log("Pagination elements initialized:", {
    firstBtn,
    prevBtn,
    nextBtn,
    lastBtn,
    pageInfo,
  });
};

export async function initPagination(callback) {
  getContentPagination();
  const initialData = await callback(1);
  console.log("initialData", initialData)
  totalPages = initialData.totalPages;
  currentPage = 1;


  renderPagination(callback);

  firstBtn.addEventListener("click", () => goToPage(1, callback));
  prevBtn.addEventListener("click", () => goToPage(currentPage - 1, callback));
  nextBtn.addEventListener("click", () => goToPage(currentPage + 1, callback));
  lastBtn.addEventListener("click", () => goToPage(totalPages, callback));


}

function renderPagination(callback) {
  if (!pageInfo) {
    console.error("pageInfo element not found.");
    return;
  }

  let pages = [];
  console.log("Rendering pagination. Current page:", currentPage,);

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage > 2) {
      pages.push(1);
      pages.push("...");
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
      pages.push("...");
      pages.push(totalPages);
    }
  }

  pageInfo.innerHTML = pages
    .map(page => {
      if (page === "...") {
        return `<span class="dots">${page}</span>`;
      }
      return `<button class="page-number ${page === currentPage ? 'active' : ''}" data-page="${page}" value="${page}">${page}</button>`;
    })
    .join(" ");

  document.querySelectorAll(".page-number").forEach(button => {
    button.addEventListener("click", (event) => {
      goToPage(Number(event.target.value), callback);
    });
  });
}

async function goToPage(page, callback) {
  console.log("Navigating to page:", page);
  if (page >= 1 && page <= totalPages && page !== currentPage) {
    currentPage = page;
    const data = await callback(page);
    totalPages = data.totalPages;
    console.log("Total pages", totalPages)
    renderPagination(callback);
  }
}


