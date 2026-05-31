import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const WatchlistContext = createContext(null);

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

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useLocalStorage('cineverse_watchlist', []);
  const toast = useToast();

  const isInWatchlist = (id) => watchlist.some((movie) => movie.imdbID === id);

  const addToWatchlist = (movie) => {
    if (isInWatchlist(movie.imdbID)) return;
    setWatchlist((items) => [compactMovie(movie), ...items]);
    toast?.showToast(`${movie.Title} added to watchlist`);
  };

  const removeFromWatchlist = (id) => {
    const movie = watchlist.find((item) => item.imdbID === id);
    setWatchlist((items) => items.filter((item) => item.imdbID !== id));
    if (movie) toast?.showToast(`${movie.Title} removed from watchlist`, 'info');
  };

  const toggleWatchlist = (movie) => {
    if (isInWatchlist(movie.imdbID)) removeFromWatchlist(movie.imdbID);
    else addToWatchlist(movie);
  };

  const value = useMemo(
    () => ({ watchlist, addToWatchlist, removeFromWatchlist, toggleWatchlist, isInWatchlist }),
    [watchlist],
  );

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}
