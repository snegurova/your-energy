

import api from "./api";

async function setupPagination(callback) {
  const initialData = await getExercises(1);
  const totalPages = initialData.totalPages;
  let currentPage = 1;

  const firstBtn = document.getElementById("first-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const lastBtn = document.getElementById("last-btn");
  const pageInfo = document.getElementById("page-info");

  function renderPagination() {
    let pages = [];
  
    if (totalPages <= 3) {
      // If there are 3 or fewer pages, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Display dots and pages based on the current page position
      if (currentPage > 2) {
        // Add the first page and dots if we're beyond page 2
        pages.push(1);
        pages.push("...");
      }
  
      // Define the range to show around the current page
      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(totalPages, currentPage + 1);
  
      // Adjust startPage and endPage to ensure three pages are shown if possible
      if (currentPage === 1) {
        endPage = 3; // Show pages 1, 2, 3 at the start
      } else if (currentPage === totalPages) {
        startPage = totalPages - 2; // Show last three pages
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
  
      if (currentPage < totalPages - 1) {
        // Add dots and the last page if we're not near the end
        pages.push("...");
        pages.push(totalPages);
      }
    }
  
    // Render pagination buttons with dots
    pageInfo.innerHTML = pages
      .map(page => {
        if (page === "...") {
          return `<span class="dots">${page}</span>`;
        }
        return `<button class="page-number ${page === currentPage ? 'active' : ''}" data-page="${page}">${page}</button>`;
      })
      .join(" ");
  
    callback(currentPage);
  }
  
  async function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      await fetchAndRenderExercises(currentPage);
      renderPagination();
    }
  }

  async function fetchAndRenderExercises(page) {
    const data = await getExercises(page);
    console.log("Current Page Data:", data.results);

  }

  firstBtn.addEventListener("click", () => goToPage(1));
  prevBtn.addEventListener("click", () => goToPage(currentPage - 1));
  nextBtn.addEventListener("click", () => goToPage(currentPage + 1));
  lastBtn.addEventListener("click", () => goToPage(totalPages));

  pageInfo.addEventListener("click", (e) => {
    if (e.target.classList.contains("page-number")) {
      goToPage(parseInt(e.target.getAttribute("data-page")));
    }
  });


  await fetchAndRenderExercises(currentPage);
  renderPagination();
}


setupPagination((page) => console.log("Current Page:", page));

async function getExercises(page = 1) {
  api.exercises.page = page;
  const data = await api.exercises.getExercises();
  console.log(data, "Fetched Data for Page", page);
  return data;
}




