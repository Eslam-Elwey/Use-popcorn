
import OneWatchedMovie from './OneWatchedMovie';


function WatchedMovies({watchedMovies,onRemove}) {

    return (
        <>
            {<ul className='list list-watched'>
                {watchedMovies.map((movie)=>(<OneWatchedMovie onRemove={onRemove} key={crypto.randomUUID()} movie={movie} />))}
            </ul>}
        </>
    )
}

export default WatchedMovies
