import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/Moviecard';
import { API_KEY } from '../config';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const List: React.FC = () => {
  const query = useQuery().get('q');
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query) {
      axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}&page=${page}`)
        .then(response => setMovies(response.data.Search));
    }
  }, [query, page]);

  return (
    <div>
      <h1>Arama Sonuçları</h1>
      {movies && movies.map(movie => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
      <button onClick={() => setPage(page + 1)}>Daha fazla sonuç...</button>
    </div>
  );
};

export default List;
