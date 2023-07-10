import React, { useState } from "react";
import axios from "axios";

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchStarted, setSearchStarted] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSearchStarted(true);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchTerm) {
      searchMovies();
    } else {
      setMovies([]);
    }
  };

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=fa755439`
      );
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error(error);
    }
  };

  /* ==================================== */

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Movie Search..."
        />
        <button type="submit">Search</button>
      </form>

      {searchStarted && (
        <div className="box">
          {movies.map((movie) => (
            <div className="img" key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} />
              <h4>{movie.Title}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default React.memo(MovieSearch);
