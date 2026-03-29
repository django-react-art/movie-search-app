import { useState, useEffect } from "react";

function App(){
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const fetchMovies = async(query) => {
    if(!query){
      setError("Search Empty!");
      setMovies([]);
      return;
    }
    try{
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=18ef985b&s=${query}`
    )
    const data = await response.json();
    if (data.Response === "False") {
      setError(data.Error);
    }
    else{
    console.log(data);
    setMovies(data.Search || []);
    setError("");
    }}
    catch(error){
      console.error(error);
    }
  }
  useEffect(() => {
    fetchMovies(input);
  }, [input]);

  return(
    <div>
      <input type="text" placeholder="Enter Movie Name Here" value = {input} onChange={(e)=> setInput(e.target.value)} />
      {error ? (
        <p>{error}</p>
      ) : ( 
      movies.map((movie) => (
        <p key = {movie.imdbID}>{movie.Title}</p>
      )))}
    </div>
  )
}

export default App;