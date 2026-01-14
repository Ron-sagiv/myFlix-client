import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'The Dark Knight',
      director: { name: 'Christopher Nolan' },
      released: 2008,
      genre: { name: 'action' },
      image:
        'https://www.vintagemovieposters.co.uk/wp-content/uploads/2024/08/4D97B6D8-D1A5-4D9F-9A3A-D637A85166EA.jpg',
    },
    {
      id: 2,
      title: 'The Godfather',
      director: { name: 'Francis Ford Coppola' },
      released: 1972,
      genre: { name: 'crime' },
      image:
        'https://filmartgallery.com/cdn/shop/files/The-Godfather-Vintage-Movie-Poster-Original_3f6a0559.jpg?v=1740020608',
    },
    {
      id: 3,
      title: 'The Shawshank Redemption',
      director: { name: 'Frank Darabont' },
      released: 1994,
      genre: { name: 'thriller' },
      image:
        'https://www.originalfilmart.com/cdn/shop/products/shawshank_redemption_1994_netherlands_original_film_art_f_1200x.jpg?v=1572559870',
    },
    {
      id: 4,
      title: 'The Lord of the Rings: The Return of the King',
      director: { name: 'Peter Jackson' },
      released: 2003,
      genre: { name: 'fantasy' },
      image:
        'https://filmartgallery.com/cdn/shop/files/The-Lord-of-the-Rings-The-Return-of-the-King-Vintage-Movie-Poster-Original.jpg?v=1738909709',
    },
  ]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
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
