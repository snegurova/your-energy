export const BREAKPOINTS = {
  tablet: 768,
  desktop: 1440,
};

export function getFilterLimitOption() {
  if (screen.width < BREAKPOINTS.tablet) {
    return 8;
  }
  if (screen.width < BREAKPOINTS.desktop) {
    return 10;
  }
  return 12;
}
export function getPageLimitOption() {
  if (screen.width < BREAKPOINTS.tablet) {
    return 9;
  }
  return 12;
}
