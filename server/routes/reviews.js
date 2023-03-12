const router = require("express").Router();
const { default: axios } = require("axios");
const { json } = require("express");
const Reviews  = require("../models/Reviews.js");
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/reviewalbum",async(req,res)=>{
    const review = new Reviews(req.body);
    try{
        const savedReview = await review.save();
        return res.status(200).json(savedReview);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

router.get("/getreviews/:album",async (req,res)=>{
    try{
        const searchQ = req.params.album;
        const album = await Reviews.find({album : searchQ})
        return res.status(200).json(album)
    }catch(err){
        console.log(err);
        res.status(200).json()
    }
})




router.get("/getallreviews",async(req,res)=>{
    try{
        const reviews = await Reviews.find();
        return res.status(200).json(reviews);
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

router.get("/getreviews",async(req,res)=>{
    try{
        const predicate = req.body
        const reviews = await Reviews.find(predicate)
        return res.status(200).json(reviews);
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})  

router.delete("/deletereview",async(req,res)=>{
    try{
        const review = await Reviews.find();
        console.log(review)
        await Reviews.findOneAndDelete({username: req.body.username, album: req.body.album});
        return res.status(200).json("Successfully deleted");
    }catch(err){
        console.log(err);
        return res.status(500).json(err)
    }
})

router.put("/likereview/:id", async(req,res)=>{
    try{
        const review = await Reviews.findById( req.params.id);
        console.log(review);
        if(!review.likes.includes(req.body.userid)){
            await review.updateOne({ $push: { likes: req.body.userid}})
            return res.status(200).json("Successfully updated like of review");
        }else{
            await review.updateOne({ $pull : { likes: req.body.userid}})
            return res.status(200).json("Successfully disliked post");
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

// router.put("/likereview/:username/:album/:liker", jsonParser, async(req,res)=>{
//     try{
//         const review = await Reviews.find({username : req.params.username, album : req.params.album});
//         if(!review[0].likes.includes(req.params.liker)){
//             const ret = await review[0].updateOne({ $push: { likes: req.params.liker}})
//             console.log(ret);
//             return res.status(200).json("Successfully updated like of review");
//         }else{
//             await review[0].updateOne({ $pull : { likes: req.params.liker}})
//             return res.status(200).json("Successfully disliked post");
//         }
//     }catch(err){
//         console.log(err);
//         res.status(500).json(err)
//     }
// })
router.put("/likereview/:reviewid/:liker", jsonParser, async(req,res)=>{
    try{
        const review = await Reviews.find({_id  : req.params.reviewid});
        if(!review[0].likes.includes(req.params.liker)){
            const ret = await review[0].updateOne({ $push: { likes: req.params.liker}})
            console.log(ret);
            return res.status(200).json("Successfully updated like of review");
        }else{
            await review[0].updateOne({ $pull : { likes: req.params.liker}})
            return res.status(201).json("Successfully disliked post");
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

router.put("/commentreview/:id", async(req,res)=>{
    try{
        const review = await Reviews.findById( req.params.id);
        console.log(review);
        await review.updateOne({ $push: { comments: {userid: req.body.userid, comment: req.body.text}}})
        return res.status(200).json("Successfully updated like of review");

    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

router.get("/getreview/:id",async(req,res)=>{
    try{
        const review = await Reviews.findById(req.params.id);
        return res.status(200).json(review);
    }catch(err){
        return res.status(500).json(err)
    }
})

router.get("/sortrecent/:username",async(req,res)=>{
    try{
        const allReviews = await Reviews.find()
        const reviews = await Reviews.find({username : req.params.username})
        const sorted = await Reviews.aggregate(
            [
                { $sort : {createdAt: -1}}
            ]
            )
        return res.status(200).json(sorted)
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
})
router.get("/sorttop",async(req,res)=>{
    try{
        const allReviews = await Reviews.find()
        // const reviews = await Reviews.find({username : req.params.username})
        const sorted = await Reviews.aggregate(
            [
                { $sort : {rating: -1}}
            ]
            )
        return res.status(200).json(sorted)
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get("/sortlikes",async(req,res)=>{
    try{
        const likesL = likes.length
        const sorted = await Reviews.aggregate(
            [
                { $sort : {rating : 1}}
            ]
            )
        return res.status(200).json(sorted)
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get("/allreviewedalbums",async(req,res)=>{
    try{
        var arr = [];
        const reviews =await Reviews.aggregate(
            [
            { $sort : {createdAt: -1}}
            ]
        ).limit(4)
        console.log(arr)
        return res.status(200).send(reviews);
    }catch(err){
        console.log(err)
        return(res.status(500).json(err))
    }
})

router.get("/getbyuser/:username",async(req,res)=>{
    try{
        const reviews = await Reviews.find({username : req.params.username})
        return res.status(200).json(reviews)
    }catch(err){
        return res.status(500).json(err);
    }
})

router.get("/:userid", async(req,res)=>{
    try{
        const reviews = await Reviews.find({userid: req.params.userid})
        return res.status(200).json(reviews);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
})

router.put("/:reviewid",async(req,res)=>{
    try{
        const comment  = await Reviews.findById(req.params.reviewid);
        console.log(comment);
        await comment.updateOne({ $push: { comments: req.body}})
        return res.status(200).json(comment)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})


module.exports = router;