import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { fetchTrendingMovies, searchMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import { useMovieContext } from '../context/MovieContext';

export default function Home() {
  const { lastQuery, saveLastQuery } = useMovieContext();
  const [query, setQuery] = useState(lastQuery || '');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(Boolean(lastQuery));

  const loadData = async (pageNum = 1, searchQuery = query, append = false) => {
    setLoading(true);
    setError('');
    try {
      let data;
      if (searchQuery.trim()) {
        data = await searchMovies(searchQuery.trim(), pageNum);
        setIsSearching(true);
      } else {
        data = await fetchTrendingMovies(pageNum);
        setIsSearching(false);
      }
      setMovies((prev) => (append ? [...prev, ...data.results] : data.results));
      setTotalPages(data.total_pages);
      setPage(pageNum);
    } catch (err) {
      setError('An error occurred while retrieving the movie. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lastQuery) {
      loadData(1, lastQuery, false);
    } else {
      loadData(1, '', false);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    saveLastQuery(query);
    loadData(1, query, false);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      loadData(page + 1, query, true);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="contained" type="submit" size="large">
          Search
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        {isSearching ? `Search Results for "${query}"` : '🔥 Trending Movies'}
      </Typography>

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item key={`${movie.id}-${Math.random()}`} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && page < totalPages && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="outlined" size="large" onClick={handleLoadMore}>
            Load More Movies
          </Button>
        </Box>
      )}
    </Container>
  );
}