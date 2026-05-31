import BlurReveal from './BlurReveal';

function SearchFilters({ type, year, sort, onTypeChange, onYearChange, onSortChange }) {
  const types = [
    ['movie', 'Movies'],
    ['series', 'Series'],
    ['episode', 'Episodes'],
    ['all', 'All'],
  ];

  return (
    <BlurReveal className="glass-panel rounded-xl p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cinema-red">Refine</p>
          <h2 className="mt-1 text-lg font-black text-white">Search filters</h2>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
          {types.map(([value, label]) => (
            <button
              className={`rounded-md border px-3 py-2 text-sm font-bold transition ${
                type === value
                  ? 'border-cinema-red bg-cinema-red text-white'
                  : 'border-white/10 bg-white/5 text-cinema-muted hover:border-cinema-red hover:text-white'
              }`}
              key={value}
              onClick={() => onTypeChange(value)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
        <label className="grid gap-2 text-sm font-semibold text-cinema-muted">
          Year
          <input
            className="h-12 rounded-md border border-white/10 bg-black/45 px-3 text-white outline-none placeholder:text-cinema-muted focus:border-cinema-red"
            inputMode="numeric"
            maxLength="4"
            onChange={(event) => onYearChange(event.target.value.replace(/\D/g, '').slice(0, 4))}
            placeholder="Any year"
            value={year}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-cinema-muted">
          Sort
          <select
            className="h-12 rounded-md border border-white/10 bg-black/45 px-3 text-white outline-none focus:border-cinema-red"
            onChange={(event) => onSortChange(event.target.value)}
            value={sort}
          >
            <option value="relevance">Relevance</option>
            <option value="title">Title</option>
            <option value="year-desc">Year newest</option>
            <option value="year-asc">Year oldest</option>
            <option value="rating">IMDb rating</option>
          </select>
        </label>
      </div>
    </BlurReveal>
  );
}

export default SearchFilters;
