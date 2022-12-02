import { React, useEffect, useState }from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import { useUserAuth } from "../authentication/UserAuthContext";

const Home = () => {
  const { user } = useUserAuth();

  return (
    <>
      <NavBar/>
      <br/>
      <div>home page</div>
    </>
  );
};

export default Home;
