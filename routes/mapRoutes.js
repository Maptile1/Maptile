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
                .then(() => res.status(400).json({errorMessage: 'Not owner of map'}))
                .catch(err => res.status(400).json({errorMessage: 'Map does not exist'}))
        })
});

// Update Map
router.post('/map/update/:id', async (req, res) => {
    Map.findById(req.params.id)
        .then(map => {
            map.name = req.body.name || map.name;
            map.tile_width = req.body.tile_width || map.tile_width;
            map.tile_height = req.body.tile_height || map.tile_height;
            map.width = req.body.width || map.width;
            map.height = req.body.height || map.height;
            map.render_order = req.body.render_order || map.render_order;
            map.description = req.body.description || map.description;
            map.tags = req.body.tags || map.tags;
            map.likes = req.body.likes || map.likes;
            map.dislikes = req.body.dislikes || map.dislikes;
            map.tilesets = req.body.tilesets || map.tilesets;
            map.comments = req.body.comments || map.comments;
            map.public = req.body.public || map.public;
            map.layers = req.body.layers || map.layers;
            map.save()
                .then(() => res.json('Map updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;