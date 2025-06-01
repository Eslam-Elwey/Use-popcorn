import { useEffect, useState } from "react";

const key = "d8126ba3";

export function useMovies(query , callBack) {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [resultMovies, setResultMovies] = useState([]);

  useEffect(
    function () {
      const controller = new AbortController();

      setIsloading(() => true);
      setError("");
      async function fetchMovies() {
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!response.ok) {
            throw new Error("Something went wrong in fetching movies");
          }
          const data = await response.json();
          console.log(data);
          if (data.Response === "False") {
            throw new Error("No movies found");
          }
          setResultMovies(data.Search);
          setError(() => "");
        } catch (err) {
          if (err.message === "Failed to fetch") {
            console.err(err);
            console.log(err.message);
            err.message = "Something went wrong in fetching movies";
          }
          if (err.name != "AbortError") {
            setError(() => err.message);
          }
        } finally {
          setIsloading(() => false);
        }
      }

      if (query.length < 3) {
        setError(() => "");
        setResultMovies(() => []);
        setIsloading(false);
        return;
      }
      callBack?.();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return {resultMovies,error,isLoading} ;
}
