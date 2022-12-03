import { React, useEffect, useState }from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import { useUserAuth } from "../authentication/UserAuthContext";
import KoolContainer from "../KoolContainer/KoolContainer";

const Home = () => {
  const { user } = useUserAuth();
  const isLoggedIn = user == null ? false : true;

  return (
    <>
      <KoolContainer>
        <div className="flex flex-col items-center justify-center h-full">
          {isLoggedIn ? <div>Welcome back, {user.fullname}</div> : <div>Not logged in placeholder</div>}
        </div>
      </KoolContainer>
    </>
  );
};

export default Home;
