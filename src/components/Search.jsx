import { useEffect } from "react";

function Search({ query, setQuery, inputElem }) {
  function handleEnterButtonFocus(e) {

    if(document.activeElement===inputElem.current)
    {
        return ;
    }

    if(e.code==='Enter')
    {
        inputElem.current.focus();
        setQuery(()=>"");
    }
    
  }

  useEffect(function () {
    document.addEventListener("keyup", handleEnterButtonFocus);
    return function () {
      document.removeEventListener("keyup", handleEnterButtonFocus);
    };
  });

  function handleChange(e) {
    setQuery(() => String(e.target.value));
  }

  return (
    <input
      type="text"
      ref={inputElem}
      className="search"
      placeholder="Search movies..."
      value={query}
      onChange={handleChange}
    />
  );
}

export default Search;
