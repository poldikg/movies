import React from "react";

const MovieDetails = (props) => {
    

    return (
        <div>
            <h1>{props.name}</h1>
            <img src={`https://image.tmdb.org/t/p/w300/${props.image}`}></img>
            <p>Rating: {props.rating}</p>
            <p>Overview: {props.overview}</p>
        </div>
    )
}

export default MovieDetails;