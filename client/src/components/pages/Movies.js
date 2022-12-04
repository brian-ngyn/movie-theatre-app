import { React, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import axios from "axios";
import { useUserAuth } from "../authentication/UserAuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KoolContainer from "../KoolContainer/KoolContainer";
import moment from "moment";

const theme = createTheme();

const Movies = () => {
  const { user } = useUserAuth();
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const today = moment().format("YYYY-MM-DD");

  const getMovies = (theatre_id) => {
    console.log("theatre selected from previous page:", theatre_id);
    axios.get("http://localhost:3001/server/endpoints/get/movies.php?theatre_id=" + theatre_id)
    .then((response) => {
      console.log("Movies response:", response.data.body);
      setMovies(response.data.body);
    });
  };

  useEffect(() => {
    getMovies(location.state.theatre_id);
  }, [location]);

  // useEffect(() => {
  //   console.log(movies);
  // }, [movies]);

  const movieClick = (event, movie_id, movie_title, public_date, movie_image) => {
    navigate('/showtimes', {state: {
      theatre_id: location.state.theatre_id, 
      theatre_name: location.state.theatre_name, 
      movie_id: movie_id,
      movie_title: movie_title,
      public_date: public_date,
      movie_image: movie_image
    }});
  };

  const presaleCheck = (public_date) => {
    if (public_date > today){
      return (
        <p className="text-red-500">*PRESALE*</p>
      );
    }
  }

  const movieList = movies.map((movie, index) => {
    // if the user is signed in, show all movies
    // else, if the user is not signed in, then only show movies where TODAY > public date

    if (user != null){
      return (
        <div key={index} className="p-5">
          <img
            src={movie.movie_image}
            alt=""
            className="w-52 h-72 hover:w-56 hover:h-80"
            onClick={(event) => movieClick(event, movie.movie_id, movie.movie_title, movie.public_date, movie.movie_image)}
          />
          <h2 className="">{movie.movie_title}</h2>
          <p>{movie.movie_duration}</p>
          {presaleCheck(movie.public_date)}
        </div>
      );
    } else {
      if (today > movie.public_date){
        return (
          <div className="p-5">
            <img
              src={movie.movie_image}
              alt=""
              className="w-52 h-72 hover:w-56 hover:h-80"
              onClick={(event) => movieClick(event, movie.movie_id, movie.movie_title, movie.public_date, movie.movie_image)}
            />
            <h2 className="">{movie.movie_title}</h2>
            <p>{movie.movie_duration}</p>
          </div>
        );
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <KoolContainer>
        <h1 className="text-left text-5xl px-10 pt-10">Movies playing at {location.state.theatre_name}</h1>
        <div className="grid grid-cols-4 mx-16 mt-10 justify-items-center">
          {movieList}
        </div>
      </KoolContainer>
    </ThemeProvider>
  );
};

export default Movies;
