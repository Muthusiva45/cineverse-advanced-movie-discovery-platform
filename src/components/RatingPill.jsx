import { FiStar } from 'react-icons/fi';

function RatingPill({ label, value, active = false }) {
  if (!value || value === 'N/A') return null;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-extrabold ${
        active
          ? 'border-cinema-red bg-cinema-red text-white'
          : 'border-white/10 bg-white/10 text-zinc-100'
      }`}
    >
      <FiStar className={active ? 'fill-white' : 'fill-cinema-gold text-cinema-gold'} />
      {label}: {value}
    </span>
  );
}

export default RatingPill;
