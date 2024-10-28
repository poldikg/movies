import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const PostReview = () => {
    const [movieName, setMovieName] = useState();
    const [rating, setMovieRating] = useState();
    const [review, setMovieReview] = useState();
    const [movieId, setMovieId] = useState(1841);
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
            <form onSubmit={handleSubmit}>
                <label htmlFor="movie_name">Movie Name</label>
                <input type="text" id="movie_name" value={movieName} onChange={(e) => { setMovieName(e.target.value) }} />
                <label htmlFor="rating">Movie Rating</label>
                <input type="number" name="" id="rating" value={rating} onChange={(e) => { setMovieRating(e.target.value) }} />
                <label htmlFor="review">Movie Review</label>
                <textarea name="" id="review" value={review} onChange={(e) => { setMovieReview(e.target.value) }}></textarea>
                <button>Submit Review</button>
                {error && <div>{error}</div>}
            </form>
        </div>
    )
}

export default PostReview