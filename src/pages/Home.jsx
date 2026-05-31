import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovieDetails, getMoviesByKeyword } from '../api/omdb';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import MovieRow from '../components/MovieRow';
import StatCard from '../components/StatCard';
import { useFavorites } from '../context/FavoritesContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useWatchlist } from '../context/WatchlistContext';
import { categories } from '../data/categories';
import { FiClock, FiHeart, FiPlayCircle } from 'react-icons/fi';

function PreviewSection({ title, items, to, empty }) {
  if (!items.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold md:text-2xl">{title}</h2>
          <p className="mt-1 text-sm text-cinema-muted">{empty}</p>
        </div>
        <Link className="text-sm font-bold text-cinema-red hover:text-white" to={to}>
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
        {items.slice(0, 6).map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </section>
  );
}

function Home() {
  const [heroMovie, setHeroMovie] = useState(null);
  const [error, setError] = useState('');
  const { recentlyViewed } = useRecentlyViewed();
  const { watchlist } = useWatchlist();
  const { favorites } = useFavorites();

  useEffect(() => {
    let mounted = true;

    getMoviesByKeyword('Interstellar')
      .then((data) => {
        const featured = (data.Search || []).find((movie) => movie.Title === 'Interstellar') || data.Search?.[0];
        if (!featured) throw new Error('No featured movie found.');
        return getMovieDetails(featured.imdbID);
      })
      .then((details) => {
        if (mounted) setHeroMovie(details);
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <motion.main animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }}>
      {error ? (
        <section className="grid min-h-[34rem] place-items-center px-4 pt-24 text-center">
          <div className="max-w-xl rounded-lg border border-cinema-red/30 bg-cinema-red/10 p-6">
            <h1 className="text-3xl font-black">CineVerse needs an OMDb key</h1>
            <p className="mt-3 text-cinema-muted">{error}</p>
          </div>
        </section>
      ) : (
        <Hero movie={heroMovie} />
      )}

      <section className="mx-auto -mt-8 grid max-w-7xl gap-4 px-4 pb-8 sm:px-6 md:-mt-16 md:grid-cols-3 lg:px-10">
        <StatCard icon={FiClock} label="Recently Viewed" value={recentlyViewed.length} helper="Continue exploring where you left off." />
        <StatCard icon={FiPlayCircle} label="Watchlist" value={watchlist.length} helper="Movies queued for later discovery." />
        <StatCard icon={FiHeart} label="Favorites" value={favorites.length} helper="Your personal hall of fame." />
      </section>

      <PreviewSection
        empty="Your latest movie detail visits."
        items={recentlyViewed}
        title="Continue Exploring"
        to="/dashboard"
      />
      <PreviewSection
        empty="Quick access to saved movies."
        items={watchlist}
        title="Watchlist Preview"
        to="/watchlist"
      />
      <PreviewSection
        empty="Movies you marked as favorites."
        items={favorites}
        title="Favorites Preview"
        to="/favorites"
      />

      <div className="relative pb-8">
        {categories.map((category) => (
          <div id={category.title === 'Trending Now' ? 'trending' : undefined} key={category.title}>
            <MovieRow fetcher={category.fetcher} title={category.title} />
          </div>
        ))}
      </div>
    </motion.main>
  );
}

export default Home;
