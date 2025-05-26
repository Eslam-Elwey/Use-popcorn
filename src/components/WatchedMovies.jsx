
import { useState } from 'react';
import Button from './Button';
import OneWatchedMovie from './OneWatchedMovie';
import ParagraphContainer from './ParagraphContainer';

function WatchedMovies({watchedMovies}) {

    const totalWatchedMovies = watchedMovies.length ;

    const average = (arr=[])=>(arr.reduce((acc,curr,ind,arr)=>acc+curr/arr.length,0));

    const avergeIMDBRating = average(watchedMovies.map((movie)=>movie.imdbRating)) ;
    const avergeUserRating = average(watchedMovies.map((movie)=>movie.userRating)) ;
    const avergeWatchedTime = average(watchedMovies.map((movie)=>movie.runtime)) ;

    const [isDisplayed,setIsDisplayed] = useState(true);

    function handleToggleButton()
    {
        setIsDisplayed(()=>!isDisplayed) ;
    }
    

    return (
        <div className="box">
            <div className='summary'>
                <h2>movies you watched</h2>
                <div>
                    <ParagraphContainer emoji="#️⃣" content={`${totalWatchedMovies} movies`} />
                    <ParagraphContainer emoji="⭐" content={`${avergeIMDBRating}`} />
                    <ParagraphContainer emoji="🌟" content={`${avergeUserRating}`} />
                    <ParagraphContainer emoji="⏳" content={`${avergeWatchedTime} min`} />
                </div>
            </div>
            <Button classVal="btn-toggle" onClickHandler={handleToggleButton}>{isDisplayed?'-':'+'}</Button>
            {isDisplayed&&<ul className='list list-watched'>
                {watchedMovies.map((movie)=>(<OneWatchedMovie key={crypto.randomUUID()} movie={movie} />))}
            </ul>}
        </div>
    )
}

export default WatchedMovies
