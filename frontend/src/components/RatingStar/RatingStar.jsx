import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./RatingStar.css"

const RatingStar = () => {

    const stars = 5;
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleClick = (index) => {
        setRating(index);
    }

    const handleMouseEnter = (index) => {
        setHover(index)
    }

    const handleMouseLeave = () => {
        setHover(rating)
    }


    return <div>
        {[...Array(stars)].map((star, index) => {
            index += 1
            return <FaStar
                key={index}
                className={index <= (hover || rating) ? "active" : "inactive"}
                size={"25px"}
                onClick={() => { handleClick(index) }}
                onMouseEnter={() => { handleMouseEnter(index) }}
                onMouseLeave={() => { handleMouseLeave() }}
            />
        })}
    </div>
}

export default RatingStar;