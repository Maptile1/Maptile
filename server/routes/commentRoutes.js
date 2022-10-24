const express = require('express');
const router = express.Router();
const Comment = require('../schema/comment-schema.js');
const ObjectId = require('mongodb').ObjectId;

// Comment Create
router.post('/comment/create', async (req, res) => {
    var comment = new Comment({
        _id: new ObjectId(),
        // owner: req.session.id, //placeholder for when authentication is done
        comment_text: req.body.comment_text,
        comment_date: new Date(),
        likes: 0,
        dislikes: 0
    })
    await comment.save()
    res.json({ payload: { comment: comment } })
});

// Comment update
router.post('/comment/update/:id', async (req, res) => {
    Comment.findById(req.params.id)
        .then(comment => {
            comment.comment_text = req.body.comment_text || comment.comment_text;
            comment.likes = req.body.likes || comment.likes;
            comment.dislikes = req.body.dislikes || comment.dislikes;
            comment.save()
                .then(() => res.json('Comment updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get Comment
router.get('/comment/:id', async (req, res) => {
    Comment.findById(req.params.id)
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all comments
router.get('/comment', async (req, res) => {
    Comment.find()
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete comment
router.delete('/comment/:id', async (req, res) => {
    Comment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Comment deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;