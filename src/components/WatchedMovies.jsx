
import OneWatchedMovie from './OneWatchedMovie';


function WatchedMovies({watchedMovies}) {

    return (
        <>
            {<ul className='list list-watched'>
                {watchedMovies.map((movie)=>(<OneWatchedMovie key={crypto.randomUUID()} movie={movie} />))}
            </ul>}
        </>
    )
}

export default WatchedMovies
