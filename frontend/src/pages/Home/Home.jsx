import React from "react";
import "./Home.css"
import PictureHolder from "../../components/PictureHolder/PictureHolder";
import HomePageMovies from "../../components/HomePageMovies/HomePageMovies";

const Home = () => {
    return <div className="home">
        <PictureHolder />
        <HomePageMovies />
    </div>
}

export default Home;