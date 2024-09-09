const express = require("express");
const router = express.Router();
const {postMovieReview} = require("../controllers/controller")

//POST 
router.post("/", postMovieReview)

//DELETE a review
router.delete("/:id", (req, res) => {
    res.json({msg: "Movie Review Deleted"})
})

router.patch("/:id", (req, res) => {
    res.json({msg: "Movie Review Updated"})
})


module.exports = router;