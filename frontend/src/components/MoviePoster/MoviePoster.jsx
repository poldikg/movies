import React from "react";
import "./MoviePOster.css"
import { Link } from "react-router-dom"

const MoviePoster = (props) => {


    return <div>
        <Link to="/Movie" state={props}>  <img className="movie-poster-img" src={`https://image.tmdb.org/t/p/w200${props.poster}`} alt="" srcset="" /> </Link>


    </div>
}
export default MoviePoster;
