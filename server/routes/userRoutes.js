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

module.exports = userRouter;