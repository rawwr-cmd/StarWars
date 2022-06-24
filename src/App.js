import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.module.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovieHandler = async () => {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        releaseDate: movieData.release_date,
        openingText: movieData.opening_crawl,
      };
    });
    // console.log(transformedMovies);
    setMovies(transformedMovies);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>FetchYourMovieList</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && (
          <h1>Please Fetch To see The MoviesList</h1>
        )}
        {isLoading && <h1>We are loading! HangOn there</h1>}
      </section>
    </React.Fragment>
  );
}

export default App;
