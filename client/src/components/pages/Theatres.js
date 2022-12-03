import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import axios from "axios";
import { useUserAuth } from "../authentication/UserAuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KoolContainer from "../KoolContainer/KoolContainer";

const theme = createTheme();

const Threatres = () => {
  const { user } = useUserAuth();
  const [theatres, setTheatres] = useState([]);

  const getTheatres = () => {
    axios
      .get("http://35.183.16.214/server/endpoints/list/theaters.php")
      .then((response) => {
        setTheatres(response.data.body);
      });
  };

  useEffect(() => {
    getTheatres();
  }, []);

  useEffect(() => {
    console.log(theatres);
  }, [theatres]);

  const theatreMovies = (event, theatre_id) => {
    //TODO: this needs to navigate to movies for the specific theatre
    console.log(event.target);

    console.log(theatre_id);

    console.log("Image Clicked");
  };

  const theatreList = theatres.map((theatre) => {
    return (
      <div className="p-5">
        <h2
          className="text-2xl hover:underline"
          onClick={(event) => theatreMovies(event, theatre.theatre_id)}
        >
          {theatre.theatre_name}
        </h2>
      </div>
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <KoolContainer>
        <h1 className="text-left text-5xl px-10 pt-10">Theatres Near You</h1>
        <div className="grid grid-cols-2 mx-16 mt-10 justify-items-center">
          {theatreList}
        </div>
      </KoolContainer>
    </ThemeProvider>
  );
};

export default Threatres;
