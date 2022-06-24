import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.module.css";

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMovieHandler = () => {
    fetch("https://swapi.dev/api/films")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            releaseDate: movieData.release_date,
            openingText: movieData.opening_crawl,
          };
        });
        console.log(transformedMovies);
        setMovies(transformedMovies);
      });
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>FetchYourMovieList</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
