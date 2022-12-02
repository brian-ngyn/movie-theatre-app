import { React, useEffect, useState }from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";

const Threatres = () => {
  const theatres = {
    "1": {
      name: "Scotiabank Theatre Chinook",
      location: "Calgary",
      rating: "4.5/5"
    },
    "2": {
      name: "Cineplex Odeon Eau Claire Market",
      location: "Calgary",
      rating: "4.5/5"
    },
    "3": {
      name: "Cineplex VIP Cinemas University District",
      location: "Calgary",
      rating: "4.5/5"
    },
    "4": {
      name: "Landmark Cinemas Country Hills",
      location: "Calgary",
      rating: "4.5/5"
    },
    "5": {
      name: "Cineplex Odeon Crowfoot Crossing",
      location: "Calgary",
      rating: "4.5/5"
    }
  };

  console.log(theatres);

  return (
    <>
      <NavBar/>
      
      <div>theatres page</div>
    </>
  );
};

export default Threatres;
