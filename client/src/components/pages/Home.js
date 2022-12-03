import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import { useUserAuth } from "../authentication/UserAuthContext";
import KoolContainer from "../KoolContainer/KoolContainer";
import { Button , Typography } from "@mui/material";


const Home = () => {
    const { user } = useUserAuth();
    const isLoggedIn = user == null ? false : true;

    return (
        <>
            <KoolContainer>
                <div className="flex flex-col items-center justify-center h-full">
                    {isLoggedIn ? <div>Welcome back, {user.fullname}</div> : <div>Not logged in placeholder</div>}
                </div>
                <Typography color={ "whitesmoke" } size={ "4xl" } style={{textAlign: "center",fontSize: 16, fontWeight: "500", textShadow: "2px 2px 4px #000000", padding:20 }}>Buttons below are for testing purposes only.</Typography>


                <div className="flex flex-col items-center justify-center h-full">
                    <Link to="/checkout">

                        <Button type="primary" color={"primary"} variant={"contained"}>Checkout</Button>
                    </Link>

                    <Link to="/seats">
                        <Button type="primary" color={"primary"} variant={"contained"}>Seats</Button>
                    </Link>

                    <Link to="/movies">
                        <Button type="primary" color={"primary"} variant={"contained"}>Movies</Button>
                    </Link>


                    <Link to="/theatres">
                        <Button type="primary" color={"primary"} variant={"contained"}>Theatres</Button>
                    </Link>
                </div>

            </KoolContainer>
        </>
    );
};

export default Home;
