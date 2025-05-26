import ParagraphContainer from "./ParagraphContainer";


function OneWatchedMovie({movie}) {

    const {imdbID,Title,Year,Poster,runtime,imdbRating,userRating} = movie ;

    return (
        <li>
            <img src={Poster} alt={Title} />
            <div>
                <ParagraphContainer emoji="⭐" content={`${imdbRating}`} />
                <ParagraphContainer emoji="🌟" content={`${userRating}`} />
                <ParagraphContainer emoji="⏳" content={`${runtime} min`} />
            </div>
        </li>
    )
}

export default OneWatchedMovie
