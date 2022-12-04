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
import moment from 'moment';

const theme = createTheme();


export default function Seats() {

  const location = useLocation();
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatsName, setSelectedSeatsName] = useState([]);
  const [ticketAmount, setTicketAmount] = useState(0);

  const [presaleMode, setPresaleMode] = useState(false);
  const [presaleAvailable, setPresaleAvailable] = useState(0);

  // LOADING FUNCTION

  useEffect(() => {

    // GET SEATS
    console.log("showtime selected from previous page:", location.state.showtime_id);
    axios.get("http://localhost:3001/server/endpoints/get/seats.php?showtime_id=" + location.state.showtime_id)
      .then((response) => {
        console.log(response.data.body);
        setSeats(response.data.body);
      });

  }, []);

  useEffect(() => {
    // GET PRESALE STATUS
    if (moment().isBefore(moment(location.state.public_date))) {
      setPresaleMode(true);
      const presaleLimit = 0.1 * seats.length;
      setPresaleAvailable(Math.floor(presaleLimit - seats.filter((seat) => seat.seat_status == 1).length));
    }
  }, [seats])

  // UPDATING FUNCTIONS
  const selectSeat = (id) => {
    if (!selectedSeats.find((seat) => seat === id) && seats.filter((seat) => seat.id == id)[0].seat_status == 0 && ticketAmount) {
      console.log("seat selected:", id);
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

  const addAmount = () => {
    if ((!presaleMode && ticketAmount < seats.filter((seat) => seat.seat_status == 0).length) || (presaleMode && ticketAmount < presaleAvailable)) {
      setTicketAmount(ticketAmount + 1);
    }
  }

  useEffect(() => {
    setSelectedSeatsName(selectedSeats.map((seat) => seats.filter((seat2) => seat2.id === seat)[0].seat));
  }, [selectedSeats, seats]);

  const confirmClick = () => {
    console.log("showtime id ", location.state.showtime_id);
    console.log("date ", location.state.showtime_date);
    console.log("starting at ", location.state.showtime_start);
    console.log("movie image ", location.state.movie_image);

    navigate('/checkout', {
      state: {
        theatre_id: location.state.theatre_id,
        theatre_name: location.state.theatre_name,
        movie_name: location.state.movie_name,
        movie_id: location.state.movie_id,
        show_start: location.state.show_start,
        show_date: location.state.show_date,
        showtime_id: location.state.showtime_id,
        seats_ids: selectedSeats,
        seats_number: selectedSeatsName,
        public_date: location.state.public_date,
        movie_image: location.state.movie_image
      }
    });
  };



  return (
    <ThemeProvider theme={theme}>

      <KoolContainer>
        <div className='grid h-full grid-cols-11'>
          <div className='grid h-full col-span-2 '>
            <div className='bg-white opacity-75 h-full w-full text-black '>
              <h2 className='text-red-500 mt-3 text-2xl'>{presaleMode ? "*Presale*" : null}</h2>
              <h2 className='text-black mt-3 text-2xl'>Tickets</h2>
              <div className='border-black border rounded-2xl w-4/5 h-1/12 grid grid-cols-3 m-auto mt-4 justify-center items-center '>
                <div className='grid text-black h-full border-black border rounded-l-2xl justify-center items-center' onClick={addAmount}>
                  +
                </div>
                <div className='grid text-black h-full justify-center items-center'>
                  {ticketAmount}
                </div>
                <div className='grid text-black h-full border-black border rounded-r-2xl justify-center items-center' onClick={removeAmount}>
                  -
                </div>
              </div>
              <div className='rounded-2xl w-4/5 h-11/12 grid grid-cols-1 m-auto mt-4 justify-center items-center'>
                {selectedSeats.map((seatId, index) => (
                  <div key={index} className='grid m-auto w-4/5 mt-4'>
                    <div className='grid text-black h-ful w-full justify-center items-center'>
                      <div className='text-black m-auto w-full border p-3'>
                        Ticket #{index + 1}: {seats.filter((seat) => seat.id == seatId)[0].seat}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {presaleMode &&
                <div className='grid m-auto w-4/5 mt-4'>
                  <div className='grid text-black h-ful w-full justify-center items-center'>
                    <div className='text-black m-auto w-full border p-3'>
                      {presaleAvailable ? (
                        <p className='text-red-500'>Only {presaleAvailable} ticket(s) left in presale!</p>)
                        : <p className='text-red-500'>No tickets left in presale</p>
                      }
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className='grid h-full col-span-6'>
            <div className='grid border m-auto w-4/5 h-full rounded-lg mt-4 bg-white opacity-95 '>
              <div className='m-auto bg-black w-11/12 rounded-xl'>SCREEN</div>
              <div className='grid grid-cols-10 p-3'>
                {seats.map((seat) => (
                  <div key={seat.id} className='grid grid-cols-1 rounded-md bg-black h-10 w-10 justify-center items-center cursor' onClick={() => selectSeat(seat.id)}>
                    {
                      seat.seat_status != 0 ? (
                        <div className='grid bg-white rounded-md text-white text-4xl opacity-50 h-full w-full m-auto'>
                        </div>
                      ) : selectedSeats.includes(seat.id) ?
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
          <div className='grid h-2/5 mt-5 col-span-2'>
            <div className='grid bg-white rounded-2xl h-full w-full m-auto p-3'>
              <p className='text-black'>Legend:</p>
              <div className='grid grid-cols-2'>
                <div className='grid col-span-1 grid-cols-1 rounded-md bg-black h-10 w-10 justify-center items-center'>
                  <div className='grid bg-white rounded-md text-white text-4xl opacity-50 h-full w-full m-auto'></div>
                </div>
                <div className='grid col-span-1 text-black text-left'>
                  Unavailable
                </div>
              </div>

              <div className='grid grid-cols-2'>
                <div className='grid col-span-1 grid-cols-1 rounded-md bg-black h-10 w-10 justify-center items-center'>
                  <div className='grid rounded-md bg-white m-1 opacity-100 h-4/5 w-4/5 m-auto text-black'>X</div>
                </div>
                <div className='grid col-span-1 text-black text-left'>
                  Your Seat
                </div>
              </div>

              <div className='grid grid-cols-2'>
                <div className='grid grid-cols-1 rounded-md bg-black h-10 w-10 justify-center items-center'>
                </div>
                <div className='grid col-span-1 text-black text-left'>
                  Available
                </div>
              </div>


            </div>
          </div>
        </div>

      </KoolContainer>
    </ThemeProvider >
  );
}