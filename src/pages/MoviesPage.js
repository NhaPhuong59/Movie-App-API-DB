import React, { useState, useEffect } from "react";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import { Alert, Box, Breadcrumbs, Container, Link, Pagination, Stack, Typography } from "@mui/material";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import LoadingScreen from "../components/LoadingScreen";
import MovieListAll from "../components/MovieListAll";
import MovieFilter from "../components/MovieFilter";
import {Link as RouterLink} from "react-router-dom"


const defaultValues = {
  genres: [],
  searchQuery: "",
};

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const methods = useForm({
    defaultValues,
  });
  const { watch, reset } = methods;
  const filters = watch();
  console.log(filters.genres);

  const filteredMovies = applyFilter(movies, filters);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/discover/movie?api_key=${API_KEY}&page=${page}`
        );
        setMovies(response.data.results);
        setPageCount(response.data.total_pages);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getMovies();
  }, [page]);

  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          The movie DB
        </Link>
        <Typography color="text.primary">Movies</Typography>
      </Breadcrumbs>
    <Container sx={{ display: "flex", minHeight: "100vh" }} maxWidth="lg">
      <Stack>
        <FormProvider methods={methods}>
          <MovieFilter resetFilter={reset} />
        </FormProvider>
      </Stack>
      <Stack sx={{ flexGrow: 1 }}>
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <MovieListAll movies={filteredMovies} />
              )}
            </>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        </Box>
      </Stack>
    </Container>
    </Container>
  );
  function applyFilter(movies, filters) {
    let filteredMovies = movies;
    if (filters.genres.length) {
      filteredMovies = filteredMovies.filter((movie) =>{
      const filterId= movie.genre_ids.map((id)=>{
        return filters.genres.includes(id)
      })
      console.log(filterId)
      return (filterId.includes(true))
      });
    }

    if (filters.searchQuery) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }
    return filteredMovies;
  }
}

export default MoviesPage;
