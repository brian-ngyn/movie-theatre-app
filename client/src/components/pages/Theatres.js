import { React, useEffect, useState }from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import axios from "axios";
import { useUserAuth } from "../authentication/UserAuthContext";

const Threatres = () => {
  const { user } = useUserAuth();
  const [theatres, setTheatres] = useState([]);

  const getTheatres = () => {
    axios.get("http://35.183.16.214/server/endpoints/list/theaters.php").then((response) => {
      setTheatres(response.data.body);
    });
  };

  useEffect(() => {
    getTheatres();
  }, []);

  useEffect(() => {
    console.log(theatres);
  }, [theatres]);

  return (
    <>
      <NavBar/>
      
      <div>theatres page</div>
    </>
  );
};

export default Threatres;
