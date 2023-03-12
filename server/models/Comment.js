// // const User = require('../server')
// const mongoose = require("mongoose");
// const router = require("express").Router();

// const CommentSchema = mongoose.Schema(
//     {
//     username:{
//         type: String,
//         require: true
//     },
//     commentText:{
//         type: String,
//         require: true
//     },
//     likes:{
//         type: Array,
//         default: []
//     },
//     subComments:{
//         type: Object,
//         default: {}
//     },
// },
// {timestamps: true}
// )

// module.exports = router;

// module.exports = mongoose.model("Comments", ReviewSchema);