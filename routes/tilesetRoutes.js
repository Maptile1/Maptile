const express = require('express');
const router = express.Router();
const Tileset = require('../schema/tileset-schema');
const ObjectId = require('mongodb').ObjectId;

// Create Tileset
router.post('/tileset/create', async (req, res) => {
    if (req.session._id == undefined){
        res.status(400).json({errorMessage: 'Not logged in'})
        return;
    }
    var tileset = new Tileset({
        _id: new ObjectId(),
        tileset_data: [],
        name: req.body.name,
        description: req.body.description,
        likes: 0,
        dislikes: 0,
        comments: [],
        public: false,
        tilesetCreated: Date.now(),
        owner: req.session._id
    })
    await tileset.save()
    res.json({tileset: tileset})
})

// Delete Tileset
router.post('/tileset/delete/:id', async (req, res) => {
    if (req.session._id == undefined){
        res.status(400).json({errorMessage: 'Not logged in'})
        return;
    }
    Tileset.findOneAndRemove({_id: req.params.id, owner: req.session._id})
        .then(() => res.json({message: 'Tileset deleted'}))
        .catch(err => {
            Tileset.findOne({_id: req.params.id})
                .then((tileset) => {
                    if (tileset != null){
                        res.status(400).json({errorMessage: 'Not owner of tileset'})
                    }
                    else{
                        res.status(400).json({errorMessage: 'Tileset does not exist'})
                    }
                })
                .catch(err => res.status(400).json({errorMessage :err}))
        })
})

// Update tileset
router.post('/tileset/update/:id', async (req, res) => {
    if (req.session._id == undefined){
        res.status(400).json({errorMessage: 'Not logged in'})
        return;
    }
    var updates = {};
    updates.tileset_data = req.body.tileset_data
    updates.name = req.body.name
    updates.description = req.body.description
    updates.public = req.body.public
    var tileset = await Tileset.findOneAndUpdate({_id: req.params.id, owner: req.session._id}, {$set: updates}, {new: true})
    if (tileset != null){
        res.json({tileset: tileset})
    }
    else{
        if (await Tileset.findById(req.params.id) != null){
            res.status(400).json({errorMessage: 'Not permitted to editle'})
        }
        else{
            res.status(400).json({errorMessage: 'Tileset does not exist'})
        }
    }
});


// Get Tileset
router.get('/tileset/get/:id', async (req, res) => {
    var tileset = await Tileset.findById(req.params.id)
    if (tileset != null){
        res.json({tileset: tileset})
    }
    else{
        res.status(400).json({errorMessage: 'Tileset does not exist'})
    }
});


// Get all tilesets
router.get('/tileset/getall', async (req, res) => {
    Tileset.find()
        .then(tilesets => res.json(tilesets))
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;