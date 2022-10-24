const express = require('express');
const router = express.Router();
const Map = require('../schema/map-schema.js')

router.post('/map/create', async (req, res) => {
    var map = new Map({
        mapId: new ObjectId(),
        name: req.body.name,
        tile_width: req.body.tile_width,
        tile_height: req.body.tile_height,
        width: req.body.width,
        height: req.body.height,
        render_order: "right-down",
        description: "",
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
    res.json({payload: {tileset: tileset}})
});

// router.put('/map/update', async (req, res) => {
//     let {mapId, field, value} = req.body

//     let updated = await Map.findOneAndUpdate({mapId: mapId},{[field]: value})
//     if(updated) {res.json('Map updated!')}
// 	else res.status(400).json('Error: ' + err)
// })

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
router.delete('/map/:id', async (req, res) => {
    Map.findByIdAndDelete(req.params.id)
        .then(() => res.json('Map deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update Map
router.post('/map/update/:id', async (req, res) => {
    Map.findById(req.params.id)
        .then(map => {
            map.name = req.body.name;
            map.tile_width = req.body.tile_width;
            map.tile_height = req.body.tile_height;
            map.width = req.body.width;
            map.height = req.body.height;
            map.render_order = req.body.render_order;
            map.description = req.body.description;
            map.tags = req.body.description;
            map.likes = req.body.likes;
            map.dislikes = req.body.dislikes;
            map.tilesets = req.body.tilesets;
            map.comments = req.body.comments;
            map.public = req.body.public;
            map.mapCreated = req.body.mapCreated;
            map.layers = req.body.layers;
            map.owner = req.body.owner; 
            tileset.save()
                .then(() => res.json('Tileset updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;