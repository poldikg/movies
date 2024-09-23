import { React, useEffect, useState } from "react";
import "./PostersSlider.css"
import MoviePoster from "../MoviePoster/MoviePoster";

const PostersSlider = (props) => {

    const [upcomingMovies, setUpcomingMovies] = useState(props.movies);

    const renderUpcomingMovies = props.movies.map(movie => {
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


    return <div className="posters-slider">
        {renderUpcomingMovies}
    </div>
}

export default PostersSlider