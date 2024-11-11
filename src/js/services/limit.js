export const BREAKPOINTS = {
  tablet: 768,
};

export function getExercisesLimit() {
  if (screen.width < BREAKPOINTS.tablet) {
    return 8;
  }
  return 10;
}

export function getCategoriesLimit() {
  if (screen.width < BREAKPOINTS.tablet) {
    return 9;
  }
  return 12;
}
