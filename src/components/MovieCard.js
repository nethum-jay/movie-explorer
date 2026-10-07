import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton, Rating, Box } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

const IMAGE_BASE = process.env.REACT_APP_TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useMovieContext();
  const isFav = favorites.some((item) => item.id === movie.id);

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.03)', cursor: 'pointer' },
      }}
    >
      <CardMedia
        component="img"
        height="360"
        image={posterUrl}
        alt={movie.title}
        onClick={() => navigate(`/movie/${movie.id}`)}
      />
      <CardContent sx={{ flexGrow: 1 }} onClick={() => navigate(`/movie/${movie.id}`)}>
        <Typography variant="subtitle1" fontWeight="bold" noWrap title={movie.title}>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Rating value={(movie.vote_average || 0) / 2} precision={0.5} readOnly size="small" />
          <Typography variant="caption" sx={{ ml: 1 }}>
            {movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
        <IconButton
          color="secondary"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(movie);
          }}
        >
          {isFav ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );
}