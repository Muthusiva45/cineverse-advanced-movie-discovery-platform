import { motion } from 'framer-motion';
import { FiClock, FiHeart, FiStar, FiTrendingUp, FiVideo } from 'react-icons/fi';
import BlurReveal from '../components/BlurReveal';
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

function genreEntries(favorites) {
  const counts = favorites
    .flatMap((movie) => (movie.Genre || '').split(',').map((genre) => genre.trim()).filter(Boolean))
    .reduce((acc, genre) => ({ ...acc, [genre]: (acc[genre] || 0) + 1 }), {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
}

function Dashboard() {
  const { watchlist } = useWatchlist();
  const { favorites } = useFavorites();
  const { recentlyViewed } = useRecentlyViewed();
  const recent = recentlyViewed[0];
  const genres = genreEntries(favorites);
  const maxGenre = Math.max(...genres.map(([, count]) => count), 1);
  const libraryTotal = watchlist.length + favorites.length + recentlyViewed.length;

  return (
    <motion.main animate={{ opacity: 1, y: 0 }} className="mx-auto min-h-screen max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-10" exit={{ opacity: 0, y: 12 }} initial={{ opacity: 0, y: 12 }}>
      <BlurReveal as="section" className="glass-panel relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cinema-red/20 blur-3xl" />
        <div className="relative">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-cinema-red">Personal Analytics</p>
          <PageTitle>Movie Dashboard</PageTitle>
          <p className="mt-4 max-w-2xl text-cinema-muted">A local-first snapshot of your CineVerse activity, powered by your browser storage.</p>
        </div>
      </BlurReveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard accent icon={FiVideo} label="Watchlist" value={watchlist.length} helper="Saved for later." />
        <StatCard icon={FiHeart} label="Favorites" value={favorites.length} helper="Movies you loved." />
        <StatCard icon={FiClock} label="Recently Viewed" value={recentlyViewed.length} helper="Latest ten detail visits." />
        <StatCard icon={FiStar} label="Avg Favorite IMDb" value={averageRating(favorites)} helper="Based on favorite movies with ratings." />
        <StatCard icon={FiTrendingUp} label="Top Favorite Genre" value={topGenre(favorites)} helper="Your strongest genre signal." />
        <StatCard icon={FiClock} label="Most Recent" value={recent?.Title || 'None yet'} helper={recent?.Year || 'Open a movie detail page to start.'} />
      </div>

      <BlurReveal as="section" className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="glass-panel rounded-xl p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cinema-red">Genre signal</p>
          <h2 className="mt-2 text-2xl font-black">Favorite Genre Chart</h2>
          <div className="mt-6 grid gap-4">
            {genres.length ? genres.map(([genre, count]) => (
              <div key={genre}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-bold text-white">{genre}</span>
                  <span className="text-cinema-muted">{count}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-cinema-red"
                    initial={{ width: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    whileInView={{ width: `${(count / maxGenre) * 100}%` }}
                  />
                </div>
              </div>
            )) : (
              <p className="rounded-md border border-white/10 bg-white/[0.03] p-4 text-cinema-muted">
                Add favorite movies to generate your genre chart.
              </p>
            )}
          </div>
        </div>
        <div className="glass-panel rounded-xl p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cinema-red">Library health</p>
          <h2 className="mt-2 text-2xl font-black">Activity Mix</h2>
          <div className="mt-8 grid place-items-center">
            <div className="relative grid h-44 w-44 place-items-center rounded-full border border-white/10 bg-[conic-gradient(#e50914_0deg,#e50914_120deg,rgba(255,255,255,0.1)_120deg,rgba(255,255,255,0.1)_360deg)]">
              <div className="grid h-32 w-32 place-items-center rounded-full bg-cinema-black text-center">
                <span>
                  <span className="block text-4xl font-black text-white">{libraryTotal}</span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-cinema-muted">Signals</span>
                </span>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-sm leading-6 text-cinema-muted">
            Watchlist, favorites, and viewing history combine into your local movie profile.
          </p>
        </div>
      </BlurReveal>

      <BlurReveal as="section" className="mt-14">
        <h2 className="text-2xl font-black">Recently Viewed</h2>
        {recentlyViewed.length ? (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
            {recentlyViewed.map((movie, index) => (
              <MovieCard key={movie.imdbID} movie={movie} revealDelay={index * 0.04} />
            ))}
          </div>
        ) : (
          <div className="mt-5">
            <EmptyState actionLabel="Explore movies" message="Open a movie details page and it will appear here." title="No viewing history yet" />
          </div>
        )}
      </BlurReveal>
    </motion.main>
  );
}

export default Dashboard;
