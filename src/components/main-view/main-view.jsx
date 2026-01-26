import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import PropTypes from 'prop-types';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { Rings } from 'react-loader-spinner';

/* =========================
   MainView Component
========================= */
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [loading, setLoading] = useState(true);

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
      .finally(() => setLoading(false));
  }, [token]); // dependency updated
  //================================================================

  const onLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
  };

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const onUserUpdate = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  if (loading) {
    return (
      <div className="loader">
        <Rings
          visible={true}
          height="80"
          width="80"
          strokeColor="yellow"
          color="#D80505"
          ariaLabel="myflix-spinner-loading"
        />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView onLoggedIn={onLoggedIn} />
                </Col>
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <LoginView onLoggedIn={onLoggedIn} />
              ) : (
                <Col md={8}>
                  <MovieView movies={movies} onUserUpdate={onUserUpdate} />
                </Col>
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
                <LoginView onLoggedIn={onLoggedIn} />
              ) : movies.length === 0 ? (
                <Col>No Movies! Its quiet here!</Col>
              ) : (
                <>
                  {movies.map((movie) => (
                    <Col className="mb-3" key={movie._id} md={6} lg={3}>
                      <MovieCard movie={movie} />
                    </Col>
                  ))}
                </>
              )
            }
          />
          <Route
            path="/users/:userName"
            element={
              !user ? (
                <LoginView onLoggedIn={onLoggedIn} />
              ) : (
                <ProfileView
                  user={user}
                  movies={movies}
                  onUserUpdate={onUserUpdate}
                />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

// Here is where we define all the props constraints for the MainView
MainView.propTypes = { movies: PropTypes.array.isRequired };
