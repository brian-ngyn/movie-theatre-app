import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "../authentication/UserAuthContext";

export default function Example() {
  const [openNav, setOpenNav] = useState(false);
  const { user, logout } = useUserAuth();
  const navigate = useNavigate();

  const navigateLoginRegister = () => {
    if (user === null){
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  const logoutUser = () => {
    logout();
    navigate("/");
  }

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to="/theatres" className="flex items-center">
            Theatres
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to="/cancelorder" className="flex items-center">
            Cancel Order
          </Link>
        </Typography>
      </ul>
  );

  return (
    <Navbar
      className="bg-zinc-700 bg-cover absolute py-4 px-4 lg:px-8 lg:py-10 text-white text-xl shadow-2xl"
    >
      <div className="container mx-auto flex items-center justify-end">
        <img
          src="../../../Images/MovieIcon.svg"
          className="absolute top-4 left-10"
          alt=""
        />
        <Typography
          as="a"
          href="/"
          variant="small"
          className="cursor-pointer py-1.5 font-normal mr-8"
        >
          <span>Home</span>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <Button
          variant="gradient"
          size="sm"
          onClick={navigateLoginRegister}
          className="hiddben lg:inline-lock"
        >
          <span>Login/Register</span>
        </Button>
        {user && (<Button
          variant="gradient"
          size="sm"
          onClick={logoutUser}
          className="hiddben lg:inline-lock"
        >
          <span>Logout</span>
        </Button>)}
      </div>
    </Navbar>
  );
}
