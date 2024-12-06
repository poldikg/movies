import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Header.css"

const Header = () => {
  const [movie, setMovie] = useState("")
  const [allMovies, setAllMovies] = useState([]);
  const [randomMovieGenre, setRandomMovieGenre] = useState([]);
  const [genre, setGenre] = useState("");
  const [randomList, setRandomList] = useState([]);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const currentLocation = useLocation().pathname;
  console.log(currentLocation)



  console.log(randomMovieGenre, randomList)

  useEffect(() => {
    setMovie("")
    setAllMovies([])

  }, [currentLocation])

  const fetchMoviesSearch = async (movieName) => {
    setMovie(movieName)
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_APP_SEARCH_TOKEN}`
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
        Authorization: `Bearer ${import.meta.env.VITE_APP_SEARCH_TOKEN}`
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
          Authorization: `Bearer ${import.meta.env.VITE_APP_SEARCH_TOKEN}`
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

  const handleClick = () => {
    logout()
  }

  return <div className="header">

    <img src="images/substitive-logo.png" alt="logo" srcset="" />

    <div className="header-right-side">
      {user ? <div>
        <Link to="/Home"> Home </Link>
        <Link to="/Profile"> Profile </Link>
        <button onClick={handleClick}>Logout</button>
        <Link to="/MovieList" state={{ randomList, genre }} onClick={fetchAllGenres}> Random List </Link>
      </div> : <div>
        <Link to="/Home"> Home </Link>
        <Link to="/Login"> Login </Link>
        <Link to="/Signup"> Signup </Link>
      </div>}




      <div className="movie-search">
        <input type="text" name="" className="movie-search-input" value={movie} onChange={(e) => {
          fetchMoviesSearch(e.target.value)
        }} />
        <div className="movie-search-allmovies" style={allMovies.length < 1 ? { border: "none", backgroundColor: "transparent" } : {}}>
          {allMovies.map(movie => {
            return <Link to="/Movie" className="movie-search-movie" state={movie} > {movie.title} </Link>
          })}
        </div>
      </div>
    </div>


  </div>
}

export default Header;