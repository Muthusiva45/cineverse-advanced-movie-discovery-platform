import { getMoviesByKeyword } from '../api/omdb';

export const categories = [
  { title: 'Trending Now', keyword: 'Avengers' },
  { title: 'Popular', keyword: 'Batman' },
  { title: 'Sci-Fi Picks', keyword: 'Interstellar' },
  { title: 'Action Zone', keyword: 'Mission Impossible' },
  { title: 'Horror Nights', keyword: 'Conjuring' },
  { title: 'Romance', keyword: 'Titanic' },
  { title: 'Comedy', keyword: 'Hangover' },
  { title: 'Indian Picks', keyword: 'Vikram' },
  { title: 'Anime Picks', keyword: 'Naruto' },
].map((category) => ({
  ...category,
  fetcher: () => getMoviesByKeyword(category.keyword),
}));
