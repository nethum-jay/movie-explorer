import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import { Brightness4, Brightness7, Favorite, Home } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

export default function Navbar() {
  const { darkMode, toggleDarkMode, user, logout, favorites } = useMovieContext();
  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
        >
          🎬 Movie Explorer
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" component={Link} to="/">
            <Home />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/favorites">
            <Favorite sx={{ color: favorites.length > 0 ? '#ff4081' : 'inherit' }} />
          </IconButton>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {user ? (
            <Button color="inherit" onClick={() => { logout(); navigate('/login'); }}>
              Logout ({user})
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}