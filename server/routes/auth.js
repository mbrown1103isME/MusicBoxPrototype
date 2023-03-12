const router = require("express").Router();
const User  = require("../models/User.js");

router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    try{
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        console.log("Error: " + err);
    }
})

router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user && res.status(404)){
            return res.status(404).json("User not found")
        }
        const validatePassword = await req.body.password=== user.password;
        if(!validatePassword && res.status(404)){
            return res.status(404).json("Password not correct");
        }

        return res.status(200).json(user);
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
})



module.exports = router;