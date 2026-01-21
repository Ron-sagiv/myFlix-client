import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import PropTypes from 'prop-types';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Button, Container, Nav, Navbar, Row, Col } from 'react-bootstrap';

/* =========================
   MainView Component
========================= */
export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);

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
  //================================================================

  /* =========================
     ADDED: shared logout handler
     (moved logic from old navbar)
  ========================= */
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  //================================================================
  //  CHANGED: single return with Row as root + ternary operators
  return (
    <>
      {/* =========================
         ADDED: Navbar from OLD file
         Only renders when user is logged in
      ========================= */}
      {user && (
        <Navbar bg="dark" data-bs-theme="dark" className="mb-4">
          <Container>
            <Navbar.Brand href="/">Flixirama</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      )}

      <Row className="justify-content-md-center">
        {!user ? (
          <Col md={5}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            Not a user yet?
            <SignupView />
          </Col>
        ) : loading ? (
          <h3>Loading.......</h3>
        ) : selectedMovie ? (
          <>
            {/* REMOVED: standalone Logout button (now in Navbar) */}
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
              />
            </Col>
          </>
        ) : movies.length === 0 ? (
          <>
            {/* REMOVED: standalone Logout button (now in Navbar) */}
            <div>The list is empty!</div>
          </>
        ) : (
          <>
            {/* REMOVED: standalone Logout button (now in Navbar) */}

            {movies.map((movie) => (
              <Col className="mb-3" key={movie._id} md={3}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </>
        )}
      </Row>
    </>
  );
};

// Here is where we define all the props constraints for the MainView
MainView.propTypes = {};
