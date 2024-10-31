import React from "react";
import "./Movie.css"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { userReviews } from "./UserReviews";

//Components
import MoviePoster from "../../components/MoviePoster/MoviePoster";
import RatingStar from "../../components/RatingStar/RatingStar";
import PostReview from "../../components/PostReview/PostReview";

const Movie = () => {

    const currentLocation = useLocation()
    const props = currentLocation.state;
    console.log(props)

    const [movieProps, setMovieProps] = useState(props || {})
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [similarMovies, setSimiliarMovies] = useState([]);
    const [movieDetails, setMovieDetails] = useState([]);
    const [trailer, setTrailer] = useState([]);
    const [sortedDepartments, setSortedDepartments] = useState([]);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const [showPostReview, setShowPostReview] = useState(false);


    const [toggleMovieDetails, setToggleMovieDetails] = useState({
        cast: true,
        crew: false,
        genre: false,
        more: false
    })

    const ratingMovieBad = { backgroundColor: "#EBEF7C" };
    const ratingMovieDecent = { backgroundColor: "#EBEF7C" };
    const ratingMovieGood = { backgroundColor: "#56CD94" };

    const score = props.score ? props.score : props.vote_average

    useEffect(() => {

        window.scrollTo(0, 0)
        if (props) {
            setMovieProps(props)
        }

    }, [props])

    console.log(props)
    useEffect(() => {

        const fetchCast = async () => {
            const url = `https://api.themoviedb.org/3/movie/${movieProps.id}/credits?language=en-US`;
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
            const url = `https://api.themoviedb.org/3/movie/${movieProps.id}/similar?language=en-US&page=1`;
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

            const url = `https://api.themoviedb.org/3/movie/${movieProps.id}?language=en-US`;
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
            const urlTrailer = `https://api.themoviedb.org/3/movie/${movieProps.id}/videos?language=en-US`;
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

    }, [movieProps])

    useEffect(() => {

        const movieBackground = document.querySelector(".movie-background");
        movieBackground.style.background = `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`;
        movieBackground.style.backgroundPosition = "center";

    }, [movieDetails])

    useEffect(() => {

        // if (crew.length > 0) {
        //     const crewDepartments = crew.map(member => member.known_for_department)

        //     for (let i = 0; i < crewDepartments.length; i++) {

        //         for (let j = i; j < crewDepartments.length; j++) {
        //             if (crewDepartments[i] === crewDepartments[j]) {
        //                 crewDepartments.splice(j, 1)
        //             }
        //         }
        //     }

        //     const departmentsArr = [];
        //     for (let i = 0; i < crewDepartments.length; i++) {

        //         for (let j = i; j < crew.length; j++) {
        //             if (crewDepartments[i] === crew[j].known_for_department) {
        //                 departmentsArr.push({
        //                     [crewDepartments[i]]: crew[j]
        //                 })
        //             }
        //         }
        //     }

        //     function mergeObjectsByKey(arr) {
        //         const result = {};

        //         arr.forEach(obj => {
        //             // Iterate through each key-value pair of the object
        //             Object.keys(obj).forEach(key => {

        //                 // If the key is already in the result, add the value to the array
        //                 if (result[key]) {
        //                     result[key].push(obj);
        //                 } else {
        //                     // Otherwise, create a new array with the value
        //                     result[key] = [obj];
        //                 }
        //             });
        //         });

        //         return result;
        //     }

        //     let mergedData = mergeObjectsByKey(departmentsArr);

        //     console.log(mergedData)
        // }

        if (crew.length > 0) {
            const sortedDepartments = [];

            for (let i = 0; i < crew.length; i++) {
                let found = false;

                for (let j = 0; j < sortedDepartments.length; j++) {
                    if (crew[i].known_for_department === sortedDepartments[j][0].known_for_department) {
                        sortedDepartments[j].push(crew[i]);
                        found = true;
                    }
                }

                if (!found) {
                    sortedDepartments.push([crew[i]]);
                }
            }
            setSortedDepartments(sortedDepartments);
            console.log(sortedDepartments)
        }

    }, [crew])


    const castMembers = cast.map(member => {
        return <div className="movie-button-redirect">{member.name}</div>
    })

    let genresMovie = [];
    if (movieDetails.hasOwnProperty("genres")) {
        genresMovie = movieDetails.genres.map(genre => {
            return <div className="movie-button-redirect">{genre.name}</div>
        })
    }

    const renderUserReviews = userReviews.map(review => {
        return <div className="user-review">
            <div>
                <img className="user-review-img" src={review.img} alt="" srcset="" />
            </div>
            <div className="user-review-text">
                <p className="user-review-name">{review.name}</p>
                <p className="user-review-review">{review.review}</p>
            </div>
        </div>
    })

    const renderSimilarMovies = similarMovies.map(movie => {
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


    const renderSortedDepartments = sortedDepartments.map(department => {
        return <div className="movie-department">
            <div className="movie-department-title">{department[0].known_for_department} ---</div>
            {department.map(person => (
                <div className="movie-button-redirect"> {person.name} </div>
            ))}
        </div>
    })


    return <div>
        <div className="movie-post-review" style={showPostReview ? { zIndex: 5, display: "flex" } : { zIndex: -3, display: "none" }}>
            <PostReview />
            <div className="close-review" onClick={() => { setShowPostReview(false) }}> X</div>
        </div>
        <div className="movie-trailer" style={{ zIndex: isTrailerOpen ? 5 : -2, display: isTrailerOpen ? "flex" : "none" }}>
            <iframe onMouseEnter={() => movieProps.onHover(movieDetails.backdrop_path)} width="1200" height="580" src={`https://www.youtube.com/embed/${trailer.key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="true"></iframe>
            <div className="movie-trailer-close-btn" onClick={() => { setIsTrailerOpen(false); }}>X </div>
        </div>
        <div className="movie-background">

            <div className="movie-inner-background">
                <div className="movie-left-side" style={{ zIndex: 3 }}>
                    <MoviePoster
                        poster={movieDetails.poster_path}
                    />
                    <div className="movie-statistics" >
                        <p> <img className="movie-description-icons" src="images/person.png" alt="" srcset="" /> {movieDetails.vote_count}</p>
                        <p> <img className="movie-description-icons" src="images/heart.png" alt="" srcset="" /> {Math.floor(Math.random() * 1536)}</p>
                        <p> <img className="movie-description-icons" src="images/heart.png" alt="" srcset="" /> {props.popularity.toString().substr(0, 4)}</p>
                    </div>
                    <button className="movie-play-trailer" onClick={() => { setIsTrailerOpen(true) }}>Play trailer</button>
                </div>

                <div className="movie-middle-side" style={{ zIndex: 3 }}>
                    <div className="movie-middle-side-title-year">
                        <h1>{movieDetails.title}</h1>
                        <p>{/*{movieDetails.release_date.length > 1 ? movieDetails.release_date.slice(0, 4) : ""} */}directed by </p>
                    </div>
                    <div className="movie-middle-side-overview">
                        {movieDetails.overview}
                    </div>
                </div>

                <div className="movie-right-side" style={{ zIndex: 3 }}>
                    <div className="movie-interaction border">Rate
                        <div>
                            <RatingStar />
                        </div>
                    </div>
                    <div className="movie-interaction border" onClick={() => { setShowPostReview(true) }}>Review</div>
                    <div className="movie-interaction border">Add to Watch Later</div>
                    <div className="movie-interaction" >Rated by Users:
                        <div className="movie-review-circle" style={score >= 7.5 ? ratingMovieGood
                            : score >= 5 ? ratingMovieDecent
                                : ratingMovieBad}>
                            {score}
                        </div>
                    </div>
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

                {toggleMovieDetails.cast ? <div className="movie-cast"> {cast.length < 0 ? "No cast members" : castMembers} </div> :
                    toggleMovieDetails.crew ? <div className="movie-cast"> {crew.length < 0 ? "No crew members" : renderSortedDepartments} </div> :
                        toggleMovieDetails.genre ? <div className="movie-cast"> {genresMovie} </div> :
                            toggleMovieDetails.more ? <div className="movie-more-information"> <p>Original Title: {movieProps.original_title}</p> <p>Release date: {movieProps.release_date} </p> </div> : ""}

                <div className="movie-user-reviews">
                    <p>User Reviews</p>
                    {renderUserReviews}
                </div>

                <div className="movie-similar-movies">
                    <p>Similar Movies</p>
                    <div className="movie-rendered-similar-movies">
                        {renderSimilarMovies}
                    </div>
                </div>
            </div>

            <div>
                <h2>News about the movie</h2>
                <h3>Currently no news</h3>
            </div>

        </div>
    </div>
}

export default Movie;