import { motion } from 'framer-motion';
import BlurReveal from '../components/BlurReveal';
import EmptyState from '../components/EmptyState';
import MovieCard from '../components/MovieCard';
import PageTitle from '../components/PageTitle';
import { useFavorites } from '../context/FavoritesContext';

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <motion.main animate={{ opacity: 1, y: 0 }} className="mx-auto min-h-screen max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-10" exit={{ opacity: 0, y: 12 }} initial={{ opacity: 0, y: 12 }}>
      <BlurReveal>
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-cinema-red">Personal Picks</p>
        <PageTitle>Favorites</PageTitle>
        <p className="mt-4 max-w-2xl text-cinema-muted">Your own premium shelf of movies worth remembering.</p>
      </BlurReveal>

      {favorites.length ? (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {favorites.map((movie, index) => (
            <MovieCard key={movie.imdbID} movie={movie} revealDelay={index * 0.04} />
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <EmptyState actionLabel="Discover favorites" message="Tap the heart on any movie card or details page to build this list." title="No favorites yet" />
        </div>
      )}
    </motion.main>
  );
}

export default Favorites;
