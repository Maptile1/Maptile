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
    timeEdited: Date.now(),
    usersLiked: [],
    usersDisliked: []
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
  updates.timeEdited = Date.now()
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
  var tileset = await Tileset.findById(req.params.id).catch((err) => {});
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
});

///add to shared
router.post("/tileset/addshared/:id", async (req, res) => {
  var user = await User.findById(req.params.id);
  var tileset = await Tileset.findById(req.body.tilesetid);
  console.log(tileset);
  if (user.shared_tilesets.includes(req.body.tilesetid)) {
    res.status(400).json({ errorMessage: "Tileset already shared" });
  }
  else if (req.params.id === tileset.owner) {
    res.status(400).json({ errorMessage: "Own Tileset" });
  }

  else {
    var user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { shared_tilesets: req.body.tilesetid } },
      { new: true }
    );
    res.json({ sharedtilesets: user.shared_tilesets });
  }
});


router.post("/tileset/deleteshared/:id", async (req, res) => {
  var user = await User.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { shared_tilesets: req.body.tilesetid } },
    { new: true }
  );
  res.json({ sharedtilesets: user.shared_tilesets });
});

router.get("/tileset/top", async (req, res) => {
  var tilesets = await Tileset.aggregate([
    { $match: {}},
    { $project: {name: 1, description: 1, _id: 1, likes: 1, dislikes: 1, usersLiked: 1, tags: 1, owner: 1, score: { $subtract: ["$likes", "$dislikes"]}}},
    { $sort: { score: -1, _id: 1} },
    { $limit: 10 }
  ])
  res.json({tilesets: tilesets})
});

router.post("/tileset/like/:id", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
    return;
  }
  if (req.body.like){
    var tileset = await Tileset.findOneAndUpdate(
      {_id: req.params.id, usersDisliked: {$in: [req.session._id]}},
      {$inc: {likes: 1, dislikes: -1}, $addToSet: { usersLiked: req.session._id },
      $pull: {usersDisliked: req.session._id}},
      {new: true})
    if (tileset == null){
      tileset = await Tileset.findOneAndUpdate(
        {_id: req.params.id, usersLiked: {$nin: [req.session._id]}},
        {$inc: {likes: 1}, $addToSet: { usersLiked: req.session._id }},
        {new: true})
      if (tileset == null){
        res.status(400).json({ errorMessage: "Could not find appropriate tileset or have already liked" });
        return;
      }
      else{
        await User.findOneAndUpdate(
          {_id: tileset.owner},
          {$inc: {likes: 1}}
        )
      }
    }
    else{
      await User.findOneAndUpdate(
        {_id: tileset.owner},
        {$inc: {likes: 1, dislikes: -1}}
      )
    }
    await User.findOneAndUpdate(
      {_id: req.session._id},
      {$addToSet: {liked_tilesets: tileset._id}},
    )
    res.json({ tileset: tileset });
  }
  else{
    var tileset = await Tileset.findOneAndUpdate(
      {_id: req.params.id, usersLiked: {$in: [req.session._id]}},
      {$inc: {likes: -1}, $pull: { usersLiked: req.session._id }},
      {new: true})
    if (tileset == null){
      res.status(400).json({ errorMessage: "Could not find appropriate tileset or have already unliked" });
        return;
    }
    else{
      await User.findOneAndUpdate(
        {_id: tileset.owner},
        {$inc: {likes: -1}}
      )
      await User.findOneAndUpdate(
        {_id: req.session._id},
        {$pull:{liked_tilesets: tileset._id}}
      )
      res.json({ tileset: tileset });
    }
  }
})

router.post("/tileset/dislike/:id", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
    return;
  }
  if (req.body.dislike){
    var tileset = await Tileset.findOneAndUpdate(
      {_id: req.params.id, usersLiked: {$in: [req.session._id]}},
      {$inc: {likes: -1, dislikes: 1}, $addToSet: { usersDisliked: req.session._id },
      $pull: {usersLiked: req.session._id}},
      {new: true})
    if (tileset == null){
      tileset = await Tileset.findOneAndUpdate(
        {_id: req.params.id, usersDisliked: {$nin: [req.session._id]}},
        {$inc: {dislikes: 1}, $addToSet: { usersDisliked: req.session._id }},
        {new: true})
      if (tileset == null){
        res.status(400).json({ errorMessage: "Could not find appropriate tileset or have already disliked" });
        return;
      }
      else{
        await User.findOneAndUpdate(
          {_id: tileset.owner},
          {$inc: {dislikes: 1}}
        )
      }
    }
    else{
      await User.findOneAndUpdate(
        {_id: tileset.owner},
        {$inc: {likes: -1, dislikes: 1}}
      )
      await User.findOneAndUpdate(
        {_id: req.session._id},
        {$pull:{liked_tilesets: tileset._id}}
      )
    }
    res.json({ tileset: tileset });
  }
  else{
    var tileset = await Tileset.findOneAndUpdate(
      {_id: req.params.id, usersDisliked: {$in: [req.session._id]}},
      {$inc: {dislikes: -1}, $pull: { usersDisliked: req.session._id }},
      {new: true})
    if (tileset == null){
      res.status(400).json({ errorMessage: "Could not find appropriate tileset or have already undisliked" });
        return;
    }
    else{
      await User.findOneAndUpdate(
        {_id: tileset.owner},
        {$inc: {dislikes: -1}}
      )
      res.json({ tileset: tileset });
    }
  }
})

router.post("/tileset/getBatch", async (req, res) => {
  var limit = req.body.limit ? req.body.limit : 0
  if (limit <= 0){
    limit = 1;
  }
  var page = req.body.page ? req.body.page * limit : 0
  if (page < 0){
    page = 0;
  }
  var ids = req.body.ids.map((id) => { return {_id: id}})
  if (ids == undefined || ids.length == 0){
    res.json({tilesets: tilesets})
    return;
  }
  var tilesets = await Tileset.find({$or: ids}, req.body.fields).sort({timeEdited : -1, _id: 1}).skip(page).limit(limit)
  res.json({tilesets: tilesets})
})

router.post("/tileset/search", async (req, res) => {
  var tags = req.body.tags ? req.body.tags.map((tag) => {return {tags: tag}}) : undefined
  var limit = req.body.limit ? req.body.limit : 0
  if (limit <= 0){
    limit = 1;
  }
  console.log(limit)
  var page = req.body.page ? req.body.page * limit : 0
  if (page < 0){
    page = 0;
  }
  var query = {$text:{$search: req.body.search ? req.body.search : ""}}
  if (tags && tags.length != 0){
    query.$or = tags
  }
  var documents = await Tileset.aggregate([
    { $match: query},
    {$facet: {
      tilesets: [
        { $project: {name: 1, description: 1, _id: 1, likes: 1, dislikes: 1, usersLiked: 1, tags: 1, owner: 1,score: { $subtract: ["$likes", "$dislikes"]}}},
        { $sort: { score: -1, _id: 1} },
        { $skip: page },
        { $limit: limit }
      ],
      count: [
        {$count: "count"}
      ]
    },
    }
  ])
  var count = documents[0].count.length != 0 ? documents[0].count[0].count : 0
  res.json({tilesets: documents[0].tilesets, count: count})
})

module.exports = router;
