const movieModel = require("../models/reviewModel")


//POST REVIEW
const postMovieReview = async (req, res) => {
    const {movieName, rating, review} = req.body;
    try{
    const movieReview = await movieModel.create({movieName, rating, review});
    res.status(200).json(movieReview);
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

module.exports = {postMovieReview}