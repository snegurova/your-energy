document.addEventListener("DOMContentLoaded", async () => {
  setupPagination((event) => {
    console.log("Clicked Page:", event.target.value);
  });
});

import api from "./api";

async function setupPagination(callback) {
  const initialData = await getExercises(1);
  const totalPages = initialData.totalPages;
  let currentPage = 1;

  // Select pagination elements and verify their existence
  const firstBtn = document.getElementById("first-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const lastBtn = document.getElementById("last-btn");
  const pageInfo = document.getElementById("page-info");

  if (!firstBtn || !prevBtn || !nextBtn || !lastBtn || !pageInfo) {
    console.error("Pagination buttons or container not found in the DOM.");
    if (!firstBtn) console.error("Missing element: first-btn");
    if (!prevBtn) console.error("Missing element: prev-btn");
    if (!nextBtn) console.error("Missing element: next-btn");
    if (!lastBtn) console.error("Missing element: last-btn");
    if (!pageInfo) console.error("Missing element: page-info");
    return; // Exit if any element is missing
  }

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
    
    // Add event listeners to each page button
    document.querySelectorAll(".page-number").forEach(button => {
      button.addEventListener("click", callback);
    });
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

  // Attach event listeners to navigation buttons
  firstBtn.addEventListener("click", () => goToPage(1));
  prevBtn.addEventListener("click", () => goToPage(currentPage - 1));
  nextBtn.addEventListener("click", () => goToPage(currentPage + 1));
  lastBtn.addEventListener("click", () => goToPage(totalPages));

  // Initial fetch and render
  await fetchAndRenderExercises(currentPage);
  renderPagination();
}

// Example callback for setupPagination
setupPagination((event) => {
  console.log("Clicked Page:", event.target.value);
});

// Fetch function
async function getExercises(page = 1) {
  api.exercises.page = page;
  const data = await api.exercises.getExercises();
  console.log(data, "Fetched Data for Page", page);
  return data;
}
