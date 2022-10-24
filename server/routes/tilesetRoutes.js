const express = require('express');
const router = express.Router();
const Tileset = require('../schema/tileset-schema');

// Create Tileset
router.post('/tileset/create', async (req, res) => {
    var tileset = new TileSet({
        tilesetId: new ObjectId(),
        tileset_data: [],
        name: req.body.name,
        description: "",
        likes: 0,
        dislikes: 0,
        comments: [],
        public: false,
        tilesetCreated: Date.now(),
        owner: new ObjectId() //placeholder for when authentication is done
    })
    await tileset.save()
    res.json({payload: {tileset: tileset}})
});

// Delete Tileset
router.delete('/tileset/:id', async (req, res) => {
    Tileset.findByIdAndDelete(req.params.id)
        .then(() => res.json('Tileset deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update tileset
router.post('/tileset/update/:id', async (req, res) => {
    Tileset.findById(req.params.id)
        .then(tileset => {
            tileset.tileset_data = req.body.tileset_data;
            tileset.name = req.body.name;
            tileset.description = req.body.description;
            tileset.likes = req.body.likes;
            tileset.dislikes = req.body.dislikes;
            tileset.comments = req.body.comments;
            tileset.public = req.body.public;
            tileset.save()
                .then(() => res.json('Tileset updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


// Get Tileset
router.get('/tileset/:id', async (req, res) => {
    Tileset.findById(req.params.id)
        .then(tilesets => res.json(tilesets))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Get all tilesets
router.get('/tileset', async (req, res) => {
    Tileset.find()
        .then(tilesets => res.json(tilesets))
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;