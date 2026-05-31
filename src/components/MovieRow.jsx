import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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
      className="group/row px-4 py-7 sm:px-6 lg:px-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-extrabold md:text-2xl">{title}</h2>
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
        className="no-scrollbar grid auto-cols-[38%] grid-flow-col gap-3 overflow-x-auto scroll-smooth pb-4 sm:auto-cols-[24%] md:auto-cols-[18%] lg:auto-cols-[14%] 2xl:auto-cols-[11%]"
        ref={rowRef}
      >
        {!loading && movies.length
          ? movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
          : Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
      </div>
    </motion.section>
  );
}

export default MovieRow;
