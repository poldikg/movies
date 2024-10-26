import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const PostReview = () => {
    const [movieName, setMovieName] = useState();
    const [rating, setMovieRating] = useState();
    const [review, setMovieReview] = useState();
    const [movieId, setMovieId] = useState();
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    const handleSubmit = async () => {

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

        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="" id="" />
                <input type="number" name="" id="" />
                <textarea name="" id=""></textarea>
                <button>Submit Review</button>
                {error && <div>{error}</div>}
            </form>
        </div>
    )
}

export default PostReview