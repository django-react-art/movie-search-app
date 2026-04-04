import { useState, useEffect } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Modal, Box } from "@mui/material";

function App(){
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

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
    {selectedMovie && (
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
      </>
    )}
  </Box>
</Modal>
      {error ? (
        <p>{error}</p>
      ) : ( 
      movies.map((movie) => (
        <Grid item xs = {12} sm = {6} md = {4} key = {movie.imdbID}>
          <Card onClick = { () => setSelectedMovie(movie)}
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