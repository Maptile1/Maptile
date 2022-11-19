const express = require("express");
const User = require("../schema/user-schema");
const userRouter = express.Router();
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const multer = require('multer')
const inMemoryStorage = multer.memoryStorage()
const Tileset = require("../schema/tileset-schema");
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image')
const { BlockBlobClient } = require('@azure/storage-blob')
const getStream = require('into-stream')
require('dotenv').config();

// NODE MAILER 
const nodeMailer = require('nodemailer');
let mailTransporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})
const sendEmail = (details) => {
    mailTransporter.sendMail(details, (err) => {
        if (err) {
            console.log("ERROR SENDING EMAIL", err);
        }
        else {
            console.log("email has sent.")
        }
    })
}

userRouter.route("/user/register").post(async (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        var user = new User({
            _id: new ObjectId(),
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
            tilesets: [],
            shared_tilesets: [],
            maps: [],
            shared_maps: [],
            likes: 0,
            dislikes: 0,
            bio: "Empty Bio",
            featured: [],
            accountCreated: Date.now(),
        })
        user = await user.save()
            .then((user) => {
                req.session._id = user._id
                res.json({ user: user })
            })
            .catch((err) => { res.json({ errorMessage: err.message }) })
    })
})

userRouter.route("/user/login").post(async (req, res) => {
    var user = await User.findOne({ userName: req.body.userName });
    if (user == null) {
        res.status(400)
            .json({ errorMessage: "Username password combination not found" })
    }
    else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {
                req.session._id = user._id.toString()
                res.json({ user: user })
            }
            else {
                res.status(400)
                    .json({ errorMessage: "Username password combination not found" })
            }
        })
    }
})

userRouter.route("/user/logout").post(async (req, res) => {
    if (req.session._id == undefined) {
        res.status(400).json({ errorMessage: "Not logged in" });
    }
    else {
        req.session.destroy()
        res.json({ message: "success" })
    }
})

userRouter.route("/user/loggedin").get(async (req, res) => {
    if (req.session._id == undefined) {
        res.json({ loggedIn: false })
    }
    else {
        var user = await User.findById(req.session._id)
        if (user != null) {
            res.json({ user: user, loggedIn: true })
        }
        else {
            req.session.destroy()
            res.status(400).json({ errorMessage: "Couldnt find user" })
        }
    }
})

userRouter.route("/user/get/:id").get(async (req, res) => {
    var user = await User.findById(req.params.id)
    if (user != null) {
        res.json({ user: user })
    }
    else {
        res.status(400).json({ errorMessage: "Couldnt find user" })
    }
})

userRouter.route("/user/email/:email").get(async (req, res) => {
    var user = await User.find(
        {
            email: req.params.email
        }
    )
    console.log(user)
    if (user != null) {
        res.json({ user: user })
    }
    else {
        res.status(400).json({ errorMessage: "Couldnt find user" })
    }
})

userRouter.route("/user/recover/:email").post(async (req, res) => {
    // GENERATE CODE AND SAVE TO DB
    let code = Math.floor(Math.random() * 90000) + 10000;
    let updates = {
        recoveryCode: code
    }
    // UPDATE USER
    var user = await User.findOneAndUpdate(
        { email: req.params.email }, //temp
        { $set: updates },
        { new: true }
    )
    if (user != null) {
        res.json({ user: user })
    }
    else {
        res.status(400).json({ errorMessage: "User doesn't exist" })
    }
    let details = {
        from: process.env.EMAIL,
        to: req.params.email,
        "subject": "Maptile Password Recovery Code",
        "text": code.toString(),
    }
    sendEmail(details)
})

userRouter.post("/user/update", async (req, res) => {
    if (req.session._id == undefined) {
        res.status(400).json({ errorMessage: "Not logged in" })
        return
    }
    var updates = {}
    updates.userName = req.body.userName
    updates.email = req.body.email
    updates.bio = req.body.bio
    if (req.body.password != undefined) {
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            updates.password = hash
            User.findOneAndUpdate(
                { _id: req.session._id },
                { $set: updates },
                { new: true }
            )
                .then((user => {
                    if (user != null) {
                        res.json({ user: user })
                    }
                    else {
                        res.status(400).json({ errorMessage: "User doesn't exist" })
                    }
                }))
                .catch((err) => { res.status(400).json({ errorMessage: err }) })
        })
    }
    else {
        User.findOneAndUpdate(
            { _id: req.session._id },
            { $set: updates },
            { new: true }
        )
            .then((user => {
                if (user != null) {
                    res.json({ user: user })
                }
                else {
                    res.status(400).json({ errorMessage: "User doesn't exist" })
                }
            }))
            .catch((err) => { res.status(400).json({ errorMessage: err }) })
    }
})

userRouter.post("/user/reset", async (req, res) => {
    var updates = {}
    if (req.body.password == undefined) {
        res.status(400).json({ errorMessage: 'No password given' })
    }
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        updates.password = hash
        User.findOneAndUpdate(
            { email: req.body.email, recoveryCode: req.body.recoveryCode },
            { $set: updates },
            { new: true }
        )
            .then((user => {
                if (user != null) {
                    res.json({ user: user })
                }
                else {
                    res.status(400).json({ errorMessage: "Wrong code" })
                }
            }))
            .catch((err) => { res.status(400).json({ errorMessage: err }) })
    })
})

userRouter.post('/user/image', uploadStrategy, async (req, res) => {
    if (req.session._id == undefined) {
        res.status(400).json({ errorMessage: "Not logged in" })
        return
    }
    const blobName = req.session._id
    const blobService = new BlockBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING, 'maptile-profile-images', blobName)
    stream = getStream(req.file.buffer)
    streamLength = req.file.buffer.length
    const options = { blobHTTPHeaders: { blobContentType: req.file.mimetype } };
    blobService.uploadStream(stream, streamLength, undefined, options)
        .then(() => { res.json({ message: 'successful upload' }) })
        .catch((err) => { res.status(400).json({ errorMessage: err }) })
})

userRouter.get('/user/getRecent/:id', async (req, res) => {
    var user = await User.findById(req.params.id);
    var tilesets = [];
    await Promise.all(
        user.tilesets.map(async (obj, index) => {
            tileset = await Tileset.findById(obj);
            tilesets.push(tileset);
        })
    );
    await Promise.all(
        user.shared_tilesets.map(async (obj, index) => {
            tileset = await Tileset.findById(obj);
            tilesets.push(tileset);
        })
    );
    var recent = tilesets.sort((a, b) => new Date(b.timeAccessed) - new Date(a.timeAccessed));
    res.json({ recent });
})

module.exports = userRouter;
