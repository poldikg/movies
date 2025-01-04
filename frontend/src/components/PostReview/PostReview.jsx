import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./PostReview.css"

const PostReview = (props) => {
    const [movieName, setMovieName] = useState(props.movieTitle);
    const [rating, setMovieRating] = useState();
    const [review, setMovieReview] = useState();
    const [movieId, setMovieId] = useState(props.movieId);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();
    console.log(movieName, rating, review, movieId);


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError("You must be logged in to send a review.")
            return
        }

        const response = await fetch("http://localhost:1290/api/movie/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({ movieName, rating, review, movieId })
        }
        )
        const json = await response.json();

        if (!response.ok) {
            setError(json.error)
        } else if (response.ok) {
            setMovieName("");
            setMovieRating("");
            setMovieReview("");
        }

    }

    return (
        <div>
            <form className="post-review" onSubmit={handleSubmit}>
                <div className="post-review-container">
                    <label htmlFor="movie_name"> Name</label>
                    <input type="text" id="movie_name" value={props.movieTitle} onChange={(e) => { setMovieName(e.target.value) }} disabled={true} />
                </div>
                <div className="post-review-container">
                    <label htmlFor="rating"> Rating</label>
                    <input type="number" name="" id="rating" value={rating} onChange={(e) => { setMovieRating(e.target.value) }} max={5} min={1} />
                </div>
                <div className="post-review-container">
                    <label htmlFor="review"> Review</label>
                    <textarea name="" id="review" value={review} onChange={(e) => { setMovieReview(e.target.value) }} rows={5}></textarea>
                </div>
                <button className="post-review-submitButton">Submit</button>
                {error && <div>{error}</div>}
            </form>
        </div>
    )
}

export default PostReview