import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import useCartContext from "../hooks/useCartContext";
import "./styles.scss";

function MovieCardAllList({ movie }) {
  const navigate = useNavigate();
  // const { dispatch } = useCartContext();
  return (
    <Card
      className="card"
      sx={{
        width: "180px",
        height: "350px",
        cursor: "pointer",
        overflow: "hidden",
        backgroundColor: "#F7F9F9 ",
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/movie/${movie.id}`)}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "180px", height: "270px", padding: "5px" }}
          image={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent sx={{ alignSelf: "flex-start", width: "100%" }}>
          <Grid container sx={{ display: "flex", alignItems:"center" }}>
            <Grid item lg={10}>
              <Typography gutterBottom variant="body" component="div">
                <strong>{movie.title}</strong>
              </Typography>
            </Grid>
            <Grid item lg={2}>
              <Typography gutterBottom variant="body2" color="#00a8ff">
                {movie.vote_average}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCardAllList;
