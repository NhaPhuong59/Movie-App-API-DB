import {
  Alert,
  Box,
  Breadcrumbs,
  Card,
  Container,
  Grid,
  Link,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { API_KEY } from "../app/config";

function DetailPage() {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.id) {
      const getMovies = async () => {
        setLoading(true);
        try {
          const response = await apiService.get(
            `/movie/${params.id}?api_key=${API_KEY}`
          );
          setMovie(response.data);
          setError("");
        } catch (error) {
          setError(error.message);
        }
        setLoading(false);
      };
      getMovies();
    }
  }, [params]);

  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          The movie DB
        </Link>
        <Link
          underline="hover"
          color="inherit"
          component={RouterLink}
          to="/movie"
        >
          Movies
        </Link>
        <Typography color="text.primary">{movie?.title}</Typography>
      </Breadcrumbs>
      <Box sx={{ position: "relative", height: 1 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {movie ? (
                  <Card
                    sx={{
                      backgroundImage: `url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}")`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      color: "#fff",
                      fontFamily: "roboto",
                    }}
                  >
                    <Stack
                      sx={{
                        backgroundImage:
                          "linear-gradient(to right, rgba(10.5, 31.5, 73.5, 1) 150px, rgba(10.5, 31.5, 73.5, 0.84) 100%)",
                        display: "flex",
                        justifyItems: "center",
                        alignItems: "center",
                      }}
                    >
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          md={4}
                          display="flex"
                          justifyContent="center"
                        >
                          <Box
                            p={3}
                            sx={{
                              borderRadius: 2,
                              overflow: "hidden",
                              display: "flex",
                            }}
                          >
                            <img
                              src={`https://www.themoviedb.org/t/p/w300_and_h450_face/${movie.poster_path}`}
                              width="100%"
                              height="100%"
                              alt="poster"
                            />
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={8}
                          // height="100%"
                        >
                          <Box
                            p={5}
                            display="flex"
                            justifyItems="space-between"
                            flexDirection="column"
                          >
                            <Typography
                              variant="h4"
                              sx={{
                                fontFamily: "Ubuntu",
                                mt: 2,
                                mb: 1,
                                display: "block",
                                textTransform: "uppercase",
                              }}
                            >
                              {movie.title}
                            </Typography>
                            <Typography variant="body" paragraph>
                              {movie.overview}
                            </Typography>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                              sx={{ mb: 2 }}
                            >
                              <Rating
                                value={movie.vote_average / 2}
                                precision={0.1}
                                readOnly
                              />
                            </Stack>
                            <Typography variant="body2">
                              {movie.release_date}
                            </Typography>
                            <Typography variant="body2">
                              Runtime: {Math.floor(movie.runtime / 60)}h{" "}
                              {movie.runtime % 60}m
                            </Typography>
                            <Box>
                              <Typography variant="body2" fontStyle="italic">
                                {movie.tagline}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Stack>
                  </Card>
                ) : (
                  <Typography variant="h6">Product not found!</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default DetailPage;
