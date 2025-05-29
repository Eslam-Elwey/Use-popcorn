import SingleMovie from "./SingleMovie"


function Movies({resultMovies,setSelectedMovieID,selectedMovieID}) {
    return (
            <>
                {<ul className="list list-movies">
                    {resultMovies.map((movie)=>(<SingleMovie selectedMovieID={selectedMovieID} setSelectedMovieID={setSelectedMovieID} key={crypto.randomUUID()} movie={movie}/>))}
                </ul>}
            </>
    )
}

export default Movies
