import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Trending movies 
export const fetchTrendingMovies = async (page = 1) => {
  const response = await tmdbApi.get('/trending/movie/day', {
    params: { page },
  });
  return response.data;
};

// Search movies 
export const searchMovies = async (query, page = 1) => {
  const response = await tmdbApi.get('/search/movie', {
    params: { query, page },
  });
  return response.data;
};

// Movie Details and Videos (Trailers)
export const fetchMovieDetails = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'videos,credits',
    },
  });
  return response.data;
};

export default tmdbApi;