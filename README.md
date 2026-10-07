
# Movie Explorer App

A modern, responsive web application built with React and Material-UI (MUI) that allows users to discover trending films, search movies in real-time, view detailed movie profiles with trailers, and manage a local list of favorite movies.

## 🚀 Live Demo

- [Live Demo Link](https://movie-explorer-phi-peach.vercel.app)

## ✨ Features Implemented

- **Trending Movies**: Fetches and displays popular movies daily from the TMDb API.
- **Search Functionality**: Real-time movie search with persistence of the last search term in `localStorage`.
- **Load More / Pagination**: Seamlessly loads additional movie results.
- **Detailed View**: Displays movie overview, release date, rating, genres, and embedded official YouTube trailers.
- **Favorites Management**: Add or remove movies to a favorites list stored locally (`localStorage`).
- **Theme Support**: Seamless toggle between Dark Mode and Light Mode.
- **User Authentication**: Mock login interface with user state persistence.
- **Responsive UI**: Built using Material-UI following mobile-first design principles.

## 🛠️ Tech Stack & Libraries

- **React.js** (Create React App)
- **Material-UI (MUI)** for UI styling & theme support
- **Axios** for REST API integration
- **React Router DOM** for navigation
- **TMDb (The Movie Database) API**

## ⚙️ Setup and Installation

1. Clone the repository:
   ```bash
   git clone <YOUR_GITLAB_REPO_URL>
   cd movie-explorer

   1.Install dependencies:
   	npm install

   2.Configure Environment Variables:
   Create a .env file in the root directory:
   	REACT_APP_TMDB_API_KEY=your_tmdb_api_key
   	REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
   	REACT_APP_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p/w500

   3.Run the project locally:
   	npm start
   ```
