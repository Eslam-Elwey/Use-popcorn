import ParagraphContainer from "./ParagraphContainer";


function SingleMovie({movie}) {

    const {imdbID,Title,Year,Poster} = movie ;

    return (
        <li>
            <img src={Poster} alt={Title} />
            <div>
                <h3>{Title}</h3>
                <ParagraphContainer emoji="📆" content={`${Year}`} />
            </div>
        </li>
    )
}

export default SingleMovie
