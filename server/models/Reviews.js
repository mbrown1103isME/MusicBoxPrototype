// const User = require('../server')
const mongoose = require("mongoose");
const router = require("express").Router();

const ReviewSchema = mongoose.Schema(
    {
    username:{
        type: String,
        require: true
    },
    reviewText:{
        type: String,
        require: false
    },
    rating:{
        type: Number,
        require: true
    },
    likes:{
        type: Array,
        default: []
    },
    comments:{
        type: Array,
        default: []
    },
    albumObj:{
        type: Object,
        require: true
    },
    album:{
        type: String,
        require: true
    }
},
{timestamps: true}
)

module.exports = router;

module.exports = mongoose.model("Reviews", ReviewSchema);