import React, { useEffect, useState } from "react";
import "./Profile.css";
import MoviePoster from "../../components/MoviePoster/MoviePoster";


const Profile = () => {

    const [userName, setUsername] = useState("Ivan");
    const [favMovies, setFavMovies] = useState([]);
    const favMoviesArr = [14160, 132344, 76, 80];
    const [reRender, setReRender] = useState(1);

    console.log(reRender, favMovies);

    const fetchMovies = async (movieId) => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzM3Mjg3ZDc2OTc3OWQwNGFiMDEzOGZmMGIwYjg4MCIsIm5iZiI6MTcyOTEwMTEzNi41MjM2NDMsInN1YiI6IjY0MTQ1NzE2YTZjMTA0MDA5YTAwM2QwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0kvRSO_ENVbuJgOzB91kpO0xsV62zwBky06sQgN1Pow'
            }
        };

        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json)

        if (response.ok) {
            setFavMovies(prevArr => {
                const checkExists = prevArr.some(movie => movie.id === json.id);

                if (!checkExists) {
                    return [...prevArr, json]
                } else {
                    return prevArr
                }


            })
        }

    };

    useEffect(() => {
        favMoviesArr.map(id => {

            fetchMovies(id)
        });

    }, [])



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
                <div>ahha</div>
            </div>
        </div>
    </div>
}

export default Profile;