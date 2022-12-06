import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import CancelOrder from './components/pages/CancelOrder';
import Movies from './components/pages/Movies';
import Theatres from './components/pages/Theatres';
import NavBar  from "./components/navbar/NavBar";
import Seats from './components/pages/Seats';
import Checkout from "./components/pages/Checkout";
import Showtimes from './components/pages/Showtimes';
import { UserAuthContextProvider } from './components/authentication/UserAuthContext';
import Admin from './components/pages/Admin';

function App() {
  return (
      <div className="App">
        <UserAuthContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cancelorder" element={<CancelOrder />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/theatres" element={<Theatres />} />
            <Route path="/seats" element={<Seats />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/showtimes" element={<Showtimes />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </UserAuthContextProvider>
      </div>
  );
}

export default App;
