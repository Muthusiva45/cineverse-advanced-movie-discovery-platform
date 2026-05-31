import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { getMovieDetails, searchMovies } from '../api/omdb';
import { useDebounce } from '../hooks/useDebounce';
import Loader from './Loader';

function CompareSelector({ label, selected, onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debounced = useDebounce(query, 400);

  useEffect(() => {
    if (!debounced.trim()) {
      setResults([]);
      setError('');
      return;
    }

    let mounted = true;
    setLoading(true);
    setError('');

    searchMovies(debounced, 'movie', '', 1)
      .then((data) => {
        if (mounted) setResults((data.Search || []).slice(0, 5));
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
  }, [debounced]);

  const selectMovie = async (movie) => {
    setLoading(true);
    setError('');
    try {
      const details = await getMovieDetails(movie.imdbID);
      onSelect(details);
      setQuery(details.Title);
      setResults([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-lg p-4">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cinema-red">{label}</p>
      <div className="mt-3 flex h-12 items-center gap-2 rounded-md border border-white/10 bg-black/45 px-3">
        <FiSearch className="text-cinema-muted" />
        <input
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-cinema-muted"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a movie..."
          value={query}
        />
      </div>
      {selected ? (
        <div className="mt-4 rounded-md border border-white/10 bg-white/[0.04] p-3">
          <p className="font-black">{selected.Title}</p>
          <p className="mt-1 text-sm text-cinema-muted">{selected.Year} • IMDb {selected.imdbRating || 'N/A'}</p>
        </div>
      ) : null}
      {loading ? <Loader label="Searching..." /> : null}
      {!loading && error ? <p className="mt-3 text-sm text-red-200">{error}</p> : null}
      {!loading && results.length ? (
        <div className="mt-3 grid gap-2">
          {results.map((movie) => (
            <button
              className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] p-2 text-left transition hover:border-cinema-red"
              key={movie.imdbID}
              onClick={() => selectMovie(movie)}
              type="button"
            >
              {movie.Poster && movie.Poster !== 'N/A' ? (
                <img alt="" className="h-16 w-11 rounded object-cover" src={movie.Poster} />
              ) : (
                <span className="h-16 w-11 rounded bg-white/10" />
              )}
              <span>
                <span className="block font-bold">{movie.Title}</span>
                <span className="text-sm text-cinema-muted">{movie.Year}</span>
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default CompareSelector;
