const express = require("express");
const router = express.Router();
const Tileset = require("../schema/tileset-schema");
const ObjectId = require("mongodb").ObjectId;
const User = require("../schema/user-schema");
const multer = require("multer");
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single("image");
const { BlockBlobClient } = require("@azure/storage-blob");
const getStream = require("into-stream");
require("dotenv").config();

// Creates a new tileset 
router.post("/tileset/create", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
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
    description: "Description",
    tags: [],
    likes: 0,
    dislikes: 0,
    comments: [],
    public: false,
    tilesetCreated: Date.now(),
    owner: req.session._id,
    timeEdited: Date.now(),
    usersLiked: [],
    usersDisliked: [],
    sharedUsers: [],
    initialized: false,
    deleted: false
  });
  tileset = await tileset.save();
  var user = await User.findOneAndUpdate(
    { _id: req.session._id },
    { $addToSet: { tilesets: tileset._id } },
    { new: true }
  );
  res.json({ tileset: tileset, user: user });
});

// Deletes a tileset by id
router.post("/tileset/delete/:id", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
    return;
  }
  var tileset = await Tileset.findById(req.params.id);
  if (tileset == null) {
    res.status(400).json({ errorMessage: "Tileset not found" });
    return;
  }
  var user_id = tileset.owner;
  if (user_id != req.session._id) {
    res.status(400).json({ errorMessage: "Not owner of tileset" });
    return;
  }
  var user = await User.findById(user_id);
  await User.updateOne(
    { _id: user_id },
    { $pullAll: { tilesets: [req.params.id] } }
  );
  await Tileset.findOneAndUpdate({ _id: req.params.id }, {$set: {deleted: true}})
    .then((tileset) => res.json({ message: "Tileset deleted" }))
    .catch((err) => {
      res.status(400).json({ errorMessage: err });
    });
});

// Updates a tileset by id
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
  updates.tags = req.body.tags ? req.body.tags.filter((tag) => {return tag}).map((tag) => {return tag.toLowerCase()}) : undefined
  updates.timeEdited = Date.now();
  var tileset = await Tileset.findOneAndUpdate(
    {
      $or: [
        { _id: req.params.id, shared_users: new ObjectId(req.session._id) },
        { _id: req.params.id, owner: req.session._id },
      ],
    },
    { $set: updates },
    { new: true }
  );
  if (tileset != null) {
    res.json({ tileset: tileset });
  } else {
    if ((await Tileset.findById(req.params.id)) != null) {
      res.status(400).json({ errorMessage: "Not permitted to edit" });
    } else {
      res.status(400).json({ errorMessage: "Tileset does not exist" });
    }
  }
});

// GET: retrieves a certain tileset by id
router.get("/tileset/get/:id", async (req, res) => {
  var tileset = await Tileset.findById(req.params.id).catch((err) => {});
  if (tileset != null) {
    res.json({ tileset: tileset });
  } else {
    res.status(400).json({ errorMessage: "Tileset does not exist" });
  }
});

// GET: retrieves all tilesets owned by a certain user by id
router.get("/tileset/getUser/:id", async (req, res) => {
  var user = await User.findById(req.params.id);
  let usertilesets = await Tileset.find({owner: req.params.id, deleted: false}).sort({timeEdited: -1, _id: 1})
  let usersharedtilesets = await Tileset.find({shared_users: new ObjectId(req.params.id), deleted: false}).sort({timeEdited: -1, _id: 1})
  res.json({ usertilesets: usertilesets, sharedtilesets: usersharedtilesets });
});

// Get all tilesets
router.get("/tileset", async (req, res) => {
  Tileset.find({deleted: false})
    .then((tilesets) => res.json(tilesets))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Updates the image of a tileset preview
router.post("/tileset/image/:id", uploadStrategy, async (req, res) => {
  const blobName = req.params.id;
  const blobService = new BlockBlobClient(
    process.env.AZURE_STORAGE_CONNECTION_STRING,
    "maptile-tileset-image",
    blobName
  );
  stream = getStream(req.file.buffer);
  streamLength = req.file.buffer.length;
  const options = { blobHTTPHeaders: { blobContentType: req.file.mimetype } };
  blobService
    .uploadStream(stream, streamLength, undefined, options)
    .then(async () => {
      await Tileset.findByIdAndUpdate(req.params.id, {$set: {initialized: true}});
      res.json({ message: "successful upload" });
    })
    .catch((err) => {
      res.status(400).json({ errorMessage: err });
    });
});

// Adds a tileset to a user's shared tilesets
router.post("/tileset/addshared/:id", async (req, res) => {
  var user = await User.findById(req.params.id);
  var tileset = await Tileset.findById(req.body.tilesetid);
  console.log(tileset);
  if (user.shared_tilesets.includes(req.body.tilesetid)) {
    res.status(400).json({ errorMessage: "Tileset already shared" });
  } else if (req.params.id === tileset.owner) {
    res.status(400).json({ errorMessage: "Own Tileset" });
  } else {
    var user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { shared_tilesets: req.body.tilesetid } },
      { new: true }
    );
    res.json({ sharedtilesets: user.shared_tilesets });
  }
});

// Removes a tileset from a user's shared tilesets
router.post("/tileset/deleteshared/:id", async (req, res) => {
  var user = await User.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { shared_tilesets: req.body.tilesetid } },
    { new: true }
  );
  res.json({ sharedtilesets: user.shared_tilesets });
});

// GET: retrieves the top tilesets 
router.get("/tileset/top", async (req, res) => {
  var tilesets = await Tileset.aggregate([
    { $match: {deleted: false} },
    {
      $project: {
        name: 1,
        description: 1,
        _id: 1,
        likes: 1,
        dislikes: 1,
        usersLiked: 1,
        tags: 1,
        owner: 1,
        score: { $subtract: ["$likes", "$dislikes"] },
      },
    },
    { $sort: { score: -1, _id: 1 } },
    { $limit: 10 },
  ]);
  res.json({ tilesets: tilesets });
});

// Likes/unlikes a tileset by id
router.post("/tileset/like/:id", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
    return;
  }
  if (req.body.like) {
    var tileset = await Tileset.findOneAndUpdate(
      { _id: req.params.id, usersDisliked: { $in: [req.session._id] } },
      {
        $inc: { likes: 1, dislikes: -1 },
        $addToSet: { usersLiked: req.session._id },
        $pull: { usersDisliked: req.session._id },
      },
      { new: true }
    );
    if (tileset == null) {
      tileset = await Tileset.findOneAndUpdate(
        { _id: req.params.id, usersLiked: { $nin: [req.session._id] } },
        { $inc: { likes: 1 }, $addToSet: { usersLiked: req.session._id } },
        { new: true }
      );
      if (tileset == null) {
        res.status(400).json({
          errorMessage:
            "Could not find appropriate tileset or have already liked",
        });
        return;
      } else {
        await User.findOneAndUpdate(
          { _id: tileset.owner },
          { $inc: { likes: 1 } }
        );
      }
    } else {
      await User.findOneAndUpdate(
        { _id: tileset.owner },
        { $inc: { likes: 1, dislikes: -1 } }
      );
    }
    await User.findOneAndUpdate(
      { _id: req.session._id },
      { $addToSet: { liked_tilesets: tileset._id } }
    );
    res.json({ tileset: tileset });
  } else {
    var tileset = await Tileset.findOneAndUpdate(
      { _id: req.params.id, usersLiked: { $in: [req.session._id] } },
      { $inc: { likes: -1 }, $pull: { usersLiked: req.session._id } },
      { new: true }
    );
    if (tileset == null) {
      res.status(400).json({
        errorMessage:
          "Could not find appropriate tileset or have already unliked",
      });
      return;
    } else {
      await User.findOneAndUpdate(
        { _id: tileset.owner },
        { $inc: { likes: -1 } }
      );
      await User.findOneAndUpdate(
        { _id: req.session._id },
        { $pull: { liked_tilesets: tileset._id } }
      );
      res.json({ tileset: tileset });
    }
  }
});

// Dislikes/undislikes a tileset by id 
router.post("/tileset/dislike/:id", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
    return;
  }
  if (req.body.dislike) {
    var tileset = await Tileset.findOneAndUpdate(
      { _id: req.params.id, usersLiked: { $in: [req.session._id] } },
      {
        $inc: { likes: -1, dislikes: 1 },
        $addToSet: { usersDisliked: req.session._id },
        $pull: { usersLiked: req.session._id },
      },
      { new: true }
    );
    if (tileset == null) {
      tileset = await Tileset.findOneAndUpdate(
        { _id: req.params.id, usersDisliked: { $nin: [req.session._id] } },
        {
          $inc: { dislikes: 1 },
          $addToSet: { usersDisliked: req.session._id },
        },
        { new: true }
      );
      if (tileset == null) {
        res.status(400).json({
          errorMessage:
            "Could not find appropriate tileset or have already disliked",
        });
        return;
      } else {
        await User.findOneAndUpdate(
          { _id: tileset.owner },
          { $inc: { dislikes: 1 } }
        );
      }
    } else {
      await User.findOneAndUpdate(
        { _id: tileset.owner },
        { $inc: { likes: -1, dislikes: 1 } }
      );
      await User.findOneAndUpdate(
        { _id: req.session._id },
        { $pull: { liked_tilesets: tileset._id } }
      );
    }
    res.json({ tileset: tileset });
  } else {
    var tileset = await Tileset.findOneAndUpdate(
      { _id: req.params.id, usersDisliked: { $in: [req.session._id] } },
      { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.session._id } },
      { new: true }
    );
    if (tileset == null) {
      res.status(400).json({
        errorMessage:
          "Could not find appropriate tileset or have already undisliked",
      });
      return;
    } else {
      await User.findOneAndUpdate(
        { _id: tileset.owner },
        { $inc: { dislikes: -1 } }
      );
      res.json({ tileset: tileset });
    }
  }
});

// GET: retrieves tilesets based on a set of ids
router.post("/tileset/getBatch", async (req, res) => {
  var limit = req.body.limit ? req.body.limit : 0;
  if (limit <= 0) {
    limit = 1;
  }
  var page = req.body.page ? req.body.page * limit : 0;
  if (page < 0) {
    page = 0;
  }
  if (req.body.ids == undefined) {
    res.json({ tilesets: [] });
    return;
  }
  var ids = req.body.ids.map((id) => {
    return { _id: id };
  });
  if (ids == undefined || ids.length == 0) {
    res.json({ tilesets: [] });
    return;
  }
  var deleted = req.body.deleted ? true : false
  if (req.body.nosort == "nosort") {
    var tilesets = deleted ? await Tileset.find({ $or: ids }, req.body.fields) :
    await Tileset.find({ $or: ids, deleted: false}, req.body.fields)
    let obj = {};
    tilesets.forEach((x) => (obj[x._id] = x));
    const ordered = req.body.ids.map((key) => obj[key]);
    res.json({ tilesets: ordered });
  } else {
    var tilesets = await Tileset.find({ $or: ids, deleted: false }, req.body.fields)
      .sort({ timeEdited: -1, _id: 1 })
      .skip(page)
      .limit(limit);
    res.json({ tilesets: tilesets });
  }
});

// Performs a search for tilesets. 
router.post("/tileset/search", async (req, res) => {
  var tags = req.body.tags
    ? req.body.tags.map((tag) => {
        return { tags: tag.toLowerCase() };
      })
    : undefined;
  var limit = req.body.limit ? req.body.limit : 0;
  if (limit <= 0) {
    limit = 1;
  }
  var page = req.body.page ? req.body.page * limit : 0;
  if (page < 0) {
    page = 0;
  }
  var query = { deleted: false };
  if (req.body.search != undefined && req.body.search != "") {
    query.$text = { $search: req.body.search };
  }
  if (tags && tags.length != 0) {
    query.$or = tags;
  }
  var documents = await Tileset.aggregate([
    { $match: query },
    {
      $facet: {
        tilesets: [
          {
            $project: {
              name: 1,
              description: 1,
              _id: 1,
              likes: 1,
              dislikes: 1,
              usersLiked: 1,
              tags: 1,
              owner: 1,
              score: { $subtract: ["$likes", "$dislikes"] },
            },
          },
          { $sort: { score: -1, _id: 1 } },
          { $skip: page },
          { $limit: limit },
        ],
        count: [{ $count: "count" }],
      },
    },
  ]);
  var count = documents[0].count.length != 0 ? documents[0].count[0].count : 0;
  res.json({ tilesets: documents[0].tilesets, count: count });
});

module.exports = router;