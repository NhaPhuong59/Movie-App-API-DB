import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <Card className="card" sx={{width:"150px", cursor:"pointer"}}
    >
      <CardActionArea onClick={() => navigate(`/movie/${movie.id}`)}>
        <CardMedia
          component="img"
          sx={{width:"150px"}}
          image={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography gutterBottom variant="body" component="div" noWrap>
            <strong>{movie.title}</strong>
          </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.vote_average}
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
