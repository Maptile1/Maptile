const express = require('express');
const User = require('../schema/user-schema');
const userRouter = express.Router();
const ObjectId = require('mongodb').ObjectId;

userRouter.route('/user/register').post(async (req, res) => {
    var user = new User({
        _id: new ObjectId(),
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password, //hash later...
        tilesets: [],
        shared_tilesets: [],
        maps: [],
        shared_maps: [],
        likes: 0,
        dislikes: 0,
        bio: "bio",
        featured: [],
        accountCreated: Date.now()
    })
    await user.save()
    res.json({payload: {userName: user.userName, email: user.email}})
})

userRouter.route('/user/login').post(async (req, res) => {
    //hash password later bcrypt...
    var user = await User.findOne({userName: req.body.userName, password: req.body.password})
    if (user == null){
        res.statusCode(400).json({payload: {errorMessage: "username password combination not found"}})
    }
    else{
        req.session.id = user.userId
        res.json({payload: {userName: user.userName}})
    }
})

userRouter.route('/user/logout').post(async (req, res) => {
    if (req.session.id == undefined){
        res.statusCode(400).json({payload: {errorMessage: "not logged in"}})
    }
    else{
        req.session.destroy()
        res.end()
    }
})

userRouter.route('/user/loggedin').post(async (req, res) => {
    if (req.session.id == undefined){
        res.json({payload: {loggedIn: false}})
    }
    else{
        var user = await User.findById(req.session.id)
        if (user != null){
            res.json({payload: {userName: user.userName}})
        }
        else{
            req.session.destroy()
            res.status(400).json({payload: {errorMessage: "couldnt find user???"}})
        }
    }
})

module.exports = userRouter;