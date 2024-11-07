import axios from 'axios';

export const fetchExercises = async options => {
  let endPoint = 'https://your-energy.b.goit.study/api/exercises';

  if (options) {
    endPoint += '?';
    for (const key in options) {
      endPoint += `${key}=${options[key]}&`;
    }
    endPoint = endPoint.slice(0, -1);
  }

  try {
    const response = await axios.get(endPoint);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
