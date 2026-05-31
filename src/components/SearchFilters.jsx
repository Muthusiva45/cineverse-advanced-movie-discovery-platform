function SearchFilters({ type, year, sort, onTypeChange, onYearChange, onSortChange }) {
  return (
    <div className="glass-panel grid gap-3 rounded-lg p-4 sm:grid-cols-3">
      <label className="grid gap-2 text-sm font-semibold text-cinema-muted">
        Type
        <select
          className="h-11 rounded-md border border-white/10 bg-black/45 px-3 text-white outline-none focus:border-cinema-red"
          onChange={(event) => onTypeChange(event.target.value)}
          value={type}
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
          <option value="all">All</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold text-cinema-muted">
        Year
        <input
          className="h-11 rounded-md border border-white/10 bg-black/45 px-3 text-white outline-none placeholder:text-cinema-muted focus:border-cinema-red"
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
          className="h-11 rounded-md border border-white/10 bg-black/45 px-3 text-white outline-none focus:border-cinema-red"
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
  );
}

export default SearchFilters;
