import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import axios from "axios";
import { useUserAuth } from "../authentication/UserAuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KoolContainer from "../KoolContainer/KoolContainer";

const theme = createTheme();

const Movies = () => {
  const { user } = useUserAuth();
  const [movies, setMovies] = useState([]);

  const getMovies = () => {
    axios
      .get("http://35.183.16.214/server/endpoints/list/movies.php")
      .then((response) => {
        setMovies(response.data.body);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  const movieShowtimes = (event, movie_id) => {
    //TODO: this needs to navigate to showtimes for the movie at a specific theatre
    console.log(event.target);

    console.log(movie_id);

    console.log("Image Clicked");
  };

  const movieList = movies.map((movie) => {
    return (
      <div className="p-5">
        <img
          src={movie.movie_image}
          className="w-52 h-72 hover:w-56 hover:h-80"
          onClick={(event) => movieShowtimes(event, movie.movie_id)}
        />
        <h2 className="">{movie.movie_title}</h2>
        <p>{movie.movie_duration}</p>
      </div>
    );
  });
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <KoolContainer>
        <div className="grid grid-cols-4 mx-16 mt-10 justify-items-center">
          {movieList}
        </div>
      </KoolContainer>
    </ThemeProvider>
  );
};

export default Movies;
