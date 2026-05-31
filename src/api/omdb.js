import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

const omdb = axios.create({
  baseURL: BASE_URL,
});

const ensureApiKey = () => {
  if (!API_KEY || API_KEY === 'your_omdb_api_key_here') {
    throw new Error('Add your OMDb API key to .env as VITE_OMDB_API_KEY.');
  }
};

const request = async (params) => {
  ensureApiKey();

  try {
    const { data } = await omdb.get('/', {
      params: {
        apikey: API_KEY,
        ...params,
      },
    });

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Unable to load OMDb data.');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Unable to reach OMDb.');
  }
};

export const hasPoster = (movie) => Boolean(movie?.Poster && movie.Poster !== 'N/A');

export const getPoster = (movie) => (hasPoster(movie) ? movie.Poster : '');

export const getTrailerSearchUrl = (title) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(`${title} official trailer`)}`;

export const searchMovies = (query, type = 'movie', year = '', page = 1) => {
  const params = {
    s: query,
    page,
  };

  if (type && type !== 'all') params.type = type;
  if (year) params.y = year;

  return request(params);
};

export const getMovieDetails = (imdbID) =>
  request({
    i: imdbID,
    plot: 'full',
  });

export const getMovieByTitle = (title) =>
  request({
    t: title,
    plot: 'full',
  });

export const getMoviesByKeyword = (keyword) =>
  request({
    s: keyword,
    type: 'movie',
  });
