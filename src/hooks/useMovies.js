import { useEffect, useState } from 'react';

export function useMovies(fetcher, deps = []) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');

    fetcher()
      .then((data) => {
        if (mounted) setMovies(data.Search || data.results || []);
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, deps);

  return { movies, loading, error };
}
