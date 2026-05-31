import { FiFilm } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function EmptyState({ title, message, actionLabel, actionTo = '/search' }) {
  return (
    <div className="glass-panel grid place-items-center rounded-lg p-10 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-cinema-red/15 text-2xl text-cinema-red">
        <FiFilm />
      </div>
      <h2 className="mt-5 text-2xl font-black">{title}</h2>
      <p className="mt-2 max-w-md text-cinema-muted">{message}</p>
      {actionLabel ? (
        <Link
          className="magnetic-button mt-6 inline-flex h-11 items-center rounded-md bg-cinema-red px-5 font-extrabold text-white"
          to={actionTo}
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

export default EmptyState;
