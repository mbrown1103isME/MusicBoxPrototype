const User = require("../models/User.js");
const router = require("express").Router();


    router.put("/:id", async (req,res)=>{
        if(req.body.userId === req.params.id){ 
                try{
                    const user = await User.findByIdAndUpdate(req.params.id, {
                        $set: req.body
                    })
                    res.status(200).json("Account has been updated");
                }catch(err){
                    return res.status(403).json(err);
                }
            }else{
                return res.status(406).json("Cannot update a different user's info!");
            }
    })

    router.delete("/:id", async (req,res)=>{
        if(req.body.userId === req.params.id){ 
                try{
                    const user = await User.findByIdAndDelete(req.params.id, {
                        $set: req.body
                    })
                    return res.status(200).json("Account has been deleted");
                }catch(err){
                    return res.status(403).json(err);
                }
            }else{
                return res.status(406).json("You can only delete your own account!");
            }
    })

    router.get("/:username",async(req,res)=>{
        try{
            const user = await User.find({username: req.params.username})
            return res.status(200).json(user)
        }catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    })

    router.get("/getusers",async (req,res)=>{
        try{
            const u = await User.find();
            console.log(users);
            return res.status(200).json(u);
        }catch(err){
            console.log(err)
            return res.status(500).json(err)
        }
    })

    router.get("/getusersrecent/:pred",async (req,res)=>{
        try{
            console.log("KHKHK")
            const p = req.params.pred
            const users = await User.aggregate(
                [
                    { $sort : {createdAt : -1}}
                ]
            ).limit(4)
            console.log(users);
            console.log("Hoooo")
            return res.status(200).send(users);
        }catch(err){
            console.log(err)
            return res.status(500).json(err)
        }
    })

    router.get("/:id", async (req,res)=>{
        try{
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        }catch(err){
            return res.status(403).json(err);
        }
    })

    router.put("/:username/follow/:follower", async (req,res)=>{
            if(req.params.follower !== req.params.username){ 
                try{
                    const user = await User.find({username: req.params.username});
                    const currentUser = await User.find({username: req.params.follower});
                    console.log(user[0].username);
                    console.log(currentUser[0]);
                    
                    if(!user[0].followers.includes(req.params.follower)){
                        console.log("=====Follower")
                        console.log(req.params.follower)
                        console.log("=====Following")

                        console.log(req.params.username)
                        await user[0].updateOne({$push: { followers: req.params.follower}})
                        await currentUser[0].updateOne({$push: { following: req.params.username}})
                        res.status(200).json("User has been followed");
                    }else{
                        await user[0].updateOne({$pull: { followers: req.params.follower}})
                        await currentUser[0].updateOne({$pull: { following: req.params.username}})
                        return res.status(200).json("Unfollowed User");
                    }
                }catch(err){
                    console.log(err);
                    return res.status(500).json(err);
                    }
            }else{
                return res.status(403).json("You can't follow yourself!");
            }
        })

        router.put("/:username/unfollow", async (req,res)=>{
            if(req.body.userId !== req.params.id){ 
                try{
                    const user = await User.findById(req.params.id);
                    const currentUser = await User.findById(req.body.userId);
                    if(user.followers.includes(req.body.userId)){
                        await user.updateOne({$pull: { followers: req.body.userId}})
                        await currentUser.updateOne({$pull: { following: req.params.id}})
                        res.status(200).json("User has been unfollowed");
                    }else{
                        return res.status(403).json("You are not following them");
                    }
                }catch(err){
                    return res.status(500).json(err);
                    }
            }else{
                return res.status(403).json("You can't unfollow yourself!");
            }
        })

    module.exports = router;