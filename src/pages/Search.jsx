import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMovieDetails, searchMovies } from '../api/omdb';
import BlurReveal from '../components/BlurReveal';
import EmptyState from '../components/EmptyState';
import MovieCard from '../components/MovieCard';
import PageTitle from '../components/PageTitle';
import SearchBar from '../components/SearchBar';
import SearchFilters from '../components/SearchFilters';
import SkeletonCard from '../components/SkeletonCard';
import { useDebounce } from '../hooks/useDebounce';

function sortMovies(movies, sort) {
  const sorted = [...movies];

  if (sort === 'title') return sorted.sort((a, b) => a.Title.localeCompare(b.Title));
  if (sort === 'year-desc') return sorted.sort((a, b) => Number(b.Year?.slice(0, 4)) - Number(a.Year?.slice(0, 4)));
  if (sort === 'year-asc') return sorted.sort((a, b) => Number(a.Year?.slice(0, 4)) - Number(b.Year?.slice(0, 4)));
  if (sort === 'rating') {
    return sorted.sort((a, b) => Number(b.imdbRating || 0) - Number(a.imdbRating || 0));
  }

  return sorted;
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [type, setType] = useState(searchParams.get('type') || 'movie');
  const [year, setYear] = useState(searchParams.get('year') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'relevance');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debouncedQuery = useDebounce(query.trim(), 450);
  const debouncedYear = useDebounce(year, 450);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, type, debouncedYear]);

  useEffect(() => {
    const params = {};
    if (debouncedQuery) params.q = debouncedQuery;
    if (type !== 'movie') params.type = type;
    if (debouncedYear) params.year = debouncedYear;
    if (sort !== 'relevance') params.sort = sort;
    if (page > 1) params.page = String(page);
    setSearchParams(params, { replace: true });
  }, [debouncedQuery, debouncedYear, page, setSearchParams, sort, type]);

  useEffect(() => {
    if (!debouncedQuery) {
      setMovies([]);
      setTotalResults(0);
      setError('');
      return;
    }

    let mounted = true;
    setLoading(true);
    setError('');

    searchMovies(debouncedQuery, type, debouncedYear, page)
      .then(async (data) => {
        let results = data.Search || [];

        if (sort === 'rating') {
          const settled = await Promise.allSettled(results.map((movie) => getMovieDetails(movie.imdbID)));
          results = settled.map((item, index) => (item.status === 'fulfilled' ? item.value : results[index]));
        }

        if (mounted) {
          setMovies(results);
          setTotalResults(Number(data.totalResults) || 0);
        }
      })
      .catch((err) => {
        if (mounted) {
          setMovies([]);
          setTotalResults(0);
          setError(err.message);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [debouncedQuery, debouncedYear, page, sort, type]);

  const sortedMovies = useMemo(() => sortMovies(movies, sort), [movies, sort]);
  const pageCount = Math.max(1, Math.ceil(totalResults / 10));
  const title = debouncedQuery
    ? `${totalResults || sortedMovies.length} results for "${debouncedQuery}"`
    : 'Search the CineVerse catalog';

  const submit = (event) => {
    event.preventDefault();
  };

  const quickSearches = ['Interstellar', 'Batman', 'Vikram', 'Naruto'];

  return (
    <motion.main
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto min-h-screen max-w-7xl px-4 pb-28 pt-28 sm:px-6 lg:px-10"
      exit={{ opacity: 0, y: 12 }}
      initial={{ opacity: 0, y: 12 }}
    >
      <BlurReveal as="section" className="glass-panel relative overflow-hidden rounded-2xl p-5 sm:p-8 lg:p-10">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cinema-red/20 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_25rem] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-cinema-red">Advanced Search</p>
            <PageTitle>{loading ? 'Searching...' : title}</PageTitle>
            <p className="mt-4 max-w-2xl text-cinema-muted">
              Search OMDb with clear filters, fast pagination, and premium result cards tuned for portfolio demos.
            </p>
            <div className="mt-6">
              <SearchBar onChange={setQuery} onSubmit={submit} placeholder="Search movies, series, or episodes..." value={query} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {quickSearches.map((item) => (
                <button
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-cinema-muted transition hover:border-cinema-red hover:text-white"
                  key={item}
                  onClick={() => setQuery(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <SearchFilters
            onSortChange={setSort}
            onTypeChange={setType}
            onYearChange={setYear}
            sort={sort}
            type={type}
            year={year}
          />
        </div>
      </BlurReveal>

      {loading ? (
        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : null}

      {!loading && error ? (
        <div className="mt-10">
          <EmptyState
            actionLabel="Try Avengers"
            actionTo="/search?q=Avengers"
            message={error}
            title="No results found"
          />
        </div>
      ) : null}

      {!loading && !error && !debouncedQuery ? (
        <div className="mt-10">
          <EmptyState
            actionLabel="Search Interstellar"
            actionTo="/search?q=Interstellar"
            message="Start with a title, actor-adjacent keyword, franchise, or series name."
            title="What are we discovering today?"
          />
        </div>
      ) : null}

      {!loading && !error && debouncedQuery && !sortedMovies.length ? (
        <div className="mt-10">
          <EmptyState
            message="Try a broader title, remove the year filter, or switch type to All."
            title="Nothing matched those filters"
          />
        </div>
      ) : null}

      {!loading && sortedMovies.length ? (
        <>
          <motion.div
            className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
          >
            {sortedMovies.map((movie, index) => (
              <MovieCard key={movie.imdbID} movie={movie} revealDelay={index * 0.04} />
            ))}
          </motion.div>
          {totalResults > 10 ? (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <button
                className="h-12 rounded-md border border-white/10 px-6 font-bold text-white transition hover:border-cinema-red disabled:cursor-not-allowed disabled:opacity-40"
                disabled={page === 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                type="button"
              >
                Previous
              </button>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-cinema-muted">
                Page {page} of {pageCount}
              </span>
              <button
                className="h-12 rounded-md bg-cinema-red px-6 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={page >= pageCount}
                onClick={() => setPage((value) => value + 1)}
                type="button"
              >
                Next
              </button>
            </div>
          ) : null}
        </>
      ) : null}
    </motion.main>
  );
}

export default Search;
