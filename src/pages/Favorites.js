import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { useMovieContext } from '../context/MovieContext';

export default function Favorites() {
  const { favorites } = useMovieContext();
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>❤️ My Favorite Movies</Typography>
      {favorites.length === 0 ? (
        <Typography color="text.secondary">You have not added any favorite movies yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}