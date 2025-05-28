
import ParagraphContainer from './ParagraphContainer';

function WatchedSummary({watchedMovies})
{
    const totalWatchedMovies = watchedMovies.length ;

    const average = (arr=[])=>(arr.reduce((acc,curr,ind,arr)=>acc+curr/arr.length,0));

    const avergeIMDBRating = average(watchedMovies.map((movie)=>movie.imdbRating)) ;
    const avergeUserRating = average(watchedMovies.map((movie)=>movie.userRating)) ;
    const avergeWatchedTime = average(watchedMovies.map((movie)=>movie.runtime)) ;

    return(
        <div className='summary'>
            <h2>movies you watched</h2>
            <div>
                <ParagraphContainer emoji="#️⃣" content={`${totalWatchedMovies} movies`} />
                <ParagraphContainer emoji="⭐" content={`${avergeIMDBRating}`} />
                <ParagraphContainer emoji="🌟" content={`${avergeUserRating}`} />
                <ParagraphContainer emoji="⏳" content={`${avergeWatchedTime} min`} />
            </div>
        </div>
    );
}

export default WatchedSummary
