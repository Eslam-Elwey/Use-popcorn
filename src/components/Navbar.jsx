

function Navbar({foundMoviesLength}) {

    function Search()
    {
        return (
            <input type="text" className="search" placeholder="Search movies..."/>
        );

    }

    function Logo()
    {
        return (
            <div className="logo">
                <span role="logo">🍿</span>
                <h1>usePopcorn</h1>
            </div>
        );

    }

    function Results({foundMoviesLength})
    {
        return(<h3 className="num-results">Found <strong>{foundMoviesLength}</strong> results</h3>);
    }

    return (
        <div className="nav-bar">
            <Logo/>
            <Search/>
            <Results foundMoviesLength={foundMoviesLength}/>
        </div>
    )
}

export default Navbar
