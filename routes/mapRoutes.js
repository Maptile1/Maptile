const express = require('express');
const router = express.Router();
const Map = require('../schema/map-schema.js')
const ObjectId = require('mongodb').ObjectId;

router.post('/map/create', async (req, res) => {
    if (req.session._id == undefined){
        res.status(400).json({errorMessage: 'Not logged in'})
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
        description: req.body.description,
        tags:[],
        likes: 0,
        dislikes: 0,
        tilesets: [],
        comments: [],
        public: false,
        mapCreated: Date.now(),
        layers: [],
        owner: req.session._id
    })
    await map.save()
    res.json({map: map})
});

// Get map
router.get('/map/get/:id', async (req, res) => {
    var map = await Map.findById(req.params.id)
    if (map != null){
        res.json({map: map})
    }
    else{
        res.status(400).json({errorMessage: 'Map does not exist'})
    }
});


// Get all maps
router.get('/map/getall', async (req, res) => {
    Map.find()
        .then(maps => res.json(maps))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Delete Map
router.post('/map/delete/:id', async (req, res) => {
    if (req.session._id == undefined){
        res.status(400).json({errorMessage: 'Not logged in'})
        return;
    }
    Map.findOneAndRemove({_id: req.params.id, owner: req.session._id})
        .then(() => res.json({message: 'Map deleted'}))
        .catch(err => {
            Map.findOne({_id: req.params.id})
                .then((map) => {
                    if (map != null){
                        res.status(400).json({errorMessage: 'Not owner of map'})
                    }
                    else{
                        res.status(400).json({errorMessage: 'Map does not exist'})
                    }
                })
                .catch(err => res.status(400).json({errorMessage :err}))
        })
});

// Update Map
router.post('/map/update/:id', async (req, res) => {
    if (req.session._id == undefined){
        res.status(400).json({errorMessage: 'Not logged in'})
        return;
    }
    var updates = {}
    updates.name = req.body.name
    updates.tile_width = req.body.tile_width
    updates.width = req.body.width
    updates.height = req.body.height
    updates.render_order = req.body.render_order
    updates.description = req.body.description
    updates.tilesets = req.body.tilesets
    updates.public = req.body.public
    updates.layers = req.body.layers
    var map = await Map.findOneAndUpdate({_id: req.params.id, owner: req.session._id}, {$set: updates}, {new: true})
    if (map != null){
        res.json({map: map})
    }
    else{
        if (await Map.findById(req.params.id) != null){
            res.status(400).json({errorMessage: 'Not permitted to editle'})
        }
        else{
            res.status(400).json({errorMessage: 'Tileset does not exist'})
        }
    }
});

router.post("/map/like/:id", async (req, res) => {
    if (req.session._id == undefined) {
      res.status(400).json({ errorMessage: "Not logged in" });
      return;
    }
    if (req.body.like){
      var map = await Map.findOneAndUpdate(
        {_id: req.params.id, usersDisliked: {$in: [req.session._id]}},
        {$inc: {likes: 1, dislikes: -1}, $addToSet: { usersLiked: req.session._id },
        $pull: {usersDisliked: req.session._id}},
        {new: true})
      if (map == null){
        map = await Map.findOneAndUpdate(
          {_id: req.params.id, usersLiked: {$nin: [req.session._id]}},
          {$inc: {likes: 1}, $addToSet: { usersLiked: req.session._id }},
          {new: true})
        if (map == null){
          res.status(400).json({ errorMessage: "Could not find appropriate map or have already liked" });
          return;
        }
      }
      res.json({ map: map });
    }
    else{
      var map = await Map.findOneAndUpdate(
        {_id: req.params.id, usersLiked: {$in: [req.session._id]}},
        {$inc: {likes: -1}, $pull: { usersLiked: req.session._id }},
        {new: true})
      if (map == null){
        res.status(400).json({ errorMessage: "Could not find appropriate map or have already unliked" });
          return;
      }
      else{
        res.json({ map: map });
      }
    }
  })

module.exports = router;