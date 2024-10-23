import React, { useEffect } from "react";
import "./PictureHolder.css"
import { Link } from "react-router-dom";

const PictureHolder = (props) => {



    return <div className="picture-holder">
        <div className="picture-holder-signup">
            <p>Track the movies you watch. <br /> Share them with your friends.</p>
            <Link to="/Signup"><button className="signup-button">Sign up</button></Link>
        </div>
    </div>
}

export default PictureHolder;