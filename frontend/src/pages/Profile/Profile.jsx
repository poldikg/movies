import React, { useState } from "react";
import "./Profile.css"

const Profile = () => {

    const [userName, setUsername] = useState("Ivan")

    return <div className="profile-page">
        <div className="profile-top">
            <div className="profile-top-left">
                <img className="profile-picture" src="https://a.ltrbxd.com/resized/avatar/upload/7/5/1/1/7/2/9/shard/avtr-0-220-0-220-crop.jpg?v=1babcd5381" alt="" />
                <p className="profile-name">{userName}</p>
            </div>
            <div className="profile-top-right">
                <div>
                    <p>92</p>
                    <p>Watched </p>
                </div>
                <div>
                    <p>25</p>
                    <p>This Year </p>
                </div>
                <div>
                    <p>3</p>
                    <p>Reviews </p>
                </div>
            </div>
        </div>

        <div className="profile-bottom">
            <div className="profile-favorite-movies">
                <p className="favorite-movies-title">Favorite movies</p>
                <div>ahha</div>
            </div>
        </div>
    </div>
}

export default Profile;