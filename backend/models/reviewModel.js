const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieModel = new Schema({
    movieName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    movieId: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("movieReview", movieModel)