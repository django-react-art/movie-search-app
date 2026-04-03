import { useState, useEffect } from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

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
    <Grid container spacing = {3}>
      {error ? (
        <p>{error}</p>
      ) : ( 
      movies.map((movie) => (
        <Grid item xs = {12} sm = {6} md = {4} key = {movie.imdbID}>
          <Card
          sx = {{
            cursor: "pointer", 
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 6,
            },
          }}>
  <CardMedia
    component="img"
    height="300"
    image={
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/150"
    }
    alt={movie.Title}
  />

  <CardContent>
    <Typography variant="h6">
      {movie.Title}
    </Typography>
  </CardContent>
</Card></Grid>
      )))}
      </Grid>
  </div>
  )
}

export default App;