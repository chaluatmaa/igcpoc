const jwt = require('jsonwebtoken')
const jwt_secret = "instagram_clone"
const User = require('../models/user')

const customMiddleWare = (req, res, next) => {
    // console.log("headers", req.headers);
    const {authorization} = req.headers
    // console.log("All headers", authorization);
    if (!authorization) {
        return res.status(401).json({
            success: false,
            message:"You must be logged in"
        })
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token, jwt_secret, (err, payload)=>{
        if(err){
            return res.status(401).json({
                success: false,
                message:"You must be logged in"
            })
        }
        const {_id} = payload
        User.findById(_id).then(data => {
            req.user = data
            next()
        })
    })
}

module.exports = customMiddleWare
