import ParagraphContainer from "./ParagraphContainer";


function SingleMovie({movie}) {

    const {imdbID,Title,Year,Poster} = movie ;

    return (
        <li>
            <img src={Poster} alt={Title} />
            <h3>{Title}</h3>
            <ParagraphContainer emoji="📆" content={`${Year}`} />
        </li>
    )
}

export default SingleMovie
