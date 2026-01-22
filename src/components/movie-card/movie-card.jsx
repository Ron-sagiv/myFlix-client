import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './movie-card.scss';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      className="movie-card-flixirama h-100"
      onClick={() => onMovieClick(movie)}
    >
      {/* Poster */}
      <div className="poster-wrapper">
        <Card.Img variant="top" src={movie.imageUrl} alt={movie.title} />

        {/* hover overlay */}
        <div className="movie-overlay">
          <h5 className="movie-title">{movie.title}</h5>
          <p className="movie-description">{movie.description}</p>
        </div>
      </div>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.object.isRequired,
    director: PropTypes.object.isRequired,
    actors: PropTypes.array.isRequired,
    releaseYear: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
