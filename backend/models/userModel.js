const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true })


//static signup method
//Instead of using User to acess and update the database, because I am creathing the function the schema file, I need to use "this" keyword instead.
//"this" keyword can only be used inside a normal declaration of a function not an arrow function
userSchema.statics.signup = async function (email, password) {

    const emailExists = await this.findOne({ email });

    if (emailExists) {
        throw Error("Email already in use.")
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });

    return user;
}


module.exports = mongoose.model("User", userSchema)