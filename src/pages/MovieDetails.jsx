import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  FiCalendar,
  FiCheck,
  FiClock,
  FiCopy,
  FiHeart,
  FiPlay,
  FiPlus,
  FiShare2,
  FiStar,
} from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMoviesByKeyword, getPoster, getTrailerSearchUrl } from '../api/omdb';
import BlurReveal from '../components/BlurReveal';
import EmptyState from '../components/EmptyState';
import GsapText from '../components/GsapText';
import Loader from '../components/Loader';
import MovieCard from '../components/MovieCard';
import RatingPill from '../components/RatingPill';
import { useFavorites } from '../context/FavoritesContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useToast } from '../context/ToastContext';
import { useWatchlist } from '../context/WatchlistContext';

function ratingValue(movie, source) {
  return movie.Ratings?.find((rating) => rating.Source === source)?.Value;
}

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addRecentlyViewed } = useRecentlyViewed();
  const toast = useToast();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    getMovieDetails(id)
      .then(async (details) => {
        const keyword = details.Genre?.split(',')[0] || details.Title;
        let relatedMovies = [];

        try {
          const relatedData = await getMoviesByKeyword(keyword);
          relatedMovies = (relatedData.Search || []).filter((item) => item.imdbID !== details.imdbID);
        } catch {
          relatedMovies = [];
        }

        return { details, relatedMovies };
      })
      .then(({ details, relatedMovies }) => {
        if (!mounted) return;
        setMovie(details);
        setRelated(relatedMovies.slice(0, 12));
        addRecentlyViewed(details);
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
  }, [addRecentlyViewed, id]);

  if (loading) {
    return (
      <main className="min-h-screen pt-28">
        <Loader label="Opening premium movie details..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center px-4 pt-24 text-center">
        <EmptyState actionLabel="Search instead" message={error} title="Unable to load this title" />
      </main>
    );
  }

  const poster = getPoster(movie);
  const saved = isInWatchlist(movie.imdbID);
  const favorite = isFavorite(movie.imdbID);
  const trailerUrl = getTrailerSearchUrl(movie.Title);
  const facts = [
    ['Director', movie.Director],
    ['Writer', movie.Writer],
    ['Actors', movie.Actors],
    ['Box Office', movie.BoxOffice],
    ['Awards', movie.Awards],
    ['Language', movie.Language],
    ['Country', movie.Country],
    ['IMDb Votes', movie.imdbVotes],
    ['Metascore', movie.Metascore],
  ].filter(([, value]) => value && value !== 'N/A');
  const spotlightFacts = [
    ['Director', movie.Director],
    ['Cast', movie.Actors],
    ['Box Office', movie.BoxOffice],
    ['Awards', movie.Awards],
  ].filter(([, value]) => value && value !== 'N/A');

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast?.showToast('Movie link copied');
  };

  const shareMovie = async () => {
    if (navigator.share) {
      await navigator.share({ title: movie.Title, text: movie.Plot, url: window.location.href });
    } else {
      await copyLink();
    }
  };

  return (
    <motion.main animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }}>
      <section className="on-media relative min-h-[42rem] overflow-hidden pt-28">
        {poster ? (
          <>
            <img alt="" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-45 blur-2xl" src={poster} />
            <img alt="" className="absolute inset-0 h-full w-full object-cover opacity-12" src={poster} />
          </>
        ) : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_28%,rgba(229,9,20,0.28),transparent_30rem),radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.14),transparent_20rem)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-black via-cinema-black/90 to-cinema-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-transparent to-black/60" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 pb-20 sm:px-6 md:grid-cols-[minmax(14rem,24rem)_1fr] lg:px-10">
          <motion.div
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            className="max-w-xs md:max-w-none"
            initial={{ opacity: 0, y: 80, filter: 'blur(16px)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {poster ? (
              <img
                alt={movie.Title}
                className="aspect-[2/3] w-full rounded-xl border border-white/15 object-cover shadow-cinematic"
                src={poster}
              />
            ) : (
              <div className="flex aspect-[2/3] w-full flex-col justify-end rounded-lg border border-white/10 bg-[radial-gradient(circle_at_top,rgba(229,9,20,0.22),transparent_42%),linear-gradient(145deg,#1a1a1a,#050505)] p-6 shadow-cinematic">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cinema-red">CineVerse</p>
                <p className="mt-3 text-3xl font-black leading-tight">{movie.Title}</p>
              </div>
            )}
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            className="self-end"
            initial={{ opacity: 0, y: 80, filter: 'blur(16px)' }}
            transition={{ delay: 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-cinema-red">
              {movie.Rated && movie.Rated !== 'N/A' ? movie.Rated : movie.Type || 'Feature'}
            </p>
            <GsapText as="h1" className="mt-3 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
              {movie.Title}
            </GsapText>

            <div className="mt-5 flex flex-wrap gap-2">
              <RatingPill active label="IMDb" value={movie.imdbRating && movie.imdbRating !== 'N/A' ? movie.imdbRating : ''} />
              <RatingPill label="Rotten Tomatoes" value={ratingValue(movie, 'Rotten Tomatoes')} />
              <RatingPill label="Metacritic" value={ratingValue(movie, 'Metacritic')} />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold text-cinema-muted">
              <span className="flex items-center gap-1">
                <FiClock />
                {movie.Runtime && movie.Runtime !== 'N/A' ? movie.Runtime : 'Runtime TBA'}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar />
                {movie.Released && movie.Released !== 'N/A' ? movie.Released : movie.Year || 'Release TBA'}
              </span>
              <span className="flex items-center gap-1 text-cinema-gold">
                <FiStar className="fill-cinema-gold" />
                {movie.imdbVotes || 'Votes unavailable'}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {(movie.Genre || '').split(',').filter(Boolean).map((genre) => (
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-zinc-200" key={genre.trim()}>
                  {genre.trim()}
                </span>
              ))}
            </div>

            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-200 md:text-lg">
              {movie.Plot && movie.Plot !== 'N/A' ? movie.Plot : 'No plot summary is available for this title.'}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a className="magnetic-button inline-flex min-h-14 items-center gap-2 rounded-md bg-cinema-red px-7 py-3 font-extrabold text-white shadow-glow" href={trailerUrl} rel="noreferrer" target="_blank">
                <FiPlay className="fill-current" />
                Watch Trailer
              </a>
              <button className="inline-flex h-12 items-center gap-2 rounded-md border border-white/10 bg-white/10 px-5 font-extrabold text-white transition hover:bg-cinema-red" onClick={() => toggleWatchlist(movie)} type="button">
                {saved ? <FiCheck /> : <FiPlus />}
                {saved ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
              <button className="grid h-12 w-12 place-items-center rounded-md border border-white/10 bg-white/10 text-white transition hover:bg-cinema-red" onClick={() => toggleFavorite(movie)} type="button">
                <FiHeart className={favorite ? 'fill-white text-cinema-red' : ''} />
              </button>
              <button className="grid h-12 w-12 place-items-center rounded-md border border-white/10 bg-white/10 text-white transition hover:bg-cinema-red" onClick={shareMovie} type="button">
                <FiShare2 />
              </button>
              <button className="grid h-12 w-12 place-items-center rounded-md border border-white/10 bg-white/10 text-white transition hover:bg-cinema-red" onClick={copyLink} type="button">
                <FiCopy />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <BlurReveal as="section" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {spotlightFacts.map(([label, value]) => (
            <motion.div
              className="glass-panel rounded-xl p-5"
              key={label}
              initial={{ opacity: 0, y: 80, filter: 'blur(16px)' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-cinema-red">{label}</p>
              <p className="mt-3 line-clamp-4 text-base font-bold leading-7 text-white">{value}</p>
            </motion.div>
          ))}
        </div>
      </BlurReveal>

      <BlurReveal as="section" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <h2 className="text-2xl font-black">Full Movie Information</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {facts.map(([label, value]) => (
            <motion.div
              className="glass-panel rounded-xl p-5"
              initial={{ opacity: 0, y: 80, filter: 'blur(16px)' }}
              key={label}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cinema-red">{label}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-200">{value}</p>
            </motion.div>
          ))}
        </div>
      </BlurReveal>

      <BlurReveal as="section" className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-10">
        <h2 className="text-2xl font-black">Similar Discovery</h2>
        {related.length ? (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {related.map((item, index) => (
              <MovieCard key={item.imdbID} movie={item} revealDelay={index * 0.04} />
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-md border border-white/10 bg-white/[0.03] p-4 text-cinema-muted">
            No related titles are available yet.
          </p>
        )}
      </BlurReveal>
    </motion.main>
  );
}

export default MovieDetails;
