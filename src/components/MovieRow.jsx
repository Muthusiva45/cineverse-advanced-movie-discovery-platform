import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { blurReveal, blurStagger } from './BlurReveal';
import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';

function MovieRow({ title, fetcher }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const rowRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setError('');

    fetcher()
      .then((data) => {
        if (mounted) setMovies((data.Search || []).slice(0, 10));
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
  }, [fetcher]);

  const scroll = (direction) => {
    rowRef.current?.scrollBy({
      left: direction * Math.min(rowRef.current.clientWidth * 0.85, 920),
      behavior: 'smooth',
    });
  };

  if (error) {
    return (
      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <h2 className="text-xl font-extrabold md:text-2xl">{title}</h2>
        <p className="mt-3 rounded-md border border-cinema-red/30 bg-cinema-red/10 p-4 text-sm text-red-100">
          {error}
        </p>
      </section>
    );
  }

  return (
    <motion.section
      className="group/row px-4 py-10 sm:px-6 lg:px-10"
      initial="hidden"
      variants={blurReveal}
      viewport={{ once: true, amount: 0.2, margin: '-80px' }}
      whileInView="visible"
    >
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cinema-red">Curated row</p>
          <h2 className="mt-1 text-2xl font-black md:text-3xl">{title}</h2>
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            aria-label={`Scroll ${title} left`}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-cinema-red hover:bg-cinema-red"
            onClick={() => scroll(-1)}
            type="button"
          >
            <FiChevronLeft />
          </button>
          <button
            aria-label={`Scroll ${title} right`}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-cinema-red hover:bg-cinema-red"
            onClick={() => scroll(1)}
            type="button"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
      <div
        className="no-scrollbar grid auto-cols-[58%] grid-flow-col gap-4 overflow-x-auto scroll-smooth pb-6 sm:auto-cols-[34%] md:auto-cols-[24%] lg:auto-cols-[18%] xl:auto-cols-[15%] 2xl:auto-cols-[13%]"
        ref={rowRef}
      >
        <motion.div className="contents" initial="hidden" variants={blurStagger} viewport={{ once: true }} whileInView="visible">
          {!loading && movies.length
            ? movies.map((movie, index) => <MovieCard key={movie.imdbID} movie={movie} revealDelay={index * 0.045} />)
            : Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default MovieRow;
