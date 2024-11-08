document.addEventListener("DOMContentLoaded", async () => {
  setupPagination(fetchAndRenderExercises);
});

import api from "./api";

async function fetchAndRenderExercises(page) {
  const data = await getExercises(page);
  console.log("Current Page Data:", data.results);

}

let firstBtn;
let prevBtn;
let nextBtn;
let lastBtn;
let pageInfo;

export const getContentPagination = () => {
  firstBtn = document.getElementById("first-btn");
  prevBtn = document.getElementById("prev-btn");
  nextBtn = document.getElementById("next-btn");
  lastBtn = document.getElementById("last-btn");
  pageInfo = document.getElementById("page-info");
};

async function setupPagination(callback) {
  getContentPagination();


  const initialData = await getExercises(1);
  const totalPages = initialData.totalPages;
  let currentPage = 1;

  function renderPagination() { 
    let pages = [];

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
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      currentPage = page;
      await callback(page);  
      renderPagination();    
    }
  }


  firstBtn.addEventListener("click", () => goToPage(1, callback));
  prevBtn.addEventListener("click", () => goToPage(currentPage - 1, callback));
  nextBtn.addEventListener("click", () => goToPage(currentPage + 1, callback));
  lastBtn.addEventListener("click", () => goToPage(totalPages, callback));

 
  await callback(currentPage); 
  renderPagination();
}


async function getExercises(page = 1) {
  api.exercises.page = page;
  const data = await api.exercises.getExercises();
  console.log(data, "Fetched Data for Page", page);
  return data;
}
