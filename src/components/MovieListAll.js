import { Grid } from "@mui/material";
import React from "react";
import MovieCardAllList from "./MovieCardAllList"

function MovieListAll({ movies }) {
  return (
    <Grid container spacing={2} mt={1}>
      {movies.map((movie) => (
        <Grid item key={movie.id} xs={12} md={4} lg={3}>
          <MovieCardAllList movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieListAll;
