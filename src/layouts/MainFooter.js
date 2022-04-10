import { Link, Typography } from "@mui/material";
import React from "react";

function MainFooter() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" p={1}>
      Copyright © <Link href="https://www.themoviedb.org">The movie DB</Link>{" "}
      {new Date().getFullYear()} .
    </Typography>
  );
}

export default MainFooter;
