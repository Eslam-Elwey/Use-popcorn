import SingleMovie from "./SingleMovie"


function Movies({resultMovies}) {
    return (
            <>
                {<ul className="list list-movies">
                    {resultMovies.map((movie)=>(<SingleMovie key={crypto.randomUUID()} movie={movie}/>))}
                </ul>}
            </>
    )
}

export default Movies
