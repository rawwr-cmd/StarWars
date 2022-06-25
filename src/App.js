import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch(
        "https://react-honkers-default-rtdb.firebaseio.com/movielist.json"
      );

      if (!response.ok) {
        throw new Error("Lmao, we have messed up our backend (Comeback later)");
      }
      const data = await response.json();
      //   console.log(data);

      const loadedMovies = [];
      for (const key in data) {
        // console.log(key);
        loadedMovies.push({
          ...data[key],
          id: key,
        });

        //or this way:
        // loadedMovies.push({
        //   id: key,
        //   title: data[key].title,
        //   openingText: data[key].openingText,
        //   releaseDate: data[key].releaseDate,
        // });
      }

      //   console.log(loadedMovies);
      setMovies(loadedMovies);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  const addMovieHandler = async (movie) => {
    // console.log(movie);
    const response = await fetch(
      "https://react-honkers-default-rtdb.firebaseio.com/movielist.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
  };

  let content = <h1>Please Fetch To see The MoviesList</h1>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (isError) {
    content = <h1>{isError}</h1>;
  }

  if (isLoading) {
    content = <h1>We are loading! HangOn there</h1>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>FetchYourMovieList</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
