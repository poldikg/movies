import React from "react";
import "./BackgroundChnageTrailer.css"
import Trailer from "../Trailer/Trailer";

const BackgroundChnageTrailer = (props) => {

    const changeBackgroundTrailer = (img) => {
        const getBackground = document.querySelector(".hover-background-change-trailers");
        getBackground.style.background = `url(https://image.tmdb.org/t/p/original/${img})`;
        getBackground.style.backgroundSize = "99%";
        getBackground.style.backgroundPosition = "center top -100px";
    }

    const renderTrailers = props.data.map(trailer => {
        return <Trailer
            key={trailer.movieId}
            id={trailer.movieId}
            trailer={trailer.key}
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