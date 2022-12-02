import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";

const Movies = () => {
  return (
    <>
      <NavBar />
      <div className="bg-film-img bg-cover h-">
        {/* <img
          src="../../../Images/Background.svg"
          className="min-w-full min-h-full"
        /> */}
        <div className="bg-zinc-700 mx-auto my-50 w-2/3 h-96 rounded-lg">
          <div className="flex flex-wrap"></div>
        </div>
      </div>
    </>
  );
};

export default Movies;
