import PropTypes from 'prop-types';
import { Button, Card, Col } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    //<Col style={{ marginBottom: '10px' }}>
    <Card
      className="h-100"
      // style={{ width: '18rem' }}
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <Card.Img variant="top" src={movie.imageUrl} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Button variant="primary" className="mt-auto">
          More
        </Button>
      </Card.Body>
    </Card>
    //</Col>
  );
};
// Here is where we define all the props constraints for the MovieCard
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
