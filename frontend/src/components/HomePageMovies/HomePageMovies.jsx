import { React, useEffect, useState } from "react";
import "./HomePageMovies.css"
import MoviePoster from "../MoviePoster/MoviePoster";
import PostersSlider from "../PostersSlider/PostersSlider";
import HoverBackgroundChange from "../HoverBackgroundChange/HoverBackgroundChange";



const HomePageMovies = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [moviesOfTheDay, setMoviesOfTheDay] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [trendingPeople, setTrendingPeople] = useState([]);
    const [idUpcomingMovies, setIdUpcomingMovies] = useState([]);
    const [trailerUpcomingMovies, setTrailerUpcomingMovies] = useState([]);
    console.log(trailerUpcomingMovies)


    const fetchMovieVideos = async (id) => {
        const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzM3Mjg3ZDc2OTc3OWQwNGFiMDEzOGZmMGIwYjg4MCIsIm5iZiI6MTcyNzQyOTM4Ni44NzgzODQsInN1YiI6IjY0MTQ1NzE2YTZjMTA0MDA5YTAwM2QwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MfhjKgYoYqw_abikNQedx4fJ26Z6PdT36WqSgZ5XyrM'
            }
        };

        const response = await fetch(url, options);
        const json = await response.json();

        const filterTrailer = json.results.filter(video => video.type === "Trailer");
        filterTrailer[0].idMovie = id;

        setTrailerUpcomingMovies(prevArr => [...prevArr, filterTrailer[0]]);

    }

    useEffect(() => {
        const fetchPopularMovies = async () => {
            const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzM3Mjg3ZDc2OTc3OWQwNGFiMDEzOGZmMGIwYjg4MCIsIm5iZiI6MTcyNjkwODM5Mi45MzgxOTcsInN1YiI6IjY0MTQ1NzE2YTZjMTA0MDA5YTAwM2QwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NROK0QdiJN-sSU97vF47-TYSF72IrsfK2GcaUFVZBhI'
                }
            };

            const response = await fetch(url, options);
            const json = await response.json();

            const randomNumber1 = Math.floor(json.results.length * Math.random());
            const randomNumber2 = Math.floor(json.results.length * Math.random());
            const randomNumber3 = Math.floor(json.results.length * Math.random());



            //Fix it so its looping until they are all different

            const getMoviesOfTheDay = JSON.parse(localStorage.getItem("moviesOfTheDay"));
            if (!getMoviesOfTheDay) {
                localStorage.setItem("moviesOfTheDay", JSON.stringify([json.results[randomNumber1], json.results[randomNumber2], json.results[randomNumber3]]))
            }

            if (response.ok) {
                setPopularMovies(json.results)
            }

        }
        const fetchUpcomingMovies = async () => {

            const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzM3Mjg3ZDc2OTc3OWQwNGFiMDEzOGZmMGIwYjg4MCIsIm5iZiI6MTcyNzA4NDk5NS45NDQ3MjMsInN1YiI6IjY0MTQ1NzE2YTZjMTA0MDA5YTAwM2QwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8THBfEHhxN7-CxGZmqvuCAKSUGLZEBKaBfrZi7f9Qm8'
                }
            };

            const response = await fetch(url, options);
            const json = await response.json();
            const idUpcomingMovies = json.results.map(movie => movie.id)
            if (response.ok) {
                setUpcomingMovies(json.results)
                setIdUpcomingMovies(idUpcomingMovies);
            }
        }

        const fetchTrendingPeople = async () => {
            const url = 'https://api.themoviedb.org/3/person/popular?language=en-US&page=1';
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzM3Mjg3ZDc2OTc3OWQwNGFiMDEzOGZmMGIwYjg4MCIsIm5iZiI6MTcyNzA4NDk5NS45NDQ3MjMsInN1YiI6IjY0MTQ1NzE2YTZjMTA0MDA5YTAwM2QwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8THBfEHhxN7-CxGZmqvuCAKSUGLZEBKaBfrZi7f9Qm8'
                }
            };

            const response = await fetch(url, options);
            const json = await response.json();

            if (response.ok) {
                setTrendingPeople(json.results)
            }
        }

        fetchUpcomingMovies();
        fetchPopularMovies();
        fetchTrendingPeople();

    }, [])

    useEffect(() => {
        const getMoviesOfTheDay = JSON.parse(localStorage.getItem("moviesOfTheDay"));
        if (getMoviesOfTheDay) {
            setMoviesOfTheDay(getMoviesOfTheDay)
        }

    }, [popularMovies])

    useEffect(() => {
        if (trailerUpcomingMovies.length < 1) {
            idUpcomingMovies.map(id => fetchMovieVideos(id))
        }
    }, [popularMovies])

    const moviesDayRender = moviesOfTheDay.map(movie => {
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

    return <div className="home-page-movies">
        <div className="movies-of-the-day distance">
            <h1 className="homepage-h1">MOVIES OF THE DAY</h1>
            <div className="movies-of-the-day-posters">
                {moviesDayRender}
            </div>
        </div>
        <div className="upcoming-movies distance">
            <h1 className="homepage-h1"> UPCOMING MOVIES</h1>
            <PostersSlider
                type={"upcomingMovies"}
                movies={upcomingMovies}
            />
        </div>
        <div className="trending-people distance">
            <h1 className="homepage-h1"> TRENDING PEOPLE </h1>
            <HoverBackgroundChange
                type={"people"}
                data={trendingPeople}
            />
        </div>
        <div className="trending-people distance">
            <h1 className="homepage-h1"> TRAILERS </h1>
            <HoverBackgroundChange
                type={"trailer"}
                data={trailerUpcomingMovies}
            />
        </div>


    </div>
}

export default HomePageMovies;