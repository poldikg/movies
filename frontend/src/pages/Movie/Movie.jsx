import React from "react";
import { useLocation } from "react-router-dom";

const Movie = () => {

    const currentLocation = useLocation()
    const props = currentLocation.state;

    return <div>
        <h1>Movie Page</h1>
        {props.title}
    </div>
}

export default Movie;