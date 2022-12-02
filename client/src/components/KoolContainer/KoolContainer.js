import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function KoolContainer(props) {
  const { children } = props;

  return (
    <div className="bg-movie-backdrop h-screen w-screen pt-4">
      <div className="bg-black w-4/5 m-auto mt-32 h-4/5 overflow-scroll flex flex-col rounded-2xl opacity-80">
        {children}
      </div>
    </div>
  );
}
