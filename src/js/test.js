
import api from "./api";
function renderPaginationControls() {
    console.log('Rendering pagination controls'); 
    const container = document.querySelector('.pagination-container');
    if (!container) {
      console.warn('Container with class "pagination-container" not found.');
      return;
    }
  
    container.innerHTML = ''; 
  
    const firstBtn = document.createElement('button');
    firstBtn.id = 'first-btn';
    firstBtn.disabled = true;
    firstBtn.innerHTML = '&laquo;';
    firstBtn.addEventListener('click', goToFirstPage);
  
    const prevBtn = document.createElement('button');
    prevBtn.id = 'prev-btn';
    prevBtn.disabled = true;
    prevBtn.innerHTML = '&lsaquo;';
    prevBtn.addEventListener('click', goToPreviousPage);
  
    const pageInfo = document.createElement('span');
    pageInfo.id = 'page-info';
    pageInfo.textContent = 'Page 1 of 1';
  
    const nextBtn = document.createElement('button');
    nextBtn.id = 'next-btn';
    nextBtn.innerHTML = '&rsaquo;';
    nextBtn.addEventListener('click', goToNextPage);
  
    const lastBtn = document.createElement('button');
    lastBtn.id = 'last-btn';
    lastBtn.innerHTML = '&raquo;';
    lastBtn.addEventListener('click', goToLastPage);
  

    container.appendChild(firstBtn);
    container.appendChild(prevBtn);
    container.appendChild(pageInfo);
    container.appendChild(nextBtn);
    container.appendChild(lastBtn);
  }
  





  async function getExercises(page = 1) {
    api.exercises.page = page; 
    const data = await api.exercises.getExercises();
    console.log(data, "my data 1111111111111")
    return data; 
  }




  let totalPages = 0;

async function loadExercises(page = 1) {
  try {
    console.log('Setting page to:', page);

    // Fetch data from getExercises
    const data = await getExercises(page);

    console.log('Received data from API:', data);
    
    // Check if totalPages and results exist in the response
    if (!data.totalPages || !data.results) {
      throw new Error('Invalid data format from API. Expected totalPages and results.');
    }

    // Update totalPages from the data and display results
    totalPages = data.totalPages;
    displayExercises(data.results);
    updatePaginationControls();
  } catch (error) {
    console.error('Failed to load exercises:', error);
  }
}



function displayExercises(exercises) {
  console.log('Displaying exercises:', exercises);
  const container = document.getElementById('exercises-container');
  container.innerHTML = exercises
    .map(
      (exercise) => `
        <div class="exercise">
          <h3>${exercise.name}</h3>
          <img src="${exercise.gifUrl}" alt="${exercise.name}">
          <p>${exercise.description}</p>
          <p><strong>Calories:</strong> ${exercise.burnedCalories}</p>
          <p><strong>Rating:</strong> ${exercise.rating}</p>
        </div>
      `
    )
    .join('');
}

function updatePaginationControls() {
  const currentPage = api.exercises.page;
  console.log('Updating pagination controls. Current page:', currentPage, 'Total pages:', totalPages);
  
  document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;

  // Enable/disable navigation buttons based on the current page
  document.getElementById('first-btn').disabled = currentPage === 1;
  document.getElementById('prev-btn').disabled = currentPage === 1;
  document.getElementById('next-btn').disabled = currentPage === totalPages;
  document.getElementById('last-btn').disabled = currentPage === totalPages;
}

export function goToFirstPage() {
  console.log('Navigating to first page');
  if (api.exercises.page > 1) {
    api.exercises.page = 1;
    loadExercises(api.exercises.page);
  }
}

export function goToPreviousPage() {
  console.log('Navigating to previous page');
  if (api.exercises.page > 1) {
    api.exercises.page -= 1;
    loadExercises(api.exercises.page);
  }
}

export function goToNextPage() {
  console.log('Navigating to next page');
  if (api.exercises.page < totalPages) {
    api.exercises.page += 1;
    loadExercises(api.exercises.page);
  }
}

export function goToLastPage() {
  console.log('Navigating to last page');
  if (api.exercises.page < totalPages) {
    api.exercises.page= totalPages;
    loadExercises(api.exercises.page);
  }
}

// // Initial load when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed. Loading initial exercises.');
  loadExercises(); 
  renderPaginationControls(); // Load the first page on initial load
});
// console.log("111111111111111111111111111111111111111111111")


// Import necessary dependencies (adjust paths if needed)
// import axios from 'axios';
// import ExercisesService from './ExercisesService'; // Ensure the correct path is provided for your API

// Global variables for total pages and current page
// let totalPages = 0;
// let currentPage = 1;

// // Rendering the pagination controls dynamically
// function renderPaginationControls() {
//   console.log('Rendering pagination controls');
//   const container = document.querySelector('.pagination-container');
//   if (!container) {
//     console.warn('Container with class "pagination-container" not found.');
//     return;
//   }
  
//   container.innerHTML = ''; 

//   const firstBtn = createPaginationButton('first-btn', '&laquo;', goToFirstPage, currentPage === 1);
//   const prevBtn = createPaginationButton('prev-btn', '&lsaquo;', goToPreviousPage, currentPage === 1);
  
//   container.appendChild(firstBtn);
//   container.appendChild(prevBtn);
  
//   // Generate page number buttons based on the current page and total pages
//   const startPage = Math.max(1, currentPage - 1);
//   const endPage = Math.min(totalPages, currentPage + 1);
  
//   for (let i = startPage; i <= endPage; i++) {
//     const pageBtn = createPaginationButton(null, i, () => goToPage(i), i === currentPage);
//     container.appendChild(pageBtn);
//   }

//   const nextBtn = createPaginationButton('next-btn', '&rsaquo;', goToNextPage, currentPage === totalPages);
//   const lastBtn = createPaginationButton('last-btn', '&raquo;', goToLastPage, currentPage === totalPages);
  
//   container.appendChild(nextBtn);
//   container.appendChild(lastBtn);
// }
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed. Rendering pagination controls and loading initial exercises.');
    
//     renderPaginationControls(); // Render pagination controls when the page loads
//     loadExercises(); // Load the first page of exercises
//   });

// // Helper function to create a button for pagination
// function createPaginationButton(id, text, onClick, disabled = false) {
//   const btn = document.createElement('button');
//   if (id) btn.id = id;
//   btn.innerHTML = text;
//   btn.disabled = disabled;
//   btn.addEventListener('click', onClick);
//   return btn;
// }

// // Function to load exercises from the API and display them
// async function loadExercises(page = 1) {
//   try {
//     console.log('Setting page to:', page);
//     currentPage = page;
//     const data = await getExercises(page);

//     console.log('Received data from API:', data);
    
//     if (!data.totalPages || !data.results) {
//       throw new Error('Invalid data format from API. Expected totalPages and results.');
//     }

//     totalPages = data.totalPages;
//     displayExercises(data.results);
//     updatePaginationControls();
//   } catch (error) {
//     console.error('Failed to load exercises:', error);
//   }
// }

// // Mock function simulating an API call
// async function getExercises(page = 1) {
//   api.exercises.page = page;
//   const data = await api.exercises.getExercises();
//   console.log(data, "Fetched data from API");
//   return data;
// }

// // Function to display exercises on the page
// function displayExercises(exercises) {
//   console.log('Displaying exercises:', exercises);
//   const container = document.getElementById('exercises-container');
//   container.innerHTML = exercises
//     .map(exercise => `
//       <div class="exercise">
//         <h3>${exercise.name}</h3>
//         <img src="${exercise.gifUrl}" alt="${exercise.name}">
//         <p>${exercise.description}</p>
//         <p><strong>Calories:</strong> ${exercise.burnedCalories}</p>
//         <p><strong>Rating:</strong> ${exercise.rating}</p>
//       </div>
//     `).join('');
// }

// // Function to update the pagination controls' state
// function updatePaginationControls() {
//     const pageInfo = document.getElementById('page-info');
//     if (pageInfo) {
//       pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
//     } else {
//       console.warn('Element with id "page-info" not found.');
//     }
  
//     // Enable/disable navigation buttons based on the current page
//     document.getElementById('first-btn').disabled = currentPage === 1;
//     document.getElementById('prev-btn').disabled = currentPage === 1;
//     document.getElementById('next-btn').disabled = currentPage === totalPages;
//     document.getElementById('last-btn').disabled = currentPage === totalPages;
//   }
  

// // Navigation functions
// function goToFirstPage() {
//   console.log('Navigating to first page');
//   if (currentPage > 1) {
//     currentPage = 1;
//     loadExercises(currentPage);
//   }
// }

// function goToPreviousPage() {
//   console.log('Navigating to previous page');
//   if (currentPage > 1) {
//     currentPage--;
//     loadExercises(currentPage);
//   }
// }

// function goToNextPage() {
//   console.log('Navigating to next page');
//   if (currentPage < totalPages) {
//     currentPage++;
//     loadExercises(currentPage);
//   }
// }

// function goToLastPage() {
//   console.log('Navigating to last page');
//   if (currentPage < totalPages) {
//     currentPage = totalPages;
//     loadExercises(currentPage);
//   }
// }

// function goToPage(page) {
//   console.log('Navigating to page:', page);
//   currentPage = page;
//   loadExercises(currentPage);
// }

// Global variables
// let totalPages = 0;
// let currentPage = 1;

// // Rendering the pagination controls dynamically
// function renderPaginationControls() {
//   const container = document.querySelector('.pagination-container');
//   if (!container) return;

//   container.innerHTML = ''; 

//   // First and Previous buttons
//   const firstBtn = createPaginationButton('&laquo;', goToFirstPage, currentPage === 1);
//   const prevBtn = createPaginationButton('&lsaquo;', goToPreviousPage, currentPage === 1);
//   container.appendChild(firstBtn);
//   container.appendChild(prevBtn);
  
//   // Generate page number buttons based on current page and total pages
//   const startPage = Math.max(1, currentPage - 1);
//   const endPage = Math.min(totalPages, currentPage + 1);
  
//   for (let i = startPage; i <= endPage; i++) {
//     const pageBtn = createPaginationButton(i, () => goToPage(i), false, i === currentPage);
//     container.appendChild(pageBtn);
//   }

//   // Next and Last buttons
//   const nextBtn = createPaginationButton('&rsaquo;', goToNextPage, currentPage === totalPages);
//   const lastBtn = createPaginationButton('&raquo;', goToLastPage, currentPage === totalPages);
  
//   container.appendChild(nextBtn);
//   container.appendChild(lastBtn);
// }

// // Helper function to create pagination buttons
// function createPaginationButton(text, onClick, disabled = false, active = false) {
//   const btn = document.createElement('button');
//   btn.innerHTML = text;
//   btn.disabled = disabled;
//   if (active) btn.classList.add('active');
//   btn.addEventListener('click', onClick);
//   return btn;
// }

// // Function to load exercises from the API and display them
// async function loadExercises(page = 1) {
//   try {
//     currentPage = page;
//     const data = await api.exercises.getExercises(page); // Ensure the API call uses `page`

//     if (!data.totalPages || !data.results) {
//       throw new Error('Invalid data format from API. Expected totalPages and results.');
//     }

//     // Update total pages and display exercises
//     totalPages = data.totalPages;
//     displayExercises(data.results);
//     renderPaginationControls();
//   } catch (error) {
//     console.error('Failed to load exercises:', error);
//   }
// }

// // Function to display exercises on the page
// function displayExercises(exercises) {
//   const container = document.getElementById('exercises-container');
//   container.innerHTML = exercises
//     .map(exercise => `
//       <div class="exercise">
//         <h3>${exercise.name}</h3>
//         <img src="${exercise.gifUrl}" alt="${exercise.name}">
//         <p>${exercise.description}</p>
//         <p><strong>Calories:</strong> ${exercise.burnedCalories}</p>
//         <p><strong>Rating:</strong> ${exercise.rating}</p>
//       </div>
//     `).join('');
// }

// // Navigation functions
// function goToFirstPage() {
//   if (currentPage > 1) {
//     loadExercises(1);
//   }
// }

// function goToPreviousPage() {
//   if (currentPage > 1) {
//     loadExercises(currentPage - 1);
//   }
// }

// function goToNextPage() {
//   if (currentPage < totalPages) {
//     loadExercises(currentPage + 1);
//   }
// }

// function goToLastPage() {
//   if (currentPage < totalPages) {
//     loadExercises(totalPages);
//   }
// }

// function goToPage(page) {
//   if (page !== currentPage && page >= 1 && page <= totalPages) {
//     loadExercises(page);
//   }
// }

// // Initial setup
// document.addEventListener('DOMContentLoaded', () => {
//   loadExercises(); // Load the first page on initial load
// });

