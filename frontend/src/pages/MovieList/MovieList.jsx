import React from "react";
import "./MovieList.css"
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import MoviePoster from "../../components/MoviePoster/MoviePoster";
import PictureHolder from "../../components/PictureHolder/PictureHolder";

const MovieList = () => {

    const props = useLocation().state;
    const [movieList, setMovieList] = useState(props.randomList)
    console.log(props)

    const renderMovies = movieList.map(movie => {
        return <MoviePoster
            key={movie.id}
            id={movie.id}
            title={movie.title}
            synopsis={movie.overview}
            popularity={movie.popularity}
            poster={movie.poster_path}
            release_date={movie.release_date}
            original_title={movie.original_title}
            score={movie.vote_average}
        />
    })

    useEffect(() => {
        const background = document.querySelector(".movie-list-background")
        background.style.background = `url(https://image.tmdb.org/t/p/original/${movieList[Math.floor(Math.random() * movieList.length)].backdrop_path}) center `
    }, [])

    return <div className="movie-list">
        <div className="movie-list-background">
            <div className="movie-list-background-text">
                <h2>Randomzed list</h2>
                <p>Genre: {props.genre}</p>
            </div>
        </div>

        <div className="movie-list-test">
            <div className="movie-list-movies">
                {renderMovies}
            </div>
        </div>
    </div>
}

export default MovieList;