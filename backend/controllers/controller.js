const movieModel = require("../models/reviewModel")
const mongoose = require("mongoose")


//POST REVIEW
const PostMovieReview = async (req, res) => {
    const { movieName, rating, review, movieId } = req.body;
    try {
        const movieReview = await movieModel.create({ movieName, rating, review, movieId });
        res.status(200).json(movieReview);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

//DELETE Review
const DeleteMovieReview = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ error: "Such Review Doesn't exist." })
    }

    const movieReview = await movieModel.findOneAndDelete({ _id: id })

    if (!movieReview) {
        return res.status(400).json({ error: "Review Doesn't exist." })
    } else {
        return res.status(200).json(movieReview)
    }

}

const UpdateMovieReview = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Such review doesn't exist" })
    }

    const updateReview = await movieModel.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!updateReview) {
        return res.status(400).json({ error: "Review doesn't exist." })
    } else {
        return res.status(200).json(updateReview)
    }
}

module.exports = { PostMovieReview, DeleteMovieReview, UpdateMovieReview }