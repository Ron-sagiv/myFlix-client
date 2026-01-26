import { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';

/* =========================
   ProfileView Component
========================= */
export const ProfileView = ({ user, movies, onUserUpdate }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  /* =========================
     FETCH USER + MOVIES
     ========================= */
  useEffect(() => {
    if (!token || !user) return;

    setUsername(user.userName);
    setPassword(user.password);
    setEmail(user.email);
    setBirthday(user.birthday);
    setFavoriteMovies(user.favoriteMovies || []);
  }, [token, user]);

  /* =========================
     UPDATE USER
     ========================= */
  const handleProfileUpdate = (e) => {
    e.preventDefault();

    fetch(
      `https://flixirama-1ce078bad93f.herokuapp.com/users/${user.userName}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userName: username,
          password,
          email,
          birthday,
        }),
      },
    )
      .then((res) => res.json())
      .then((user) => {
        onUserUpdate(user);
        alert('Profile updated');
      });
  };

  /* =========================
     REMOVE FAVORITE MOVIE
     ========================= */
  const handleRemoveFavorite = (movieId) => {
    fetch(
      `https://flixirama-1ce078bad93f.herokuapp.com/users/${user.userName}/movies/${movieId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      },
    )
      .then((res) => res.json())
      .then((updatedUser) => {
        setFavoriteMovies(updatedUser.favoriteMovies);
        onUserUpdate(updatedUser);
      });
  };

  /* =========================
     DEREGISTER
     ========================= */
  const handleDeregister = () => {
    if (!window.confirm('Are you sure?')) return;

    fetch(
      `https://flixirama-1ce078bad93f.herokuapp.com/users/${user.userName}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      },
    ).then(() => {
      localStorage.clear();
      navigate('/login');
    });
  };

  if (!user) return <div>Loading profile…</div>;

  /* =========================
     FILTER FAVORITE MOVIES
     ========================= */
  const favoriteMovieObjects = movies.filter((movie) =>
    favoriteMovies.includes(movie._id),
  );

  return (
    <>
      {/* ================= USER INFO ================= */}
      <Col md={4}>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>User Info</Card.Title>
            <p>
              <strong>Username:</strong> {user.userName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Birthday:</strong> {user.birthday?.slice(0, 10)}
            </p>

            <Button variant="danger" onClick={handleDeregister}>
              Deregister
            </Button>
          </Card.Body>
        </Card>

        {/* ================= UPDATE FORM ================= */}
        <Card>
          <Card.Body>
            <Card.Title>Update Profile</Card.Title>
            <Form onSubmit={handleProfileUpdate}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" className="mt-3">
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      {/* ================= FAVORITE MOVIES ================= */}
      <Col md={8}>
        <h3 className="mb-3">Favorite Movies</h3>
        <Row>
          {favoriteMovieObjects.length === 0 && <p>No favorite movies yet.</p>}

          {favoriteMovieObjects.map((movie) => (
            <Col key={movie._id} md={6} lg={4} className="mb-3">
              <MovieCard movie={movie} />

              {/* remove button below card */}
              <Button
                variant="outline-danger"
                size="sm"
                className="mt-2 w-100"
                onClick={() => handleRemoveFavorite(movie._id)}
              >
                Remove from Favorites
              </Button>
            </Col>
          ))}
        </Row>
      </Col>
    </>
  );
};
