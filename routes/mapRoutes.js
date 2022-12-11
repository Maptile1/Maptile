const express = require("express");
const router = express.Router();
const Map = require("../schema/map-schema.js");
const ObjectId = require("mongodb").ObjectId;
const User = require("../schema/user-schema");
const multer = require("multer");
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single("image");
const { BlockBlobClient } = require("@azure/storage-blob");
const getStream = require("into-stream");

// CREATE: creates a new map
router.post("/map/create", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
    return;
  }
  var map = new Map({
    _id: new ObjectId(),
    name: req.body.name,
    tile_width: req.body.tile_width,
    tile_height: req.body.tile_height,
    width: req.body.width,
    height: req.body.height,
    render_order: "right-down",
    description: "Description",
    tags: [],
    likes: 0,
    dislikes: 0,
    tilesets: req.body.tilesets,
    comments: [],
    public: false,
    mapCreated: Date.now(),
    layers: [],
    owner: req.session._id,
    timeEdited: Date.now(),
    usersLiked: [],
    usersDisliked: [],
    sharedUsers: [],
  });
  await map.save();
  var user = await User.findOneAndUpdate(
    { _id: req.session._id },
    { $addToSet: { maps: map._id } },
    { new: true }
  );
  res.json({ map: map, user: user });
});

// GET: retrieves a map based on id
router.get("/map/get/:id", async (req, res) => {
  var map = await Map.findById(req.params.id);
  if (map != null) {
    res.json({ map: map });
  } else {
    res.status(400).json({ errorMessage: "Map does not exist" });
  }
});

// GET: all maps 
router.get("/map/getall", async (req, res) => {
  Map.find()
    .then((maps) => res.json(maps))
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE: deletes a map by id
router.post("/map/delete/:id", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
    return;
  }
  var user = await User.updateOne(
    { _id: req.session._id },
    { $pullAll: { maps: [req.params.id] } }
  );
  Map.findOneAndRemove({ _id: req.params.id, owner: req.session._id })
    .then(() => res.json({ message: "Map deleted", user: user }))
    .catch((err) => {
      Map.findOne({ _id: req.params.id })
        .then((map) => {
          if (map != null) {
            res.status(400).json({ errorMessage: "Not owner of map" });
          } else {
            res.status(400).json({ errorMessage: "Map does not exist" });
          }
        })
        .catch((err) => res.status(400).json({ errorMessage: err }));
    });
});

// UPDATE: updates a map based on id
router.post("/map/update/:id", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
    return;
  }
  var updates = {};
  updates.name = req.body.name;
  updates.tile_width = req.body.tile_width;
  updates.width = req.body.width;
  updates.height = req.body.height;
  updates.render_order = req.body.render_order;
  updates.description = req.body.description;
  updates.public = req.body.public;
  updates.layers = req.body.layers;
  updates.tags = req.body.tags ? req.body.tags.filter((tag) => {return tag}).map((tag) => {return tag.toLowerCase()}) : undefined
  updates.timeEdited = Date.now();
  var addTilesets = req.body.tilesetsToAdd || [];
  var removeTilesets = req.body.tilesetsToRemove || [];
  var map = await Map.findOneAndUpdate(
    {
      $or: [
        { _id: req.params.id, shared_users: { $in: [req.session._id] } },
        { _id: req.params.id, owner: req.session._id },
      ],
    },
    { $set: updates, $addToSet: { tilesets: { $each: addTilesets } } },
    { new: true }
  );
  if (removeTilesets) {
    map = await Map.findOneAndUpdate(
      {
        $or: [
          { _id: req.params.id, shared_users: { $in: [req.session._id] } },
          { _id: req.params.id, owner: req.session._id },
        ],
      },
      { $set: updates, $pull: { tilesets: { $in: removeTilesets } } },
      { new: true }
    );
  }
  if (map != null) {
    res.json({ map: map });
  } else {
    if ((await Map.findById(req.params.id)) != null) {
      res.status(400).json({ errorMessage: "Not permitted to edit" });
    } else {
      res.status(400).json({ errorMessage: "Map does not exist" });
    }
  }
});

// GET: retrieves all maps from a user
router.get("/map/getUser/:id", async (req, res) => {
  if (req.session._id == undefined){
    res.status(400).json({errorMessage: 'Not logged in'})
    return;
  }
  let userMaps = await Map.find({owner: req.params.id}).sort({timeEdited: -1, _id: 1})
  let sharedMaps = await Map.find({shared_users: {$in: [req.session._id]}}).sort({timeEdited: -1, _id: 1})
  res.json({userMaps: userMaps, sharedMaps: sharedMaps})
});

// POST: retrieves maps based on a set of ids
router.post("/map/getBatch", async (req, res) => {
  var limit = req.body.limit ? req.body.limit : 0;
  if (limit <= 0) {
    limit = 1;
  }
  var page = req.body.page ? req.body.page * limit : 0;
  if (page < 0) {
    page = 0;
  }
  if (req.body.ids == undefined) {
    res.json({ maps: [] });
    return;
  }
  var ids = req.body.ids.map((id) => {
    return { _id: id };
  });
  if (ids == undefined || ids.length == 0) {
    res.json({ maps: [] });
    return;
  }
  var maps = await Map.find({ $or: ids }, req.body.fields)
    .sort({ timeEdited: -1, _id: 1 })
    .skip(page)
    .limit(limit);
  res.json({ maps: maps });
});

// LIKE: likes/unlikes a map based on id
router.post("/map/like/:id", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
    return;
  }
  if (req.body.like) {
    var map = await Map.findOneAndUpdate(
      { _id: req.params.id, usersDisliked: { $in: [req.session._id] } },
      {
        $inc: { likes: 1, dislikes: -1 },
        $addToSet: { usersLiked: req.session._id },
        $pull: { usersDisliked: req.session._id },
      },
      { new: true }
    );
    if (map == null) {
      map = await Map.findOneAndUpdate(
        { _id: req.params.id, usersLiked: { $nin: [req.session._id] } },
        { $inc: { likes: 1 }, $addToSet: { usersLiked: req.session._id } },
        { new: true }
      );
      if (map == null) {
        res
          .status(400)
          .json({
            errorMessage:
              "Could not find appropriate map or have already liked",
          });
        return;
      } else {
        await User.findOneAndUpdate({ _id: map.owner }, { $inc: { likes: 1 } });
      }
    } else {
      await User.findOneAndUpdate(
        { _id: map.owner },
        { $inc: { likes: 1, dislikes: -1 } }
      );
    }
    await User.findOneAndUpdate(
      { _id: req.session._id },
      { $addToSet: { liked_maps: map._id } }
    );
    res.json({ map: map });
  } else {
    var map = await Map.findOneAndUpdate(
      { _id: req.params.id, usersLiked: { $in: [req.session._id] } },
      { $inc: { likes: -1 }, $pull: { usersLiked: req.session._id } },
      { new: true }
    );
    if (map == null) {
      res
        .status(400)
        .json({
          errorMessage:
            "Could not find appropriate map or have already unliked",
        });
      return;
    } else {
      await User.findOneAndUpdate({ _id: map.owner }, { $inc: { likes: -1 } });
      await User.findOneAndUpdate(
        { _id: req.session._id },
        { $pull: { liked_maps: map._id } }
      );
      res.json({ map: map });
    }
  }
});

// DISLIKE: Dislikes/undislikes a map based on id
router.post("/map/dislike/:id", async (req, res) => {
  if (req.session._id == undefined) {
    res.status(400).json({ errorMessage: "Not logged in" });
    return;
  }
  if (req.body.dislike) {
    var map = await Map.findOneAndUpdate(
      { _id: req.params.id, usersLiked: { $in: [req.session._id] } },
      {
        $inc: { likes: -1, dislikes: 1 },
        $addToSet: { usersDisliked: req.session._id },
        $pull: { usersLiked: req.session._id },
      },
      { new: true }
    );
    if (map == null) {
      map = await Map.findOneAndUpdate(
        { _id: req.params.id, usersDisliked: { $nin: [req.session._id] } },
        {
          $inc: { dislikes: 1 },
          $addToSet: { usersDisliked: req.session._id },
        },
        { new: true }
      );
      if (map == null) {
        res
          .status(400)
          .json({
            errorMessage:
              "Could not find appropriate map or have already disliked",
          });
        return;
      } else {
        await User.findOneAndUpdate(
          { _id: map.owner },
          { $inc: { dislikes: 1 } }
        );
      }
    } else {
      await User.findOneAndUpdate(
        { _id: map.owner },
        { $inc: { likes: -1, dislikes: 1 } }
      );
      await User.findOneAndUpdate(
        { _id: req.session._id },
        { $pull: { liked_maps: map._id } }
      );
    }
    res.json({ map: map });
  } else {
    var map = await Map.findOneAndUpdate(
      { _id: req.params.id, usersDisliked: { $in: [req.session._id] } },
      { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.session._id } },
      { new: true }
    );
    if (map == null) {
      res
        .status(400)
        .json({
          errorMessage:
            "Could not find appropriate map or have already undisliked",
        });
      return;
    } else {
      await User.findOneAndUpdate(
        { _id: map.owner },
        { $inc: { dislikes: -1 } }
      );
      res.json({ map: map });
    }
  }
});

// POST: performs a search for certain maps
router.post("/map/search", async (req, res) => {
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
  console.log(req.body.search);
  var query = {};
  if (req.body.search != undefined && req.body.search != "") {
    query.$text = { $search: req.body.search };
  }
  if (tags && tags.length != 0) {
    query.$or = tags;
  }
  var documents = await Map.aggregate([
    { $match: query },
    {
      $facet: {
        maps: [
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
  res.json({ maps: documents[0].maps, count: count });
});

// UPDATES MAP PREVIEW IMAGE
router.post("/map/image/:id", uploadStrategy, async (req, res) => {
  const blobName = req.params.id;
  const blobService = new BlockBlobClient(
    process.env.AZURE_STORAGE_CONNECTION_STRING,
    "maptile-map-image",
    blobName
  );
  stream = getStream(req.file.buffer);
  streamLength = req.file.buffer.length;
  const options = { blobHTTPHeaders: { blobContentType: req.file.mimetype } };
  blobService
    .uploadStream(stream, streamLength, undefined, options)
    .then(() => {
      res.json({ message: "successful upload" });
    })
    .catch((err) => {
      res.status(400).json({ errorMessage: err });
    });
});

module.exports = router;
