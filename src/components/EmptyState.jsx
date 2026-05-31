import { FiFilm, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import BlurReveal from './BlurReveal';

function EmptyState({ title, message, actionLabel, actionTo = '/search' }) {
  return (
    <BlurReveal className="glass-panel relative grid min-h-[22rem] place-items-center overflow-hidden rounded-xl p-10 text-center">
      <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cinema-red/15 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="relative">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl border border-white/10 bg-cinema-red/15 text-3xl text-cinema-red shadow-glow">
          <FiFilm />
        </div>
        <h2 className="mt-6 text-3xl font-black">{title}</h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-cinema-muted">{message}</p>
        {actionLabel ? (
          <Link
            className="magnetic-button mt-7 inline-flex min-h-12 items-center gap-2 rounded-md bg-cinema-red px-6 py-3 font-extrabold text-white"
            to={actionTo}
          >
            <FiSearch />
            {actionLabel}
          </Link>
        ) : null}
      </div>
    </BlurReveal>
  );
}

export default EmptyState;
