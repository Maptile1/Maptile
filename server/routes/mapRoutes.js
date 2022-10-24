const express = require('express');
const router = express.Router();
const Map = require('../schema/map-schema.js')
const ObjectId = require('mongodb').ObjectId;

router.post('/map/create', async (req, res) => {
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
        owner: new ObjectId() //placeholder for when authentication is done
    })
    await map.save()
    res.json({payload: {map: map}})
});

// Get map
router.get('/map/:id', async (req, res) => {
    Map.findById(req.params.id)
        .then(map => res.json(map))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Get all maps
router.get('/map', async (req, res) => {
    Map.find()
        .then(maps => res.json(maps))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Delete Map
router.delete('/map/delete/:id', async (req, res) => {
    Map.findByIdAndDelete(req.params.id)
        .then(() => res.json('Map deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
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