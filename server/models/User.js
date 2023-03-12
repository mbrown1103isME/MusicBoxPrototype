// const User = require('../server')
const mongoose = require("mongoose");
const router = require("express").Router();

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        min: 5,
    },
    profilePicture:{
        type: String,
        default: ""
    },
    followers:{
        type: Array,
        default: []
    },
    following:{
        type: Array,
        default: []
    },
    likes:{
        type: Array,
        default: []
    }
},
{timestamps: true}
)

module.exports = router;

module.exports = mongoose.model("User", UserSchema);