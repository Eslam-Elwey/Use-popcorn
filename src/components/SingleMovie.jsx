import ParagraphContainer from "./ParagraphContainer";
import defaultsrc from "../assets/defaultMovie.webp";


function SingleMovie({movie,setSelectedMovieID,selectedMovieID}) {

    const {imdbID,Title,Year,Poster} = movie ;

    function handleClick()
    {
        console.log(imdbID);
        setSelectedMovieID(()=>imdbID===selectedMovieID?null:imdbID);
    }

    return (
        <li onClick={()=>handleClick()}>
            <img src={Poster==="N/A"?defaultsrc:Poster} alt={Title} />
            <h3>{Title}</h3>
            <ParagraphContainer emoji="📆" content={`${Year}`} />
        </li>
    )
}

export default SingleMovie
