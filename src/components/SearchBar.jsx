import { FiSearch, FiX } from 'react-icons/fi';

function SearchBar({ value, onChange, onSubmit, placeholder = 'Search movies...', compact = false }) {
  return (
    <form
      className={`flex min-w-0 items-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 text-white shadow-cinematic backdrop-blur-xl transition focus-within:border-cinema-red ${
        compact ? 'h-10 w-[clamp(11rem,16vw,18rem)]' : 'h-12 w-full'
      }`}
      onSubmit={onSubmit}
    >
      <FiSearch className="shrink-0 text-cinema-muted" />
      <input
        aria-label="Search movies"
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-cinema-muted"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
      {value ? (
        <button
          aria-label="Clear search"
          className="grid h-7 w-7 place-items-center rounded-full text-cinema-muted transition hover:bg-white/10 hover:text-white"
          onClick={() => onChange('')}
          type="button"
        >
          <FiX />
        </button>
      ) : null}
    </form>
  );
}

export default SearchBar;
