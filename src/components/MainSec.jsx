
import Movies from './Movies';
import WatchedMovies from './WatchedMovies';

function MainSec({resultMovies ,watchedMovies}) {
    return (
        <div className="main">
            <Movies resultMovies={resultMovies} />
            <WatchedMovies watchedMovies={watchedMovies} />
        </div>
    )
}

export default MainSec
