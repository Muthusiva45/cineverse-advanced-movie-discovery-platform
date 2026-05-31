import { motion } from 'framer-motion';
import CompareSelector from '../components/CompareSelector';
import PageTitle from '../components/PageTitle';
import RatingPill from '../components/RatingPill';
import { getPoster } from '../api/omdb';
import { useState } from 'react';

function numberFromMoney(value) {
  return Number(String(value || '').replace(/[^0-9]/g, '')) || 0;
}

function numberFromRating(value) {
  return Number(String(value || '').split('/')[0]) || 0;
}

function ratingValue(movie, source) {
  return movie?.Ratings?.find((rating) => rating.Source === source)?.Value || 'N/A';
}

function betterClass(left, right, parser = Number) {
  const a = parser(left);
  const b = parser(right);
  if (!a || !b || a === b) return ['', ''];
  return a > b ? ['border-cinema-red bg-cinema-red/10', ''] : ['', 'border-cinema-red bg-cinema-red/10'];
}

function PosterCell({ movie }) {
  if (!movie) return <span className="text-cinema-muted">Select a movie</span>;
  const poster = getPoster(movie);
  return poster ? (
    <img alt={movie.Title} className="mx-auto aspect-[2/3] w-28 rounded-md object-cover shadow-cinematic" src={poster} />
  ) : (
    <div className="mx-auto flex aspect-[2/3] w-28 items-end rounded-md bg-white/10 p-3 text-sm font-bold">{movie.Title}</div>
  );
}

function Compare() {
  const [left, setLeft] = useState(null);
  const [right, setRight] = useState(null);
  const [ratingLeft, ratingRight] = betterClass(left?.imdbRating, right?.imdbRating, Number);
  const [boxLeft, boxRight] = betterClass(left?.BoxOffice, right?.BoxOffice, numberFromMoney);
  const rows = [
    ['Poster', <PosterCell movie={left} />, <PosterCell movie={right} />],
    ['Title', left?.Title, right?.Title],
    ['Year', left?.Year, right?.Year],
    ['IMDb rating', left?.imdbRating, right?.imdbRating, ratingLeft, ratingRight],
    ['Runtime', left?.Runtime, right?.Runtime],
    ['Genre', left?.Genre, right?.Genre],
    ['Director', left?.Director, right?.Director],
    ['Actors', left?.Actors, right?.Actors],
    ['BoxOffice', left?.BoxOffice, right?.BoxOffice, boxLeft, boxRight],
    ['Awards', left?.Awards, right?.Awards],
    ['Rotten Tomatoes', ratingValue(left, 'Rotten Tomatoes'), ratingValue(right, 'Rotten Tomatoes')],
    ['Metacritic', ratingValue(left, 'Metacritic'), ratingValue(right, 'Metacritic'), ...betterClass(ratingValue(left, 'Metacritic'), ratingValue(right, 'Metacritic'), numberFromRating)],
  ];

  return (
    <motion.main animate={{ opacity: 1, y: 0 }} className="mx-auto min-h-screen max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-10" exit={{ opacity: 0, y: 12 }} initial={{ opacity: 0, y: 12 }}>
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-cinema-red">Head To Head</p>
      <PageTitle>Compare Movies</PageTitle>
      <p className="mt-4 max-w-2xl text-cinema-muted">Pick two movies and compare ratings, box office, awards, cast, and metadata side by side.</p>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <CompareSelector label="Movie A" onSelect={setLeft} selected={left} />
        <CompareSelector label="Movie B" onSelect={setRight} selected={right} />
      </div>

      <div className="mt-10 overflow-hidden rounded-lg border border-white/10">
        <div className="grid grid-cols-[9rem_1fr_1fr] bg-white/[0.06] text-sm font-black uppercase tracking-[0.16em] text-cinema-muted">
          <div className="p-4">Metric</div>
          <div className="p-4">{left?.Title || 'Movie A'}</div>
          <div className="p-4">{right?.Title || 'Movie B'}</div>
        </div>
        {rows.map(([label, leftValue, rightValue, leftClass = '', rightClass = '']) => (
          <div className="grid grid-cols-[9rem_1fr_1fr] border-t border-white/10 text-sm" key={label}>
            <div className="bg-white/[0.03] p-4 font-bold text-cinema-muted">{label}</div>
            <div className={`p-4 text-zinc-100 ${leftClass}`}>{leftValue || 'N/A'}</div>
            <div className={`border-l border-white/10 p-4 text-zinc-100 ${rightClass}`}>{rightValue || 'N/A'}</div>
          </div>
        ))}
      </div>

      {left || right ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {left ? <RatingPill active label={left.Title} value={left.imdbRating} /> : null}
          {right ? <RatingPill active label={right.Title} value={right.imdbRating} /> : null}
        </div>
      ) : null}
    </motion.main>
  );
}

export default Compare;
