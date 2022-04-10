import { Alert, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FMultiCheckbox } from "./form";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import LoadingScreen from "./LoadingScreen";

function MovieFilter({ resetFilter }) {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const FILTER_GENRES_OPTIONS = genres.map((genre) => ({
    value: genre.id,
    label: genre.name,
  }));
  console.log(FILTER_GENRES_OPTIONS);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/genre/movie/list?api_key=${API_KEY}`
        );
        setGenres(response.data.genres);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    getMovies();
  }, []);

  return (
    <Stack spacing={3} sx={{ p: 3, width:{xs:"170px", md:"250px"}}}>
      <Stack>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <React.Fragment>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Genres
                </Typography>
                <FMultiCheckbox name="genres" 
                options={FILTER_GENRES_OPTIONS.map((item)=>item.value)}
                getOptionLabel={FILTER_GENRES_OPTIONS.map((item) => item.label)} />
              </React.Fragment>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default MovieFilter;
