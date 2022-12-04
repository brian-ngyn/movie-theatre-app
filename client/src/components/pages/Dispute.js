import * as React from 'react';
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
import { useUserAuth } from '../authentication/UserAuthContext';
import { useEffect } from 'react';
import KoolContainer from '../KoolContainer/KoolContainer';
import axios from 'axios';

const theme = createTheme();

export default function Dispute() {
  const { user } = useUserAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      orderid: data.get('orderid'),
    });
    console.log("http://35.183.16.214/server/endpoints/get/cancelticket.php?user_email=" + data.get('email') + "&payment_id=" + data.get('orderid'));
    // axios.get("http://35.183.16.214/server/endpoints/get/cancelticket.php?user_email=" + data.get('email') + "&payment_id")
    // send a get request to the server with the order id and email
    // if the order id and email match, then send the user to the dispute page
    // if the order id and email do not match, then send the user to the error page

  };

  useEffect(() => {
    console.log(user);
  });
  
  return (
    <ThemeProvider theme={theme}>
      <KoolContainer>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Cancel an Order
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                variant="filled"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                className='bg-white rounded-lg'
              />
              <TextField
                margin="normal"
                variant="filled"
                required
                fullWidth
                id="orderid"
                label="Order ID#"
                name="orderid"
                className='bg-white rounded-lg'
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </KoolContainer>
    </ThemeProvider>
  );
}