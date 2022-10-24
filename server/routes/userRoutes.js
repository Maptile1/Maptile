const express = require('express');
const userRouter = express.Router();

userRouter.route('/user/register').post(async (req, res) => {
    var user = new User({
        userId: new ObjectId(),
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password, //hash later...
        tilesets: [],
        shared_tilesets: [],
        maps: [],
        shared_maps: [],
        likes: 0,
        dislikes: 0,
        bio: "",
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

module.exports = userRouter;