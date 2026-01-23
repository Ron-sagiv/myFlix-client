import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './movie-card.scss';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
      <Card className="movie-card-flixirama h-100">
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
    </Link>
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
