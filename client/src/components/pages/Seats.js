import React, {useState} from 'react';
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

const theme = createTheme();

export default function Seats() {
  
  const [seats, setSeats] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},  {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]);

  return (
    <ThemeProvider theme={theme}>

      <KoolContainer>
        <div className='grid h-full grid-cols-10'>
          <div className='grid h-full col-span-2 '>
            <div className='bg-white opacity-75 h-full w-full text-black'>
              <h2 className='text-black mt-3 text-2xl'>Tickets</h2>
              <div className='border-black border rounded-2xl w-4/5 h-10 grid grid-cols-3 m-auto mt-4 justify-center items-center'>
                <div className='grid text-black h-full border-black border rounded-l-2xl justify-center items-center'>
                  +
                </div>
                <div className='grid text-black h-full justify-center items-center'>
                  2
                </div>
                <div className='grid text-black h-full border-black border rounded-r-2xl justify-center items-center'>
                  -
                </div>
              </div>
            </div>
          </div>
          <div className='grid h-full col-span-8'>
            <div className='grid border m-auto w-3/5 h-4/5 rounded-lg mt-4 bg-white opacity-95 p-3 grid-cols-10 '>
              {seats.map((seat) => (
                <div className='rounded-md bg-black h-10 w-10'>

                </div>
              ))}
            </div>
            <div className='border m-auto w-3/5 h-1/4 rounded-lg mt-4   '>
              H
            </div>
          </div>
        </div>

      </KoolContainer>
    </ThemeProvider>
  );
}