import { useState, useEffect } from "react";

function App(){
  const [movies, setMovies] = useState([]);

  const fetchMovies = async(query) => {
    try{
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=18ef985b&s=${query}`
    )
    const data = await response.json();
    console.log(data);
    setMovies(data.Search || []);
    }
    catch(error){
      console.error(error);
    }
  }
  useEffect(() => {
    fetchMovies("batman");
  }, []);

  return(
    <div>
      {movies.map((movie) => (
        <p key = {movie.imdbID}>{movie.Title}</p>
      ))}
    </div>
  )
}

export default App;