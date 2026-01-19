import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import PropTypes from 'prop-types';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // useEffect(() => {
  //   console.log('Use Effect is Running');
  //   fetch('https://flixirama-1ce078bad93f.herokuapp.com/movies')
  //     .then((response) => response.json())
  //     .then((movies) => {
  //       setMovies(movies); // Setting/Updating movies from API to the react state movies
  //     })
  //     .catch((err) => {
  //       console.error('Something wrong in fetching movies', err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);
  useEffect(() => {
    console.log('Use Effect is Running');

    // do not fetch unless token exists
    if (!token) {
      return;
    }

    fetch('https://flixirama-1ce078bad93f.herokuapp.com/movies', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => {
        console.error('Something wrong in fetching movies', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]); // dependency updated

  if (loading) {
    return <h3>Loading.......</h3>;
  }

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </>
    );
  }

  if (movies.length === 0) {
    return (
      <>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
        <div>The list is empty!</div>
      </>
    );
  } else {
    return (
      <div>
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  }
};
// Here is where we define all the props constraints for the MainView
MainView.propTypes = {};
