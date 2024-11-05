export const getFavorites = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

export const saveFavorites = favorites =>{
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export const toggleFavorite = exerciseId => {
  let favorites = getFavorites();
  
  if (favorites.includes(exerciseId)) {
    favorites = favorites.filter(id => id !== exerciseId);
  } else {
    favorites.push(exerciseId);
  }

  saveFavorites(favorites);
}
