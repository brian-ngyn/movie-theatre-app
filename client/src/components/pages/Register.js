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
import KoolContainer from '../KoolContainer/KoolContainer';
import { useUserAuth } from '../authentication/UserAuthContext';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Register() {
  const { userid, signup } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signup(data.get('email'), data.get('password'), data.get('fullname'), data.get('creditcard'), data.get('cvc'), data.get('expirydate'));
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <KoolContainer>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Movie Theatre Register
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
              name="password"
              label="Password"
              type="password"
              id="password"
              className='bg-white rounded-lg'
            />
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              name="fullname"
              label="Full Name"
              id="fullname"
              className='bg-white rounded-lg'
            />
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              name="creditcard"
              label="Credit Card Number"
              id="creditcard"
              className='bg-white rounded-lg'
            />
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              name="cvc"
              label="CVC"
              id="cvc"
              className='bg-white rounded-lg'
            />
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              name="expirydate"
              label="Expiry (MMYY)"
              id="expiry"
              className='bg-white rounded-lg'
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </KoolContainer>
    </ThemeProvider>
  );
}