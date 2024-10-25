const express = require("express");
const router = express.Router();
const { PostMovieReview, DeleteMovieReview, UpdateMovieReview } = require("../controllers/controller")
const requireAuth = require("../middleware/requireAuth");

//Call the middleware before the routes
router.use(requireAuth)

//POST 
router.post("/", PostMovieReview)

//DELETE a review
router.delete("/:id", DeleteMovieReview)

//Update A review
router.patch("/:id", UpdateMovieReview)


module.exports = router;