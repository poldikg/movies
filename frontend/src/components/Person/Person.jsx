import React from "react";
import "./Person.css";


const Person = (props) => {

    console.log(props)
    return <div className="person">
        <img onMouseEnter={() => props.onHover(props.movies[0].backdrop_path)} src={`https://image.tmdb.org/t/p/w500${props.img}`} alt="image of a trending person" srcset="" className="person-image" />
        <p className="person-name">{props.name}</p>
    </div>
}

export default Person;