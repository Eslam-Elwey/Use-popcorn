import { useEffect, useRef, useState } from "react";
import "./App.css";
import MainSec from "./components/MainSec";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WatchedMovies from "./components/WatchedMovies";
import ListBox from "./components/ListBox";
import Button from "./components/Button";
import WatchedSummary from "./components/WatchedSummary";
import Search from "./components/Search";
import StarRating from "./components/StarRating";
import MovieFullDetails from "./components/MovieFullDetails";
import { useMovies } from "./custom_hooks/useMovies";
import { useLocalStorageState } from "./custom_hooks/useLocalStorageState";

export const key = "d8126ba3";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <>
      <StarRating color="blue" setStateFun={setMovieRating} />
      <p>Rating is {movieRating}</p>
    </>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}

function App() {
  const [ watchedMovies, setWatchedMovies ] = useLocalStorageState([],"watchedMovies");

  const [query, setQuery] = useState("");
  const [selectedMovieID, setSelectedMovieID] = useState(null);

  const inputElem = useRef(null);

  function handleAddwatchedMovie(movie) {
    setWatchedMovies(() => [...watchedMovies, movie]);
    handleCloseDetails();
  }

  function handleCloseDetails() {
    setSelectedMovieID(() => null);
  }

  function removeMovieFromWatchlist(movieID) {
    setWatchedMovies(() =>
      watchedMovies.filter((movie) => movie.imdbID != movieID)
    );
  }

  const { resultMovies, error, isLoading } = useMovies(
    query,
    handleCloseDetails
  );

  function Logo() {
    return (
      <div className="logo">
        <span role="logo">🍿</span>
        <h1>usePopcorn</h1>
      </div>
    );
  }

  function Results({ foundMoviesLength }) {
    return (
      <h3 className="num-results">
        Found <strong>{foundMoviesLength}</strong> results
      </h3>
    );
  }

  // const messages = ["terrible", "bad", "ok", "good", "amazing"];

  return (
    <>
      {/* <Test />
      <StarRating
        maxRating={5}
        color="green"
        size={30}
        className="test"
        defaultRating={3}
        messages={messages}
      />
      <StarRating maxRating={10} /> */}
      <Navbar>
        <Logo />
        <Search inputElem={inputElem} query={query} setQuery={setQuery} />
        <Results foundMoviesLength={resultMovies.length} />
      </Navbar>

      <MainSec>
        {/* {render found movies } */}
        <ListBox>
          {isLoading && <p className="loader">Laoding...</p>}
          {!isLoading && !error && (
            <Movies
              selectedMovieID={selectedMovieID}
              resultMovies={resultMovies}
              setSelectedMovieID={setSelectedMovieID}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </ListBox>

        {/* {render watched movies } */}
        <ListBox>
          {selectedMovieID ? (
            <MovieFullDetails
              watchedMovies={watchedMovies}
              onAddMovieToList={handleAddwatchedMovie}
              onCloseDetails={handleCloseDetails}
              selectedMovieID={selectedMovieID}
            />
          ) : (
            <>
              <WatchedSummary watchedMovies={watchedMovies}></WatchedSummary>
              <WatchedMovies
                onRemove={removeMovieFromWatchlist}
                watchedMovies={watchedMovies}
              />
            </>
          )}
        </ListBox>
      </MainSec>
    </>
  );
}

export default App;
