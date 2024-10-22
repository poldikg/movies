const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

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

    if (!email || !password) {
        throw Error("All fields must be filled.")
    }
    if (!validator.isEmail(email)) {
        throw Error("This email isn't valid.")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("The password isn't strong enough.")
    }

    const emailExists = await this.findOne({ email });

    if (emailExists) {
        throw Error("Email already in use.")
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });

    return user;
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled.")
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error("Incorrect email.")
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("Incorrect password.")
    }

    return user;
}


module.exports = mongoose.model("User", userSchema)