import React from "react";
import "./Movie.css"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MoviePoster from "../../components/MoviePoster/MoviePoster";

const Movie = () => {

    const currentLocation = useLocation()
    const props = currentLocation.state;
    console.log(props)

    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [similarMovies, setSimiliarMovies] = useState([]);
    const [movieDetails, setMovieDetails] = useState([]);
    const [trailer, setTrailer] = useState([]);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    const [toggleMovieDetails, setToggleMovieDetails] = useState({
        cast: true,
        crew: false,
        genre: false,
        more: false
    })

    console.log(cast, crew, similarMovies, movieDetails, toggleMovieDetails)
    useEffect(() => {

        const fetchCast = async () => {
            const url = `https://api.themoviedb.org/3/movie/${props.id}/credits?language=en-US`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzM3Mjg3ZDc2OTc3OWQwNGFiMDEzOGZmMGIwYjg4MCIsIm5iZiI6MTcyODAzMDA1My41MDc1MjUsInN1YiI6IjY0MTQ1NzE2YTZjMTA0MDA5YTAwM2QwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q3MulxEtxaXBJdeEFNQH4LMT3VzYXWCBczzaQXANy1M'
                }
            };

            const response = await fetch(url, options);
            const json = await response.json();

            if (response.ok) {
                setCast(json.cast)
                setCrew(json.crew)
            }
        }

        const fetchSimilarMovies = async () => {
            const url = `https://api.themoviedb.org/3/movie/${props.id}/similar?language=en-US&page=1`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzM3Mjg3ZDc2OTc3OWQwNGFiMDEzOGZmMGIwYjg4MCIsIm5iZiI6MTcyODAzMDA1My41MDc1MjUsInN1YiI6IjY0MTQ1NzE2YTZjMTA0MDA5YTAwM2QwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q3MulxEtxaXBJdeEFNQH4LMT3VzYXWCBczzaQXANy1M'
                }
            };

            const response = await fetch(url, options);
            const json = await response.json()

            if (response.ok) {
                setSimiliarMovies(json.results)
            }
        }

        const fetchMovieDetails = async () => {

            const url = `https://api.themoviedb.org/3/movie/${props.id}?language=en-US`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzM3Mjg3ZDc2OTc3OWQwNGFiMDEzOGZmMGIwYjg4MCIsIm5iZiI6MTcyODAzMDA1My41MDc1MjUsInN1YiI6IjY0MTQ1NzE2YTZjMTA0MDA5YTAwM2QwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q3MulxEtxaXBJdeEFNQH4LMT3VzYXWCBczzaQXANy1M'
                }
            };

            const response = await fetch(url, options);
            const json = await response.json();

            if (response.ok) {
                setMovieDetails(json)
            }

        }

        const fetchTrailer = async () => {
            const urlTrailer = `https://api.themoviedb.org/3/movie/${props.id}/videos?language=en-US`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzM3Mjg3ZDc2OTc3OWQwNGFiMDEzOGZmMGIwYjg4MCIsIm5iZiI6MTcyNzQyOTM4Ni44NzgzODQsInN1YiI6IjY0MTQ1NzE2YTZjMTA0MDA5YTAwM2QwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MfhjKgYoYqw_abikNQedx4fJ26Z6PdT36WqSgZ5XyrM'
                }
            };

            const response = await fetch(urlTrailer, options);
            const json = await response.json();

            const trailers = json.results.filter(movie => movie.type === "Trailer");
            const trailer = trailers[0];

            if (response.ok) {
                setTrailer(trailer)
            }
        }


        fetchCast();
        fetchSimilarMovies();
        fetchMovieDetails();
        fetchTrailer();

    }, [])

    useEffect(() => {

        const movieBackground = document.querySelector(".movie-background");
        movieBackground.style.background = `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`;
        movieBackground.style.backgroundPosition = "center";

    }, [movieDetails])


    const castMembers = cast.map(member => {
        return <div className="movie-button-redirect">{member.name}</div>
    })

    let genresMovie = [];
    if (movieDetails.hasOwnProperty("genres")) {
        genresMovie = movieDetails.genres.map(genre => {
            return <div className="movie-button-redirect">{genre.name}</div>
        })
    }




    return <div>
        <div className="movie-trailer" style={{ zIndex: isTrailerOpen ? 2 : -2, display: isTrailerOpen ? "flex" : "none" }}>
            <iframe onMouseEnter={() => props.onHover(movieDetails.backdrop_path)} width="1200" height="580" src={`https://www.youtube.com/embed/${trailer.key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="true"></iframe>
            <div className="movie-trailer-close-btn" onClick={() => { setIsTrailerOpen(false); }}>X </div>
        </div>
        <div className="movie-background">

            <div className="movie-inner-background">
                <div className="movie-left-side">
                    <MoviePoster
                        poster={movieDetails.poster_path}
                    />
                    <div>
                        <p>People Voted: {movieDetails.vote_count}</p>
                        <p>Likes: {Math.floor(Math.random() * 1536)}</p>
                        <p>Popularity: {movieDetails.popularity}</p>
                    </div>
                    <button className="movie-play-trailer" onClick={() => { setIsTrailerOpen(true) }}>Play trailer</button>
                </div>

                <div className="movie-middle-side">
                    <div className="movie-middle-side-title-year">
                        <h1>{movieDetails.title}</h1>
                        <p>{/*{movieDetails.release_date.length > 1 ? movieDetails.release_date.slice(0, 4) : ""} */}directed by </p>
                    </div>
                    <div className="movie-middle-side-overview">
                        {movieDetails.overview}
                    </div>
                </div>

                <div className="movie-right-side">
                    <div className="movie-interaction border">Rate</div>
                    <div className="movie-interaction border">Review</div>
                    <div className="movie-interaction border">Add to Watch Later</div>
                    <div className="movie-interaction" >Rated by Users: </div>
                </div>
            </div>

        </div>

        <div className="movie-details">

            <div className="movie-details-toggle-section">
                <div className="movie-details-toggle">
                    <button className="movie-details-buttons" style={toggleMovieDetails.cast ? { borderBottom: "1px solid #6DAA7A" } : {}} onClick={() => { setToggleMovieDetails({ crew: false, more: false, genre: false, cast: true }) }}> Cast </button>
                    <button className="movie-details-buttons" style={toggleMovieDetails.crew ? { borderBottom: "1px solid #6DAA7A" } : {}} onClick={() => { setToggleMovieDetails({ crew: true, more: false, genre: false, cast: false }) }}> Crew </button>
                    <button className="movie-details-buttons" style={toggleMovieDetails.genre ? { borderBottom: "1px solid #6DAA7A" } : {}} onClick={() => { setToggleMovieDetails({ crew: false, more: false, genre: true, cast: false }) }}> Genre </button>
                    <button className="movie-details-buttons" style={toggleMovieDetails.more ? { borderBottom: "1px solid #6DAA7A" } : {}} onClick={() => { setToggleMovieDetails({ crew: false, more: true, genre: false, cast: false }) }}> More </button>
                </div>

                {toggleMovieDetails.cast ? <div className="movie-cast"> {castMembers} </div> :
                    toggleMovieDetails.crew ? <div> crew </div> :
                        toggleMovieDetails.genre ? <div className="movie-cast"> {genresMovie} </div> :
                            toggleMovieDetails.more ? <div className="movie-more-information"> <p>Original Title: {props.original_title}</p> <p>Release date: {props.release_date} </p> </div> : ""}
            </div>

            <div>
                <h2>News about the movie</h2>
                <h3>Currently no news</h3>
            </div>

        </div>
    </div>
}

export default Movie;