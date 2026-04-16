import { useState, useEffect } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Modal, Box, CircularProgress } from "@mui/material";

function App(){
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [query, setQuery] = useState("");
  const [loadingDetails, setLoadingDetails] = useState(false);


  const fetchMovies = async(query) => {
    if(!query){
      setError("Search Empty!");
      setMovies([]);
      return;
    }
    setMovies([]);
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
  useEffect( () => {
    if(!query.trim()) return;
    const timer = setTimeout(() => {
      fetchMovies(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const fetchMovieDetails = async (id) => {
    try{
      setLoadingDetails(true);
      const response = await fetch (
        `http://www.omdbapi.com/?apikey=18ef985b&i=${id}`
      )
      const data = await response.json();
      setSelectedMovie(data);
    }catch(error) {
      console.error(error);
    }
    finally{
      setLoadingDetails(false);
    }
  };

  return(
    <div>
      <input type="text" 
      placeholder="Enter Movie Name Here" 
      value = {query} 
      onChange={(e)=> setQuery(e.target.value)} />
    <Grid container spacing = {3}>
      <Modal
  open={!!selectedMovie}
  onClose={() => setSelectedMovie(null)}
>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      p: 3,
      borderRadius: 2,
      boxShadow: 24,
    }}
  >
    {loadingDetails? (
      <Box sx={{display: "flex", justifyContent: "center", mt: 2}}>
        <CircularProgress />
      </Box>
    ) : (
      selectedMovie && (
      <>
        <Typography variant="h6" gutterBottom>
          {selectedMovie.Title}
        </Typography>

        <img
          src={
            selectedMovie.Poster !== "N/A"
              ? selectedMovie.Poster
              : "https://via.placeholder.com/150"
          }
          alt={selectedMovie.Title}
          width="100%"
          style={{ marginTop: "10px", borderRadius: "8px" }}
        />

        <Typography sx={{ mt: 2 }}>
          Year: {selectedMovie.Year}
        </Typography>

        <Typography>
          Type: {selectedMovie.Type}
        </Typography>

        <Typography sx={{ mt: 2 }}>
  Genre: {selectedMovie.Genre}
</Typography>

<Typography>
  Actors: {selectedMovie.Actors}
</Typography>

<Typography sx={{ mt: 2 }}>
  Plot: {selectedMovie.Plot}
</Typography>
      </>
      )
    )}
  </Box>
</Modal>
      {error ? (
        <p>{error}</p>
      ) : ( 
      movies.map((movie) => (
        <Grid item xs = {12} sm = {6} md = {4} key = {movie.imdbID}>
          <Card onClick = { () => {
            setSelectedMovie({});
            fetchMovieDetails(movie.imdbID);
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