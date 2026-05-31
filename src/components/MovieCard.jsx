import { motion } from 'framer-motion';
import { FiCheck, FiHeart, FiPlus, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getPoster } from '../api/omdb';
import { useFavorites } from '../context/FavoritesContext';
import { useWatchlist } from '../context/WatchlistContext';
import { blurReveal } from './BlurReveal';

function MovieCard({ movie, revealDelay = 0 }) {
  const poster = getPoster(movie);
  const rating = movie.imdbRating && movie.imdbRating !== 'N/A' ? movie.imdbRating : 'IMDb';
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isInWatchlist(movie.imdbID);
  const favorite = isFavorite(movie.imdbID);
  const cardReveal = {
    hidden: blurReveal.hidden,
    visible: {
      ...blurReveal.visible,
      transition: {
        ...blurReveal.visible.transition,
        delay: Math.min(revealDelay, 0.38),
      },
    },
  };

  return (
    <motion.article
      className="on-media group relative"
      initial="hidden"
      style={{ transformStyle: 'preserve-3d' }}
      variants={cardReveal}
      viewport={{ once: true, amount: 0.18, margin: '-40px' }}
      whileHover={{ rotateX: 3, rotateY: -4, y: -10, scale: 1.035 }}
      whileInView="visible"
      transition={{ type: 'spring', stiffness: 230, damping: 20 }}
    >
      <Link
        className="group block h-full overflow-hidden rounded-lg border border-white/10 bg-cinema-panel shadow-xl transition duration-300 hover:border-cinema-red/60 hover:shadow-glow"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-90" />
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1.5 text-xs font-black text-cinema-gold shadow-xl backdrop-blur">
            <FiStar className="fill-cinema-gold" />
            {rating}
          </div>
          <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/15 px-2.5 py-1.5 text-xs font-black text-white backdrop-blur">
            {movie.Year || 'TBA'}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="line-clamp-2 text-base font-black leading-tight text-white">{movie.Title}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-cinema-muted">{movie.Type || 'movie'}</p>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-3 right-3 z-10 flex gap-1.5 opacity-100 transition md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <button
          aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'}
          className={`grid h-9 w-9 place-items-center rounded-full border border-white/10 shadow-xl backdrop-blur transition ${
            saved ? 'bg-cinema-red text-white' : 'bg-black/75 text-white hover:bg-cinema-red'
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
          className={`grid h-9 w-9 place-items-center rounded-full border border-white/10 shadow-xl backdrop-blur transition ${
            favorite ? 'bg-cinema-red text-white' : 'bg-black/75 text-white hover:bg-cinema-red'
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
