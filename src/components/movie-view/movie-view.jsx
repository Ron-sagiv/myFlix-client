import './movie-view.scss';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view-whole">
      <div>
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="movie-view-image"
        />
      </div>
      <div className="movie-view-details">
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>Released: </span>
          <span>{movie.releaseYear}</span>
        </div>
        <div>
          <span>Rating: </span>
          <span>{movie.rating}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre.name}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director.name}</span>
        </div>
        <Button
          onClick={onBackClick}
          className="back-button"
          style={{ cursor: 'pointer' }}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

// Here is where we define all the props constraints for the MovieView
MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,

    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,

    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,

    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,

  onBackClick: PropTypes.func.isRequired,
};
