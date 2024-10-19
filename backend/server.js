require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const movieRouter = require("./routes/routes")
const userRouter = require("./routes/user")


const app = express();

//Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})

app.use("/api/movie", movieRouter);
app.use("/api/user", userRouter)


//Connection to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Listening to port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })