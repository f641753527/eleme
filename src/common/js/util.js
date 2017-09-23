export function saveFavorite (key, val) {
  window.localStorage.setItem(key, val);
};

export function fetchFavorite (key) {
  return window.localStorage.getItem(key) === 'true';
};
