export const addToFavorites = exerciseId => {
   const favorites = getFavoritesFromStorage();
   if (!favorites) {
      localStorage.setItem('favorites', JSON.stringify([exerciseId]));
   } else {
      if (!favorites.includes(exerciseId)) {
         favorites.push(exerciseId);
         localStorage.setItem('favorites', JSON.stringify(favorites));
      }
   }
};

export const removeFromFavorites = exerciseId => {
   const favorites = getFavoritesFromStorage();
   if (favorites) {
      const index = favorites.indexOf(exerciseId);
      if (index !== -1) {
         favorites.splice(index, 1);
         localStorage.setItem('favorites', JSON.stringify(favorites));
      }
   };
};

export const getFavoritesFromStorage = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}


const button = document.getElementById('removeButton');

button.addEventListener('click', function() {
  removeFromFavorites();
});


addToFavorites('64f389465ae26083f39b17a4')
addToFavorites('64f389465ae26083f39b1b04')