import { React, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import axios from "axios";
import { useUserAuth } from "../authentication/UserAuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KoolContainer from "../KoolContainer/KoolContainer";
import moment from "moment";
import { Dialog, DialogTitle, Select, MenuItem, Input, Button, TextField, alertClasses } from "@mui/material";

const theme = createTheme();


export default function AllMovieList(props) {

  const { setMovieDialogOpen, movieDialogOpen } = props;
  const [movies, setMovies] = useState([]);
  const [theatreList, setTheatres] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [editing, setEditing] = useState(null);


  const editHandler = (movie_id) => {

    movies.forEach((item) => {
      if (item.movie_id === movie_id) {
        setFormValues({
          movie_title: item.movie_title,
          movie_id: item.movie_id,
          movie_duration: item.movie_duration,
          movie_image: item.movie_image,
          theatre_id: item.theatre_id,
          movie_presale: item.movie_presale,
        });
        setEditing(movie_id);
        return;
      }
    });

  }

  // Updates from values on input change
  const handleInputUpdate = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  }

  const getMovies = (theatre_id) => {
    axios.get("http://localhost:3001/server/endpoints/list/movies.php")
      .then((response) => {
        console.log("Movies response:", response.data.body);
        setMovies(response.data.body);
      });
  };

  const getTheatres = () => {
    axios
      .get("http://localhost:3001/server/endpoints/list/theaters.php")
      .then((response) => {
        setTheatres(response.data.body);
        console.log("Theatres response:", response.data.body);
      });
  };


  useEffect(() => {
    getMovies();
    getTheatres();
  }, []);

  const addNew = () => {
    setFormValues({ movie_id: '0', movie_title: '', movie_duration: '00:02:30', movie_image: '', movie_presale: '', theatre_id: '' });
    setMovies([...movies, { movie_id: '0', movie_title: '', movie_duration: '00:02:30', movie_image: '', movie_presale: '', theatre_id: '' }]);
    setEditing(0);
  }

  const handleDelete = (movie_id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      axios.post("http://localhost:3001/server/endpoints/post/deletemovie.php?movie_id=" + movie_id)
        .then((response) => {
          console.log(response);
          getMovies();
        });
    }

  }

  const handleSubmit = (event) => {
    console.log("Form Values:", formValues);

    axios.post("http://localhost:3001/server/endpoints/post/createmovie.php", formValues)
      .then((response) => {
        console.log("Returned:", response);
        getMovies();
      });
  }


  return (
    <KoolContainer>
      <Dialog fullWidth={true} onClose={() => { setMovieDialogOpen(false); setFormValues({}); }} open={true} >
        <DialogTitle>Manage Medications Inventory</DialogTitle>
        <div className="grid grid-cols-1 p-5 space-y-2 overflow-scroll bg-black">
          {movies.map((movie) => (
            <div className="w-full bg-tertiary border-black border rounded-xl p-4">
              <div className="grid grid-cols-4">
                {editing == movie.movie_id ?
                  <>
                    <div className="grid col-span-3">
                      <TextField className='bg-white rounded-lg' placeholder={"Title"} type="text" name="movie_title" value={formValues.movie_title} onChange={handleInputUpdate} />
                      <TextField className='bg-white rounded-lg' placeholder={"Duration"} type="text" name="movie_duration" value={formValues.movie_duration} onChange={handleInputUpdate} />
                      <TextField className='bg-white rounded-lg' placeholder={"Image"} type="text" name="movie_image" value={formValues.movie_image} onChange={handleInputUpdate} />
                      <TextField className='bg-white rounded-lg' placeholder={"Public Date"} type="date" name="movie_presale" value={formValues.movie_presale} onChange={handleInputUpdate} />
                      <Select label="Theater" name="theatre_id" value={formValues.theatre_id} onChange={handleInputUpdate} className='bg-white'>
                        {theatreList.map((item) => (
                          <MenuItem className='bg-black' style={{ backgroundColor: "black" }} key={item.theatre_id} value={item.theatre_id}>{item.theatre_name}</MenuItem>
                        ))}

                      </Select>
                    </div>


                    <div className="grid grid-cols-2 space-x-3">
                      <Button className="grid w-1/5 " variant="contained" color="secondary" onClick={handleSubmit}>Save</Button>
                    </div>
                  </>
                  : <>
                    <div className="grid col-span-3 grid-cols-2">
                      <img className='w-20 grid' src={movie.movie_image} />
                      <p className="grid">{movie.movie_title}</p>
                      <p className="grid">{movie.movie_duration}</p>
                      <p className="grid">{movie.movie_theatre}</p>
                    </div>



                    <div className="grid grid-cols-2 space-x-3">
                      <Button className="grid w-1/5 " variant="contained" color="error" onClick={() => { handleDelete(movie.movie_id) }}>X</Button>
                      <Button className="grid w-1/5 " variant="contained" color="secondary" onClick={() => editHandler(movie.movie_id)}>Edit</Button>
                    </div>
                  </>
                }


              </div>
            </div>
          ))}
          <Button variant="outlined" color="success" onClick={addNew}>Add New</Button>
        </div>



      </Dialog>
    </KoolContainer>
  )
}


