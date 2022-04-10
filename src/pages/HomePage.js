import React, { useState, useEffect } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import { Alert, Container, Divider, Stack } from "@mui/material";
// import { FormProvider, FTextField } from "../components/form";
// import { useForm } from "react-hook-form";
import MovieList from "../components/MovieList";
import LoadingScreen from "../components/LoadingScreen";

function App() {
  const [moviesPopular, setMoviesPopular] = useState([]);
  const [moviesTopRate, setMoviesTopRate] = useState([]);
  const [moviesUpcoming, setMoviesUpcoming] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const poster = moviesPopular.map((movie) => movie.backdrop_path);
  

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/movie/popular?api_key=${API_KEY}`
        );
        setMoviesPopular(response.data.results);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getMovies();
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/movie/top_rated?api_key=${API_KEY}`
        );
        setMoviesTopRate(response.data.results);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getMovies();
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/movie/upcoming?api_key=${API_KEY}`
        );
        setMoviesUpcoming(response.data.results);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getMovies();
  }, []);

  return (
    <React.Fragment>
      
      <Container maxWidth="lg" >
      <Stack
        height={400}
        sx={{
          backgroundImage: `url("https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces${
            poster[Math.floor(Math.random() * poster.length)]
          }")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          opacity:"0.9",
          // backgroundAttachment: "fixed",
          backgroundPosition: "center center",
        // minWidth:"100%"
          
        }}
        
      >
      </Stack>
        <Stack sx={{ overflowX: "scroll" }}>
          <h1>What's Popular</h1>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <MovieList movies={moviesPopular} />
              )}
            </>
          )}
        </Stack>
        <Divider />
        <Stack sx={{ overflowX: "scroll" }}>
          <h1>Top-rating</h1>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <MovieList movies={moviesTopRate} />
              )}
            </>
          )}
        </Stack>
        <Stack sx={{ overflowX: "scroll" }}>
          <h1>Coming Soon</h1>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <MovieList movies={moviesUpcoming} />
              )}
            </>
          )}
        </Stack>
      </Container>
    </React.Fragment>
  );
}

export default App;
