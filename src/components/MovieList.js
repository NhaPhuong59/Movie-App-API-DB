import { Stack } from "@mui/material";
import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <Stack direction="row"
    justifyContent="space-between"
    alignItems="stretch"
    spacing={2}
    height={350}
    mt={0.5}>
      {movies.map((movie) => (
        <Stack key={movie.id} sx={{width:{xs:"150px", md:"150px", lg:"200px"}}}>
          <MovieCard movie={movie} />
        </Stack>
      ))}
    </Stack>
  );
}

export default MovieList;
