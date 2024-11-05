const save = (key, value) => {
  try {
    const favoriteState = JSON.stringify(value);
    localStorage.setItem(key, favoriteState);
  } catch (err) {
    console.log('State error: ', err.message);
  }
};

const load = key => {
  try {
    const favoriteState = localStorage.getItem(key);
    return favoriteState === null ? undefined : JSON.parse(favoriteState);
  } catch (err) {
    console.log('State error: ', err.message);
  }
};

const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.log('State error: ', err.message);
  }
};

export default {
  save,
  load,
  remove,
};

