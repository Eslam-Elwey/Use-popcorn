

function Search({query, setQuery})
{
    function handleChange(e)
    {
        setQuery(()=>String(e.target.value));
    }

    return (
        <input type="text" 
        className="search" placeholder="Search movies..." value={query}
        onChange={handleChange}/>
    );

}

export default Search
