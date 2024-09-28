import React, { useEffect, useState } from "react";
import "./Trailer.css"


const Trailer = (props) => {

    console.log(props)
    const [movieDetails, setMovieDetails] = useState([]);
    const fetchDetails = async (id) => {
        const urlDetails = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzM3Mjg3ZDc2OTc3OWQwNGFiMDEzOGZmMGIwYjg4MCIsIm5iZiI6MTcyNzQyOTM4Ni44NzgzODQsInN1YiI6IjY0MTQ1NzE2YTZjMTA0MDA5YTAwM2QwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MfhjKgYoYqw_abikNQedx4fJ26Z6PdT36WqSgZ5XyrM'
            }
        };



        const responseDetails = await fetch(urlDetails, options);
        const jsonDetails = await responseDetails.json();
        console.log(jsonDetails)
        props.onHover(jsonDetails.backdrop_path)
        setMovieDetails(jsonDetails)
    }



    return (
        <div>
            <iframe onMouseEnter={() => fetchDetails(props.id)} width="200" height="180" src={`https://www.youtube.com/embed/${props.trailer}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="true"></iframe>
        </div>
    )
}

export default Trailer;