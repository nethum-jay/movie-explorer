import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Chip, Button, CircularProgress, Alert, Grid, Rating } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchMovieDetails } from '../api/tmdb';

const IMAGE_BASE = process.env.REACT_APP_TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p/w500';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError('It was not possible to obtain details about the film.');
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  if (error) return <Container sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Container>;
  if (!movie) return null;

  const trailer = movie.videos?.results?.find((vid) => vid.type === 'Trailer' && vid.site === 'YouTube');

  return (
    <Container sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Back
      </Button>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <img
            src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : 'https://via.placeholder.com/500x750'}
            alt={movie.title}
            style={{ width: '100%', borderRadius: 8 }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>{movie.title}</Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Release Date: {movie.release_date} | Runtime: {movie.runtime} min
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            <Rating value={(movie.vote_average || 0) / 2} precision={0.5} readOnly />
            <Typography sx={{ ml: 1 }}>{movie.vote_average?.toFixed(1)} / 10</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            {movie.genres?.map((g) => (
              <Chip key={g.id} label={g.name} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>Overview</Typography>
          <Typography variant="body1" paragraph>{movie.overview}</Typography>

          {trailer && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Official Trailer</Typography>
              <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                <iframe
                  title="Trailer"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  allowFullScreen
                />
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}