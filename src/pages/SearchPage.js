import { Box, Button, Container, Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import { FormProvider, FTextField } from "../components/form";
import LoadingScreen from "../components/LoadingScreen";
import MovieListAll from "../components/MovieListAll";

const defaultValues = {
  searchQuery: "",
};
function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    setSearch(data.searchQuery);
  };
  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/search/movie?api_key=${API_KEY}&page=${page}&query=${search}`
        );
        setMovies(response.data.results);
        setPageCount(response.data.total_pages);
        setError("");
      } catch (error) {
        setError(error.message);
        setPageCount(1);
      }
      setLoading(false);
    };
    getMovies();
  }, [search, page]);
  return (
    <Container maxWidth="lg">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={2} mt={2}>
          <FTextField name="searchQuery" />
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Stack>
      </FormProvider>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {error ? (
            // <Alert severity="error">{error}</Alert>
            <h4>Please enter the keyword you want to search</h4>
          ) : (
            <React.Fragment>
              <MovieListAll movies={movies} />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                />
              </Box>
            </React.Fragment>
          )}
        </>
      )}
    </Container>
  );
}

export default SearchPage;
