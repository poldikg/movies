const express = require("express");
const router = express.Router();
const { loginUser, singupUser } = require("../controllers/userController")

//login route
router.post("/login", loginUser)

//signup router
router.post("/signup", singupUser)

module.exports = router;