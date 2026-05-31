import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const FavoritesContext = createContext(null);

const compactMovie = (movie) => ({
  imdbID: movie.imdbID,
  Title: movie.Title,
  Year: movie.Year,
  Type: movie.Type,
  Poster: movie.Poster,
  imdbRating: movie.imdbRating,
  Genre: movie.Genre,
  Runtime: movie.Runtime,
  addedAt: new Date().toISOString(),
});

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('cineverse_favorites', []);
  const toast = useToast();

  const isFavorite = (id) => favorites.some((movie) => movie.imdbID === id);

  const addFavorite = (movie) => {
    if (isFavorite(movie.imdbID)) return;
    setFavorites((items) => [compactMovie(movie), ...items]);
    toast?.showToast(`${movie.Title} added to favorites`);
  };

  const removeFavorite = (id) => {
    const movie = favorites.find((item) => item.imdbID === id);
    setFavorites((items) => items.filter((item) => item.imdbID !== id));
    if (movie) toast?.showToast(`${movie.Title} removed from favorites`, 'info');
  };

  const toggleFavorite = (movie) => {
    if (isFavorite(movie.imdbID)) removeFavorite(movie.imdbID);
    else addFavorite(movie);
  };

  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }),
    [favorites],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
