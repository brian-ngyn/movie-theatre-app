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