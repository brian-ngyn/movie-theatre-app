import { React, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import axios from "axios";
import { useUserAuth } from "../authentication/UserAuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KoolContainer from "../KoolContainer/KoolContainer";
import { Button } from "@mui/material";

const theme = createTheme();

const Showtimes = () => {
  const { user } = useUserAuth();
  const [showtimes, setShowtimes] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const getShowtimes = (movie_id) => {
    console.log("movie selected from previous page:", movie_id);
    axios.get("http://localhost:3001/server/endpoints/get/showtimes.php?movie_id=" + movie_id)
    .then((response) => {
      setShowtimes(response.data.body);
    });
  };

  useEffect(() => {
    getShowtimes(location.state.movie_id);
  }, [location]);

  useEffect(() => {
    console.log(showtimes);
  }, [showtimes]);

  const showtimeClick = (event, showtime_id, showtime_date, show_start) => {
    console.log("showtime id ",showtime_id);
    console.log("date ", showtime_date);
    console.log("starting at ", show_start);

    navigate('/seats', {state: {
      theatre_id: location.state.theatre_id,
      theatre_name: location.state.theatre_name,
      movie_name: location.state.movie_title,
      show_date: showtime_date,
      show_start: show_start,
      movie_id: location.state.movie_id,
      public_date: location.state.public_date,
      showtime_id: showtime_id,
      movie_image: location.state.movie_image
    }});
  };

  const showtimesList = showtimes.map((showtime, index) => {
    return (
      <div key={index} className="p-5">
        <Button
          variant="outlined"
          onClick={(event) => showtimeClick(event, showtime.showtime_id, showtime.show_date, showtime.show_start)}
        >
          {showtime.show_date} starting at {showtime.show_start}
        </Button>
      </div>
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <KoolContainer>
        <h1 className="text-left text-5xl px-10 pt-10">Showtimes for {location.state.movie_title} playing at {location.state.theatre_name}</h1>
        <div className="grid grid-cols-4 mx-16 mt-10 justify-items-center">
          {showtimesList}
        </div>
      </KoolContainer>
    </ThemeProvider>
  );
};

export default Showtimes;
