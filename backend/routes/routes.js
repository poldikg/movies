const express = require("express");
const router = express.Router();
const { PostMovieReview, DeleteMovieReview, UpdateMovieReview, GetMovieReviews } = require("../controllers/controller")
const requireAuth = require("../middleware/requireAuth");

//Call the middleware before the routes 
router.use(requireAuth)

//POST 
router.post("/", PostMovieReview)

//DELETE a review
router.delete("/:id", DeleteMovieReview)

//Update A review
router.patch("/:id", UpdateMovieReview)

//Get all reviews
router.get("/", GetMovieReviews)


module.exports = router;