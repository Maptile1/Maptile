const express = require("express");
const router = express.Router();
const Tileset = require("../schema/tileset-schema");
const ObjectId = require("mongodb").ObjectId;
const User = require("../schema/user-schema");
const multer = require('multer')
const inMemoryStorage = multer.memoryStorage()
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image')
const { BlockBlobClient } = require('@azure/storage-blob')
const getStream = require('into-stream')
require('dotenv').config();

// Create Tileset
router.post("/tileset/create", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: 'Not logged in' })
    return;
  }
  var tilesetId = new ObjectId();
  var tileset = new Tileset({
    _id: tilesetId,
    tileset_data: [],
    tile_width: req.body.tile_width,
    tile_height: req.body.tile_height,
    tileset_width: req.body.tileset_width,
    tileset_height: req.body.tileset_height,
    name: req.body.name,
    description: 'Description',
    tags: [],
    likes: 0,
    dislikes: 0,
    comments: [],
    public: false,
    tilesetCreated: Date.now(),
    owner: req.session._id,
  });
  tileset = await tileset.save();
  var user = await User.findOneAndUpdate(
    { _id: req.session._id },
    { $addToSet: { tilesets: tileset._id } },
    { new: true }
  );
  res.json({ tileset: tileset, user: user });
});


// Delete Tileset
router.post("/tileset/delete/:id", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: 'Not logged in' });
    return;
  }
  var tileset = await Tileset.findById(req.params.id);
  if (tileset == null) {
    res.status(400).json({ errorMessage: 'Tileset not found' });
    return;
  }
  var user_id = tileset.owner;
  if (user_id != req.session._id) {
    res.status(400).json({ errorMessage: 'Not owner of tileset' });
    return;
  }
  var user = await User.findById(user_id);
  await User.updateOne({ _id: user_id }, { $pullAll: { tilesets: [req.params.id] } });
  await Tileset.findOneAndRemove({ _id: req.params.id })
    .then((tileset) => res.json({ message: 'Tileset deleted' }))
    .catch((err) => { res.status(400).json({ errorMessage: err }) });
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
  updates.tags = req.body.tags;
  var tileset = await Tileset.findOneAndUpdate(
    {
      $or: [{ _id: req.params.id, shared_users: { $in: [req.session._id] } },
      { _id: req.params.id, owner: req.session._id }]
    },
    { $set: updates },
    { new: true }
  );
  if (tileset != null) {
    res.json({ tileset: tileset });
  }
  else {
    if ((await Tileset.findById(req.params.id)) != null) {
      res.status(400).json({ errorMessage: "Not permitted to edit" });
    }
    else {
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
  var usersharedtilesets = [];
  var tileset;
  await Promise.all(
    user.tilesets.map(async (obj, index) => {
      tileset = await Tileset.findById(obj);
      usertilesets.push(tileset);
    })
  );
  await Promise.all(
    user.shared_tilesets.map(async (obj, index) => {
      tileset = await Tileset.findById(obj);
      usersharedtilesets.push(tileset);
    })
  );
  res.json({ usertilesets: usertilesets, sharedtilesets: usersharedtilesets });
});

// Get all tilesets
router.get("/tileset", async (req, res) => {
  Tileset.find()
    .then((tilesets) => res.json(tilesets))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post('/tileset/image/:id', uploadStrategy, async (req, res) => {
  const blobName = req.params.id
  const blobService = new BlockBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING, 'maptile-tileset-image', blobName)
  stream = getStream(req.file.buffer)
  streamLength = req.file.buffer.length
  const options = { blobHTTPHeaders: { blobContentType: req.file.mimetype } };
  blobService.uploadStream(stream, streamLength, undefined, options)
    .then(() => { res.json({ message: 'successful upload' }) })
    .catch((err) => { res.status(400).json({ errorMessage: err }) })
})

///add to shared
router.get("/tileset/addshared/:id", async (req, res) => {
  var user = await User.findOneAndUpdate(
    { _id: req.params._id },
    { $addToSet: { shared_tilesets: req.body.tilesetid } },
    { new: true }
  );
  res.json({ sharedtilesets: user.shared_tilesets });
})

module.exports = router;
