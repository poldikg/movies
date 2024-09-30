import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css"

const Header = () => {
  const [movie, setMovie] = useState("")
  const [allMovies, setAllMovies] = useState([]);
  const [randomMovieGenre, setRandomMovieGenre] = useState([]);
  const [genre, setGenre] = useState("");
  const [randomList, setRandomList] = useState([]);


  console.log(randomMovieGenre, randomList)

  const fetchMoviesSearch = async () => {
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

  const fetchAllGenres = async () => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzM3Mjg3ZDc2OTc3OWQwNGFiMDEzOGZmMGIwYjg4MCIsIm5iZiI6MTcyNzY4MzU1MS42NjQzOTYsInN1YiI6IjY0MTQ1NzE2YTZjMTA0MDA5YTAwM2QwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ITGoq0p8h04jEuI-yM-oOjpzXkwf9LcyqILRYF26yik'
      }
    };

    const response = await fetch(url, options);
    const json = await response.json();

    const randomGenre = Math.floor(Math.random() * json.genres.length);
    console.log(json.genres[randomGenre].name)

    if (response.ok) {
      setRandomMovieGenre(json.genres[randomGenre].id)
      setGenre(json.genres[randomGenre].name)
    }
  }

  useEffect(() => {
    const fetchMoviesGenre = async (genre) => {
      const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzM3Mjg3ZDc2OTc3OWQwNGFiMDEzOGZmMGIwYjg4MCIsIm5iZiI6MTcyNzY4MzU1MS42NjQzOTYsInN1YiI6IjY0MTQ1NzE2YTZjMTA0MDA5YTAwM2QwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ITGoq0p8h04jEuI-yM-oOjpzXkwf9LcyqILRYF26yik'
        }
      };

      const response = await fetch(url, options);
      const json = await response.json();

      if (response.ok) {
        setRandomList(json.results)
      }
    }

    fetchMoviesGenre(randomMovieGenre)

  }
    , [randomMovieGenre])

  return <div className="header">

    <img src="images/substitive-logo.png" alt="logo" srcset="" />

    <div className="header-right-side">
      <Link to="/Home"> Home </Link>
      <Link to="/Profile"> Profile </Link>
      <Link to="/MovieList" state={{ randomList, genre }} onClick={fetchAllGenres}> Random List </Link>

      <input type="text" name="" value={movie} onChange={(e) => {
        setMovie(e.target.value)
      }} />
      <button onClick={() => { fetchMoviesSearch() }}>Search </button>
    </div>


  </div>
}

export default Header;