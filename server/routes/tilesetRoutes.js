const express = require('express');
const router = express.Router();


// Tileset Routes
router.post('/tileset/create', async (req, res) => {
    var tileset = new TileSet({
        tilesetId: new ObjectId(),
        tiles: [],
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

module.exports = router;