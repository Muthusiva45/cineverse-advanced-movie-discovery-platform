import { motion } from 'framer-motion';
import { FiCheck, FiHeart, FiPlus, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getPoster } from '../api/omdb';
import { useFavorites } from '../context/FavoritesContext';
import { useWatchlist } from '../context/WatchlistContext';

function MovieCard({ movie }) {
  const poster = getPoster(movie);
  const rating = movie.imdbRating && movie.imdbRating !== 'N/A' ? movie.imdbRating : 'IMDb';
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isInWatchlist(movie.imdbID);
  const favorite = isFavorite(movie.imdbID);

  return (
    <motion.article
      className="on-media group relative"
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ rotateX: 2, rotateY: -3, y: -8, scale: 1.035 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <Link
        className="group block h-full overflow-hidden rounded-md border border-white/10 bg-cinema-panel shadow-xl transition hover:border-white/25 hover:shadow-glow"
        to={`/movie/${movie.imdbID}`}
      >
        <div className="relative aspect-[2/3] overflow-hidden bg-cinema-panelSoft">
          {poster ? (
            <img
              alt={movie.Title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              loading="lazy"
              src={poster}
            />
          ) : (
            <div className="flex h-full flex-col justify-end bg-[radial-gradient(circle_at_top,rgba(229,9,20,0.24),transparent_45%),linear-gradient(145deg,#1a1a1a,#050505)] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cinema-red">CineVerse</p>
              <p className="mt-3 text-lg font-black leading-tight text-white">{movie.Title}</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent opacity-80" />
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-bold text-cinema-gold backdrop-blur">
            <FiStar className="fill-cinema-gold" />
            {rating}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="line-clamp-2 text-sm font-bold text-white">{movie.Title}</p>
            <p className="mt-1 text-xs text-cinema-muted">{movie.Year || 'TBA'}</p>
          </div>
        </div>
      </Link>
      <div className="absolute right-2 top-2 z-10 flex translate-y-1 gap-1 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
        <button
          aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'}
          className={`grid h-8 w-8 place-items-center rounded-full border border-white/10 backdrop-blur transition ${
            saved ? 'bg-cinema-red text-white' : 'bg-black/70 text-white hover:bg-cinema-red'
          }`}
          onClick={(event) => {
            event.preventDefault();
            toggleWatchlist(movie);
          }}
          type="button"
        >
          {saved ? <FiCheck /> : <FiPlus />}
        </button>
        <button
          aria-label={favorite ? 'Remove favorite' : 'Add favorite'}
          className={`grid h-8 w-8 place-items-center rounded-full border border-white/10 backdrop-blur transition ${
            favorite ? 'bg-cinema-red text-white' : 'bg-black/70 text-white hover:bg-cinema-red'
          }`}
          onClick={(event) => {
            event.preventDefault();
            toggleFavorite(movie);
          }}
          type="button"
        >
          <FiHeart className={favorite ? 'fill-white' : ''} />
        </button>
      </div>
    </motion.article>
  );
}

export default MovieCard;
