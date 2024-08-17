const express = require('express')
const customMiddleWare = require('../middleware/requireLogin')
const Post = require('../models/post')
const router = express.Router();

router.post("/createPost", customMiddleWare, async (req, res) => {
    const { title, body, photo } = req.body

    if (!title || !photo || !body) {
        return res.status(422).json({
            message: "All Fields are required",
            success: false
        })
    }

    const post = new Post({
        title,
        body,
        photo,
        postedBy: req.user._id
    })
    post.save().then(result => {
        return res.status(201).json({
            result,
            success: true
        })
    }).catch(e => {
        return res.status(500).json({
            error: e.message,
            message: "Something went wrong",
            success: false
        })
    })
})

router.get("/myPosts", customMiddleWare, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name email")
        .populate("comments.postedBy", "_id name")
        .then(result => {
            return res.status(200).json({
                posts: result,
                message: "Fetched All Posts by the user",
                success: true
            })
        })
})

router.get("/allposts", customMiddleWare, (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then(posts => {
            return res.status(200).json({
                message: "Fetched Posts",
                success: true,
                data: posts
            })
        })
})

router.get("/post/:id", customMiddleWare, (req, res) => {
    const postId = req.params.id; // Extract the post ID from the request parameters

    Post.findById(postId)
        .populate("postedBy", "_id name")          // Populate the 'postedBy' field with '_id' and 'name'
        .populate("comments.postedBy", "_id name") // Populate 'comments.postedBy' with '_id' and 'name'
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    message: "Post not found",
                    success: false
                });
            }

            return res.status(200).json({
                message: "Fetched Post",
                success: true,
                data: post
            });
        })
        .catch(error => {
            console.error("Error fetching post by ID:", error.message);
            return res.status(500).json({
                message: "Internal Server Error",
                success: false
            });
        });
});

router.get("/post/x", customMiddleWare, (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then(posts => {
            return res.status(200).json({
                message: "Fetched Posts",
                success: true,
                data: posts
            })
        })
})

router.put("/like", customMiddleWare, async (req, res) => {
    await Post.findByIdAndUpdate(req.body.postId,
        { $push: { likes: req.user._id } },
        { new: true } // This returns the updated document
    ).exec().then(res => {
        res.status(201).json({
            message: "Added Like",
            success: true
        })
    }).catch(e => {
        res.json({
            message: "Something Went Wrong",
            success: false
        })
    })

})

router.put("/unlike", customMiddleWare, async (req, res) => {
    await Post.findByIdAndUpdate(req.body.postId,
        { $pull: { likes: req.user._id } },
        { new: true } // This returns the updated document
    ).exec().then(res => {
        res.status(201).json({
            message: "Added Like",
            success: true
        })
    }).catch(e => {
        res.json({
            message: "Something Went Wrong",
            success: false
        })
    })
})

router.put("/comment", customMiddleWare, async (req, res) => {
    console.log("text req body", req.body);
    
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    await Post.findByIdAndUpdate(req.body.postId,
        { $push: { comments: comment } },
        { new: true } // This returns the updated document
    )
    .populate("comments.postedBy", "_id name")
    .exec().then(result => {
        res.json({
            message: "Added Comment",
            success: true,
            comments: result
        })
    }).catch(e => {
        console.log(e);
        
        res.json({
            message: "Something Went Wrong",
            success: false
        })
    })
})

router.delete("/delete/:postId", customMiddleWare , async(req, res) => {
    console.log("Delete Post", req.params);
    await Post.findByIdAndDelete(req.params.postId).then(deletedPost => {
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // Respond with success message or the deleted post
        res.status(200).json({ message: 'Post deleted successfully', deletedPost });
    }).catch(err => {
        res.status(500).json({ message: 'Server error', error: err.message });
    })
})


module.exports = router