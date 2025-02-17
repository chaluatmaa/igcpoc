const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type:String,
        required: true
    },
    photo:{
        type: String,
        required:true
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    likes: [{type: ObjectId, ref: "User"}],
    comments: [
        {
            text: { type: String, required: true },
            postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
        }
    ]

    // comments:[{
    //     type: String,
    //     postedBy: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref:"User"
    //     }
    // }]
},{timestamps: true})

module.exports = mongoose.model("Post", postSchema)