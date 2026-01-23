import './movie-view.scss';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const MovieView = ({ movie }) => {
  /* =========================
     auth + state
     ========================= */
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const [isFavorite, setIsFavorite] = useState(false);

  /* =========================
     check if favorite
     ========================= */
  useEffect(() => {
    if (!storedUser || !movie) return;

    setIsFavorite(storedUser.favoriteMovies?.includes(movie._id));
  }, [storedUser, movie]);

  /* =========================
     toggle favorite
     ========================= */
  const handleToggleFavorite = () => {
    if (!storedUser || !token) return;

    const method = isFavorite ? 'DELETE' : 'POST';

    fetch(
      `https://flixirama-1ce078bad93f.herokuapp.com/users/${storedUser.userName}/movies/${movie._id}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => res.json())
      .then((updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsFavorite(!isFavorite);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="movie-view-flixirama">
      <img src={movie.imageUrl} alt={movie.title} className="movie-poster" />

      <div className="movie-info">
        <h1 className="movie-title">{movie.title}</h1>

        <div className="movie-meta">
          <span>{movie.releaseYear}</span>
          <span>•</span>
          <span>{movie.rating}</span>
          <span>•</span>
          <span>{movie.genre.name}</span>
        </div>

        <p className="movie-description">{movie.description}</p>

        <p className="movie-director">
          <strong>Director:</strong> {movie.director.name}
        </p>

        {/* =========================
            Favorite Button
           ========================= */}
        {storedUser && (
          <Button
            variant={isFavorite ? 'danger' : 'outline-danger'}
            className="me-2 favBtn"
            onClick={handleToggleFavorite}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        )}

        <Link to={'/'}>
          <button className="back-button btn btn-danger">← Back to list</button>
        </Link>
      </div>
    </div>
  );
};

/* =========================
   PropTypes 
========================= */
MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.object.isRequired,
    director: PropTypes.object.isRequired,
    actors: PropTypes.array.isRequired,
    releaseYear: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
