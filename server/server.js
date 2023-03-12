const express= require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const userRoutes = require("./routes/user.js");
const authRoute = require("./routes/auth.js");
const reviewRoute = require("./routes/reviews.js")
const cors = require("cors");
const bp = require('body-parser')


dotenv.config();
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, (err)=>{
    if(err){
        console.log("This is the error: " + err);
    }else{
        console.log("Connected to Mongo");
    } 
})

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoute);
app.use("/api/reviews",reviewRoute);

app.listen(4000, ()=>{
    console.log("Running on port 4000")
})