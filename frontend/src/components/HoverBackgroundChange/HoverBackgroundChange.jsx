import React from "react";
import "./HoverBackgroundChange.css"
import Person from "../Person/Person";
import Trailer from "../Trailer/Trailer";

const HoverBackgroundChange = (props) => {

    const changeBackground = (img) => {
        const getBackground = document.querySelector(".hover-background-change");
        getBackground.style.background = `url(https://image.tmdb.org/t/p/original/${img})`;
        getBackground.style.backgroundSize = "99%";
        getBackground.style.backgroundPosition = "center";
    }

    console.log(props)

    const renderPeople = props.data.map(person => {
        return <Person
            key={person.profile_path}
            onHover={changeBackground}
            img={person.profile_path}
            name={person.name}
            movies={person.known_for}
        />
    })

    const renderTrailers = props.data.map(trailer => {
        return <Trailer
            trailer={trailer.key}
        />
    })
    return <div className="hover-background-change">
        {props.type === "people" ? renderPeople : renderTrailers}


    </div>
}

export default HoverBackgroundChange;