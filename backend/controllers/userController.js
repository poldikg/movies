const User = require("../models/userModel");

//login 
const loginUser = async (req, res) => {
    res.json({ msg: "You have logged in" })
}

//signUp
const singupUser = async (req, res) => {
    const { email, password } = req.body;


    try {
        const user = await User.signup(email, password);
        res.status(200).json({ email, user })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = { loginUser, singupUser };