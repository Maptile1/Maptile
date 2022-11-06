const express = require("express");
const User = require("../schema/user-schema");
const userRouter = express.Router();
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
      bio: "bio",
      featured: [],
      accountCreated: Date.now(),
    });
    await user
      .save()
      .then((user) => {
        res.json({ user: user });
      })
      .catch((err) => {
        res.json({ errorMessage: err.message });
      });
  });
});

userRouter.route("/user/login").post(async (req, res) => {
  var user = await User.findOne({ userName: req.body.userName });
  if (user == null) {
    res
      .status(400)
      .json({ errorMessage: "Username password combination not found" });
  } else {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        req.session._id = user._id.toString();
        res.json({ user: user });
      } else {
        res
          .status(400)
          .json({ errorMessage: "Username password combination not found" });
      }
    });
  }
});

userRouter.route("/user/logout").post(async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
  } else {
    req.session.destroy();
    res.json({ message: "success" });
  }
});

userRouter.route("/user/loggedin").get(async (req, res) => {
  if (req.session._id == undefined) {
    res.json({ loggedIn: false });
  } else {
    var user = await User.findById(req.session._id);
    if (user != null) {
      res.json({ user: user, loggedIn: true });
    } else {
      req.session.destroy();
      res.status(400).json({ errorMessage: "Couldnt find user" });
    }
  }
});

userRouter.route("/user/get/:id").get(async (req, res) => {
  var user = await User.findById(req.params.id);
  if (user != null) {
    res.json({ user: user });
  } else {
    res.status(400).json({ errorMessage: "Couldnt find user" });
  }
});

userRouter.post("/user/update/:id", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
    return;
  }
  var updates = {};
  updates.userName = req.body.userName;
  updates.email = req.body.email;
  updates.password = req.body.password;
  updates.tilesets = req.body.tilesets;
  updates.shared_tilesets = req.body.shared_tilesets;
  updates.maps = req.body.maps;
  updates.shared_maps = req.body.shared_maps;
  updates.likes = req.body.likes;
  updates.dislikes = req.body.dislikes;
  updates.bio = req.body.bio;
  updates.featured = req.body.featured;
  updates.accountCreated = req.body.accountCreated;

  var user = await User.findOneAndUpdate(
    { _id: req.params.id, owner: req.session._id },
    { $set: updates },
    { new: true }
  );
  if (user != null) {
    res.json({ user: user });
  } else {
    if ((await User.findById(req.params.id)) != null) {
      res.status(400).json({ errorMessage: "Not permitted to editle" });
    } else {
      res.status(400).json({ errorMessage: "Tileset does not exist" });
    }
  }
});

module.exports = userRouter;
