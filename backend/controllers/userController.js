const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
}

//login 
const loginUser = async (req, res) => {
    res.json({ msg: "You have logged in" })
}

//signUp
const singupUser = async (req, res) => {
    const { email, password } = req.body;


    try {
        const user = await User.signup(email, password);

        //Create token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = { loginUser, singupUser };