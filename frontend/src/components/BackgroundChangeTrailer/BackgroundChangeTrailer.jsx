import React from "react";
import "./BackgroundChnageTrailer.css"
import Trailer from "../Trailer/Trailer";
import { useEffect } from "react";

const BackgroundChnageTrailer = (props) => {
    console.log(props)
    useEffect(() => {
        // Add a background when the component loads

    }, [])

    const changeBackgroundTrailer = (img) => {
        const getBackground = document.querySelector(".hover-background-change-trailers");
        getBackground.style.background = `url(https://image.tmdb.org/t/p/original/${img})`;
        getBackground.style.backgroundSize = "99%";
        getBackground.style.backgroundPosition = "center top -100px";
    }

    console.log(props)
    const renderTrailers = props.data.map(trailer => {

        return <Trailer
            key={trailer.movieId}
            id={trailer.movieId}
            trailer={trailer.key}
            img={trailer.backdrop_path}
            onHover={changeBackgroundTrailer}
        />
    })
    return (
        <div className="hover-background-change-trailers">
            {renderTrailers}
        </div>
    )
}

export default BackgroundChnageTrailer