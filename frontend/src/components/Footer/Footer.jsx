import React from "react";
import "./Footer.css"
import { useEffect } from "react";

const Footer = (props) => {

    useEffect(() => {

    }, [])

    return <div className="footer">
        <p>Created with the <a href="https://developer.themoviedb.org/reference/intro/getting-started" target="_blank" > API of TMDB </a></p>
    </div>
}

export default Footer;