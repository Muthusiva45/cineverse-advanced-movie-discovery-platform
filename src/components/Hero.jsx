import { motion } from 'framer-motion';
import { FiCompass, FiHeart, FiInfo, FiPlay, FiPlus, FiStar } from 'react-icons/fi';
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
    <section className="on-media relative flex min-h-[100svh] items-end overflow-hidden pt-24 md:min-h-[44rem] md:pt-28 lg:h-[92vh]">
      {poster ? (
        <>
          <img alt="" className="absolute inset-0 h-full w-full scale-125 object-cover object-[50%_20%] opacity-45 blur-2xl sm:opacity-55" src={poster} />
          <img alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_20%] opacity-25 sm:opacity-18" src={poster} />
        </>
      ) : null}
      <motion.div
        animate={{ x: ['-8%', '8%', '-8%'], opacity: [0.45, 0.8, 0.45] }}
        className="absolute left-[8%] top-[16%] h-72 w-72 rounded-full bg-cinema-red/25 blur-3xl md:h-[32rem] md:w-[32rem]"
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_28%,rgba(255,255,255,0.16),transparent_20rem),radial-gradient(circle_at_18%_34%,rgba(229,9,20,0.28),transparent_32rem)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/55 to-black/45" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-6 px-4 pb-24 pt-4 sm:px-6 md:pb-24 lg:grid-cols-[1.05fr_0.7fr] lg:gap-10 lg:px-10">
        {poster ? (
          <motion.div
            animate={{ opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }}
            className="mx-auto block w-full max-w-[13.5rem] sm:max-w-[16rem] lg:hidden"
            initial={{ opacity: 0, y: 54, rotate: 3, filter: 'blur(14px)' }}
            transition={{ delay: 0.08, duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <div className="absolute -inset-5 rounded-2xl bg-cinema-red/25 blur-2xl" />
              <img
                alt={movie.Title}
                className="relative aspect-[2/3] w-full rounded-xl border border-white/15 object-cover shadow-cinematic"
                src={poster}
              />
            </div>
          </motion.div>
        ) : null}
        <motion.div
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          className="max-w-4xl"
          initial={{ opacity: 0, y: 80, filter: 'blur(16px)' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur sm:mb-5 sm:text-xs">
            Featured this week
          </div>
          <GsapText as="h1" className="max-w-4xl text-[clamp(2.85rem,13vw,5.25rem)] font-black leading-[0.96] text-white sm:text-6xl md:text-8xl">
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
          <p className="mt-6 line-clamp-4 max-w-3xl text-base leading-8 text-zinc-200 md:text-lg">
            {movie.Plot && movie.Plot !== 'N/A' ? movie.Plot : 'A cinematic pick from the CineVerse catalog.'}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              className="magnetic-button inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-md bg-cinema-red px-7 py-3 font-extrabold text-white shadow-glow sm:w-auto"
              to="/search"
            >
              <FiCompass />
              Explore Movies
            </Link>
            <a
              href={trailerUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-3 font-extrabold text-black transition hover:bg-cinema-red hover:text-white sm:w-auto"
            >
              <FiPlay className="fill-current" />
              Play Trailer
            </a>
            <Link
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 px-6 py-3 font-extrabold text-white backdrop-blur transition hover:border-cinema-red hover:bg-cinema-red sm:flex-none"
              to={`/movie/${movie.imdbID}`}
            >
              <FiInfo />
              More Info
            </Link>
            <button
              className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md border border-white/15 px-5 py-3 font-extrabold text-white backdrop-blur transition sm:flex-none ${
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
        {poster ? (
          <motion.div
            animate={{ opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }}
            className="hidden justify-self-end lg:block"
            initial={{ opacity: 0, y: 80, rotate: 4, filter: 'blur(16px)' }}
            transition={{ delay: 0.16, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <div className="absolute -inset-6 rounded-2xl bg-cinema-red/20 blur-2xl" />
              <img
                alt={movie.Title}
                className="relative aspect-[2/3] h-[34rem] rounded-lg border border-white/15 object-cover shadow-cinematic"
                src={poster}
              />
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

export default Hero;
