import React, { useEffect, useState } from "react";
import "./Trailer.css"


const Trailer = (props) => {

    console.log(props)
    const [movieDetails, setMovieDetails] = useState([]);
    const [showTrailer, setShowTrailer] = useState(false);
    console.log(movieDetails)
    useEffect(() => {

        const fetchDetails = async (id) => {
            const urlDetails = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_APP_MOVIES_TOKEN}`
                }
            };
            const responseDetails = await fetch(urlDetails, options);
            const jsonDetails = await responseDetails.json();
            console.log(jsonDetails)
            setMovieDetails(jsonDetails)
        }

        fetchDetails(props.id)
    }, [])



    return (
        <div>
            <div className="trailer-show-trailer" style={showTrailer ? { "zIndex": 5 } : { "display": "none" }}>
                <iframe width="1200" height="580" src={`https://www.youtube.com/embed/${props.trailer}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="true"></iframe>
                <div className="movie-trailer-close-btn" onClick={() => { setShowTrailer(false); }}>X </div>
            </div>
            <div className="trailer" onMouseEnter={() => props.onHover(movieDetails.backdrop_path)} width="200" height="180" >
                <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`} alt="" onClick={() => { setShowTrailer(true) }} />
                <p>{movieDetails.title}</p>
            </div>
        </div>
    )
}

export default Trailer;