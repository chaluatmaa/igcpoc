const express = require('express')
const customMiddleWare = require('../middleware/requireLogin')
const router = express.Router()
// const mongoose = require('mongoose')
const User = require("../models/user")
const dbConnection = require('../db/db')
const bycrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const jwt_secret = "instagram_clone"

dbConnection()

router.get("/", customMiddleWare, (req, res) => {
    res.send("Router File")
})

router.get("/health", customMiddleWare, (req, res) => {
    res.json({
        success: true,
        message: "Health seems alright"
    })
})

router.post("/signup", async (req, res) => {
    const { email, name, password } = req.body

    if (!email || !password || !name) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const hashedPassword = await bycrypt.hash(req.body.password, 12)
    await User.findOne({ email }).then(savedUser => {
        if (savedUser) {
            return res.status(200).json({
                message: "User already exists",
                success: false
            })
        }
        const user = new User({
            ...req.body,
            password: hashedPassword
        })
        user.save().then(user => {
            user.password = undefined
            const data = {
                name: user.name,
                email: user.email
            }

            return res.status(201).json({
                message: "Signed Up Successfully",
                success: "true",
                data
            })
        }).catch(e => {
            console.error("Error", e.message);
            return res.status(500).json({
                message: "Something went wrong",
                success: false
            })
        })
    })
})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required",
            success: false
        })
    }

    let mapInputToLogin
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (!emailPattern.test(email)) {
        mapInputToLogin = "name"
    } else {
        mapInputToLogin = "email"
    }

    await User.findOne({ [mapInputToLogin]: email })
        .then(user => {
            if (user) {
                bycrypt.compare(password, user.password).then(match => {
                    if (match) {
                        const token = jwt.sign({ _id: user._id }, jwt_secret, {
                            expiresIn: "2d"
                        })
                        user.password = undefined
                        user.__v = undefined
                        const sendUser = { ...user["_doc"] }
                        sendUser.token = token
                        return res.status(201).json({
                            message: "User found",
                            success: true,
                            data: sendUser
                        })
                    } else {
                        return res.status(404).json({
                            success: false,
                            message: "Invalid credentials"
                        })
                    }
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Invalid credentials"
                })
            }
        }).catch(e => {
            return res.status(404).json({
                success: false,
                message: e.message
            })
        })
})

router.post('/profile', customMiddleWare, async(req, res) => {
    let user = await User.findById({_id: req.user._id})
    const {authorization} = req.headers
    user.token = authorization.replace("Bearer ","")
    user.password = undefined
    user.__v = undefined
    res.json({ user: {...user["_doc"], token: authorization.replace("Bearer ","")} });
});

module.exports = router