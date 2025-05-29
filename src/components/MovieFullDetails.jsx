import { useEffect, useState } from "react";
import { key } from "../App";
import defaultPoster from "../assets/defaultMovie.webp";
import StarRating from "./StarRating";
import Button from "./Button";
import { func } from "prop-types";

// {
//     "Title": "Monsters, Inc.",
//     "Year": "2001",
//     "Rated": "G",
//     "Released": "23 Nov 2001",
//     "Runtime": "92 min",
//     "Genre": "Animation, Adventure, Comedy",
//     "Director": "Pete Docter, David Silverman, Lee Unkrich",
//     "Writer": "Pete Docter, Jill Culton, Jeff Pidgeon",
//     "Actors": "Billy Crystal, John Goodman, Mary Gibbs",
//     "Plot": "In order to power the city, monsters have to scare children so that they scream. However, the children are toxic to the monsters, and after a child gets through, two monsters realize things may not be what they think.",
//     "Language": "English",
//     "Country": "United States",
//     "Awards": "Won 1 Oscar. 15 wins & 38 nominations total",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMTY1NTI0ODUyOF5BMl5BanBnXkFtZTgwNTEyNjQ0MDE@._V1_SX300.jpg",
//     "Ratings": [
//         {
//             "Source": "Internet Movie Database",
//             "Value": "8.1/10"
//         },
//         {
//             "Source": "Rotten Tomatoes",
//             "Value": "96%"
//         },
//         {
//             "Source": "Metacritic",
//             "Value": "79/100"
//         }
//     ],
//     "Metascore": "79",
//     "imdbRating": "8.1",
//     "imdbVotes": "1,026,193",
//     "imdbID": "tt0198781",
//     "Type": "movie",
//     "DVD": "N/A",
//     "BoxOffice": "$290,642,256",
//     "Production": "N/A",
//     "Website": "N/A",
//     "Response": "True"
// }

function MovieFullDetails({
  selectedMovieID,
  onCloseDetails,
  onAddMovieToList,
  watchedMovies
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [isListed,setIsListed] = useState(false) ;
  const [watchedMovieRating,setWatchedMovieRating] = useState(false) ;


  useEffect(function()
  {
    const index = watchedMovies.findIndex((movie)=>movie.imdbID===selectedMovieID);
    index===-1?setIsListed(()=>false):setIsListed(()=>true);
    if(index!=-1)
    {
      setWatchedMovieRating(()=>watchedMovies[index] . userRating) ;
    }
  },[selectedMovieID,watchedMovies]);

  useEffect(
    function () {
      setIsLoading(() => true);
      async function getMovieDetails() {
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${key}&i=${selectedMovieID}`
          );

          if (!res.ok) {
            throw new Error("failed to load movie details");
          }

          const data = await res.json();
          console.log(data);
          setMovie(() => data);
        } catch (err) {
          console.log(err.message);
        } finally {
          setIsLoading(() => false);
        }
      }
      getMovieDetails();
    },

    [selectedMovieID]
  );

  //handle esc button add eventlistener to document
  useEffect(function(){
    function callback(e){
      if(e.code==='Escape')
      {
        onCloseDetails();
        console.log("closing");
      }
    }
    document.addEventListener('keyup',callback ) ;

    //clean up
    return function()
    {
      document.removeEventListener('keyup',callback);
    }
  },[onCloseDetails]);

  

  const {
    Title: title,
    Year: year,
    Released: releasedDate,
    Runtime: runTime,
    Genre: genre,
    Actors: actors,
    Plot: plot,
    Director: director,
    Poster: poster,
    Writer: writer,
    imdbRating,
    Language: lang,
    Country: country,
    imdbID,
  } = movie;

  function handleAddMovie() {
    onAddMovieToList({
      ...movie,
      userRating: userRating === null ? 0 : userRating,
      runtime: movie.Runtime === "N/A" ? 0 : movie.Runtime,
    });
  }

  useEffect(function()
  {
    if(!title) return ;
    document.title = `Movie | ${title}` ;
    return function()
    {
      document.title = 'UsePopcorn';
    }
  },[title]);

  

  return isLoading ? (
    <p className="loader">Laoding...</p>
  ) : (
    <>
      <div className="details">
        <header>
          <button onClick={onCloseDetails} className="btn-back">
            &larr;
          </button>

          <img
            src={poster === "N/A" ? defaultPoster : poster}
            alt={`Poster of ${title}`}
          />

          <div className="details-overview">
            <h2>{title}</h2>
            <p>
              <span>{releasedDate}</span> <span>&bull;</span>
              <span>{runTime}</span>
            </p>
            <p>{genre}</p>
            <p>
              <span>⭐</span>
              {imdbRating} IMDb rating
            </p>
          </div>
        </header>

        <section>
            {
                !isListed?<>
                <div className="rating">
                  <StarRating
                  setStateFun={setUserRating}
                  maxRating={10}
                  size={20}
                  key={imdbID}
                />
                </div>
                {userRating>0&&<Button onClickHandler={handleAddMovie} classVal="btn-add">
                Add to list
            </Button>}</>:<p className="rating">You rated this movie {watchedMovieRating} 🌟</p>
            }
          
        
          <p>
            <em>{plot}</em>
          </p>
          <p>Staring : {actors}</p>
          <p>Directed by : {director}</p>
        </section>
      </div>
    </>
  );
}

export default MovieFullDetails;
