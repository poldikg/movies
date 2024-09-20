import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css"

const Header = () => {
  const [movie, setMovie] = useState("")

  const [allMovies, setAllMovies] = useState([]);
  console.log(allMovies)

  const fetchMovies = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzM3Mjg3ZDc2OTc3OWQwNGFiMDEzOGZmMGIwYjg4MCIsIm5iZiI6MTcyNTY5OTEyNi44NzY3MjIsInN1YiI6IjY0MTQ1NzE2YTZjMTA0MDA5YTAwM2QwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bf3PiFM0pPoMqKX_46G4esMm5xSrujtPEc90UhrAPLM'
      }
    };
    const response = await fetch(url, options);
    const json = await response.json();

    if (response.ok) {
      setAllMovies(json.results)
    }


  }

  return <div className="header">

    <img src="images/substitive-logo.png" alt="logo" srcset="" />

    <div className="header-right-side">
      <Link to="/Home"> Home </Link>
      <Link to="/Profile"> Profile </Link>
      <Link to="/Movie"> Random Movie </Link>

      <input type="text" name="" value={movie} onChange={(e) => {
        setMovie(e.target.value)
      }} />
      <button onClick={() => { fetchMovies() }}>Search </button>
    </div>


  </div>
}

export default Header;