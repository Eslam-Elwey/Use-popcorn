
import ParagraphContainer from './ParagraphContainer';

function WatchedSummary({watchedMovies})
{
    const totalWatchedMovies = watchedMovies.length ;

    const average = (arr=[])=>(arr.reduce((acc,curr,ind,arr)=>acc+curr/arr.length,0));

    const avergeIMDBRating = average(watchedMovies.map((movie)=>movie.imdbRating)) ;
    const avergeUserRating = average(watchedMovies.map((movie)=>parseInt(movie.userRating))) ;
    const avergeWatchedTime = average(watchedMovies.map((movie)=>parseInt(movie.runtime)===NaN?0:parseInt(movie.runtime))) ;

    return(
        <div className='summary'>
            <h2>movies you watched</h2>
            <div>
                <ParagraphContainer emoji="#️⃣" content={`${totalWatchedMovies} movies`} />
                <ParagraphContainer emoji="⭐" content={`${avergeIMDBRating.toFixed(1)}`} />
                <ParagraphContainer emoji="🌟" content={`${avergeUserRating.toFixed(1)}`} />
                <ParagraphContainer emoji="⏳" content={`${avergeWatchedTime.toFixed(1)} min`} />
                
            </div>
        </div>
    );
}

export default WatchedSummary
