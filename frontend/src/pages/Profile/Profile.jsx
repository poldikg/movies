import React, { useEffect, useState } from "react";
import "./Profile.css";
import MoviePoster from "../../components/MoviePoster/MoviePoster";
import RatingStar from "../../components/RatingStar/RatingStar";
import { useAuthContext } from "../../hooks/useAuthContext";


const Profile = () => {

    const [userName, setUsername] = useState("Ivan");
    const [favMovies, setFavMovies] = useState([]);
    const [recentlyWatched, setRecentlyWatched] = useState([]);
    const [fetchedReviews, setFetchedReview] = useState([]);
    const [error, setError] = useState("");
    const favMoviesArr = [14160, 132344, 76, 80];
    const recentlyWatchedArrIds = [1858, 14836, 810693, 82];
    const reviews = [...recentlyWatched].splice(0, 2);
    const { user } = useAuthContext();

    console.log(fetchedReviews);

    const fetchMovies = async (movieId, type) => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_APP_FETCHMOVIES_TOKEN}`
            }
        };

        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json)

        if (response.ok) {
            if (type === "favMovies") {
                setFavMovies(prevArr => {
                    const checkExists = prevArr.some(movie => movie.id === json.id);

                    if (!checkExists) {
                        return [...prevArr, json]
                    } else {
                        return prevArr
                    }


                })
            }
            else if (type === "recentlyWatched") {
                setRecentlyWatched(prevArr => {
                    const checkExists = prevArr.some(movie => movie.id === json.id);

                    if (!checkExists) {
                        return [...prevArr, json]
                    }
                    else {
                        return prevArr
                    }
                })
            }
        }

    };

    useEffect(() => {
        favMoviesArr.map(id => {
            fetchMovies(id, "favMovies")
        });

        recentlyWatchedArrIds.map(id => {
            fetchMovies(id, "recentlyWatched")
        });

    }, [])

    useEffect(() => {

        const fetchReviews = async () => {

            const response = await fetch("http://localhost:1290/api/movie/", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })

            const json = await response.json()
            console.log(json)
            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                setFetchedReview(json)
            }
        }

        fetchReviews()

    }, [])

    const renderFavMovies = favMovies.map(movie => {
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

    const renderRecentlyWatched = recentlyWatched.map(movie => {
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
    }
    )

    const renderReviews = reviews.map(review => {
        return <div className="movie-review">
            <MoviePoster
                type={"review"}
                key={review.id}
                id={review.id}
                title={review.title}
                synopsis={review.overview}
                popularity={review.popularity}
                poster={review.poster_path}
                release_date={review.release_date}
                original_title={review.original_title}
                score={review.vote_average}
            />
            <div className="review-bottom">
                <div>
                    <div className="review-title">{review.title} <span className="review-year">{review.release_date.substr(0, 4)}</span> </div>
                    <div className="review-review">Loved it!</div>
                </div>
                <div className="review-rating">
                    <RatingStar
                        rating={4} />
                </div>
            </div>

        </div>
    })



    return <div className="profile-page">
        <div className="profile-top">
            <div className="profile-top-left">
                <img className="profile-picture" src="https://a.ltrbxd.com/resized/avatar/upload/7/5/1/1/7/2/9/shard/avtr-0-220-0-220-crop.jpg?v=1babcd5381" alt="" />
                <p className="profile-name">{userName}</p>
            </div>
            <div className="profile-top-right">
                <div>
                    <p>92</p>
                    <p>Watched </p>
                </div>
                <div>
                    <p>25</p>
                    <p>This Year </p>
                </div>
                <div>
                    <p>3</p>
                    <p>Reviews </p>
                </div>
            </div>
        </div>

        <div className="profile-bottom">
            <div className="profile-favorite-movies">
                <p className="favorite-movies-title">Favorite movies</p>
                <div className="favorite-movies">{renderFavMovies}</div>
            </div>
            <div className="profile-favorite-movies">
                <p className="favorite-movies-title">Recently Watched</p>
                <div className="favorite-movies">{renderRecentlyWatched}</div>
            </div>
            <div className="profile-favorite-movies ">
                <p className="favorite-movies-title">Reviews</p>
                <div className="favorite-movies profile-reviews">{renderReviews}</div>
            </div>
        </div>

        {fetchedReviews.map(review => {
            return <div>
                <div>{review.movieName}</div>
                <div>{review.rating}</div>
                <div>{review.review}</div>
            </div>
        })}
    </div>
}

export default Profile;