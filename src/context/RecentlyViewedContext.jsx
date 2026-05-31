import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const RecentlyViewedContext = createContext(null);

const compactMovie = (movie) => ({
  imdbID: movie.imdbID,
  Title: movie.Title,
  Year: movie.Year,
  Type: movie.Type,
  Poster: movie.Poster,
  imdbRating: movie.imdbRating,
  Genre: movie.Genre,
  Runtime: movie.Runtime,
  viewedAt: new Date().toISOString(),
});

export function RecentlyViewedProvider({ children }) {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('cineverse_recently_viewed', []);

  const addRecentlyViewed = useCallback((movie) => {
    setRecentlyViewed((items) => [
      compactMovie(movie),
      ...items.filter((item) => item.imdbID !== movie.imdbID),
    ].slice(0, 10));
  }, [setRecentlyViewed]);

  const value = useMemo(() => ({ recentlyViewed, addRecentlyViewed }), [recentlyViewed]);

  return <RecentlyViewedContext.Provider value={value}>{children}</RecentlyViewedContext.Provider>;
}

export function useRecentlyViewed() {
  return useContext(RecentlyViewedContext);
}
