import { React, useEffect, useState }from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import axios from "axios";
import { useUserAuth } from "../authentication/UserAuthContext";

const Movies = () => {
  const { user } = useUserAuth();
  const [movies, setMovies] = useState([]);

  const getMovies = () => {
    axios.get("http://35.183.16.214/server/endpoints/list/movies.php").then((response) => {
      setMovies(response.data.body);
    });
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    console.log(movies);
  }, [movies]);



  return (
    <>
      <NavBar/>
      <br/>
      <div>movies page</div>
    </>
  );
};

export default Movies;
