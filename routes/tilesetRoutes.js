const express = require("express");
const router = express.Router();
const Tileset = require("../schema/tileset-schema");
const ObjectId = require("mongodb").ObjectId;
const User = require("../schema/user-schema");

// Create Tileset
router.post("/tileset/create", async (req, res) => {
  // if (req.session._id == undefined){
  //     res.status(400).json({errorMessage: 'Not logged in'})
  //     return;
  // }
  var tilesetId = new ObjectId();
  var tileset = new Tileset({
    _id: tilesetId,
    tileset_data: [],
    name: req.body.name,
    description: req.body.description,
    likes: 0,
    dislikes: 0,
    comments: [],
    public: false,
    tilesetCreated: Date.now(),
    owner: req.body._id,
  });
  await tileset.save();
  var user = await User.findById(req.body._id);
  user.tilesets.push(tilesetId);
  user.save();
  res.json({ tileset: tileset, user: user });
});

// Delete Tileset
router.post("/tileset/delete/:id", async (req, res) => {
  // if (req.session._id == undefined) {
  //   res.status(400).json({ errorMessage: "Not logged in" });
  //   return;
  // }
  // var user_id = Tileset.findById(req.params.id).owner;
  // var user = User.findById(user_id);
  // user.tilesets = user.tilesets.filter((e) => e !== req.params.id);
  // user.save();
  Tileset.findOneAndRemove({ _id: req.params.id })
    .then(() => res.json({ message: "Tileset deleted" }))
    .catch((err) => {
      Tileset.findOne({ _id: req.params.id })
        .then((tileset) => {
          if (tileset != null) {
            res.status(400).json({ errorMessage: "Not owner of tileset" });
          } else {
            res.status(400).json({ errorMessage: "Tileset does not exist" });
          }
        })
        .catch((err) => res.status(400).json({ errorMessage: err }));
    });
});

// Update tileset
router.post("/tileset/update/:id", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
    return;
  }
  var updates = {};
  updates.tileset_data = req.body.tileset_data;
  updates.name = req.body.name;
  updates.description = req.body.description;
  updates.public = req.body.public;
  var tileset = await Tileset.findOneAndUpdate(
    { _id: req.params.id, owner: req.session._id },
    { $set: updates },
    { new: true }
  );
  if (tileset != null) {
    res.json({ tileset: tileset });
  } else {
    if ((await Tileset.findById(req.params.id)) != null) {
      res.status(400).json({ errorMessage: "Not permitted to editle" });
    } else {
      res.status(400).json({ errorMessage: "Tileset does not exist" });
    }
  }
});

// Get Tileset
router.get("/tileset/get/:id", async (req, res) => {
  var tileset = await Tileset.findById(req.params.id);
  if (tileset != null) {
    res.json({ tileset: tileset });
  } else {
    res.status(400).json({ errorMessage: "Tileset does not exist" });
  }
});

///Get all tilesets of user
router.get("/tileset/getUser/:id", async (req, res) => {
  var user = await User.findById(req.params.id);
  var usertilesets = [];
  var tileset;
  await Promise.all(
    user.tilesets.map(async (obj, index) => {
      tileset = await Tileset.findById(obj);
      usertilesets.push(tileset);
    })
  );
  res.json({ usertilesets: usertilesets });
});

// Get all tilesets
router.get("/tileset", async (req, res) => {
  Tileset.find()
    .then((tilesets) => res.json(tilesets))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
