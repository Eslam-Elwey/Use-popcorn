import SingleMovie from "./SingleMovie"
import Button from './Button';
import { useState } from "react";

function Movies({resultMovies}) {

    const [isDisplayed,setIsDisplayed] = useState(true);
    
    function handleToggleButton()
    {
        setIsDisplayed(()=>!isDisplayed) ;
    }

    return (
        <div className="box">
            <Button classVal="btn-toggle" onClickHandler={handleToggleButton}>{isDisplayed?'-':'+'}</Button>
            {isDisplayed&&<ul className="list list-movies">
                {resultMovies.map((movie)=>(<SingleMovie key={crypto.randomUUID()} movie={movie}/>))}
            </ul>}
        </div>
    )
}

export default Movies
