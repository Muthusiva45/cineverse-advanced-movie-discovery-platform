import { motion } from 'framer-motion';
import { FiHeart, FiInfo, FiPlay, FiPlus, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getPoster, getTrailerSearchUrl } from '../api/omdb';
import { useFavorites } from '../context/FavoritesContext';
import { useWatchlist } from '../context/WatchlistContext';
import GsapText from './GsapText';

function Hero({ movie }) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!movie) {
    return (
      <div className="relative h-[86vh] min-h-[36rem] overflow-hidden bg-white/[0.04]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(229,9,20,0.14),transparent_28rem)]" />
        <div className="absolute bottom-16 left-4 right-4 mx-auto max-w-7xl sm:left-6 sm:right-6 lg:left-10 lg:right-10">
          <div className="h-4 w-36 animate-pulse rounded-full bg-white/10" />
          <div className="mt-5 h-14 max-w-xl animate-pulse rounded-md bg-white/10 md:h-20" />
          <div className="mt-4 h-4 max-w-2xl animate-pulse rounded-full bg-white/10" />
          <div className="mt-3 h-4 max-w-lg animate-pulse rounded-full bg-white/10" />
        </div>
      </div>
    );
  }

  const poster = getPoster(movie);
  const trailerUrl = getTrailerSearchUrl(movie.Title);
  const saved = isInWatchlist(movie.imdbID);
  const favorite = isFavorite(movie.imdbID);

  return (
    <section className="on-media relative flex min-h-[38rem] items-end overflow-hidden pt-28 md:h-[88vh]">
      {poster ? (
        <>
          <img alt="" className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl" src={poster} />
          <img alt="" className="absolute right-[8%] top-28 hidden h-[72%] rounded-lg object-cover opacity-60 shadow-cinematic lg:block" src={poster} />
        </>
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(229,9,20,0.22),transparent_26rem)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/20 to-black/45" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 md:pb-24 lg:px-10">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
          initial={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-white backdrop-blur">
            Featured this week
          </div>
          <GsapText as="h1" className="max-w-3xl text-4xl font-black leading-[1.02] text-white sm:text-5xl md:text-7xl">
            {movie.Title}
          </GsapText>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm font-semibold text-cinema-muted">
            <span className="flex items-center gap-1 text-cinema-gold">
              <FiStar className="fill-cinema-gold" />
              {movie.imdbRating && movie.imdbRating !== 'N/A' ? movie.imdbRating : 'NR'}
            </span>
            <span>{movie.Year || 'TBA'}</span>
            {movie.Rated && movie.Rated !== 'N/A' ? <span>{movie.Rated}</span> : null}
            <span className="rounded border border-white/20 px-2 py-0.5 text-xs text-white">HD</span>
          </div>
          <p className="mt-5 line-clamp-3 max-w-2xl text-base leading-7 text-zinc-200 md:text-lg">
            {movie.Plot && movie.Plot !== 'N/A' ? movie.Plot : 'A cinematic pick from the CineVerse catalog.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={trailerUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-white px-6 font-extrabold text-black transition hover:bg-cinema-red hover:text-white"
            >
              <FiPlay className="fill-current" />
              Play Trailer
            </a>
            <Link
              className="inline-flex h-12 items-center gap-2 rounded-md border border-white/15 bg-white/10 px-6 font-extrabold text-white backdrop-blur transition hover:border-cinema-red hover:bg-cinema-red"
              to={`/movie/${movie.imdbID}`}
            >
              <FiInfo />
              More Info
            </Link>
            <button
              className={`inline-flex h-12 items-center gap-2 rounded-md border border-white/15 px-5 font-extrabold text-white backdrop-blur transition ${
                saved ? 'bg-cinema-red' : 'bg-white/10 hover:border-cinema-red hover:bg-cinema-red'
              }`}
              onClick={() => toggleWatchlist(movie)}
              type="button"
            >
              <FiPlus />
              {saved ? 'Saved' : 'Watchlist'}
            </button>
            <button
              aria-label="Favorite"
              className={`grid h-12 w-12 place-items-center rounded-md border border-white/15 text-white backdrop-blur transition ${
                favorite ? 'bg-cinema-red' : 'bg-white/10 hover:border-cinema-red hover:bg-cinema-red'
              }`}
              onClick={() => toggleFavorite(movie)}
              type="button"
            >
              <FiHeart className={favorite ? 'fill-white' : ''} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
