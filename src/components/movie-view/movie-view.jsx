import './movie-view.scss';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export const MovieView = ({ movie }) => {
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

        <Link to={'/'}>
          <button className="back-button btn btn-danger">← Back to list</button>
        </Link>
      </div>
    </div>
  );
};
