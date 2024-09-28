import React, { useEffect } from "react";
import "./HoverBackgroundChange.css"
import Person from "../Person/Person";
import Trailer from "../Trailer/Trailer";

const HoverBackgroundChange = (props) => {

    const changeBackground = (img) => {
        const getBackground = document.querySelector(".hover-background-change");
        getBackground.style.background = `url(https://image.tmdb.org/t/p/original/${img})`;
        getBackground.style.backgroundSize = "99%";
        getBackground.style.backgroundPosition = "center top -100px";
    }

    console.log(props)

    useEffect(() => {
        if (props.data.length > 1) {
            const getBackground = document.querySelector(".hover-background-change");
            getBackground.style.background = `url(https://image.tmdb.org/t/p/original/${props.data[0].known_for[0].backdrop_path})`;
            getBackground.style.backgroundSize = "99%";
            getBackground.style.backgroundPosition = "center top -100px";
        }
    }, [props])

    const renderPeople = props.data.map(person => {
        return <Person
            key={person.profile_path}
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