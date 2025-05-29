import Button from "./Button";
import ParagraphContainer from "./ParagraphContainer";



function OneWatchedMovie({movie,onRemove}) {

    const {imdbID,Title,Year,Poster,runtime,imdbRating,userRating} = movie ;

    function handleRemove() {
        onRemove(imdbID);
    }

    return (
        <li>
            <img src={Poster} alt={Title} />
            <div>
                <ParagraphContainer emoji="⭐" content={`${imdbRating}`} />
                <ParagraphContainer emoji="🌟" content={`${userRating}`} />
                <ParagraphContainer emoji="⏳" content={`${runtime}`} />
                <Button onClickHandler={handleRemove} classVal="btn-delete">X</Button>
            </div>
        </li>
    )
}

export default OneWatchedMovie
