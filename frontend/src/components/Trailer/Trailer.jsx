import React from "react";
import "./Trailer.css"

const Trailer = (props) => {

    return (
        <div>
            <iframe width="400" height="230" src={`https://www.youtube.com/embed/${props.trailer}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
    )
}

export default Trailer;