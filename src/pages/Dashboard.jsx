import { motion } from 'framer-motion';
import { FiClock, FiHeart, FiStar, FiTrendingUp, FiVideo } from 'react-icons/fi';
import EmptyState from '../components/EmptyState';
import MovieCard from '../components/MovieCard';
import PageTitle from '../components/PageTitle';
import StatCard from '../components/StatCard';
import { useFavorites } from '../context/FavoritesContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useWatchlist } from '../context/WatchlistContext';

function topGenre(favorites) {
  const counts = favorites
    .flatMap((movie) => (movie.Genre || '').split(',').map((genre) => genre.trim()).filter(Boolean))
    .reduce((acc, genre) => ({ ...acc, [genre]: (acc[genre] || 0) + 1 }), {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Not enough data';
}

function averageRating(favorites) {
  const ratings = favorites.map((movie) => Number(movie.imdbRating)).filter(Boolean);
  if (!ratings.length) return 'N/A';
  return (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1);
}

function Dashboard() {
  const { watchlist } = useWatchlist();
  const { favorites } = useFavorites();
  const { recentlyViewed } = useRecentlyViewed();
  const recent = recentlyViewed[0];

  return (
    <motion.main animate={{ opacity: 1, y: 0 }} className="mx-auto min-h-screen max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-10" exit={{ opacity: 0, y: 12 }} initial={{ opacity: 0, y: 12 }}>
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-cinema-red">Personal Analytics</p>
      <PageTitle>Movie Dashboard</PageTitle>
      <p className="mt-4 max-w-2xl text-cinema-muted">A local-first snapshot of your CineVerse activity, powered by your browser storage.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={FiVideo} label="Watchlist" value={watchlist.length} helper="Saved for later." />
        <StatCard icon={FiHeart} label="Favorites" value={favorites.length} helper="Movies you loved." />
        <StatCard icon={FiClock} label="Recently Viewed" value={recentlyViewed.length} helper="Latest ten detail visits." />
        <StatCard icon={FiStar} label="Avg Favorite IMDb" value={averageRating(favorites)} helper="Based on favorite movies with ratings." />
        <StatCard icon={FiTrendingUp} label="Top Favorite Genre" value={topGenre(favorites)} helper="Your strongest genre signal." />
        <StatCard icon={FiClock} label="Most Recent" value={recent?.Title || 'None yet'} helper={recent?.Year || 'Open a movie detail page to start.'} />
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-black">Recently Viewed</h2>
        {recentlyViewed.length ? (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
            {recentlyViewed.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="mt-5">
            <EmptyState actionLabel="Explore movies" message="Open a movie details page and it will appear here." title="No viewing history yet" />
          </div>
        )}
      </section>
    </motion.main>
  );
}

export default Dashboard;
