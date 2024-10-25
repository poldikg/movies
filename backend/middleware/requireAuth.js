const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

const requireAuth = async (req, res, next) => {

    //verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required." })
    }

    const token = authorization.split(" ")[1];

    try {

        //Returns a payload/object and I grab the Id form it
        const { _id } = jwt.verify(token, process.env.SECRET);

        //Creating a new key in the req object looking into the db for the id and if there is a document with that id in the user key give it the id value
        req.user = await User.findOne({ _id }).select("_id");
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Request is not authorized" })
    }


}

module.exports = requireAuth;