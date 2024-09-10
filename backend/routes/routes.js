const express = require("express");
const router = express.Router();
const {PostMovieReview, DeleteMovieReview, UpdateMovieReview} = require("../controllers/controller")

//POST 
router.post("/", PostMovieReview)

//DELETE a review
router.delete("/:id", DeleteMovieReview)

//Update A review
router.patch("/:id", UpdateMovieReview)


module.exports = router;