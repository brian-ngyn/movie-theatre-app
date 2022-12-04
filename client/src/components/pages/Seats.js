import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from "../navbar/NavBar";
import KoolContainer from '../KoolContainer/KoolContainer';
import { useUserAuth } from '../authentication/UserAuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

const theme = createTheme();


export default function Seats() {

  const location = useLocation();
  const navigate = useNavigate();

  const [seats, setSeats] = useState([
    { id: 1, seat: "A1", status: "available" },
    { id: 2, seat: "A2", status: "available" },
    { id: 3, seat: "A3", status: "available" },
    { id: 4, seat: "A4", status: "available" },
    { id: 5, seat: "A5", status: "available" },
    { id: 6, seat: "A6", status: "available" },
    { id: 7, seat: "A7", status: "available" },
    { id: 8, seat: "A8", status: "available" },
    { id: 9, seat: "A9", status: "available" },
    { id: 10, seat: "A10", status: "available" },
    { id: 11, seat: "A11", status: "available" },
    { id: 12, seat: "A12", status: "available" },
    { id: 13, seat: "A13", status: "available" },
    { id: 14, seat: "A14", status: "available" },
    { id: 15, seat: "A15", status: "available" },
    { id: 16, seat: "A16", status: "available" },
    { id: 17, seat: "A17", status: "available" },
    { id: 18, seat: "A18", status: "available" },
    { id: 19, seat: "A19", status: "available" },
    { id: 20, seat: "B1", status: "available" },
    { id: 21, seat: "B2", status: "available" },
    { id: 22, seat: "B3", status: "available" },
    { id: 23, seat: "B4", status: "available" },
    { id: 24, seat: "B5", status: "available" },

  ]);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketAmount, setTicketAmount] = useState(0);

  const [presaleMode, setPresaleMode] = useState(false);
  const [presaleAvailable, setPresaleAvailable] = useState(0);

  // LOADING FUNCTION

  useEffect(() => {

    // GET SEATS
    console.log("showtime selected from previous page:", location.state.showtime_id);
    axios.get("http://35.183.16.214/server/endpoints/get/seats.php?showtime_id=" + location.state.showtime_id)
      .then((response) => {
        console.log("Seats response:", response.data);
        setSeats(response.data.body);
      });

    // GET PRESALE STATUS


  }, []);


  // UPDATING FUNCTIONS
  const selectSeat = (id) => {
    if (!selectedSeats.find((seat) => seat === id) && ticketAmount) {
      const reducedSeats = selectedSeats.filter((_, index) => index > selectedSeats.length - ticketAmount);
      setSelectedSeats([...reducedSeats, id]);
    }
  }
  const removeAmount = () => {
    if (ticketAmount > 1) {
      setTicketAmount(ticketAmount - 1);
      const reducedSeats = selectedSeats.filter((_, index) => index > selectedSeats.length - ticketAmount);
      setSelectedSeats([...reducedSeats]);
    }
  }

  const confirmClick = () => {
    console.log("showtime id ", location.showtime_id);
    console.log("date ", location.showtime_date);
    console.log("starting at ", location.showtime_start);

    navigate('/checkout', {
      state: {
        theatre_id: location.state.theatre_id,
        movie_id: location.state.movie_id,
        showtime_id: location.state.showtime_id,
        seats_ids: selectedSeats,
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>

      <KoolContainer>
        <div className='grid h-full grid-cols-10'>
          <div className='grid h-full col-span-2 '>
            <div className='bg-white opacity-75 h-full w-full text-black'>
              <h2 className='text-black mt-3 text-2xl'>Tickets</h2>
              <div className='border-black border rounded-2xl w-4/5 h-10 grid grid-cols-3 m-auto mt-4 justify-center items-center'>
                <div className='grid text-black h-full border-black border rounded-l-2xl justify-center items-center' onClick={() => setTicketAmount(ticketAmount + 1)}>
                  +
                </div>
                <div className='grid text-black h-full justify-center items-center'>
                  {ticketAmount}
                </div>
                <div className='grid text-black h-full border-black border rounded-r-2xl justify-center items-center' onClick={removeAmount}>
                  -
                </div>
              </div>
              <div className='rounded-2xl w-4/5 h-10 grid grid-cols-1 m-auto mt-4 justify-center items-center'>
                {selectedSeats.map((seatId, index) => (
                  <div className='grid m-auto w-4/5 mt-4'>
                    <div className='grid text-black h-ful w-full justify-center items-center'>
                      <div className='text-black m-auto w-full border p-3'>
                        Ticket #{index + 1}: {seats.filter((seat) => seat.id == seatId)[0].seat}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='grid h-full col-span-8'>

            <div className='grid border m-auto w-3/5 h-full rounded-lg mt-4 bg-white opacity-95 '>
              <div className='m-auto bg-black w-11/12 rounded-xl'>SCREEN</div>
              <div className='grid grid-cols-10 p-3'>
                {seats.map((seat) => (
                  <div key={seat.id} className='grid grid-cols-1 rounded-md bg-black h-10 w-10 justify-center items-center cursor' onClick={() => selectSeat(seat.id)}>
                    {
                      selectedSeats.includes(seat.id) ?
                        <div className='grid rounded-md bg-white m-1 opacity-100 h-4/5 w-4/5 m-auto text-black'>
                          X
                        </div>
                        :
                        null
                    }
                  </div>
                ))}
              </div>
            </div>
            <div className='grid border m-auto w-3/5 h-20 rounded-lg mt-10'>
              {ticketAmount !== selectedSeats.length ?
                <div>
                  <h2 className='text-red mt-3 text-2xl'>Please select seats for all tickets</h2>
                </div>
                : ticketAmount !== 0 ?
                  <div>
                    <h2 className='text-red mt-3 text-2xl'><Button variant='contained' onClick={confirmClick}>Confirm Seat Selection</Button></h2>
                  </div>
                  :
                  <div>
                    <h2 className='text-red mt-3 text-2xl'>Select the amount of tickets in the left menu bar</h2>
                  </div>
              }

            </div>
          </div>
        </div>

      </KoolContainer>
    </ThemeProvider>
  );
}