const express = require('express')
const customMiddleWare = require('../middleware/requireLogin')
const Post = require('../models/post')
const User = require("../models/user")
const router = express.Router();

router.get("/user/:name", customMiddleWare, async(req, res) => {
    console.log("user name", req.params);
    
    await User.findOne({"name": req.params.name})
    .select("-password -__v")
    .then(async user => {
        if(user){
            const posts = await Post.find({postedBy:req.user._id})
            .populate("postedBy", "_id name")
            res.status(200).json({message:"User Found", success: true,user, posts})
        }else{
            res.status(404).json({message:"User Not Found ", success: false})
        }
    }).catch(err => {
        res.status(500).json({message:"Something Went Wrong", success: false})
    })
})

module.exports = router