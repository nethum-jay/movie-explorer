import React, { createContext, useContext, useState, useEffect } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('themeMode') === 'dark');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('movieFavorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [lastQuery, setLastQuery] = useState(() => localStorage.getItem('lastSearchedMovie') || '');
  const [user, setUser] = useState(() => localStorage.getItem('authUser') || null);

  useEffect(() => {
    localStorage.setItem('themeMode', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      return exists ? prev.filter((item) => item.id !== movie.id) : [...prev, movie];
    });
  };

  const saveLastQuery = (query) => {
    setLastQuery(query);
    localStorage.setItem('lastSearchedMovie', query);
  };

  const login = (username) => {
    setUser(username);
    localStorage.setItem('authUser', username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  return (
    <MovieContext.Provider
      value={{ darkMode, toggleDarkMode, favorites, toggleFavorite, lastQuery, saveLastQuery, user, login, logout }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);