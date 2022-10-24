const express = require('express');
const router = express.Router();

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

module.exports = router;