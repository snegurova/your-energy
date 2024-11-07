const save = (key, value) => {
  try {
    let favorites = load(key) || [];
    if (!favorites.some((favorite) => favorite._id === value._id)) {
      favorites.push(value);
      localStorage.setItem(key, JSON.stringify(favorites));
    }
  } catch (err) {
    console.error('State error: ', err.message);
  }
};

const remove = (key, id) => {
  try {
    let favorites = load(key) || [];
    favorites = favorites.filter((exercise) => exercise._id !== id);
    localStorage.setItem(key, JSON.stringify(favorites));
  } catch (err) {
    console.error('State error: ', err.message);
  }
};

const load = (key) => {
  try {
    const favoriteState = localStorage.getItem(key);
    return favoriteState === null ? [] : JSON.parse(favoriteState);
  } catch (err) {
    console.error('State error: ', err.message);
  }
};

export default {
  save,
  load,
  remove,
};
