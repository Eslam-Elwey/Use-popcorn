import { useEffect, useState } from "react";
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

export const key = "d8126ba3";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

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
  return(
  <p className="error">
    <span>⛔</span>
    {message}
  </p>
  )
}





function App() {
  const [resultMovies, setResultMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovieID, setSelectedMovieID] = useState(null);

  useEffect(()=>console.log(selectedMovieID),[selectedMovieID]);

  function handleAddwatchedMovie(movie)
  {
    setWatchedMovies(()=>[...watchedMovies,movie]);
    handleCloseDetails();
  }

  


  function removeMovieFromWatchlist(movieID)
  {
    setWatchedMovies(()=>watchedMovies.filter((movie)=>movie.imdbID!=movieID));
  }

  useEffect(function () {

    const controller = new AbortController() ;

    setIsloading(() => true);
    setError("");
    async function fetchMovies() {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&s=${query}` ,{signal : controller.signal}
        );

        if (!response.ok) {
          throw new Error("Something went wrong in fetching movies");
        }
        const data = await response.json();
        console.log(data);
        if (data.Response === "False") {
          throw new Error("No movies found");
        }
        setResultMovies(data.Search);
        setError(()=>"");
        
      } catch (err) {
        
        if(err.message==="Failed to fetch")
        {
          console.err(err);
          console.log(err.message);
          err.message = "Something went wrong in fetching movies" ;
        }
        if(err.name!='AbortError')
        {
          setError(() => err.message);
        }
      } finally {
        setIsloading(() => false);
      }
    }

    if(query.length<3)
    {
      setError(()=>"");
      setResultMovies(()=>[]);
      setIsloading(false);
      return ;
    }
    handleCloseDetails();
    fetchMovies();
    return function()
    {
      controller.abort() ;
    }
  }, [query]);

  function handleCloseDetails()
  {
    setSelectedMovieID(()=>null);
  }

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

  const messages = ["terrible", "bad", "ok", "good", "amazing"];

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
        <Search query={query} setQuery={setQuery} />
        <Results foundMoviesLength={resultMovies.length} />
      </Navbar>

      <MainSec>
        {/* {render found movies } */}
        <ListBox>
          {isLoading && <p className="loader">Laoding...</p>}
          {!isLoading && !error && <Movies selectedMovieID={selectedMovieID}  resultMovies={resultMovies}  setSelectedMovieID={setSelectedMovieID}/>}
          {error && <ErrorMessage message={error} />}
        </ListBox>

        {/* {render watched movies } */}
        <ListBox>
          {
            
            selectedMovieID?<MovieFullDetails watchedMovies={watchedMovies} onAddMovieToList={handleAddwatchedMovie} onCloseDetails={handleCloseDetails} selectedMovieID={selectedMovieID} /> :
            
            <>
              <WatchedSummary watchedMovies={watchedMovies}></WatchedSummary>
              <WatchedMovies onRemove={removeMovieFromWatchlist} watchedMovies={watchedMovies} />
            </>
          }
        </ListBox>
      </MainSec>
    </>
  );
}

export default App;
