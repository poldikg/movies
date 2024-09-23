import React from "react";
import "./HoverBackgroundChange.css"
import Person from "../Person/Person";

const HoverBackgroundChange = (props) => {

    const changeBackground = (img) => {
        const getBackground = document.querySelector(".hover-background-change");
        getBackground.style.background = `url(https://image.tmdb.org/t/p/original/${img})`;
        getBackground.style.backgroundSize = "cover";
        getBackground.style.backgroundPosition = "top"
    }

    console.log(props)

    const renderPeople = props.data.map(person => {
        return <Person
            onHover={changeBackground}
            img={person.profile_path}
            name={person.name}
            movies={person.known_for}
        />
    })
    return <div className="hover-background-change">
        {renderPeople}


    </div>
}

export default HoverBackgroundChange;